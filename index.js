var express = require('express');
var Request = require("request");
var bodyParser = require('body-parser');

var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

var db = require('./Db/mongodb');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send(__dirname + "/index.html" );
 })

app.post('/app',function(req,res){
    var result = Routing.insertDocuments(req.body,function(result){
        res.send(result);
    });  
})

app.listen(port);
console.log("Server Running Successfully at port " + port);