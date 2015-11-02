///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 
///<reference path='./AirportGeocoder.ts'/>

function initMap() {
  var airportCodes:Array<string> = [];
  airportCodes.push("BHM");
  airportCodes.push("ANC");
  airportCodes.push("ILG");
  airportCodes.push("MIA");

  var mapCanvas = document.getElementById('map');
  var airportMap = new AirportOperations.AirportMap(mapCanvas);
  var airportGeocoder = new AirportOperations.AirportGeocoder();
  airportGeocoder.geocodeAirports(airportCodes,airportMap);
}
window.onload = initMap;