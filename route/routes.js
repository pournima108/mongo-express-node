var express = require('express');
var app = express();
var router = express.Router();
var db = require('../db/mongodb');
var path = require('path');
var processor =require('./module')

router.get('/', function(req, res) {
    res.send("App Working!");
  });

  router.route('/api/v1/quotes')

  .get(function(req, res) {
    var response = db.queryDocuments(req, function(response) {
        res.send(response); 
    });
  })

  .post(function(req, res) {
    var response = db.insertDocuments(req, function(response) {
        res.send(response);  
    });
  })
  router.route('/api/v1/quotes/:id')
  
  .put(function(req, res) {
     var response = db.updateDocuments( function(response) {
        res.send(response);
     });
  })

  .delete(function(req, res) {
    var response = db.deleteDocuments(req, function(response) {
        res.send(response);
    });
  });

router.all('*', function(req, res) {
    var message = "Invalid url.";
    res.status(404).send(processor.getPageError(message));
});//handle invalid url.

module.exports = router;