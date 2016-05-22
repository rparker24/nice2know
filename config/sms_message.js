var passwords = require('./passwords');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 

client.sendMessage({

    to: to, //'+' + countrycode + phone
    from: passwords.twilioNumber, 
    body: 'Nice 2 Know Test Text Message.' 

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { 

        console.log(responseData.from); 
        console.log(responseData.body); 

    }
});



module.exports = client;


