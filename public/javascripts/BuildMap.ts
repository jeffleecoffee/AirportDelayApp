///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 
///<reference path='./AirportGeocoder.ts'/>

class BuildMap{
	constructor(airports:Array<AirportOperations.Airport>){
	    var mapCanvas = document.getElementById('map');
	    var airportMap = new AirportOperations.AirportMap(mapCanvas);
	    var airportGeocoder = new AirportOperations.AirportGeocoder();
	    airportGeocoder.geocodeAirports(airportMap,airports);
	}
}

window.onload = function(){
	var airports = new Array<AirportOperations.Airport>();
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
