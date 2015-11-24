///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../public/javascripts/ServerCommService.ts'/> 
///<reference path='../public/javascripts/Airport.ts'/> 
///<reference path='../public/javascripts/BuildMap.ts'/> 

class ViewRouter {

    static createRouter() {
        var express = require('express');
        var router = express.Router();
        
        var monk = require('monk');
        
        var airports = new Array();

        function checkAuthentication(request, response, next) {
            if (request.isAuthenticated()){
                return next();
            }
            /*else{
                response.redirect('/');
            }*/
        }
        /* GET home page. */

        router.get('/', function(req, res, next) {
          res.render('LoginView', { title: 'AirTime', user: req.user });
        });
        router.get('/LoadUserHistory',checkAuthentication, function(req,res){
            var db = req.db;
            var collection = db.get('users');
            
            /* Test Data */
            /*collection.update({"uid":req.user.uid},{$set:{history:["LAX","BOS","SFO","ATL"]}});*/

            collection.find({"uid":req.user.uid},{_id: 0, history:1},function(e,docs){
                res.render('RequestView',{title:'Air Time',user:req.user, userList:docs});
            });
        });

        router.post('/savecodes', function(req, res) {
            var id = req.user.uid;
            var db = req.db;
            var collection = db.get("users");
            var letters = /^[A-Za-z]+$/;
            var airports = new Array();

            var start = req.body.start;
            var dest = req.body.destination;
            
            
            function pushCode(input) {
                var code = input;
                if(code != undefined) {
                    if (code.length == 3 && code == code.toUpperCase()
                        && code.match(letters)) {
                        collection.update(
                            {uid: id},
                            {$push: {history: code}});
                        airports.push(code);
                    }
                    else {
                        res.render('error', {
                        message: "You have inserted an invalid airport code!",
                        error: {}
                    })
                    }
                }
            }
            
            var start =req.body.start;
            pushCode(start);

            var i = 1;
            while(i > 0) {
                var mid = req.body['Midpoint' + i];
                if (mid == undefined) {
                    break;
                }
                pushCode(mid);
                i++;
            }

            var dest = req.body.destination;
            pushCode(dest);
            console.log("Airports has:");
            for(var i = 0; i < airports.length; i++) {
                console.log(airports[i]);
            }
            
            res.redirect("/ResultView");
        })


        router.get('/ResultView', checkAuthentication, function(req, res) {
		  req.serverCommInstance.parseCodes(function (airports) { this.airports = airports; console.log(airports);res.render('ResultView', {title: 'AirTime', resultsList: this.airports,user: req.user,results: this.airports}); },["1"]);
        });
        router.get('/MapView', function(req, res) {
		  console.log("map");
		  console.log(this.airports);
		  res.render('MapView', {title: 'MapView', results: this.airports});
        });
        /* GET Userlist page. 
        router.get('/airportlist', function(req, res) {
            var db = req.db;
            var collection = db.get('airports');
            collection.find({},{},function(e,docs){
                    res.render('airportlist', {
        	                "airportlist" : docs,
                            });
               });
        });*/
        return router;
    }
}
module.exports = ViewRouter.createRouter();