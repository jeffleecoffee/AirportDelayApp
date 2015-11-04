///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 

class FBLoginManager {

  constructor(){
    var express = require('express');
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/sprint1db');


    // FaceBook Login Check
    var collection = db.get('users');
    var allUsers = db.collection.find();
    function checkIfInDatabaseAndAdd(stringId: string) {
      var uid = parseInt(stringId);
      var alreadyUser = false;
      while (allUsers.hasNext()) {
        var user = allUsers.next();
        if (uid === user) {
          alreadyUser = true;
        }
      }
      if (alreadyUser == false) {
        addToDatabase(stringId);
      }
    }
    function addToDatabase(stringId: string) {
      db.collection.insert({
          "uid" : stringId
      })
    }

    module.exports = fbloginmanager;
  }
}
var fbloginmanager = new FBLoginManager();