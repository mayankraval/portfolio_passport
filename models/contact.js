//import mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema; // Schema object

var ContactSchema = new Schema({
        name: String,
        value:String,
        created: Number,
        updated: Number
    },
    {
        collection: 'contactInfo'
    });

module.exports = mongoose.model('Contact', ContactSchema);