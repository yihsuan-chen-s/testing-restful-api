const express = require('express');
const app = express();

// GET Method
app.get('/',(req, res) => {
    res.send('request /GET');
});

// POST Method
app.post('/',(req, res) => {
    res.send('request /POST');
});

// PUT Method
app.put('/',(req, res) => {
    res.send('request /PUT');
});

// DELETE Method
app.delete('/',(req, res) => {
    res.send('request /DELETE');
});

module.exports = app;