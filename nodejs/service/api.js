const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express.Router();
const { Pool } = require('pg');

require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.post('/api/user', async (req, res) => {
    const { userid, username } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (userid, username, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            ON CONFLICT (userid) 
            DO UPDATE SET username = EXCLUDED.username, updated_at = CURRENT_TIMESTAMP
            RETURNING *`,
            [userid, username]
        );

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/api/submitform', upload.single('cdimage'), async (req, res) => {
    try {
        const { cdname, cdcreator, cddetail, userid, cdtype } = req.body;
        let { lat, lng } = req.body;

        lat = parseFloat(lat);
        lng = parseFloat(lng);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ success: false, error: "Invalid latitude or longitude" });
        }

        // create code text from timestamp
        const timestamp = new Date().getTime();
        const imgcode = timestamp.toString(36);

        if (req.file) {
            const pathimage = req.file.path;
            const sql = 'INSERT INTO images (userid, cdimage, pathimage) VALUES ($1, $2, $3) RETURNING *';
            const result = await pool.query(sql, [userid, imgcode, pathimage]);
        }

        const result = await pool.query(
            'INSERT INTO checkdam (cdname, cdcreator, cddetail, userid, lat, lng, geom, cddate, cdtype, cdimage) VALUES ($1, $2, $3, $4, $5, $6, ST_MakePoint($6::double precision, $5::double precision), now(), $7, $8) RETURNING *;',
            [cdname, cdcreator, cddetail, userid, lat, lng, cdtype, imgcode]
        );
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/getcheckdam', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM checkdam');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/sumbymonth', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                EXTRACT(YEAR FROM cddate) + 543 AS buddhist_year,
                TO_CHAR(cddate, 'MM') AS month,
                COUNT(*) AS total_checkdams
            FROM 
                checkdam
            GROUP BY 
                buddhist_year, month
            ORDER BY 
                buddhist_year, month;
        `);
        const monthNamesThai = [
            "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
        ];

        const formattedData = result.rows.map(row => ({
            month_year: `${monthNamesThai[parseInt(row.month) - 1]} ${row.buddhist_year}`,
            total_checkdams: row.total_checkdams
        }));

        res.status(200).json({ success: true, data: formattedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// get checkdam by id
app.get('/api/getcheckdam/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM checkdam WHERE gid = $1', [id]);
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// get images by userid
app.get('/api/getimages/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const result = await pool.query('SELECT * FROM images WHERE userid = $1', [userid]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// delete checkdam by id
app.delete('/api/deletecheckdam/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM checkdam WHERE gid = $1 RETURNING *', [id]);
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// update checkdam by id
app.put('/api/updatecheckdam/:id', upload.single('cdimage'), async (req, res) => {
    try {
        const gid = req.params.id;
        const {
            userid,
            cdname,
            cdcreator,
            cddetail,
            cdtype,
            lat,
            lng
        } = req.body;

        console.log('File info:', req.file);
        console.log('Body fields:', req.body);


        // Access the uploaded file via req.file
        let cdimagePath = null;
        if (req.file) {
            cdimagePath = req.file.path;

            // Update the new image path
            const result = await pool.query(
                `UPDATE checkdam
                SET
                    cdimage = $1
                WHERE gid = $2
                RETURNING *`,
                [cdimagePath, gid]
            );
        }

        // Update the checkdam record
        const result = await pool.query(
            `UPDATE checkdam
            SET
                cdname = $1,
                cdcreator = $2,
                cddetail = $3,
                lat = $4,
                lng = $5,
                geom = ST_MakePoint($5::double precision, $4::double precision),
                cddate = now(),
                cdtype = $6
            WHERE gid = $7
            RETURNING *`,
            [cdname, cdcreator, cddetail, lat, lng, cdtype, gid]
        );

        res.json({ success: true, data: 'Checkdam updated successfully.' });
    } catch (error) {
        console.error('Error updating checkdam:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});


// export module
module.exports = app;
