var connection = require('./connection')
var processor = require('../route/module');
var ObjectID =require('mongodb').ObjectId
var logger = require('../route/logger');


//Package Dependencies


db=process.env.MONGO_DB_NAME
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
                if(results[0] == null){
                    var message = "No documents available";
                    var response =processor.getPageError(message);
                    logger.warn(message);
                    return callback(response)
                
                  }else{
                message='Data from database returned';
                var response =processor.getResponse(results);
                logger.info(message);
                callback(response);
                  }
        
              })
        },
        //Query documents 
        
        "querySingleDocument": function(req,callback){
            var id = req.params.id;
            var query={'id' : id};
            //var id=JSON.stringify(_id)
            console.log(id)
            var options={$sort:id};
          
            db.collection('mycollection').findOne({_id : ObjectID(id)},(err, results) =>{
                console.log(results)
                if(err){
                    logger.error("DB error",err)
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                if(results == null){
                    var message = "Id was not found";
                    var response =processor.getPageError(message);
                    logger.error(message);
                    return callback(response);
                }
                message='Data from database returned';
                var response =processor.getResponse(results);
                logger.info(message);
                callback(response);
              })
        },
    
        //Query to find single document

        "updateDocuments":function(req,callback){
            var name=req.body.name;
            var quote=req.body.quote;
            var id=req.params.id
            console.log(id);
                db.collection('mycollection')
                .findOneAndUpdate({_id:ObjectID(id)},
               {
                $set: {
               'name': req.body.name,
               'quote': req.body.quote
                 },
                 },
                 (err, results) => {
                    if(err){
                        logger.error("DB error",err)
                        var response =processor.dbErrorResponse();
                        return callback(response);
                    }
                    if(results.value == null){
                        var message = "Id was not found";
                        var response =processor.getPageError(message);
                        logger.warn(message);
                        return callback(response);
                      }
                      else{
                        var  message='Data updated';
                        var response =processor.getResponse(message);
                        logger.info(message);
                        callback(response);
                      }
                }) ;       
        },
        //Update documents

        "deleteDocuments":function(req,callback){
            var id=req.params.id;
            console.log(id)
            db.collection('mycollection').findOneAndDelete({
                _id:ObjectID(id),
            },(err,results)=>{
                if(err){
                    logger.error("DB error",err)
                    var response =processor.dbErrorResponse();
                    return callback(response);
                }
                if(results.value == null){
                    var message = "Id was not found";
                    var response =processor.getPageError(message);
                    logger.warn(message);
                    return callback(response)
                
                  } else{
                       var message="data deleted";
                        var response =processor.getResponse(message)
                        logger.info(message);
                        callback(response);
                  }  
            });
        }
        //Delete Documents
    }
