///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 

///<reference path='./Airport.ts'/> 

class ServerCommService {

    var http = require('http');
    var airports = new Array;

    	/* To add here: Facebook login and FAA request */
    constructor(){
        var express = require('express');
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/sprint1db');

            // FaceBook Login Check
        function checkIfInDatabase(var id) {

        }
        function addToDatabase(var id) {


            }
      // Call to FAA and parse the result
      airportRoutingCall(airCode: string){
        http.get({
          host: "services.faa.gov",
          path: "/airport/status/" + airCode + "?format=application/JSON",},
          function(res) {
            res.setEncoding('utf8');
            var body = ' ';

            // Make body the response of the routing call
            res.on('data', function(d) {
              body += d;
            });

            // When data ends, parse the response
            res.on('end', function() {
              try {
                var parsed = JSON.parse(body);
              }
              catch (err) {
              	console.error('Unable to parse response as JSON', err);
              }

              var newAirport = new AirportOperations.Airport(parsed.IATA);
              newAirport.setName(parsed.name);
              var tempWeather = parsed.weather;
              newAirport.setTemp(tempWeather.temp);
              newAirport.setWind(tempWeather.wind);
              airports.push(newAirport);
            })


            // Routing Call error message
            .on('error', function(err) {
              // handle errors with request itself
              console.error('Error with the request:', err.message);
            });

          })
      };

          // Call the routing call for each airport in the list, codeArray is array of string
        callAirports(codeArray){
            for (var i =0; i< codeArray.length; i++) {
              var realThis = this;
              realThis.airportRoutingCall(codeArray[i]);
            }
          };



    }
}
