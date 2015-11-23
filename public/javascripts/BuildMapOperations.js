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
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var AirportMap = (function () {
        function AirportMap(mapDiv) {
            this.name = "AirportMap";
            this.options = {
                center: new google.maps.LatLng(39.5, -98.35),
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
            this.position = this.airport.location;
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
                    '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
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
                    geocoder.geocode({ 'address': airports[nextAddress].code + " airport USA" }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log("Success!!" + nextAddress);
                            coordinates.push(results[0].geometry.location);
                            airports[nextAddress].location = results[0].geometry.location;
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
    console.log(airports1);
    var buildNewMap = new AirportOperations.BuildMap(airports1);
}
;
