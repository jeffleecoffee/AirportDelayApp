///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='./Airport.ts'/> 
var ServerCommService = (function () {
    /* To add here: Facebook login and FAA request */
    function ServerCommService(require) {
        this.http = require.http;
        this.express = require.express;
        this.mongo = require.mongo;
        this.monk = require.monk;
        this.db = require.db;
        this.airportArray = new Array;
    }
    // Obtain airport codes from MongoDB and parse
    ServerCommService.prototype.parseCodes = function (callback) {
        var waitClock = 0;
        var codeArray = new Array();
        var collection = this.db.get('airports');
        this.db.collection.find({}, {}, function (err, aPorts) {
            for (var n = 0; n < aPorts.length; n++) {
                codeArray.push(aPorts[n].IATA, function () {
                    if (++waitClock == aPorts.length) {
                        callAirports(codeArray, function () {
                            callback();
                        });
                    }
                });
            }
        });
    };
    // Call to FAA and parse the result
    ServerCommService.prototype.airportRoutingCall = function (airCode, callback) {
        this.http.get({
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
                setTimeout(function () {
                    newAirport.setName(parsed.name);
                    newAirport.setTemp(parsed.weather.temp);
                    newAirport.setWind(parsed.weather.wind);
                    airportArray.push(newAirport);
                    callback();
                }, 1000);
            })
                .on('error', function (err) {
                // handle errors with request itself
                console.error('Error with the request:', err.message);
            });
        });
    };
    ;
    // Call the routing call for each airport in the list, codeArray is array of string
    ServerCommService.prototype.callAirports = function (codeArray, callback) {
        var waitClock = 0;
        var realThis = this;
        for (var i = 0; i < codeArray.length; i++) {
            realThis.airportRoutingCall(codeArray[i], function () {
                if (++waitClock == codeArray.length) {
                    callback();
                }
            });
        }
    };
    ;
    // Return the array of airports!
    ServerCommService.prototype.getAirports = function () {
        return this.airportArray;
    };
    return ServerCommService;
})();
module.exports = ServerCommService.constructor();
