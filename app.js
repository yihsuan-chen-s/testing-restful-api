const express = require('express');
const app = express();

// lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// GET Method
app.get('/:territory',(req, res) => {
	const territory = req.params.territory;
	const account = db.get('accounts').find({'territory': territory}).value();

	if (account === undefined) {
        res.status(500).send({ status: { type: 'error', message: 'Nonexistent.' }, data: null });
    } else {
    	res.status(200).send({ status: { type: 'ok', message: '' }, data: account });
    }
});

/**
 * Unsupported Methods
 */
app.get('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

app.post('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

app.delete('*', function (req, res){
    res.status(404).send({ status: { type: 'error', message: 'Invalid Request.' }, data: null });
});

module.exports = app;