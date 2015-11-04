///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var AuthRouter = (function () {
    function AuthRouter() {
        var express = require('express');
        var router = express.Router();
        var passport = require('passport');
        var FacebookStrategy = require('passport-facebook').Strategy;
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/sprint1db');
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function (id, done) {
            // User.findById(id, function(err, user) {
            done(null, id);
            // });
        });
        passport.use(new FacebookStrategy({
            clientID: '1646694312239569',
            clientSecret: '01458760d8b21ff2649a8d029b480f57',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            enableProof: false
        }, function (accessToken, refreshToken, profile, done) {
            // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return done(null, profile);
            // });
        }));
        router.get('/facebook', passport.authenticate('facebook'));
        router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
        module.exports = router;
    }
    return AuthRouter;
})();
var auth = new AuthRouter();
