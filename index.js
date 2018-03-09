var express = require('express');
var Request = require("request");
var bodyParser = require('body-parser');
var path = require('path');
//Package Dependencies

var route =require('./route/routes');
var db = require('./db/mongodb');
//Local Dependencies

var app = express();
//Express Object Instantiated

var port = process.env.PORT || 3000;
//Dynamic PORT allocation

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Express Config

app.use('/', route);
//Routes

app.listen(port);
console.log("Server Running Successfully at port " + port);
//Listener

module.exports = app;