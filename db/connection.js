var MongoClient = require('mongodb').MongoClient;
var ObjectID =require('mongodb').ObjectId
var logger = require('../route/logger');
var processor = require('../route/module');

require('dotenv').config();
//Package Dependencies

var mongoUri = process.env.MONGO_DB_URL;
//var mongoClient = new MongoClient(new Server('localhost', 27017));
//db=process.env.MONGO_DB_NAME
var db;


exports.connect =function(callback)
{
    MongoClient.connect(mongoUri, (error, database) => {
	console.log('Connection is okay');
    console.log('Successfully connected to mongodb');
     db = database.db(process.env.MONGO_DB_NAME);
     collection = db.collection(process.env.MONGO_DB_COLLECTION);
     callback(error,collection);
 } )
}


    
    //exports.db = db;


    //Connection to mongodb
//  mongoClient.open(function(error, mongoClient,callback) {
//     if (error){
//                 logger.error("DB error",error)
//                 console.log("cannot connect to database");
//                 var response =processor.dbErrorResponse();
//                 console.log(error.code)
//                 return callback(response);
//             }else{
//                 var db1 = mongoClient.db(process.env.MONGO_DB_NAME);
//                 callback(db1);
//             }
    
   
//   })