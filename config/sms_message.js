var passwords = require('./passwords');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var texter;

//this function is executed when a response is received from Twilio
client.sendMessage(texter, function(err, responseData) {
    if (!err) {
        console.log(responseData.from);
        console.log(responseData.body);
    }
});

module.exports = client;

// }, function(err, responseData) { //this function is executed when a response is received from Twilio

//     if (!err) {

//         console.log(responseData.from);
//         console.log(responseData.body);

//     }
// });
//pseudo code
//alter button route to post to backend route
//set up route in button: name="" and value="1", which is the (category (id))
