'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const USER  = require('../models/user')

const should = chai.should();
chai.use(chaiHTTP);

describe('users', function(){
    // delete data collection from tbl_users
    USER.collection.drop();

    it('auth register jika email tidak ada di database dengan metode post', function(done){
        chai.request(server)
        .post('/api/users/register')
        .send({'email': 'papua@gmail.com', 'password' : '12345', 'retypepassword' : '12345'})
        .end(function(err, res)  {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.have.property('email');
            res.body.should.have.property('password');
            res.body.data.email.should.equal('papua@gmail.com');
            done()

        })
    })

    it('login auth jika email ada dan password sesuai dengan metode post', function(done){
        chai.request(server)
        .post('/api/users/login')
        .send({'email': 'papua@gmail.com', 'password' : '12345'})
        .end(function(err, res)  {

            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.should.have.property('email');
            res.body.should.have.property('token');
            res.body.data.email.should.equal('papua@gmail.com');
            res.body.token.should.equal(res.body.token);
            done()

        })
    })

    it('check token post', function(done){
        chai.request(server)
        .post('/api/users/login')
        .send({'email': 'papua@gmail.com', 'password' : '12345'})
        .end(function(err, response)  {

            chai.request(server)
            .post('/api/users/check')
            .set({'authorization': response.body.token})
            .end(function(err, res)  {

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.token.should.equal('papua@gmail.com');
                res.body.should.have.property('valid');
                res.body.valid.should.equal(true);
                done()

            })
        })
    })

    it('logout get', function(done){
        chai.request(server)
        .get('/api/users/destroy')
        .send({'email': 'papua@gmail.com'})
        .end(function(err, res)  {

            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('logout');
            res.body.logout.should.equal(true);
            done()

        })
    })













})
