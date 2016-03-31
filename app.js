;
(function () {
  "use strict";

  var express = require('express');
  var requireDir = require('require-dir');
  var bodyParser = require('body-parser'),multer = require('multer'),
  s3 = require('multer-s3');

  var app = express();
  var port = 5000;

  app.use(bodyParser.json());

  var routes = requireDir('./routes');
  for (var i in routes) app.use('/api', routes[i]);

  var upload = multer({
    storage: s3({
      dirname: 'uploads/resume',
      bucket: 's3.amazonaws.com/com.lftechnology.career',
      secretAccessKey: 'qfwQWVUwt768xiDPAlCvUmRsOeFpcXK21HYAccKo',
      accessKeyId: 'AKIAISAQ5F3H2CD42MRA',
      region: 'us-east-1',
      filename: function (req, file, cb) {
        cb(null, Date.now())
      }
    })
  });

  app.post('/upload', upload.array('resume'), function (req, res, next) {
    console.log(res);
    res.send("Uploaded!");
  });




  app.listen(port);
})();
