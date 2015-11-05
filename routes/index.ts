///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../public/javascripts/ServerCommService.ts'/> 
class ViewRouter {

    static createRouter() {
        var express = require('express');
        var router = express.Router();
		var monk = require('monk');
        /* GET home page. */

        router.get('/', function(req, res, next) {
          res.render('LoginView', { title: 'AirTime' });
        });
        router.get('/RequestView', function(req, res) {
          res.render('RequestView', {title: 'AirTime' });
        });
        router.get('/ResultView', function(req, res) {
		  var results = [{"code": "BHM", "name": "Birmingham-Shuttlesworth International Airport", "temp": "12 Degrees Celcius", "wind": "50 km/h"},
						{"code": "ANC", "name": "Ted Stevens Anchorage International Airport", "temp": "5 Degrees Celcius", "wind": "50 km/h"},
						{"code": "ILG", "name": "New Castle Airport", "temp": "10 Degrees Celcius", "wind": "60 km/h"},
						{"code": "MIA", "name": "Miami International Airport", "temp": "25 Degrees Celcius", "wind": "40 km/h"}]
          res.render('ResultView', {title: 'AirTime', resultsList: results});
        });
        router.get('/MapView', function(req, res) {
          res.render('MapView', {title: 'AirTime' });
        });
        /* GET Userlist page. 
        router.get('/airportlist', function(req, res) {
            var db = req.db;
            var collection = db.get('airports');
            collection.find({},{},function(e,docs){
                    res.render('airportlist', {
        	                "airportlist" : docs
        		    });
               });
        });*/
        return router;
    }
}
module.exports = ViewRouter.createRouter();