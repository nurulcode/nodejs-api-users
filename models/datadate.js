const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose);

const Datadate = new Schema({

    letter: { type: Date },
    frequency : { type: Float }

})

module.exports = mongoose.model('Date', Datadate);
