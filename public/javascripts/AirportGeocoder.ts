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
			var coordinates = Array<google.maps.LatLng>();
			var length = airports.length;
			var geocoder = this.geocoder;


			geocodethis(map,coordinates,length,geocoder,airports);

			function geocodethis(map:AirportMap,coordinates:Array<google.maps.LatLng>,length:number,geocoder:google.maps.Geocoder,airports:Array<Airport>){
				var delay = 1000;
				var nextAddress = 0;

				next();

				function next(){
					if(nextAddress < length){
						setTimeout(getGeoCodes,delay,nextAddress);
						nextAddress++;
					}
				}

				function getGeoCodes(nextAddress:number){
					geocoder.geocode({'address': airports[nextAddress].getCode()+" airport USA"}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							console.log("Success!!"+nextAddress);
							coordinates.push(results[0].geometry.location);
							airports[nextAddress].setLocation(results[0].geometry.location);
							createMarker(map,airports[nextAddress]);      
						}

						else {
							if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
								console.log("Limit Reached!!");
								nextAddress--;
								delay++;
							}
						}
						next();
					});
				}
			}

      		var createMarker = function (map:AirportMap, airport:Airport){
        		var marker = new AirportMarker(map,airport);
      		}
		}
	}	
}