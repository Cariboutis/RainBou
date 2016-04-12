
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    writer: Boolean,
    hashed_password: String
});