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

	geocodeAirports(airportCodes:Array<string>, map:AirportMap){
		var gmap = map.getMap();
		for(var i=0; i < airportCodes.length; i++){
			this.geocoder.geocode({'address': airportCodes[i]+" airport"}, function(results, status) {
    			if (status === google.maps.GeocoderStatus.OK) {
      				gmap.setCenter(results[0].geometry.location);
      				var marker = new AirportMarker(map,results[0].geometry.location);
    			} else {
      	  			alert('Geocode was not successful for the following reason: ' + status);
    			}
  			});
		}
	}
}	
}