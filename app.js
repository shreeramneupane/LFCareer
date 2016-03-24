var express = require('express');
var app = express();

app.use(require('./routes'));

var port = 5000;

app.listen(port, function (err) {
    console.log('running server on port ' + port)
});