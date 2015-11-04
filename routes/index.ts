///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
class ViewRouter {

    static createRouter() {
        var express = require('express');
        var router = express.Router();

        function checkAuthentication(request, response, next) {
            if (request.isAuthenticated()){
                return next();
            }
            else{
                response.redirect('/?loginPrompt=1');
            }
        }
        /* GET home page. */

        router.get('/', function(req, res, next) {
          res.render('LoginView', { title: 'AirTime', user: req.user });
          console.log(req.user);
        });
        router.get('/RequestView', checkAuthentication, function(req, res) {
          res.render('RequestView', {title: 'AirTime' });
        });
        router.get('/ResultView', function(req, res) {
          res.render('ResultView', {title: 'AirTime' });
        });
        router.get('/MapView', function(req, res) {
          res.render('MapView', {title: 'AirTime' });
        });
        /* GET Userlist page. */
        router.get('/airportlist', function(req, res) {
            var db = req.db;
            var collection = db.get('airports');
            collection.find({},{},function(e,docs){
                    res.render('airportlist', {
        	                "airportlist" : docs
        		    });
               });
        });
        return router;
    }
}
module.exports = ViewRouter.createRouter();