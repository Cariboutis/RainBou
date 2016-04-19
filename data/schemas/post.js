
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = require('./comment');

module.exports = new Schema({
    title: String,
    body: String,
    comments: [commentSchema],
    userId: String
});