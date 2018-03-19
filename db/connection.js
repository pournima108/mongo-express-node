var MongoClient = require('mongodb').MongoClient;
var ObjectID =require('mongodb').ObjectId
var logger = require('../route/logger');
var processor = require('../route/module');

require('dotenv').config();
//Package Dependencies



module.exports=
{
    "connection":MongoClient.connect(process.env.MONGO_DB_URL, (error, database) => {
        if(error){
            logger.error("DB error",error)
            var response =processor.dbErrorResponse();
            console.log("cannot connect");
        }
        else{
	console.log('Connection is okay');
    console.log('Successfully connected to mongodb');
     db = database.db(process.env.MONGO_DB_NAME);
     collection = db.collection(process.env.MONGO_DB_COLLECTION);
        }
 } )
}


    
    