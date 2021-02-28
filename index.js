
const express = require('express');  
var app = express();
const router = require("./routes/router");
const controller = require("./src/controller");
const dataBaseInitializer = require("./scripts/generateGenerator");
const AWS = require('aws-sdk');

// Set up process variables here
const port = 8081;
const region = "local";
process.env.region = region;
process.env.serverPort = port;

// Set inits here
// dataBaseInitializer(); /* run to setup schema locally */
AWS.config.update(require(`./config/${region}.json`));

// Set up routes and middleware
app.use(express.urlencoded(
    {
        extended: false,
    }
)); 
app.use(express.json()); 
app.use('/', router);

controller.init().then(
    (_) => {
        app.listen(port, function () {   
            console.log("Listening....")
        });
    },
    (err) => {
        throw(err);
    } 
);
