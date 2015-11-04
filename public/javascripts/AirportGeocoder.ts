///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/>
///<reference path='./AirportMarker.ts'/> 

module AirportOperations{
	export class AirportGeocoder{
	
		private geocoder: google.maps.Geocoder;

		constructor(){
			this.geocoder = new google.maps.Geocoder();
		}

		getGeocoder(){
			return this.geocoder;
		}

		geocodeAirports(map:AirportMap, airports:Array<Airport>){
			var gmap = map.getMap();
			var coordinates = Array<google.maps.LatLng>();
			var length = airports.length;

			for(var i = 0; i < airports.length; i++){
				var currCode = airports[i].getCode()+" airport";
				this.geocoder.geocode({'address': currCode}, function(results, status) {
    				if (status === google.maps.GeocoderStatus.OK) {
      					coordinates.push(results[0].geometry.location);
      					if(coordinates.length !== null && coordinates.length == length){
      						assignAirportLocation(coordinates, airports);
      						createMarkers(map,airports);
      					}
    				} else {
      	  				alert('Geocode was not successful for the following reason: ' + status);
    				}
  				});
			}

			var assignAirportLocation = function(coordinates:Array<google.maps.LatLng>, airports:Array<Airport>){
        		for(var j =0; j < coordinates.length; j++){
          			airports[j].setLocation(coordinates[j]);
        		}
      		};

      		var createMarkers = function(map:AirportMap,airports:Array<Airport>){
        		for(var k = 0; k < airports.length; k++){
          			createMarker(map, airports[k]);
        		}
      		};

      		var createMarker = function (map:AirportMap, airport:Airport){
        		var marker = new AirportMarker(map,airport);
      		}
		}
	}	
}