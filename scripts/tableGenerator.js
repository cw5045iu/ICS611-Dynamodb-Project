const AWS = require('aws-sdk');
const table = require("../models/databaseSchema.json");
const datasource = require('../src/datasource');
const config = require("../config/local.json");
const uuid = require('uuid');
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
            for (index in data) {
                row = data[index];
                row.ID = uuid.v4();
                row.date = new Date(row.date).valueOf();
                datasource.insert(row).then();
            } 
        },
        (err) => {
            console.error("Could not load data into DynamoDb");
            reject(err);
        }  
    );
});