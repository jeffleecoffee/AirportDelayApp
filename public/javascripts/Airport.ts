///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 

module AirportOperations{
  export class Airport {
    code: string;
    name: string;
    temp: string;
    wind: string;

    constructor(codeInput: string) {
      this.code = codeInput;
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
  }  
}
