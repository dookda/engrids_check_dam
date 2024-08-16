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

console.log('DB_USER:', process.env.DB_USER);


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
    const { cdname, cdcreator, cddetail, userid } = req.body;
    const cdimage = req.file ? req.file.path : null;
    try {
        const result = await pool.query(
            'INSERT INTO checkdam (cdname, cdcreator, cddetail, cdimage, userid) VALUES ($1, $2, $3, $4, $5);',
            [cdname, cdcreator, cddetail, cdimage, userid]
        );
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// export module
module.exports = app;
