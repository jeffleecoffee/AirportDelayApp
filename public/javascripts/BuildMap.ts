///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 
///<reference path='./AirportGeocoder.ts'/>

module AirportOperations{
	export class BuildMap{
		constructor(airports:Array<AirportOperations.Airport>){
	    	var mapCanvas = document.getElementById('map');
	    	var airportMap = new AirportOperations.AirportMap(mapCanvas);
	    	var airportGeocoder = new AirportOperations.AirportGeocoder();
	    	airportGeocoder.geocodeAirports(airportMap,airports);
		}
	}
}

function initMap(){
  var airports = new Array<AirportOperations.Airport>();
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
};