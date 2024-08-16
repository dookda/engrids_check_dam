const express = require('express');
const app = express();


app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

// export module
module.exports = app;
