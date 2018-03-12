var MongoClient = require('mongodb').MongoClient
var ObjectID =require('mongodb').ObjectId
require('dotenv').config();
//Package Dependencies

var mongoUri = process.env.MONGO_DB_URL;
module.exports= {

"connection":  MongoClient.connect(mongoUri, (error, database) => {
	if (error) return process.exit(1);
	console.log('Connection is okay');
    console.log('Successfully connected to mongodb');
     db = database.db(process.env.MONGO_DB_NAME);
     collection = db.collection(process.env.MONGO_DB_COLLECTION);
    })
    //Connection to mongodb
}