var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.db.Post.find({}, function(err, posts) {
        res.render("dynamic", {posts:posts});
    });
});

router.post('/', function(req, res, next) {
    var newPost = req.body;
    var post = req.db.Post(newPost);

    post.save(function(err, blogPost) {
        if (!err) {
            res.send({success:true,response:blogPost});
        } else {
            res.send({success:false, response:err});
        }
    });
});

module.exports = router;
