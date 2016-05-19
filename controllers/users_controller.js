var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User.js');
var session = require('express-session');
var Fact = require('../models/Fact.js');


//render home page 
router.get('/', function(req,res) {
    res.redirect('/home')
});

router.get('/home', function(req,res) {

    Fact.findAll({}).then(function(result){
        var hbsObject = {fact : result}
            res.render('index', hbsObject);
    })
});


//render new user form
router.get('/users/new', function(req,res) {
  res.render('users/new');
});

router.get('/users/sign-in', function(req,res) {
  res.render('users/sign_in');
});

router.get('/users/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/users/login', function(req, res) {
  User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {
    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        if (result == true){
          //make session

          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;
          req.session.username = user.username;

          res.redirect('/facts');
        }
    });
  })
});

router.post('/users/create', function(req,res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password_hash: hash,
        phone: req.body.phone,
        countrycode: req.body.countrycode
      }).then(function(user){

        req.session.logged_in = true;
        req.session.user_id = user.id;
        req.session.user_email = user.email;
        req.session.username = user.username;
        res.redirect('/facts')
      });
    });
  });
});

module.exports = router;
