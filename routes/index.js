///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../public/javascripts/ServerCommService.ts'/> 
///<reference path='../public/javascripts/Airport.ts'/> 
///<reference path='../public/javascripts/BuildMap.ts'/> 
var ViewRouter = (function () {
    function ViewRouter() {
    }
    ViewRouter.createRouter = function () {
        var express = require('express');
        var router = express.Router();
        var monk = require('monk');
        var airports = new Array();
        function checkAuthentication(request, response, next) {
            if (request.isAuthenticated()) {
                return next();
            }
            else {
                response.redirect('/');
            }
        }
        /* GET home page. */
        function obtainAirports() {
            var scs = new ServerCommService();
            airports = scs.getAirports();
        }
        router.get('/', function (req, res, next) {
            res.render('LoginView', { title: 'AirTime', user: req.user });
        });
        router.get('/RequestView', checkAuthentication, function (req, res) {
            res.render('RequestView', { title: 'AirTime', user: req.user });
        });
        router.get('/ResultView', checkAuthentication, function (req, res) {
            var results = [{ "code": "BHM", "name": "Birmingham-Shuttlesworth International Airport", "temp": "12 Degrees Celcius", "wind": "50 km/h" },
                { "code": "ANC", "name": "Ted Stevens Anchorage International Airport", "temp": "5 Degrees Celcius", "wind": "50 km/h" },
                { "code": "ILG", "name": "New Castle Airport", "temp": "10 Degrees Celcius", "wind": "60 km/h" },
                { "code": "MIA", "name": "Miami International Airport", "temp": "25 Degrees Celcius", "wind": "40 km/h" }];
            res.render('ResultView', { title: 'AirTime', resultsList: results });
        });
        router.get('/MapView', function (req, res) {
            res.render('MapView', { title: 'AirTime',
                "map": function initMap() {
                    var buildNewMap = new AirportOperations.BuildMap(airports);
                }
            });
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
    };
    return ViewRouter;
})();
module.exports = ViewRouter.createRouter();
// class ServerCommService {
//     airportArray: Array<AirportOperations.Airport>;
//         /* To add here: Facebook login and FAA request */
//     constructor() {
//         var http = require('http');
//         var express = require('express');
//         var mongo = require('mongodb');
//         var monk = require('monk');
//         var db = monk('localhost:27017/sprint1db');
//         var airportArray = new Array;
//       // Obtain airport codes from MongoDB and parse
//       function parseCodes(callback) {
//         var waitClock = 0;
//         var codeArray = new Array();
//         var collection = db.get('airports');
//         db.collection.find({}, {}, function(err, aPorts) {
//           for (var n = 0; n<aPorts.length; n++) {
//             codeArray.push(aPorts[n].IATA, function() {
//               if (++waitClock == aPorts.length) {
//                 callAirports(codeArray, function() {
//                   callback();
//                 });
//               }
//             });
//           }
//         })
//       }
//       // Call to FAA and parse the result
//       function airportRoutingCall(airCode: string, callback){
//         http.get({
//           host: "services.faa.gov",
//           path: "/airport/status/" + airCode + "?format=application/JSON",},
//           function(res) {
//             res.setEncoding('utf8');
//             var body = ' ';
//             // Make body the response of the routing call
//             res.on('data', function(d) {
//               body += d;
//             });
//             // When data ends, parse the response
//             res.on('end', function() {
//               try {
//                 var parsed = JSON.parse(body);
//               }
//               catch (err) {
//                 console.error('Unable to parse response as JSON', err);
//               }
//               var newAirport = new AirportOperations.Airport(parsed.IATA);
//               newAirport.setName(parsed.name);
//               newAirport.setTemp(parsed.weather.temp);
//               newAirport.setWind(parsed.weather.wind);
//               airportArray.push(newAirport);
//               callback();
//             })
//             // Routing Call error message
//             .on('error', function(err) {
//               // handle errors with request itself
//               console.error('Error with the request:', err.message);
//             });
//           })
//       };
//       // Call the routing call for each airport in the list, codeArray is array of string
//       function callAirports(codeArray, callback){
//         var waitClock = 0;
//         var realThis = this;
//         for (var i =0; i< codeArray.length; i++) {
//           realThis.airportRoutingCall(codeArray[i], function() {
//             if(++waitClock == codeArray.length) {
//               callback();
//             }
//           });
//         }
//       };
//       module.exports = ServerCommService.constructor();
//     }
//     // Return the array of airports!
//     getAirports() {
//       return this.airportArray;
//     }
// }
