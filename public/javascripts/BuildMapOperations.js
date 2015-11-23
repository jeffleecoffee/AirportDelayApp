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
                center: new google.maps.LatLng(53.83305, -1.66412),
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
            var airportInfo = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
                '<div id="bodyContent">' +
                '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
                '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
                '</div>' +
                '</div>';
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
    airports.push(new AirportOperations.Airport("LAX"));
    airports.push(new AirportOperations.Airport("DEN"));
    airports.push(new AirportOperations.Airport("BDL"));
    airports.push(new AirportOperations.Airport("ILG"));
    airports.push(new AirportOperations.Airport("MIA"));
    airports.push(new AirportOperations.Airport("ATL"));
    airports.push(new AirportOperations.Airport("HNL"));
    airports.push(new AirportOperations.Airport("BOI"));
    airports.push(new AirportOperations.Airport("ORD"));
    airports.push(new AirportOperations.Airport("IND"));
    airports.push(new AirportOperations.Airport("DSM"));
    airports.push(new AirportOperations.Airport("MCI"));
    airports.push(new AirportOperations.Airport("SDF"));
    airports.push(new AirportOperations.Airport("MSY"));
    airports.push(new AirportOperations.Airport("BGR"));
    airports.push(new AirportOperations.Airport("BWI"));
    airports.push(new AirportOperations.Airport("BOS"));
    airports.push(new AirportOperations.Airport("DTW"));
    airports.push(new AirportOperations.Airport("MSP"));
    airports.push(new AirportOperations.Airport("GPT"));
    airports.push(new AirportOperations.Airport("STL"));
    airports.push(new AirportOperations.Airport("BZN"));
    airports.push(new AirportOperations.Airport("LNK"));
    airports.push(new AirportOperations.Airport("LAS"));
    airports.push(new AirportOperations.Airport("MHT"));
    airports.push(new AirportOperations.Airport("EWR"));
    airports.push(new AirportOperations.Airport("ABQ"));
    airports.push(new AirportOperations.Airport("JFK"));
    airports.push(new AirportOperations.Airport("CLT"));
    airports.push(new AirportOperations.Airport("FAR"));
    airports.push(new AirportOperations.Airport("CMH"));
    airports.push(new AirportOperations.Airport("OKC"));
    airports.push(new AirportOperations.Airport("PDX"));
    airports.push(new AirportOperations.Airport("PHL"));
    airports.push(new AirportOperations.Airport("PVD"));
    airports.push(new AirportOperations.Airport("CHS"));
    airports.push(new AirportOperations.Airport("FSD"));
    airports.push(new AirportOperations.Airport("BNA"));
    airports.push(new AirportOperations.Airport("DFW"));
    airports.push(new AirportOperations.Airport("SLC"));
    airports.push(new AirportOperations.Airport("BTV"));
    airports.push(new AirportOperations.Airport("IAD"));
    airports.push(new AirportOperations.Airport("SEA"));
    airports.push(new AirportOperations.Airport("IAD"));
    airports.push(new AirportOperations.Airport("MKE"));
    airports.push(new AirportOperations.Airport("JAC"));
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
    console.log(airports1);
    var buildNewMap = new AirportOperations.BuildMap(airports1);
}
;
