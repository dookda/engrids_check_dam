const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/checkdam', require('./service/api'));
app.use('/checkdam/uploads', express.static('uploads'));
app.use('/checkdam', express.static('www'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})