///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 

module AirportOperations{
  export class AirportMarker{
    private options: any;
    private marker: any;
    private map: any;
    private latlng: google.maps.LatLng;

    constructor(airportMap:AirportMap){
      this.map = airportMap.getMap();
      this.options = {
        position: new google.maps.LatLng(-25.363,131.044),
        clickable: true,
        map: this.map
      };
      this.marker = new google.maps.Marker(this.options);
    }
  }
}