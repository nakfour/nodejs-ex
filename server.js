//  OpenShift sample Node application
var express = require('express'),
    bodyParser = require('body-parser'),
    fs      = require('fs'),
    cors = require('cors')
    app     = express(),
    eps     = require('ejs'),
    dbManager = require ('./mongodbmanager')
    morgan  = require('morgan');
   //twitter = require('./twitter.js')
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

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

dbManager.initDb(function(err) {
    if(err!=null) {
        console.log(err);
    } else
    {
        /*dbManager.createMembership (function(err) {
          console.log(err);
        });*/
        console.log("Database Inialization Success");
    }
});
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

// Enable CORS
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

//POST mobile sensor data
app.post('/membership', function (req, res, next) {
  console.log("Received post membership with data: ");
  dbManager.createMembership(req.body,function(err) {
    if(err) {
        res.status(400).send('Bad Data');
    }
    else {
        res.status(200).send('Success');
    }
  });


})

//POST mobile sensor data
app.post('/startrental', function (req, res, next) {
  console.log("Received post startrental: ");
  dbManager.createRental(req.body,function(err) {
    if(err) {
        res.status(400).send('Bad Data');
    }
    else {
        res.status(200).send('Success');
    }
  });
})

//POST mobile sensor data
app.post('/stoprental', function (req, res, next) {
  console.log("Received post stoprental with data: ");
  dbManager.updateRental(req.body,function(err) {
    if(err) {
        res.status(400).send('Bad Data');
    }
    else {
        res.status(200).send('Success');
    }
  });

})

//POST mobile sensor data
app.post('/touch', function (req, res, next) {
  console.log("Received post for touch data: ");
  dbManager.createTouch(req.body,function(err) {
    if(err) {
        res.status(400).send('Bad Data');
    }
    else {
        res.status(200).send('Success');
    }
  });

})

//GET request for deleting all touch data
// Response is json string as expected by web portal
app.get('/touchdeleteall', function (req, res, next) {
  console.log("Received Get for deleting all Touch data ");
  dbManager.deleteAllTouch(function(err) {
    if(err) {
        res.status(400).send(JSON.stringify({ error: 'Bad Data' }));
    }
    else {
        res.status(200).send(JSON.stringify({ response: 'success' }));
    }
  });

})



app.get('/membership', function (req, res, next) {
  //res.json({msg: "No Data"})
  res.status(200).send('Empty Data');
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


app.listen(port, ip);
console.log("Server Ready");
console.log('Server running on http://%s:%s', ip, port);

function shutdown () {
    console.log( "Closing Database.");
    dbManager.closeDB();
    process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app ;
