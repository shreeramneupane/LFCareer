'use strict';

var nodemailer = require('nodemailer');
var fs = require('fs');
var jade = require('jade');
var path = require('path')

var smtpConfig = require('../config/smtpConfig');
var defaultEmail = smtpConfig.defaultEmail;

var transporter = nodemailer.createTransport(smtpConfig['config']);

module.exports = {
  messageToApplicant: function (applicant) {
    var template = process.cwd() + '/mailers/applied_successfully_applicant_template.jade';

    fs.readFile(template, 'utf8', function (err, file) {
      if (err) {
        console.log(err, "Can't find template to send email.");
      }
      else {
        var compiledTmpl = jade.compile(file, {filename: template});
        var context = {title: 'Express'};
        var html = compiledTmpl(context);

        var mailOptions = {
          from: "Leapfrog Career <" + defaultEmail + ">",
          to: applicant.email,
          subject: 'Successfully applied to Leapfrog Technology.',
          html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });
      }
    });
  }
};

