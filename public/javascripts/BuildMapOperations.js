///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
var AirportOperations;
(function (AirportOperations) {
    var Airport = (function () {
        function Airport(codeInput) {
            this.code = codeInput;
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
            this.position = this.airport.getLocation();
            this.markerOptions = {
                position: this.position,
                clickable: true,
                map: this.map
            };
            var airportInfo = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + this.airport.getName() + '</h1>' +
                '<div id="bodyContent">' +
                '<h3>Current Temperature is ' + this.airport.getTemp() + ' .</h3>' +
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
            /***** this.airports = airports; *****/
        }
        AirportGeocoder.prototype.getGeocoder = function () {
            return this.geocoder;
        };
        AirportGeocoder.prototype.geocodeAirports = function (map, airports) {
            var gmap = map.getMap();
            var coordinates = Array();
            var length = airports.length;
            for (var i = 0; i < airports.length; i++) {
                var currCode = airports[i].getCode() + " airport";
                this.geocoder.geocode({ 'address': currCode }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        coordinates.push(results[0].geometry.location);
                        if (coordinates.length !== null && coordinates.length == length) {
                            assignAirportLocation(coordinates, airports);
                            createMarkers(map, airports);
                        }
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
            var assignAirportLocation = function (coordinates, airports) {
                for (var j = 0; j < coordinates.length; j++) {
                    airports[j].setLocation(coordinates[j]);
                }
            };
            var createMarkers = function (map, airports) {
                for (var k = 0; k < airports.length; k++) {
                    createMarker(map, airports[k]);
                }
            };
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
var BuildMap = (function () {
    function BuildMap(airports) {
        var mapCanvas = document.getElementById('map');
        var airportMap = new AirportOperations.AirportMap(mapCanvas);
        var airportGeocoder = new AirportOperations.AirportGeocoder();
        airportGeocoder.geocodeAirports(airportMap, airports);
    }
    return BuildMap;
})();
window.onload = function () {
    var airports = new Array();
    airports.push(new AirportOperations.Airport("BHM"));
    airports.push(new AirportOperations.Airport("ANC"));
    airports.push(new AirportOperations.Airport("ILG"));
    airports.push(new AirportOperations.Airport("MIA"));
    airports[0].setName("Birmingham-Shuttlesworth International Airport");
    airports[1].setName("Ted Stevens Anchorage International Airport");
    airports[2].setName("New Castle Airport");
    airports[3].setName("Miami International Airport");
    airports[0].setTemp("12 Degrees Celcius");
    airports[1].setTemp("5 Degrees Celcius");
    airports[2].setTemp("10 Degrees Celcius");
    airports[3].setTemp("25 Degrees Celcius");
    var buildNewMap = new BuildMap(airports);
};
