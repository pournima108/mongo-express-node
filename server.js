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

app.get('/quotes',function(req,res){
    var response =db.queryDocuments(req,function(result){
        res.send(result);
    })

})

app.post('/quotes',function(req,res){
    var response = db.insertDocuments(req,function(result){
        res.send(result);
    });  
})

app.put('/quotes/:id',function(req,res){
    var response = db.updateDocuments(req,function(result){
        res.send(result);
    });
})

app.delete('/quotes/:id',function(req,res){
    var response = db.deleteDocuments(req,function(result){
        res.send(result);
    });
})

app.listen(port);
console.log("Server Running Successfully at port " + port);