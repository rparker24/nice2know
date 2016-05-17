var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/User.js');

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

          res.redirect('/users/sign-in');
        }
    });
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


router.delete('/users/subscribe/:id', function(req, res) {
  if(req.session.logged_in) {

    Fact.findAll({
      where: {$and: [{user_id: req.session.user_id}, {id: req.params.id}]}
        }).then(function(facts) {
              if (facts.length > 0){
                  Cat.destroy({
                      where: { id : req.params.id }
                  }).then(function (result) {
                      res.redirect('/facts');
                  }, function(rejectedPromiseError){
                      console.log(rejectedPromiseError);
                  });
              }else{
                  res.send("sorry you can't delete that cat.");
              }
          });
      }else {
          res.send("sorry you can't do that. You need to be logged in");
      }
  });


module.exports = router;
