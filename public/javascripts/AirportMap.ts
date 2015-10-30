///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

///<reference path='./Airport.ts'/> 

module AirportOperations{
  export class AirportMap{
    public name: string;
    private options: any;
    private map: any;

    constructor(mapDiv: Element){
      this.name = "AirportMap";
      this.options = {
        center: new google.maps.LatLng(-25.363,131.044),
        zoom: 8,
        MapTypeId: google.maps.MapTypeId.TERRAIN
      };
      this.map = new google.maps.Map(mapDiv, this.options)
    }

    getMap(){
      return this.map;
    }
  }
}
