var express = require('express');
var app = express();
var port = 5000;

app.use('/api',require('./routes'));

app.listen(port);
