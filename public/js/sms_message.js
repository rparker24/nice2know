// Twilio Credentials 

var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.sendMessage({

    to:'+12018927991', // Any number Twilio can deliver to 
    from: '+15005550006', // test number for testing. 
    body: 'Nice 2 Know Test Text Message.' // body of the SMS message 

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // 
        console.log(responseData.body); // 

    }
});

module.exports = client;
