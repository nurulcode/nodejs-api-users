var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./models/config')
var cors = require('cors');

mongoose.connect(config.database, {
    useNewUrlParser: true
});

var datadatesRouter = require('./routes/datadates');
var datasRouter = require('./routes/datas');
var mapsRouter = require('./routes/maps');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Cross-Origin Resource Sharing
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/data', datasRouter);
app.use('/api/datadate', datadatesRouter);
app.use('/api/maps', mapsRouter);

module.exports = app;
