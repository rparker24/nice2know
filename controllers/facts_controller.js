 var express = require('express');
 var router = express.Router();
 var bcrypt = require('bcryptjs');
 var models = require('../models');
 var Fact = require('../models/Fact.js');
 var User = require('../models/User.js');
 var sequelize = require('../models/index.js');
 var Category = require('../models/Category.js');
 var texter = require('../config/sms_message'); //require twilio client object
 var passwords = require('../config/passwords'); //require twilio passwords
 var session = require('express-session');



 //select * from facts where category_id = user_categories.category_id AND user_categories.user_id = req.session.user_id

 


 router.post('/facts/send-cool-fact/:id', function(req, res) {
    console.log('session: ' + req.session);
   if(req.session.logged_in) {
    console.log('user id: ' + req.session.user_id);

     sequelize.sequelize.query('SELECT * FROM facts INNER JOIN user_categories ON facts.category_id=user_categories.category_id AND user_categories.user_id='+req.session.user_id+';').then(function(facts) {
      console.log(facts[0][0].fact);

      texter.sendMessage({

        to: '+12018927991',  // "+" + req.session.countrycode + req.session.phone,
        from: passwords.twilioNumber, 
        body: facts[0][0].fact//result[randomNum] 
      });
     });
     // console.log(sequelize);
       res.redirect('/home');
   }else {
     console.log("hello world");
   }
 })











 module.exports = router;
