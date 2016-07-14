var env = process.env.NODE_ENV || 'development';

var mailerConfig = "../config/secret_config/mailer.json";
var config = require(mailerConfig)[env];

module.exports = {
  config: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: config["username"],
      pass: config["password"]
    }
  },
  
  defaultEmail: config["default_email"]
  
};