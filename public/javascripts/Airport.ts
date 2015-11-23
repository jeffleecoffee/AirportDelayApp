///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

module AirportOperations{
  export class Airport {
    private code: string;
    private name: string;
    private temp: string;
    private wind: string;
    private delay: string;
    private min: string;
    private max: string;
    private avg: string;
    private location: google.maps.LatLng;

    constructor(codeInput: string) {
      this.code = codeInput;
      this.name = "";
      this.temp = "";
      this.wind = "";
      this.delay = "";
      this.min = "";
      this.max = "";
      this.avg = "";
    }

    setName(nameInput: string) {
      this.name = nameInput;
    }

    setTemp(tempInput: string) {
      this.temp = tempInput;
    }

    setWind(windInput: string) {
      this.wind = windInput;
    }

    setLocation(location: google.maps.LatLng){
      this.location = location;
    }

    setDelay(delayInput: string) {
      this.delay = delayInput;
    }

    setMin(minInput: string) {
      this.min = minInput;
    }

    setMax(maxInput: string) {
      this.max = maxInput;
    }

    setAvg(avgInput: string) {
      this.avg = avgInput;
    }

    getCode() {
      return this.code;
    }

    getName() {
      return this.name;
    }

    getTemp() {
      return this.temp;
    }

    getWind() {
      return this.wind;
    }

    getLocation(){
      return this.location;
    }

    getDelay() {
      return this.delay;
    }

    getMin() {
      return this.min;
    }

    getMax() {
      return this.max;
    }

    getAvg() {
      return this.avg;
    }
  }  
}
