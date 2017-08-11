//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    morgan  = require('morgan');
    twitter = require('./twitter.js')
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

/*if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}*/
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
// JUANA TODO USE ENV
  mongoURL='mongodb://admin:admin@mongodb/sampledb';
  if (mongoURL == null) {
    console.log("mongoURL null");
    return;
  }

  var mongodb = require('mongodb');
  if (mongodb == null) {
    console.log("mongodb null");
    return;
  }


  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      console.log("mongo connection error");
      //callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

/*app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  console.log("Getting a / route request");
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});*/

/*app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});*/


//// GET ALL TWEETS
/*app.get('/tweets', function (req, res, next) {
  var dataFromTwitter= twitter.getTweets()
  res.json({msg: dataFromTwitter})
})*/



//POST mobile sensor data
app.post('/membership', function (req, res, next) {
  res.status(200).send('Success');

})

//POST mobile sensor data
app.post('/startrental', function (req, res, next) {
  res.status(200).send('Success');

})

//POST mobile sensor data
app.post('/stoprental', function (req, res, next) {
  res.status(200).send('Success');

})

//GET mobile sensor data
/*app.get('/sensordata', function (req, res, next) {
  //res.json({msg: "No Data"})
  res.status(200).send('Empty Data');
})*/

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

/*initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});*/
initDb();
app.listen(port, ip);
console.log("Server Ready");
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
