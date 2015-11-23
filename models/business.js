// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var businessesSchema = new Schema({
	fieldName: String,
	fieldValue: String,
	created: Number,
	updated: Number
}, {
	collection: 'businessInfo'
});

module.exports = mongoose.model('Business', businessesSchema);