var express = require('express');
var app = express();
var router = express.Router();
var db = require('../db/mongodb');
var path = require('path');
var morgan = require('morgan');
var processor =require('./module')
//Package Dependencies

router.get('/', function(req, res) {
    res.send("App Working!");
  });

  router.route('/api/v1/quotes')
//Route to specific url

  .get(function(req, res) {
    var response = db.queryDocuments(req, function(response) {
        res.send(response); 
    });
  })
//Get the data

  .post(function(req, res) {
    var response = db.insertDocuments(req, function(response) {
        res.send(response);  
    });
  })
  //Post the data 
  router.route('/api/v1/quotes/:id')
  

  .get(function(req, res) {
    var response = db.querySingleDocument(req, function(response) {
        res.send(response); 
    });
  })
  //Get the data
  .put(function(req, res) {
     var response = db.updateDocuments(req, function(response) {
        res.send(response);
     });
  })
//Put data

  .delete(function(req, res) {
    var response = db.deleteDocuments(req, function(response) {
        res.send(response);
    });
  });
//Delete data

router.all('*', function(req, res) {
    var message = "Invalid url.";
    res.status(404).send(processor.getPageError(message));
});//handle invalid url.

module.exports = router;