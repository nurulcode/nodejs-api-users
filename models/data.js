const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose);

const Data = new Schema({

    letter: { type: String},
    frequency : { type: Float }

})

module.exports = mongoose.model('Data', Data);
