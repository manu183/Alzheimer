var express = require('express');
var app = express();
require('dotenv').config()
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// get all information for a certain patient
app.get('/patients/:id', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.findOne({_id: new ObjectId(req.params.id)}, function(err,result){
            res.send(result);
        });
        client.close();
     });
});

// get all questions for a certain patient
app.get('/patients/:id/questions', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.findOne({_id: new ObjectId(req.params.id)}, function(err,result){
            res.send(result["questions"]);
        });
        client.close();
     });
});

// get all recommendations for a certain patient
app.get('/patients/:id/recommendations', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.findOne({_id: new ObjectId(req.params.id)}, function(err,result){
            res.send(result);
        });
        client.close();
     });
});

// get all history for a certain patient
app.get('/patients/:id/history', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.findOne({_id: new ObjectId(req.params.id)}, function(err,result){
            res.send(result["history"]);
        });
        client.close();
     });
});

// get all patients' information
app.get('/patients', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.find({}).toArray(function(err,arr){
            res.send(arr);
        });
        client.close();
     });
});

// add a new status value to a certain patient's data
app.post('/patients/:id/history/:value', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.updateOne({_id: new ObjectId(req.params.id)}, { $push : { history : req.params.value} },
        function( err, result ) {
            if ( err ) throw err;
            res.send("Done");
        });
        client.close();
     });
});

// add a new question for a certain patient
app.post('/patients/:id/questions/:value', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.updateOne({_id: new ObjectId(req.params.id)}, { $push : { questions : req.params.value} },
        function( err, result ) {
            if ( err ) throw err;
            res.send("Done");
        });
        client.close();
     });
});

// add a new recommendation for a certain patient
app.post('/patients/:id/recommendations/:value', function(req, res) {
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true },  function(err, client) {
        const collection = client.db("calhacks-alzheimer").collection("patients");
        collection.updateOne({_id: new ObjectId(req.params.id)}, { $push : { recommendations : req.params.value} },
        function( err, result ) {
            if ( err ) throw err;
            res.send("Done");
        });
        client.close();
     });
});

// run the app
app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080 + '!');
});