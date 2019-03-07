const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 7);

const Maps = new Schema({

    title: { type: String },
    lat : { type: Float },
    lng : { type: Float }

})

module.exports = mongoose.model('Maps', Maps);
