///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../public/javascripts/ServerCommService.ts'/> 
///<reference path='../public/javascripts/Airport.ts'/> 
///<reference path='../public/javascripts/BuildMap.ts'/> 

class ViewRouter {

    static createRouter() {
        var express = require('express');
        var router = express.Router();
		var monk = require('monk');
		var airports = new Array();
        function checkAuthentication(request, response, next) {
            if (request.isAuthenticated()){
                return next();
            }
            /*else{
                response.redirect('/');
            }*/
        }
        /* GET home page. */

        function obtainAirports() {
		    console.log("obtaining airports");
			//scs = "potato";
			console.log(scs);
			scs.parseCodes(function () {this.airports = this.scs.getAirports();});
        }

        router.get('/', function(req, res, next) {
          res.render('LoginView', { title: 'AirTime', user: req.user });
        });
        router.get('/RequestView', checkAuthentication, function(req, res) {
		  var serverCommInstance = new ServerCommService(req);
		  var db = req.db;
		  //console.log(db);
		  //console.log(req);
		  //console.log(serverCommInstance);
		  serverCommInstance.parseCodes(function () { this.airports = serverCommInstance.getAirports(); console.log(this.airports); });
		  //console.log(airports);
          res.render('RequestView', {title: 'AirTime', map: 'test' });
        });

        router.post('/savecodes', function(req, res) {
            var departure = req.body.startcode;
            var arrival = req.body.endcode;
            
            var db = req.db;
            var testColl = db.get("Htest");
            testColl.update(
              {uid: "Test123"},
              {$push: {history: departure}});
            testColl.update(
              {uid: "Test123"},
              {$push: {history: arrival}});

            res.redirect("ResultView");
        })
        router.get('/ResultView', function(req, res) {
          res.render('ResultView', {title: 'AirTime', resultsList: this.airports});
        });
        router.get('/MapView', function(req, res) {
		  console.log("map");
		  console.log(this.airports);
		  res.render('MapView', {title: 'MapView', results: this.airports});
        });
        /* GET Userlist page. 
        router.get('/airportlist', function(req, res) {
            var db = req.db;
            var collection = db.get('airports');
            collection.find({},{},function(e,docs){
                    res.render('airportlist', {
        	                "airportlist" : docs,
                            });
               });
        });*/
        return router;
    }
}
module.exports = ViewRouter.createRouter();
