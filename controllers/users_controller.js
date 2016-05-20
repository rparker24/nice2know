var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User.js');
var session = require('express-session');
var Fact = require('../models/Fact.js');
// var config = require('./config');
// var client = require('../js/sms_message.js');


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

router.get('/', function(req,res) {
    res.redirect('/facts')
});

router.get('/home', function(req,res) {

    Fact.findAll({}).then(function(result){
        var hbsObject = {fact : result}
            res.render('index', hbsObject);
    })
});

router.post('/users/create', function(req,res) {
  User.findAll({
    where: {$or: [{email: req.body.email}, {username: req.body.username}]}
  }).then(function(users) {
    if(users.length > 0) {
      res.send("We already have an account with this username");
    } else {

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
            res.redirect('/');
          });
        });
      });   
    }
  });
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
          req.session.phone = user.phone;
          req.sesson.countrycode = user.countrycode;
          res.redirect('/home');
        }
    });
  })
});

//Select text and send message 
router.post('/:user_id/facts/:fact_id', function(req, res) {
  var targetNumber,
      messageBody;
    if(req.session.logged_in) {

      sequelize.query("SELECT * FROM facts WHERE id=2", {model: Fact}).then(
        function(facts) {
          console.log(facts[0]);
        })
      // sequelize.query('SELECT * FROM facts LEFT JOIN categories AS cats ON cats.id = facts.category_id LEFT JOIN subscriptions AS subs ON subs.category_id = cats.id WHERE subs.user_id = '+req.session.user_id, {model: Fact}).then(function(facts) {
          //code
          // console.log(facts);
          // client.sendMessage({

          //     to: "+" + user.countrycode + user.phone, 
          //     from: config.twilioNumber, 
          //     body: facts.fact 

          // }, function(err, responseData) { //this function is executed when a response is received from Twilio

          //     if (!err) { 
          //         console.log(responseData.from); 
          //         console.log(responseData.body); 
          //     }
          // });
        // });
      


      // sequelize.query('SELECT * FROM facts LEFT JOIN categories AS cats ON cats.id = facts.category_id LEFT JOIN subscriptions AS subs ON subs.category_id = cats.id LEFT JOIN user_facts AS ufs ON ufs.fact_id = facts.id WHERE subs.user_id = ' +req.session.user_id+ 'AND ufs.user_id =' +req.session.user_id+ 'AND facts.id != ufs.fact_id').then(function(facts) {
      //     //code

      // });
        
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
