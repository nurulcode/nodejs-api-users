'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const MAPS = require('../models/map')

const should = chai.should();
chai.use(chaiHTTP);

describe('datas', () => {

    MAPS.collection.drop()

    it('1. ADD data metode post', (done) => {
        chai.request(server)
        .post('/api/maps')
        .send({ 'title': 'Cihamplas Walk', 'lat' : '-6.8965475', 'lng': '107.6103536'})
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.have.property('_id')
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('lat');
            res.body.data.should.have.property('lng');
            res.body.should.have.property('success')
            res.body.should.have.property('message')
            res.body.success.should.equal(true);
            res.body.message.should.equal('data have been added');
            res.body.data.title.should.equal('Cihamplas Walk');
            res.body.data.lat.should.equal(-6.8965475);
            res.body.data.lng.should.equal(107.6103536);
            done()
        })
    })

    it('2. READ data metode get', (done) => {
        chai.request(server)
        .get('/api/maps')
        .end((err, res)=> {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id')
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('Cihamplas Walk');
            res.body[0].lat.should.equal(-6.8965475);
            res.body[0].lng.should.equal(107.6103536);
            done()
        })
    })

    it('3. SEARCH data metode post', (done) => {
        chai.request(server)
        .post('/api/maps/search')
        .send({ 'title': 'Cihamplas Walk' })
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id')
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('Cihamplas Walk');
            res.body[0].lat.should.equal(-6.8965475);
            res.body[0].lng.should.equal(107.6103536);
            done()
        })
    })

    it('4. EDIT data metode get', (done) => {
        chai.request(server)
        .post('/api/maps/search')
        .send({ 'title': 'Cihamplas Walk' })
        .end((err, res) => {
            chai.request(server)
            .put('/api/maps/' + res.body[0]._id)
            .send({ 'title': 'Cihamplas Walk', 'lat' : '-6.8965475', 'lng': '107.6103536'})
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('title');
                res.body.data.should.have.property('lat');
                res.body.data.should.have.property('lng');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been update');
                res.body.data.title.should.equal('Cihamplas Walk');
                done()
            })
        })
    })

    it('5. FIND data metode post', (done) => {
        chai.request(server)
        .post('/api/maps/search')
        .send({ 'title': 'Cihamplas Walk' })
        .end((err, res) => {
            chai.request(server)
            .get('/api/maps/' + res.body[0]._id)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('title');
                res.body.data.should.have.property('lat');
                res.body.data.should.have.property('lng');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data found');
                res.body.data.title.should.equal('Cihamplas Walk');
                res.body.data.lat.should.equal(-6.8965475);
                res.body.data.lng.should.equal(107.6103536);
                done()
            })
        })
    })

    it('6. DELETE data metode get', (done) => {
        chai.request(server)
        .post('/api/maps/search')
        .send({ 'title': 'Cihamplas Walk' })
        .end((err, res) => {
            chai.request(server)
            .delete('/api/maps/' + res.body[0]._id)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('title');
                res.body.data.should.have.property('lat');
                res.body.data.should.have.property('lng');
                res.body.should.have.property('success')
                res.body.should.have.property('message')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been deleted');
                res.body.data.title.should.equal('Cihamplas Walk');
                res.body.data.lat.should.equal(-6.8965475);
                res.body.data.lng.should.equal(107.6103536);
                done()
            })
        })
    })










})
