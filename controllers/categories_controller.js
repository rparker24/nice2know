var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var models = require('../models');
var Fact = require('../models/Fact.js');
var User = require('../models/User.js');
var Category = require('../models/Category.js');
var sequelize = require('../models/index.js');
var texter = require('../config/sms_message'); //require twilio client object
var passwords = require('../config/passwords'); //require twilio passwords
var session = require('express-session');


//displays categories and facts on page load
//  router.get('/home', function(req,res) {
//   models.Category.findAll({}).then(function(result){
//       var hbsFactsObject = {categories : result}
//       res.render('index', hbsFactsObject);
//   });
// });

 router.get('/home', function(req,res) {
     var data = {};
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

 //  router.get('/home', function(req,res) {
 //   models.Fact.findAll({}).then(function(result){
 //       var hbsFactsObject = {facts : result}
 //       res.render('index', hbsFactsObject);
 //   });
 // });
  

// app.get('/route', function( req, res) {
//     var data = {};
    
//     QUERY1 (result){
//         data.table1 = result
//     }
    
//     QUERY2 (result){
//         data.table2 = result
//     }
    
//     res.render('page', data)
// })

//select * from facts where category_id = user_categories.category_id AND user_categories.user_id = req.session.user_id

//post category value of category id
router.post('/categories/subscribe/:id', function(req, res) {
    console.log(req.session);
  if(req.session.logged_in) {
    console.log(req.session.user_id);

    // console.log(sequelize);
    sequelize.sequelize.query('INSERT INTO user_categories (user_id, category_id) VALUES ('+ req.session.user_id + ',' + req.params.id + ');')
   .then(function(categories) {
      console.log(categories);
      // texter.sendMessage({

      //     to: "+" + req.session.countrycode + req.session.phone, 
      //     from: passwords.twilioNumber, 
      //     body: "hi"               //result[randomNum] 

      // })
      res.redirect('/home');
    })
  }else {
    console.log("hello world");
  }
})







module.exports = router;
