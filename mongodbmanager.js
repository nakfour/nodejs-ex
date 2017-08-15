/******************************************************************************************/
/*** A module that provides CRUD to mongodb ******/
/******************************************************************************************/

var db = null,
    mongoURLLabel = "",
    dbDetails = new Object();

/*var initDb = function(callback) {
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
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});*/


module.exports =  {
    initDb:function(callback) {
    // JUANA TODO USE ENV
      mongoURL='mongodb://admin:admin@mongodb/sampledb';
      if (mongoURL == null) {
        console.log("mongoURL null");
        callback("mongoURL null");
        return;
      }

      var mongodb = require('mongodb');
      if (mongodb == null) {
        console.log("mongodb null");
        callback("mongodb null");
        return;
      }


      mongodb.connect(mongoURL, function(err, conn) {
        if (err) {
          console.log("mongo connection error");
          callback(err);
          return;
        }

        db = conn;
        dbDetails.databaseName = db.databaseName;
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
        callback(null);
        return;
      });

    },
    createMembership:function(callback) {
        console.log("createMembership");
        console.log("db: " + db);
        if(db!=null) {
            db.collection('bikerentalmembership').insertOne(
            {
                  "firstname" : "testfirstname",
                  "lastname" : "testlsatname",
                  "gender" : "0",
                  "birthyear" : "1988"
            }, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the bikerentalmembership collection.");
                callback(null);
              });
              db.close();
        } else
            callback("Connection to database error");
    },

    createRental: function() {
        console.log("createRental");
        return;
    },

    updateRental: function() {
        console.log("updateRental");
        return;
    },

    readAllRental: function() {
        console.log("readAllRental");
        return;
    },
};