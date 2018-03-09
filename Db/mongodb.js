var MongoClient = require('mongodb').MongoClient
var ObjectID =require('mongodb').ObjectId
var fs=require('fs');
var processor = require('../Routes/module');
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
	  //database.close();
    });
    
    module.exports ={
        "insertDocuments": function(req,callback){
            var response={
                "name" : req.body.name,
                "quote" : req.body.quote,
            }
            //console.log(response);
            db.collection('mycollection').save(response, (err, result) => {
                if (err) {
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='saved to database';
                var response =processor.getResponse(message);
                //console.log(result);
                callback(response);
              })

        },

        "queryDocuments": function(req,callback){
            var cursor= db.collection('mycollection').find().toArray(function(err, results) {
                if(err){
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='Data from databse returned';
                var response =processor.getResponse(message);
                //console.log(result);
                callback(results);
              })
        },

        "updateDocuments":function(req,callback){
            db.collection('mycollection')
            .findOneAndUpdate({id: req.param.id}, {
            $set: {
           name: req.body.name,
           quote: req.body.quote
             }
             }, {
            sort: {_id: -1},
             upsert: true
            }, (err, result) => {
                if(err){
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='Data updated';
                var response =processor.getResponse(message);
                //console.log(result);
                callback(response);
            })
        },

        "deleteDocuments":function(req,callback){
            db.collection('mycollection').findOneAndDelete({
                name:req.body.name
            },(err, result)=>{
                if(err){
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='Data deleted';
                var response =processor.getResponse(message);
                //console.log(result);
                callback(response);
            })
        }
    }

    