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
        "id" : req.param.id,
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
   var cursor= [];
    db.collection('mycollection').find().toArray(function(err, results) {
      console.log(results)
    })
    var json=JSON.stringify(cursor)
    console.log(json);
    //var json=JSON.parse(cursor);
    // var jsonData = JSON.parse(cursor);
    // console.log(jsonData)
    // for (var i = 0; i < jsonData.counters.length; i++) {
    // var counter = jsonData.counters[i];
    // console.log(counter.counter_name);
    // }
    res.send(cursor);
  })

 


app.put('/quotes3/:id', (req, res) => {
  db.collection('mycollection')
  .findOneAndUpdate({id: req.param.id}, {
    $set: {
      id:req.param.id,
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
    console.log(result)
  })
})

  

	app.delete('/quotes4/:id', (req, res)=>{
		db.collection('mycollection').findOneAndDelete({
			id: req.param.id
		},(err, result)=>{
			if(err) return req.send(500, err)
        res.send({message: 'data is deleted'})
        console.log(result);
		})
	})




app.listen(port);
console.log("Server Running Successfully at port " + port);