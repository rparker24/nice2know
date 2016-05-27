var passwords = {};

passwords.port = process.env.PORT || 3000;

passwords.accountSid = process.env.TWILIO_ACCOUNT_SID; 
passwords.authToken = process.env.TWILIO_AUTH_TOKEN;   
passwords.authyKey = process.env.AUTHY_API_KEY; 
passwords.twilioNumber = process.env.TWILIO_NUMBER;  



module.exports = passwords;
