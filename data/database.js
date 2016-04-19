
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var config = require('../bin/config');

mongoose.connect(config.DB_CONNECTION);

var userSchema = require('./schemas/user');
var postSchema = require('./schemas/post');
var commSchema = require('./schemas/comment');

var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model('Comment', commSchema);

var nevConfig = config.NEV_CONFIG;
nevConfig.persistentUserModel = User;
nev.configure(nevConfig);

nev.generateTempUserModel(User);

module.exports = { User: User, Post: Post, Comment: Comment, EmailVerify: nev };

/**
 * Test Section
 */
Post.find({title:"test"}, function(err, posts) {
   if(posts.length == 0){
       var post = new Post({title:"test",body:"This is a test post that was dynamically grabbed."});
       post.save(function(err) {

       });
   }
});