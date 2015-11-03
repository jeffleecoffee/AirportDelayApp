///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
class ServiceCommService {
    constructor(){
        var express = require('express');
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/sprint1db');
        /* To add here: Facebook login and FAA request */

        // FaceBook Login Check
        function checkIfInDatabase(var id) {

        }

        function addToDatabase(var id) {

        }

    }

}