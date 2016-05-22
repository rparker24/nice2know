var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var models = require('../models');
var session = require('express-session');
var Fact = require('../models/Fact.js');
var User = require('../models/User.js');
var texter = require('./sms_message'); //require twilio client object
var passwords = require('./passwords'); //require twilio passwords



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
     res.redirect('/')
  })
});

// router.get('/', function(req,res) {
//     res.redirect('/facts')
// });

//render home page as index.handlebars
router.get('/home', function(req,res) {
  res.render('index');
});

//create new user
router.post('/users/create', function(req,res) {
  models.User.findAll({
    where: {$or: [{email: req.body.email}, {username: req.body.username}]}
  }).then(function(users) {
    if(users.length > 0) {
      res.send("We already have an account with this username");
    } else {

      //hash brownies man!
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          //i love sequelize :!
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
            res.redirect('/');
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
          
          //make a session, bro
          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;
          req.session.username = user.username;
          req.session.phone = user.phone;
          req.sesson.countrycode = user.countrycode;
          res.redirect('/home');
        }
    });
  });
});

//post category value of category id
router.post('/categories/fact/:id', function(req, res) {
  if(req.session.logged_in) {

    //some more fact finding joy!
    models.Fact.findAll({
      where: {$and: [{user_id: req.session.user_id}, {category_id: req.params.id}]}
    }).then(function(facts) {

      texter.sendMessage({

          to: "+" + req.session.countrycode + req.session.phone, //'+' + countrycode + phone
          from: passwords.twilioNumber, 
          body: result[randomNum] 

      });
    });
  }
});

      




// router.post('/users/sendMessage', function() {
//   var targetNumber,
//       messageBody
//   if(req.session.logged_in){
//     User.findOne({where:{username: req.session.username}}).then(function(data){
//       targetNumber = data.phone;
//     }).then(function() {
//       //i get a SQL return, i want the string from it
//       messageBody = data.fact;
//     }).then(function() {
//       client.sendMessage({
//       // to: req.session.number,
//         to: targetNumber,
//         from: config.twilioNumber,
//         // body: 'Nice 2 Know Test Text Message.'
//         body: messageBody
//       });
//     });
//   }
// })

module.exports = router;
