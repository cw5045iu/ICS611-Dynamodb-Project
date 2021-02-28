const AWS = require('aws-sdk');
let table = require("../models/schema.json");
let db = new AWS.DynamoDB();

module.exports = function () {
    db.createTable(table, function(err, data) {
        if (err) {
            if (err.code === "ResourceInUseException") {
                resolve()
            } else {
                console.error("Unable to initialize table: ", JSON.stringify(err, null, 2));
                reject(err);
            }
        } else {
            resolve(data);
        }
    });
}