var express = require('express');
var models = require('../models');
var Fact = require('../models/Fact.js');
var User = require('../models/User.js');
var Category = require('../models/Category.js');
var texter = require('../config/sms_message'); //
var passwords = require('../config/passwords'); //
var session = require('express-session');
var router = express.Router();
var bcrypt = require('bcryptjs');

//render user sign up page/form
router.get('/users/new', function(req,res) {
  res.render('users/new');
});

//render user sign in page/form
router.get('/users/sign-in', function(req,res) {
  res.render('users/sign_in');
});

//render user to home page when signing out
router.get('/users/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/home');
  });
});

//create new user
router.post('/users/create', function(req,res) {
  models.User.findAll({
    where: {$or: [{email: req.body.email}, {username: req.body.username}]}
  }).then(function(users) {
    // res.redirect('/home');

    if(users.length > 0) {
      res.send("We already have an account with this username");
    } else {

      //hash brownies man!
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          //i love sequelize :!
          models.User.create({
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
            res.redirect('/users/sign-in');
          });
        });
      });
    }
  });
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/users/login', function(req, res) {
  models.User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        if (result == true){
          console.log("1" + result);

          //make a session, bro
          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;
          req.session.username = user.username;
          req.session.phone = user.phone;
          req.session.countrycode = user.countrycode;
          res.redirect('/home');
        }
          console.log(result);
    });
  });
});




module.exports = router;