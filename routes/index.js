var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('mainpage');
});
router.get('/about', function(req, res, next){
  res.render('about')
});

router.get('/login', function(req,res) {
  res.render('login');
});

router.post('/login',function(req,res) {
  //TODO
});

router.get('/register', function(req,res) {
  res.render('register');
});

router.post('/register', function(req,res, next) {
  var email = req.body.email;
  var user = req.body.username;
  var pass = req.body.password;

  var newUser = req.db.User({
    email: email,
    username: user,
    hashed_password: req.db.User.hashPassword(pass),
    admin: false
  });

  var nev = req.db.EmailVerify;
  nev.createTempUser(newUser, function(err, newTempUser) {
    if(err) {
      res.send(err);
      return;
    }
    if(newTempUser) {
      nev.registerTempUser(newTempUser, function(err) {
        if(err) {
          res.send(err);
        }
        res.send("SUCCESS");
      });
    } else {
      res.send("User not created");
    }
  });
});

router.get('/email-verification/:url', function(req,res,next) {
  var url = req.params.url;
  var nev = req.db.EmailVerify;

  nev.confirmTempUser(url, function(err, user) {
    if(err){
      res.send(err);
      return;
    }
    if(user){
      res.redirect('/');
    } else {
      res.redirect('/register');
    }
  });
});


module.exports = router;
