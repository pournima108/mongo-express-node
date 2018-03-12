var connection = require('./connection')
var processor = require('../route/module');
var ObjectID =require('mongodb').ObjectId
var logger = require('../route/logger');
//Package Dependencies

db = process.env.MONGO_DB_NAME

module.exports ={
        "insertDocuments": function(req,callback){
            var response={
                "name" : req.body.name,
                "quote" : req.body.quote,
            }
            db.collection('mycollection').save(response, (err, result) => {
                if (err) {
                    logger.error("DB error",err)
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='saved to database';
                var response =processor.getResponse(ObjectID());
                logger.info(message);
                callback(response);
              })

        },
        //Insert Documents

        "queryDocuments": function(req,callback){
            var cursor= db.collection('mycollection').find().toArray(function(err, results) {
                if(err){
                    logger.error("DB error",err)
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='Data from database returned';
                var response =processor.getResponse(results);
                logger.info(message);
                callback(response);
              })
        },
        //Query documents 

        "updateDocuments":function(req,callback){
            var name=req.body.name;
            var quote=req.body.quote;
            var id=req.param.id
            console.log(name);
            console.log(quote);
                db.collection('mycollection')
                .update({'id':req.param.id},
               {
                $set: {
               'name': req.body.name,
               'quote': req.body.quote
                 },
                 }, { sort: {_id: -1},
                     upsert: true },
                 (err, result) => {
                    if(err){
                        logger.error("DB error",err)
                        var response =processor.dbErrorResponse();
                        return callback(response);
                    }
                    message='Data updated';
                    var response =processor.getResponse(message);
                    logger.info(message);
                    callback(response);
                })        
        },
        //Update documents

        "deleteDocuments":function(req,callback){
            var id=req.param.id;
            db.collection('mycollection').remove({
               ' id':req.param.id,
            },(err, result)=>{
                if(err){
                    logger.error("DB error",err)
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                message='Data deleted';
                var response =processor.getResponse(message);
                logger.info(message);
                callback(response);
            })
        }
        //Delete Documents
    }

    