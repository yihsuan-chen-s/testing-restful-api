const express = require('express');
const app = express();

// GET Method
app.get('/',(req, res) => {
  res.status(200).send({ status: { type: 'ok', message: 'request /GET' }, data: null });
});

// POST Method
app.post('/',(req, res) => {
  res.status(200).send({ status: { type: 'ok', message: 'request /POST' }, data: null });
});

// PUT Method
app.put('/',(req, res) => {
  res.status(200).send({ status: { type: 'ok', message: 'request /PUT' }, data: null });
});

// DELETE Method
app.delete('/',(req, res) => {
  res.status(200).send({ status: { type: 'ok', message: 'request /DELETE' }, data: null });
});

/**
 * Unsupported Methods
 */
router.get('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

router.post('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

router.delete('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

module.exports = app;