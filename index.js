var express = require('express');
var Request = require("request");
var bodyParser = require('body-parser');
var route =require('./Routes/routes');
var db = require('./Db/mongodb');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);
app.listen(port);
console.log("Server Running Successfully at port " + port);
module.exports = app;