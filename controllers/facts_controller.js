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
















 module.exports = router;
