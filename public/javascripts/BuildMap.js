///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/googlemaps/google.maps.d.ts'/> 
///<reference path='../../types/DefinitelyTyped/google.geolocation/google.geolocation.d.ts'/> 
///<reference path='./Airport.ts'/> 
///<reference path='./AirportMap.ts'/> 
///<reference path='./AirportMarker.ts'/> 
///<reference path='./AirportGeocoder.ts'/>
var AirportOperations;
(function (AirportOperations) {
    var BuildMap = (function () {
        function BuildMap(airports) {
            var mapCanvas = document.getElementById('map');
            var airportMap = new AirportOperations.AirportMap(mapCanvas);
            var airportGeocoder = new AirportOperations.AirportGeocoder();
            airportGeocoder.geocodeAirports(airportMap, airports);
        }
        return BuildMap;
    })();
    AirportOperations.BuildMap = BuildMap;
})(AirportOperations || (AirportOperations = {}));
function initMap() {
    var airports = new Array();
    airports.push(new AirportOperations.Airport("BHM"));
    airports.push(new AirportOperations.Airport("ANC"));
    airports.push(new AirportOperations.Airport("PHX"));
    airports.push(new AirportOperations.Airport("LIT"));
    airports.push(new AirportOperations.Airport("LAX"));
    airports.push(new AirportOperations.Airport("DEN"));
    airports.push(new AirportOperations.Airport("BDL"));
    airports.push(new AirportOperations.Airport("ILG"));
    airports.push(new AirportOperations.Airport("MIA"));
    airports.push(new AirportOperations.Airport("ATL"));
    airports.push(new AirportOperations.Airport("HNL"));
    airports.push(new AirportOperations.Airport("BOI"));
    airports.push(new AirportOperations.Airport("ORD"));
    airports.push(new AirportOperations.Airport("IND"));
    airports.push(new AirportOperations.Airport("DSM"));
    airports.push(new AirportOperations.Airport("MCI"));
    airports.push(new AirportOperations.Airport("SDF"));
    airports.push(new AirportOperations.Airport("MSY"));
    airports.push(new AirportOperations.Airport("BGR"));
    airports.push(new AirportOperations.Airport("BWI"));
    airports.push(new AirportOperations.Airport("BOS"));
    airports.push(new AirportOperations.Airport("DTW"));
    airports.push(new AirportOperations.Airport("MSP"));
    airports.push(new AirportOperations.Airport("GPT"));
    airports.push(new AirportOperations.Airport("STL"));
    airports.push(new AirportOperations.Airport("BZN"));
    airports.push(new AirportOperations.Airport("LNK"));
    airports.push(new AirportOperations.Airport("LAS"));
    airports.push(new AirportOperations.Airport("MHT"));
    airports.push(new AirportOperations.Airport("EWR"));
    airports.push(new AirportOperations.Airport("ABQ"));
    airports.push(new AirportOperations.Airport("JFK"));
    airports.push(new AirportOperations.Airport("CLT"));
    airports.push(new AirportOperations.Airport("FAR"));
    airports.push(new AirportOperations.Airport("CMH"));
    airports.push(new AirportOperations.Airport("OKC"));
    airports.push(new AirportOperations.Airport("PDX"));
    airports.push(new AirportOperations.Airport("PHL"));
    airports.push(new AirportOperations.Airport("PVD"));
    airports.push(new AirportOperations.Airport("CHS"));
    airports.push(new AirportOperations.Airport("FSD"));
    airports.push(new AirportOperations.Airport("BNA"));
    airports.push(new AirportOperations.Airport("DFW"));
    airports.push(new AirportOperations.Airport("SLC"));
    airports.push(new AirportOperations.Airport("BTV"));
    airports.push(new AirportOperations.Airport("IAD"));
    airports.push(new AirportOperations.Airport("SEA"));
    airports.push(new AirportOperations.Airport("IAD"));
    airports.push(new AirportOperations.Airport("MKE"));
    airports.push(new AirportOperations.Airport("JAC"));
    airports[0].setName("Birmingham-Shuttlesworth International Airport");
    airports[1].setName("Ted Stevens Anchorage International Airport");
    airports[2].setName("New Castle Airport");
    airports[3].setName("Miami International Airport");
    airports[0].setTemp("12 Degrees Celcius");
    airports[1].setTemp("5 Degrees Celcius");
    airports[2].setTemp("10 Degrees Celcius");
    airports[3].setTemp("25 Degrees Celcius");
    airports[0].setWind("50 km/h");
    airports[1].setWind("50 km/h");
    airports[2].setWind("60 km/h");
    airports[3].setWind("40 km/h");
    var buildNewMap = new AirportOperations.BuildMap(airports);
}
;
