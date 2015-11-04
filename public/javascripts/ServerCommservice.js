///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='./Airport.ts'/> 
var ServerCommService = (function () {
    /* To add here: Facebook login and FAA request */
    function ServerCommService() {
        var http = require('http');
        var express = require('express');
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/sprint1db');
        var airportArray = new Array;
        /*
        // FaceBook Login Check
        function checkIfInDatabase(var id) {

        }
        function addToDatabase(var id) {


           }
        */
        // Obtain airport codes from MongoDB and parse
        function parseCodes() {
            var codeArray = new Array();
            var collection = db.get('airports');
            db.collection.find({}, {}, function (err, aPorts) {
                for (var n = 0; n < aPorts.length; n++) {
                    codeArray.push(aPorts[n].IATA);
                }
            });
            callAirports(codeArray);
        }
        // Call to FAA and parse the result
        function airportRoutingCall(airCode) {
            http.get({
                host: "services.faa.gov",
                path: "/airport/status/" + airCode + "?format=application/JSON" }, function (res) {
                res.setEncoding('utf8');
                var body = ' ';
                // Make body the response of the routing call
                res.on('data', function (d) {
                    body += d;
                });
                // When data ends, parse the response
                res.on('end', function () {
                    try {
                        var parsed = JSON.parse(body);
                    }
                    catch (err) {
                        console.error('Unable to parse response as JSON', err);
                    }
                    var newAirport = new AirportOperations.Airport(parsed.IATA);
                    newAirport.setName(parsed.name);
                    var tempWeather = parsed.weather;
                    newAirport.setTemp(tempWeather.temp);
                    newAirport.setWind(tempWeather.wind);
                    airportArray.push(newAirport);
                })
                    .on('error', function (err) {
                    // handle errors with request itself
                    console.error('Error with the request:', err.message);
                });
            });
        }
        ;
        // Call the routing call for each airport in the list, codeArray is array of string
        function callAirports(codeArray) {
            var realThis = this;
            for (var i = 0; i < codeArray.length; i++) {
                realThis.airportRoutingCall(codeArray[i]);
            }
        }
        ;
        var serverComm = new ServerCommService();
        module.exports = serverComm;
    }
    // Return the array of airports!
    ServerCommService.prototype.getAirports = function () {
        return this.airportArray;
    };
    return ServerCommService;
})();
