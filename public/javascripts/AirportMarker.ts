///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 

module AirportOperations{
  export class AirportMarker{
    private markerOptions:any;
    private marker:any;
    private map:AirportMap;
    private position:any;
    private event:google.maps.event;
    private airport:Airport;
    private airportInfo: string;

    constructor(airportMap:AirportMap, airport:Airport){
      this.map = airportMap.getMap();
      this.airport = airport;
      this.position = this.airport.getLocation();
      this.markerOptions = {
        position: this.position,
        clickable: true,
        map: this.map
      };
      var airportInfo = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+ this.airport.getName() +'</h1>'+
      '<div id="bodyContent">'+
      '<h3>Current Temperature is '+ this.airport.getTemp() +' .</h3>'+
      '</div>'+
      '</div>';

      this.marker = new google.maps.Marker(this.markerOptions);

      google.maps.event.addListener(this.marker, 'click', function(){
        var infoWindow = new google.maps.InfoWindow({
          content: airportInfo,
          maxWidth: 200
        });
        infoWindow.open(this.map, this);
      });

    }
  }
}