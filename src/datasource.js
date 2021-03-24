const AWS = require('aws-sdk');

class Data {
    constructor() {
        this.db = null;
        this.client = null;
        this.table = null;
    }
    
    init () {

        return new Promise((resolve, reject) => {
            try {
                this.table = require("../models/databaseSchema.json").TableName
                let config = {
                    TableName: this.table
                };
                this.db = new AWS.DynamoDB(); 
                let self = this;
                this.db.describeTable(config, function(err, data) {
                    if (err) {
                        console.error("Datasource: Table not initialized, please run database generation scripts");
                        console.error(JSON.stringify(err, null, 2));
                        reject(err);
                    } else {
                        self.client = new AWS.DynamoDB.DocumentClient();
                        resolve(data);
                    }
                })
            } catch (error) {
                console.error("Datasource: Intrenal error encountered when initializing database");
                reject(error);
            }
        });
    }

    getEntriesOnRange(start, end) {
        const params = {

            TableName: this.table,
            // IndexName: "date",
            FilterExpression: "#date BETWEEN :from AND :to",
            ExpressionAttributeNames:{
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":from": start,
                ":to": end 
            },
            ProjectionExpression: "#date, actual_max_temp",
            ScanIndexForward: true
        };

        return new Promise((resolve, reject) => {
            this.client.scan( params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not retrieve results");
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    insert(element) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: this.table,
                Item: element
            };
            this.client.put(params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not insert row into table");
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    } 
}

module.exports = new Data;