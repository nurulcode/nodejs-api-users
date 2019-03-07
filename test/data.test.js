'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const DATA = require('../models/data')

const should = chai.should();
chai.use(chaiHTTP);

describe('datas', () => {

    DATA.collection.drop()

    it('1. ADD data metode post', (done) => {
        chai.request(server)
        .post('/api/data')
        .send({ 'letter': 'A', 'freq' : '1.1'})
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.have.property('_id')
            res.body.data.should.have.property('frequency');
            res.body.should.have.property('success')
            res.body.should.have.property('message')
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data._id.should.equal(res.body.data._id);
            res.body.data.frequency.should.equal(res.body.data.frequency);
            done()
        })
    })

    it('2. READ data metode get', (done) => {
        chai.request(server)
        .get('/api/data')
        .send({ 'letter': 'A', 'freq' : '1.1'})
        .end((err, res)=> {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0]._id.should.equal(res.body[0]._id);
            res.body[0].letter.should.equal(res.body[0].letter);
            res.body[0].frequency.should.equal(res.body[0].frequency);
            done()
        })
    })

    it('3. SEARCH data metode post', (done) => {
        chai.request(server)
        .post('/api/data/search')
        .send({ 'letter': 'A'})
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0]._id.should.equal(res.body[0]._id);
            res.body[0].letter.should.equal(res.body[0].letter);
            res.body[0].frequency.should.equal(res.body[0].frequency);
            done()
        })
    })

    it('4. EDIT data metode get', (done) => {
        chai.request(server)
        .post('/api/data/search')
        .send({ 'letter': 'A'})
        .end((err, res) => {
            chai.request(server)
            .put('/api/data/' + res.body[0]._id)
            .send({ 'letter': res.body[0].letter, 'freq' : '1.5'})
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('frequency');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been update');
                res.body.data._id.should.equal(res.body.data._id);
                res.body.data.frequency.should.equal(res.body.data.frequency);
                done()
            })
        })
    })

    it('5. FIND data metode post', (done) => {
        chai.request(server)
        .post('/api/data')
        .send({ 'letter': 'A', 'freq' : '1.6'})
        .end((err, res) => {
            chai.request(server)
            .get('/api/data/' + res.body.data._id)
            .send({ 'letter': res.body.data.letter, 'freq' : '1.5'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('frequency');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data found');
                res.body.data._id.should.equal(res.body.data._id);
                res.body.data.frequency.should.equal(res.body.data.frequency);
                done()
            })
        })
    })

    it('6. DELETE data metode get', (done) => {
        chai.request(server)
        .post('/api/data/search')
        .send({ 'letter': 'A'})
        .end((err, res) => {
            chai.request(server)
            .delete('/api/data/' + res.body[0]._id)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('frequency');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been deleted');
                res.body.data._id.should.equal(res.body.data._id);
                res.body.data.frequency.should.equal(res.body.data.frequency);
                done()
            })
        })
    })










})
