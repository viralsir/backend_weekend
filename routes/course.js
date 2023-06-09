var express = require('express');
var router = express.Router();
// load the module and create the reference of mongodb module
let mongoClient = require("mongodb").MongoClient;
//url Details
let url ="mongodb://localhost:27017";
const dbName = 'ARHAMDB';
const collectionName = 'COURSE';
const multer=require('multer')
const imageUpload=multer({
    dest:'public/images',
})


/*
       Rest api / crud (create ,read ,update ,delete) operation /

       create  post  : new record (document) has been saved into collection(table).
       read    get   : view or get all the documents(record,row,data) from the collection(table)
       update  put   : update the document(recrod,row,data) into collection(table).
       delete  delete :  delete the document (record,row,data) from the collection(table).

 */


/* GET all course data  */
router.get('/', function(req, res, next) {
    //res.send('course router get methods response.');
    // Connect to the database
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Retrieve all documents from the collection
        collection.find({}).toArray(function(err, docs) {
            if (err) throw err;

            // Send the retrieved documents back as a response
            res.send(docs);

            // Close the database connection
            client.close();
        });
    });



});

/* create new course row in collection */
/*
router.post('/', imageUpload.single('image'), function(req, res, next) {
    // res.send('course router post methods response.');

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);
            req.body["file"]=req.file;
            db.collection(collectionName).insertOne(req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record inserted successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in inserting records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })


});
*/



router.post('/',function(req, res, next) {
    // res.send('course router post methods response.');
   console.log("inside post");
    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);
            //req.body["file"]=req.file;
            db.collection(collectionName).insertOne(req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record inserted successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in inserting records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in conneting database")
        }

    })


});







/*
    update record from collection
 */

router.put('/', function(req, res, next) {
    //res.send('course router put methods response.');

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).replaceOne({"id":req.body.id},req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record updated successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in updating  records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in updating records")
        }

    })
});

/*
    delete the record
 */
router.delete('/:id', function(req, res, next) {
    //res.send('course router delete methods response.');
    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);
            console.log(req.body);
            console.log(req.params.id)
            db.collection(collectionName).deleteOne({"id":parseInt(req.params.id)},(err,result)=> {
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present")
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })


});




module.exports = router;
