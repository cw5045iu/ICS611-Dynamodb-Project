const AWS = require('aws-sdk');
const config = require("../config/local.json");
AWS.config.update(config);
const db = new AWS.DynamoDB();
var params = {
    TableName : "NYCWeather"
};
db.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});