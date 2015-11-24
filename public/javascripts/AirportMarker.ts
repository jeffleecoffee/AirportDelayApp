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
	  console.log(this.airport);
    var airportInfo;
    if (this.airport.delay === "false") {
    airportInfo = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
        '<div id="bodyContent">' +
        '<h3>Current temperature is ' + this.airport.avg + ' .</h3>' +
        '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
        '<h3>There is no Delay.</h3>' +
        '</div>' +
        '</div>';
    } else if ((this.airport.avg).length === 0) {
        airportInfo =
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
        '<div id="bodyContent">' +
        '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
        '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
        '<h3>There is a min Delay of ' + this.airport.min + ' and max Delay of ' + this.airport.max + ' .</h3>' +
        '</div>' +
        '</div>';
      }
      else {
        airportInfo =
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + this.airport.code + '</h1>' +
        '<div id="bodyContent">' +
        '<h3>Current temperature is ' + this.airport.temp + ' .</h3>' +
        '<h3>Current wind speed is ' + this.airport.wind + ' .</h3>' +
        '<h3>There is an average Delay of ' + this.airport.avg + ' .</h3>' +
        '</div>' +
        '</div>'; 
      }
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