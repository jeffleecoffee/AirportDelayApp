///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 

class FBLoginManager {

  constructor(){
    var express = require('express');
    var passport = require('passport');
    var passportfb = require('passport-facebook');
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/sprint1db');

    passport.use(new FacebookStrategy({
      clientID: '1646694312239569',
      clientSecret: '01458760d8b21ff2649a8d029b480f57',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));


    module.exports = fbloginmanager;
  }
}
var fbloginmanager = new FBLoginManager();