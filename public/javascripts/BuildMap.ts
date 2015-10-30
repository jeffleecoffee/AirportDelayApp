///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 

function initMap() {
  var mapCanvas = document.getElementById('map');
  var airportMap = new AirportOperations.AirportMap(mapCanvas);
  var airportMarker = new AirportOperations.AirportMarker(airportMap);
}
window.onload = initMap;