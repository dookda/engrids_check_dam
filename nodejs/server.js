const express = require('express');
const app = express();


app.use(require('./service/api'));
app.use(express.static('www'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})