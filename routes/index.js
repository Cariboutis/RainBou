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
  res.render('register', {data:{}});
});

router.post('/register', function(req,res, next) {

  var info = {
    email : req.body.email,
    username : req.body.username
  };

  var pass = req.body.password;

  req.db.User.find({ $or:[{email:info.email},{username:info.username}]}, function(err,docs) {
    if(err) {
      res.send(err);
      return;
    } else {
      if(docs.length != 0){
        res.render('register', {error:"Username or Email already in use", data:info});
      } else {
        var newUser = req.db.User({
          email: info.email,
          username: info.username,
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
              res.render('index',{info:"Verification Email sent to " + info.email});
            });
          } else {
            res.render('register', {error:"Username or Email already in use and waiting verification", data:info});
          }
        });
      }
    }
  });
});

router.get('/reverify', function(req,res,next) {
  res.render('reverify');
});

router.post('/reverify', function(req,res,next) {
  //TODO verify user is temporarily logged in
  var email = req.body.email;

  var nev = req.db.EmailVerify;
  nev.resendVerificationEmail(email, function(err, userFound) {
    if(err) {
      res.send(err); //TODO handle
      return;
    }
    if(userFound){
      res.render('index',{info:"Verification Email sent to " + email});
    } else {
      res.render('reverify',{error:"No user found waiting verification with that email"});
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
      res.redirect('/'); //TODO redirect to profile
    } else {
      res.redirect('/register');
    }
  });
});


module.exports = router;
