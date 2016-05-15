// Twilio Credentials 
var accountSid = 'ACb9de2218cef1396617095b07870e00af'; 
var authToken = '9a07752be537e110ba3b023daba25c84'; 
var client = require('twilio')(accountSid, authToken);

client.sms.messages.create({

    to:'+12018927991', // Any number Twilio can deliver to // users.phonenumber
    from: '+15005550006', // test number for testing. 
    body: 'Nice 2 Know Test Text Message.' // body of the SMS message //Fact.fact

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // 
        console.log(responseData.body); // 

    }
});
