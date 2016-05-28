var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var models = require('../models');
var Fact = require('../models/fact.js');
var User = require('../models/User.js');
var Category = require('../models/category.js');
var sequelize = require('../models/index.js');
var texter = require('../config/sms_message'); //require twilio client object
var passwords = require('../config/passwords'); //require twilio passwords
var session = require('express-session');

//takes root and brings it to home route
router.get('/', function(req,res) {
  res.redirect('/home');
});

//displays categories and facts on page
 router.get('/home', function(req,res) {
     var data = {
      user_id: req.session.user_id,
      username: req.session.username,
      email: req.session.user_email,
      logged_in: req.session.logged_in,};
   models.Category.findAll({
   }).then(function(result) {
    data.categories = result;
   models.Fact.findAll({
   }).then(function(result) {
    data.facts = result;
    // console.log(data);
    res.render('index', data);
    });
   });
 });

//post category value of category id
router.post('/categories/subscribe/:id', function(req, res) {
    console.log(req.session);
  if(req.session.logged_in) {
    console.log(req.session.user_id);

    // console.log(sequelize);
    sequelize.sequelize.query('INSERT INTO user_categories (user_id, category_id) VALUES ('+ req.session.user_id + ',' + req.params.id + ');')
   .then(function(categories) {
      console.log(categories);

      res.redirect('/home');
    })
  }else {
    console.log("hello world");
  }
})







module.exports = router;
