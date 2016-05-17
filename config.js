var config = {};

config.port = process.env.PORT || 3000;

config.accountSid = process.env.TWILIO_ACCOUNT_SID; 
config.authToken = process.env.TWILIO_AUTH_TOKEN;   
config.authyKey = process.env.AUTHY_API_KEY; 
config.twilioNumber = process.env.TWILIO_NUMBER;  

module.exports = config;


