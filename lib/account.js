const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// lowdb
const db = require('../db');

// 取得所有帳號資訊
app.get('/',(req, res) => {
    const territory = req.params.territory;
    const account = db.get('accounts').value();

    res.status(200).send({ status: { type: 'ok', message: '' }, data: account });
});

// 借用帳號
app.post('/', function (req, res) {
    let filter = req.body || { };
    filter.inuse = false;

    let avaliable = db.get('accounts').find(filter).size().value();
    if (avaliable < 1) {
        res.status(500).send({ status: { type: 'error', message: 'No avaliable account in database.' }, data: null });
    } else {
        const account = db.get('accounts').find(filter).assign({ 'inuse': true }).write();
        res.status(200).send({ status: { type: 'ok', message: '' }, data: account });
    }
});

// 歸還帳號
app.put('/:uid', function (req, res) {
    const uid = req.params.uid;

    let exist = db.get('accounts').find({ 'account': uid }).value();
    if (!exist) {
        res.status(500).send({ status: { type: 'error', message: uid + ' is not exist in database.' }, data: null });
    } else {
        const account = db.get('accounts').find({ 'account': uid }).assign({ 'inuse': false }).write();
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