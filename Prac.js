var express = require('express');
var Request = require("request");
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/mydb';
//const dbName = 'mydb'; 


MongoClient.connect(mongoUri, (error, database) => {
	if (error) return process.exit(1);
	console.log('Connection is okay');
    console.log('Successfully connected to mongodb');
     db = database.db('mydb');
   collection = db.collection('mycollection');
   //console.log(collection);
	 // database.close();
    });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })


app.post('/quotes', (req, res) => {
    var response={
        "name" : req.body.name,
        "quote" : req.body.quote,
        "error" : false,
        "status_code": 200,
        "active" : true
    }
    console.log(response);
    res.send(response);
    //console.log(response);
    db.collection('mycollection').save(response, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
       // res.redirect('/')
      })

  })

  app.get('/quotes2', (req, res) => {
   var cursor= db.collection('mycollection').find().toArray(function(err, results) {
      console.log(results)
    })
    var json=JSON.parse(cursor);
    res.send(json);
  })


app.listen(port);
console.log("Server Running Successfully at port " + port);