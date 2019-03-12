const Datadate = require('../models/datadate');
const config = require('../models/config')
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(config.database, {
    useNewUrlParser: true
});


let data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));
Datadate.deleteMany((err) => {
    Datadate.insertMany(data, function(err, mongooseDocuments) {
        if (err) throw err;
        mongoose.disconnect()
    })
})
