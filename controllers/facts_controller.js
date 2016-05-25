 var express = require('express');
 var router = express.Router();
 var bcrypt = require('bcryptjs');
 var models = require('../models');
 var Fact = require('../models/Fact.js');
 var User = require('../models/User.js');
 var Category = require('../models/Category.js');
 var texter = require('../config/sms_message'); //require twilio client object
 var passwords = require('../config/passwords'); //require twilio passwords
 var session = require('express-session');



//  router.get('/home', function(req,res) {
//   models.Fact.findAll({}).then(function(result){
//       var hbsFactsObject = {facts : result}
//       res.render('index', hbsFactsObject);
//   });
// });












 module.exports = router;
