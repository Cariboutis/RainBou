
var mongoose = require('mongoose');
var config = require('../bin/config');

mongoose.connect(config.DB_CONNECTION);

var userSchema = require('collections/user');
var postSchema = require('collections/post');
var commSchema = require('collections/comment');

var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model('Comment', commSchema);

module.exports = { User: User, Post: Post, Comment: Comment };