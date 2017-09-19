/******************************************************************************************/
/*** A module that provides CRUD to mongodb ******/
/******************************************************************************************/
var assert = require('assert');

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
    closeDb:function() {
        console.log("Closing Database");
        db.close();
    },
    createMembership:function(membershipObject,callback) {
        console.log("createMembership");
        console.log("db: " + db);
        if(db!=null) {
            db.collection('bikerentalmembership').insertOne(
            {
                  "firstname" : membershipObject.firstname,
                  "lastname" : membershipObject.lasttname,
                  "gender" : membershipObject.gender,
                  "birthyear" : membershipObject.birthyear
            }, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the bikerentalmembership collection.");
                //db.close();
                callback(null);
              });

        } else
            callback("Connection to database error");
    },

    createRental: function(rentalObject,callback) {
        console.log("createRental");
        console.log(rentalObject)
        console.log("db: " + db);
        if(db!=null) {
              db.collection('bikerental').insertOne(
              {
                     "bikeid" : rentalObject.bikeid,
                     "usertype" : rentalObject.usertype,
                     "gender" : rentalObject.gender,
                     "birthyear" : rentalObject.birthyear,
                     "starttime" : rentalObject.starttime,
                     "startstationid" : rentalObject.startstationid,
                     "startstationname" : rentalObject.startstationname,
                     "startstationlat" : rentalObject.startstationlat,
                     "startstationlon" : rentalObject.startstationlon,
                     "mobileos" : rentalObject.mobileos

               }, function(err, result) {
                       assert.equal(err, null);
                       console.log("Inserted a document into the bikerental collection.");
                      // db.close();
                       callback(null);
               });

        } else
           callback("Connection to database error");
    },

    updateRental: function(rentalObject,callback) {
        console.log("updateRental");
        if(db!=null) {
                var myquery = { bikeid: rentalObject.bikeid };
                var newvalues = { $set: { "endtime" : rentalObject.endtime,
                                          "endstationid" : rentalObject.endstationid,
                                          "endstationname" : rentalObject.endstationname,
                                          "endstationlat" : rentalObject.endstationlat,
                                          "endstationlon" : rentalObject.endstationlon }
                                 };
                db.collection("bikerental").updateOne(myquery, newvalues,
                function(err, result) {
                    assert.equal(err, null);
                    console.log("Updated document in the bikerental collection.");
                    //console.log(result);
                    //db.close();
                    callback(null);
                });

          } else
             callback("Connection to database error");

    },

    readAllRental: function() {
        console.log("readAllRental");
        return;
    },
};