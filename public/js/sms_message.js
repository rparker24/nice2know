// Twilio Credentials 

var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// console.log(process.env.TWILIO_ACCOUNT_SID);
client.sendMessage({

    to:'+12018927991', // Any number Twilio can deliver to 
    from: '+15005550006', // test number for testing. Actual number is in Twilio account
    body: 'Nice 2 Know Test Text Message.' // body of the SMS message 

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { 

        console.log(responseData.from); 
        console.log(responseData.body); 

    }
});

module.exports = client;
