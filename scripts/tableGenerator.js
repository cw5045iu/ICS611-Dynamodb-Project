const AWS = require('aws-sdk');
const table = require("../models/databaseSchema.json");
const datasource = require('../src/datasource');
const config = require("../config/local.json");
AWS.config.update(config);
const db = new AWS.DynamoDB();

db.createTable(table, function(err, data) {
    if (err) {
        if (err.code != "ResourceInUseException") {
            console.error("Unable to initialize table: ", JSON.stringify(err, null, 2));
            reject(err);
        }
    } 

    datasource.init().then(
        (_) => {
            let data = require("../data/NYCWeather.json");
            let id = 0;
            for (index in data) {

                row = data[index];
                row.ID = id;
                row.date = new Date(row.date).valueOf();
                id++;
                datasource.insert(row).then();
            } 
        },
        (err) => {
            console.error("Could not load data into DynamoDb");
            reject(err);
        }  
    );
});