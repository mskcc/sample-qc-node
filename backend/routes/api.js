var express = require('express');
var quoteRouter = require('./quote');
var reportRouter = require('./report');

var app = express();

app.use('/quote/', quoteRouter);
app.use('/report/', reportRouter);

module.exports = app;
