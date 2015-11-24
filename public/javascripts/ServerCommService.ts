///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='./Airport.ts'/> 
	class ServerCommService {
			/* To add here: Facebook login and FAA request */
		constructor(require) {
			this.http = require.http;
			console.log("http");
			console.log(this.http);
			this.express = require.express;
			this.mongo = require.mongo;
			this.monk = require.monk;
			this.db = require.db;
		}

		  
		  // Obtain airport codes from MongoDB and parse
		  parseCodes(callback, codeArray) {
		    var airportArray = new Array();
		    var http = this.http;
			var waitClock = 0;
			var collection = this.db.get('airports');
			var trueThis = this;
			var skip = false;
			//codeArray = ["ATL","ANC","AUS","BWI","BOS","CLT","MDW","ORD","CVG","MSP"];
			var tempAirportArray = new Array();
			  var count = 0;
			  var count1 = 0;
			  for (var n = 0; n < codeArray.length; n++){
			    console.log("iterateFAAcall");
				setTimeout(function(){
				http.get({
			    host: "services.faa.gov",
			    path: "/airport/status/" + codeArray[count1++] + "?format=application/JSON",},
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
					//console.log(body);
					count++;
					skip = true;
				  }
				  if (!skip) {
				  var newAirport = new AirportOperations.Airport(parsed.IATA);
				  console.log(parsed.IATA);
				  console.log(parsed);
					newAirport.setName(parsed.name);
					newAirport.setTemp(parsed.weather.temp);
					newAirport.setWind(parsed.weather.wind);
					newAirport.setDelay(parsed.delay);
					newAirport.setMin(parsed.status.minDelay);
					newAirport.setMax(parsed.status.maxDelay);
					newAirport.setAvg(parsed.status.avgDelay);
					airportArray.push(newAirport);
					console.log(count);
					console.log(airportArray);
					console.log("airports");
					count++;
					if (count >= codeArray.length)
					  callback(airportArray);
				  }
				  skip = false;
				})


				// Routing Call error message
				.on('error', function(err) {
				  // handle errors with request itself
				  console.error('Error with the request:', err.message);
				});

			  })},1000);
			}
		  }

		  // Call to FAA and parse the result
		  airportRoutingCall(airCode: string, callback){
		    console.log("routing call");
			this.http.get({
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
				  setTimeout(function() {
					newAirport.setName(parsed.name);
					newAirport.setTemp(parsed.weather.temp);
					newAirport.setWind(parsed.weather.wind);
					newAirport.setDelay(parsed.delay);
					newAirport.setMin(parsed.status.minDelay);
					newAirport.setMax(parsed.status.maxDelay);
					newAirport.setAvg(parsed.status.avgDelay);
					airportArray.push(newAirport);
					callback();
				  }, 1000);
				})


				// Routing Call error message
				.on('error', function(err) {
				  // handle errors with request itself
				  console.error('Error with the request:', err.message);
				});

			  })
		  };

		  // Call the routing call for each airport in the list, codeArray is array of string
		  callAirports(codeArray, callback){
			var waitClock = 0;
			var realThis = this;
			for (var i =0; i< codeArray.length; i++) {
			  console.log("callAirportsITerate");
			  airportRoutingCall(codeArray[i], function() {
				if(++waitClock == codeArray.length) {
				  callback();
				}
			  });

			}
		  };
          		// Return the array of airports!
		getAirports() {
		  return this.airportArray;
		}
		}
		module.exports = ServerCommService.constructor();