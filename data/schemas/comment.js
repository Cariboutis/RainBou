
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    title: String,
    body: String,
    userId: String
});