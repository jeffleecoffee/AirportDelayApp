///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var Airport = (function () {
        function Airport(codeInput) {
            this.code = codeInput;
            this.name = "";
            this.temp = "";
            this.wind = "";
            this.delay = "";
            this.min = "";
            this.max = "";
            this.avg = "";
        }
        Airport.prototype.setName = function (nameInput) {
            this.name = nameInput;
        };
        Airport.prototype.setTemp = function (tempInput) {
            this.temp = tempInput;
        };
        Airport.prototype.setWind = function (windInput) {
            this.wind = windInput;
        };
        Airport.prototype.setLocation = function (location) {
            this.location = location;
        };
        Airport.prototype.setDelay = function (delayInput) {
            this.delay = delayInput;
        };
        Airport.prototype.setMin = function (minInput) {
            this.min = minInput;
        };
        Airport.prototype.setMax = function (maxInput) {
            this.max = maxInput;
        };
        Airport.prototype.setAvg = function (avgInput) {
            this.avg = avgInput;
        };
        Airport.prototype.getCode = function () {
            return this.code;
        };
        Airport.prototype.getName = function () {
            return this.name;
        };
        Airport.prototype.getTemp = function () {
            return this.temp;
        };
        Airport.prototype.getWind = function () {
            return this.wind;
        };
        Airport.prototype.getLocation = function () {
            return this.location;
        };
        Airport.prototype.getDelay = function () {
            return this.delay;
        };
        Airport.prototype.getMin = function () {
            return this.min;
        };
        Airport.prototype.getMax = function () {
            return this.max;
        };
        Airport.prototype.getAvg = function () {
            return this.avg;
        };
        return Airport;
    })();
    AirportOperations.Airport = Airport;
})(AirportOperations || (AirportOperations = {}));
///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='./Airport.ts'/> 
var ServerCommService = (function () {
    /* To add here: Facebook login and FAA request */
    function ServerCommService(require) {
        this.http = require.http;
        console.log("http");
        console.log(this.http);
        this.express = require.express;
        this.mongo = require.mongo;
        this.monk = require.monk;
        this.db = require.db;
    }
    // Obtain airport codes from MongoDB and parse
    ServerCommService.prototype.parseCodes = function (callback, codeArray) {
        var airportArray = new Array();
        var http = this.http;
        var waitClock = 0;
        var collection = this.db.get('airports');
        var trueThis = this;
        var skip = false;
        codeArray = ["ATL", "ANC", "AUS", "BWI", "BOS", "CLT", "MDW", "ORD", "CVG"];
        var tempAirportArray = new Array();
        var count = 0;
        var count1 = 0;
        for (var n = 0; n < codeArray.length; n++) {
            console.log("iterateFAAcall");
            setTimeout(function () {
                http.get({
                    host: "services.faa.gov",
                    path: "/airport/status/" + codeArray[count1++] + "?format=application/JSON" }, function (res) {
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
                            //console.log(body);
                            count++;
                            skip = true;
                        }
                        if (!skip) {
                            var newAirport = new AirportOperations.Airport(parsed.IATA);
                            console.log(parsed.IATA);
                            console.log(parsed);
                            newAirport.setName(parsed.name);
                            newAirport.setTemp(parsed.weather.temp);
                            newAirport.setWind(parsed.weather.wind);
                            newAirport.setDelay(parsed.delay);
                            newAirport.setMin(parsed.status.minDelay);
                            newAirport.setMax(parsed.status.maxDelay);
                            newAirport.setAvg(parsed.status.avgDelay);
                            airportArray.push(newAirport);
                            console.log(count);
                            console.log(airportArray);
                            console.log("airports");
                            count++;
                            if (count >= codeArray.length)
                                callback(airportArray);
                        }
                        skip = false;
                    })
                        .on('error', function (err) {
                        // handle errors with request itself
                        console.error('Error with the request:', err.message);
                    });
                });
            }, 1000);
        }
    };
    // Call to FAA and parse the result
    ServerCommService.prototype.airportRoutingCall = function (airCode, callback) {
        console.log("routing call");
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
                    newAirport.setDelay(parsed.delay);
                    newAirport.setMin(parsed.status.minDelay);
                    newAirport.setMax(parsed.status.maxDelay);
                    newAirport.setAvg(parsed.status.avgDelay);
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
            console.log("callAirportsITerate");
            airportRoutingCall(codeArray[i], function () {
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
///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var AirportMap = (function () {
        function AirportMap(mapDiv) {
            this.name = "AirportMap";
            this.options = {
                center: new google.maps.LatLng(39.5, -98.5),
                zoom: 3,
                MapTypeId: google.maps.MapTypeId.TERRAIN
            };
            this.map = new google.maps.Map(mapDiv, this.options);
        }
        AirportMap.prototype.getMap = function () {
            return this.map;
        };
        return AirportMap;
    })();
    AirportOperations.AirportMap = AirportMap;
})(AirportOperations || (AirportOperations = {}));
///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var AirportMarker = (function () {
        function AirportMarker(airportMap, airport) {
            this.map = airportMap.getMap();
            this.airport = airport;
            this.position = this.airport.getLocation();
            this.markerOptions = {
                position: this.position,
                clickable: true,
                map: this.map
            };
            console.log(this.airport);
            var airportInfo;
            if (this.airport.delay === "false") {
                airportInfo = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
                    '<div id="bodyContent">' +
                    '<h3>Current temperature is ' + this.airport.avg + ' .</h3>' +
                    '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
                    '<h3>There is no Delay.</h3>' +
                    '</div>' +
                    '</div>';
            }
            else if ((this.airport.avg).length === 0) {
                airportInfo =
                    '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
                        '<div id="bodyContent">' +
                        '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
                        '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
                        '<h3>There is a min Delay of ' + this.airport.min + ' and max Delay of ' + this.airport.max + ' .</h3>' +
                        '</div>' +
                        '</div>';
            }
            else {
                airportInfo =
                    '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
                        '<div id="bodyContent">' +
                        '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
                        '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
                        '<h3>There is an average Delay of ' + this.airport.avg + ' .</h3>' +
                        '</div>' +
                        '</div>';
            }
            this.marker = new google.maps.Marker(this.markerOptions);
            google.maps.event.addListener(this.marker, 'click', function () {
                var infoWindow = new google.maps.InfoWindow({
                    content: airportInfo,
                    maxWidth: 200
                });
                infoWindow.open(this.map, this);
            });
        }
        return AirportMarker;
    })();
    AirportOperations.AirportMarker = AirportMarker;
})(AirportOperations || (AirportOperations = {}));
///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/>
///<reference path='./AirportMarker.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var AirportGeocoder = (function () {
        function AirportGeocoder() {
            this.geocoder = new google.maps.Geocoder();
        }
        AirportGeocoder.prototype.getGeocoder = function () {
            return this.geocoder;
        };
        AirportGeocoder.prototype.geocodeAirports = function (map, airports) {
            var coordinates = Array();
            var length = airports.length;
            var geocoder = this.geocoder;
            geocodethis(map, coordinates, length, geocoder, airports);
            function geocodethis(map, coordinates, length, geocoder, airports) {
                var delay = 1000;
                var nextAddress = 0;
                next();
                function next() {
                    if (nextAddress < length) {
                        setTimeout(getGeoCodes, delay, nextAddress);
                        nextAddress++;
                    }
                }
                function getGeoCodes(nextAddress) {
                    geocoder.geocode({ 'address': airports[nextAddress].getCode() + " airport USA" }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log("Success!!" + nextAddress);
                            coordinates.push(results[0].geometry.location);
                            airports[nextAddress].setLocation(results[0].geometry.location);
                            createMarker(map, airports[nextAddress]);
                        }
                        else {
                            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                                console.log("Limit Reached!!");
                                nextAddress--;
                                delay++;
                            }
                        }
                        next();
                    });
                }
            }
            var createMarker = function (map, airport) {
                var marker = new AirportOperations.AirportMarker(map, airport);
            };
        };
        return AirportGeocoder;
    })();
    AirportOperations.AirportGeocoder = AirportGeocoder;
})(AirportOperations || (AirportOperations = {}));
///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 
///<reference path='./AirportGeocoder.ts'/>
var AirportOperations;
(function (AirportOperations) {
    var BuildMap = (function () {
        function BuildMap(airports) {
            var mapCanvas = document.getElementById('map');
            var airportMap = new AirportOperations.AirportMap(mapCanvas);
            var airportGeocoder = new AirportOperations.AirportGeocoder();
            airportGeocoder.geocodeAirports(airportMap, airports);
        }
        return BuildMap;
    })();
    AirportOperations.BuildMap = BuildMap;
})(AirportOperations || (AirportOperations = {}));
function initMap() {
    var airports = new Array();
    airports.push(new AirportOperations.Airport("BHM"));
    airports.push(new AirportOperations.Airport("ANC"));
    airports.push(new AirportOperations.Airport("PHX"));
    airports.push(new AirportOperations.Airport("LIT"));
    airports[0].setName("Birmingham-Shuttlesworth International Airport");
    airports[1].setName("Ted Stevens Anchorage International Airport");
    airports[2].setName("New Castle Airport");
    airports[3].setName("Miami International Airport");
    airports[0].setTemp("12 Degrees Celcius");
    airports[1].setTemp("5 Degrees Celcius");
    airports[2].setTemp("10 Degrees Celcius");
    airports[3].setTemp("25 Degrees Celcius");
    airports[0].setWind("50 km/h");
    airports[1].setWind("50 km/h");
    airports[2].setWind("60 km/h");
    airports[3].setWind("40 km/h");
    airports[0].setDelay("true");
    airports[1].setDelay("true");
    airports[2].setDelay("false");
    airports[3].setDelay("false");
    airports[0].setMin("");
    airports[1].setMin("20");
    airports[2].setMin("40");
    airports[3].setMin("30");
    airports[0].setMax("");
    airports[1].setMax("60");
    airports[2].setMax("50");
    airports[3].setMax("70");
    airports[0].setAvg("40");
    airports[1].setAvg("");
    airports[2].setAvg("40");
    airports[3].setAvg("40");
    var buildNewMap = new AirportOperations.BuildMap(airports);
}
;
///<reference path='types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='public/javascripts/ServerCommService.ts'/> 
///<reference path='public/javascripts/Airport.ts'/> 
///<reference path='public/javascripts/BuildMap.ts'/> 
var Application = (function () {
    function Application() {
        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var passport = require('passport');
        // New Code
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/sprint1db');
        var http = require('http');
        console.log(http);
        var routes = require('./routes/index');
        var users = require('./routes/users');
        var auth = require('./routes/auth');
        var app = express();
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        //app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(function (req, res, next) {
            req.db = db;
            req.monk = monk;
            req.mongo = mongo;
            req.http = http;
            req.serverCommInstance = new ServerCommService(req);
            req.next = next;
            next();
        });
        app.use(cookieParser());
        var expressSession = require('express-session');
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: new expressSession.MemoryStore()
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.static(path.join(__dirname, 'public')));
        // Use requires to dependency inject instead
        // app.use(function(req,res,next){
        //     req.db = db;
        //         next();
        // });
        app.use('/', routes);
        app.use('/users', users);
        app.use('/auth', auth);
        app.use(function (req, res, next) {
            req.session = req.session || {};
        });
        /// catch 404 and forwarding to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        /// error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = app;
    }
    return Application;
})();
var app = new Application();
