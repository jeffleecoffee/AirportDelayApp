///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var AuthRouter = (function () {
    function AuthRouter() {
        var express = require('express');
        var passport = require('passport');
        var FacebookStrategy = require('passport-facebook').Strategy;
        var mongo = require('mongodb');
        var monk = require('monk');
        var facebookCallbackUrl;
        var db;
        if (process.env.NODE_ENV) {
            db = monk(process.env.MONGO_URL, {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PASSWORD
            });
            facebookCallbackUrl = process.env.URL + "/auth/facebook/callback";
        }
        else {
            db = monk('localhost:27017/sprint1db');
            facebookCallbackUrl = "http://localhost:3000/auth/facebook/callback";
        }
        var router = express.Router();
        var users = db.get('users');
        passport.serializeUser(function (user, done) {
            done(null, user.uid);
        });
        passport.deserializeUser(function (id, done) {
            users.findOne({ uid: id }, function (err, doc) {
                done(err, { uid: doc.uid }); //make user object
            });
        });
        passport.use(new FacebookStrategy({
            clientID: '1646694312239569',
            clientSecret: '01458760d8b21ff2649a8d029b480f57',
            callbackURL: facebookCallbackUrl,
            enableProof: false
        }, function (accessToken, refreshToken, profile, done) {
            users.update({ uid: profile.id }, { uid: profile.id }, { upsert: true }, //these should be in a user service
            function (err, numberOfDocumentsUpdated, documents) {
                users.findOne({ uid: profile.id }, function (err, doc) {
                    done(err, { uid: doc.uid }); //make user object
                });
            });
        }));
        router.get('/facebook', passport.authenticate('facebook'));
        router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
        router.get('/logout', function (req, res) {
            req.session.destroy(function (err) {
                req.logOut();
                res.redirect('/');
            });
        });
        module.exports = router;
    }
    return AuthRouter;
})();
var auth = new AuthRouter();
