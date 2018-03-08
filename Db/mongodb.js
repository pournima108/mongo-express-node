var MongoClient = require('mongodb').MongoClient
var FileModels = require('./FileModels');
var fs=require('fs');
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
	  database.close();
    });
    
    module.exports ={
        "insertDocuments": function(db,callback){
            fs.readFile(FileModels,function(err,data){
                if (err) throw err;
                console.log(data);
                var json =JSON.parse(data);
            })
            collection.insert(data,function(err,doc){
                if (err) throw err;
                console.log(doc);
            })

        }
    }

    