///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 

class FBLoginManager {

  constructor(){
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/sprint1db');


    var fbloginmanager = express.FBLoginManager();

        // FaceBook Login Check
    function checkIfInDatabase(id: number) {
      return true;
    }
    function addToDatabase(id: number) {
      return;
    }

    // //POST to Add User Service 
    // router.post('/adduser', function(req, res) {

    // // Set our internal DB variable
    // var db = req.db;

    // // Get our form values. These rely on the "name" attributes
    // var user = new User(req.body.username,req.body.useremail);

    // // Set our collection
    // var collection = db.get('usercollection');

    // // Submit to the DB
    // collection.insert({
    //     "username" : user.getName(),
    //     "email" : user.getEmail(),
    // }, function (err, doc) {
    //     if (err) {
    //         // If it failed, return error
    //         res.send("There was a problem adding the information to the database.");
    //     }
    //     else {
    //         // And forward to success page
    //         res.redirect("userlist");
    //     }
    // });



    module.exports = fbloginmanager;
  }
}
var fbloginmanager = new FBLoginManager();