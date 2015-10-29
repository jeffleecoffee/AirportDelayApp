class Airport {
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

export = Airport;