const request = require('supertest');
const assert = require('assert');
const app = require('../server');
const db = require('../db');

describe('GET', function () {
    it('respond 200 if getting accounts successfully', function (done) {
        request(app)
            .get('/')
            .expect(function (res) {
                assert.equal(res.body.status.type, 'ok');
                assert.equal(typeof res.body.data, 'object');
                assert.equal(res.body.data.constructor, Array);
            })
            .expect(200, done);
    });

    it('respond 404 if sending an invalid request', function (done) {
        request(app)
            .get('/idontexist')
            .expect(function (res) {
                assert.equal(res.body.status.type, 'error');
                assert.equal(res.body.status.message, 'Invalid Request.');
            })
            .expect(404, done);
    });
});

describe('POST', function () {
    before(function () {
        resetInuse();
    });

    afterEach(function () {
        resetInuse();
    });

    it('respond 200 if getting a "territory: TW" account successfully', function (done) {
        request(app)
            .post('/')
            .send({ 'territory': 'TW' })
            .expect(function (res) {
                assert.equal(res.body.status.type, 'ok');
                assert.equal(res.body.data.territory, 'TW');
                assert.equal(res.body.data.inuse, true);
            })
            .expect(200, done);
    });

    it('respond 200 if getting a "type: expired" account successfully', function (done) {
        request(app)
            .post('/')
            .send({ 'type': 'expired' })
            .expect(function (res) {
                assert.equal(res.body.status.type, 'ok');
                assert.equal(res.body.data.type, 'expired');
                assert.equal(res.body.data.inuse, true);
            })
            .expect(200, done);
    });

    it('respond 404 if sending an invalid request', function (done) {
        request(app)
            .post('/idontexist')
            .expect(function (res) {
                assert.equal(res.body.status.type, 'error');
                assert.equal(res.body.status.message, 'Invalid Request.');
            })
            .expect(404, done);
    });

    it('respond 500 if no account avaliable', function (done) {
        setInuse();

        request(app)
            .post('/')
            .send({ 'territory': 'TW' })
            .expect(function (res) {
                assert.equal(res.body.status.type, 'error');
                assert.equal(res.body.status.message, 'No avaliable account in database.');
            })
            .expect(500, done);
    });
});

describe('PUT', function () {
    before(function () {
        resetInuse();
    });

    afterEach(function () {
        resetInuse();
    });

    it('respond 200 if return account successfully', function (done) {
        setInuse();

        request(app)
            .put('/accountTW@kkbox.com')
            .expect(function (res) {
                assert.equal(res.body.status.type, 'ok');
                assert.equal(res.body.data.account, 'accountTW@kkbox.com');
                assert.equal(res.body.data.inuse, false);
            })
            .expect(200, done);
    });

    it('respond 500 if account not exist', function (done) {
        request(app)
            .put('/idontexist')
            .expect(function (res) {
                assert.equal(res.body.status.type, 'error');
                assert.equal(res.body.status.message, 'idontexist is not exist in database.');
            })
            .expect(500, done);
    });
});

function resetInuse () {
    do {
        var inuse = db.get('accounts').find({ 'inuse': true }).size().value();
        db.get('accounts').find({ 'inuse': true }).assign({ 'inuse': false }).write();
    } while (inuse > 0);
}

function setInuse () {
    do {
        var notInuse = db.get('accounts').find({ 'inuse': false }).size().value();
        db.get('accounts').find({ 'inuse': false }).assign({ 'inuse': true }).write();
    } while (notInuse > 0);
}