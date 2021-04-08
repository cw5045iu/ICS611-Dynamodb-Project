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
            FilterExpression: "#date BETWEEN :from AND :to",
            ExpressionAttributeNames:{
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":from": (new Date(start)).valueOf(),
                ":to": (new Date(end)).valueOf() 
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
                    resolve(data.Items);
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

    getRecord(date) {
        
        let from = new Date(date);    
        const params = {

            TableName: this.table,
            FilterExpression: "#date = :from",
            ExpressionAttributeNames:{
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":from": from.valueOf(),
            },
            ScanIndexForward: true
        };


        return new Promise((resolve, reject) => {
            this.client.scan(params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not get row from table");
                    reject(err);
                } else {
                    resolve(data.Items);
                }
            })
        });
    }

    getPrecipitations(from, minPrecipitation) {
        return new Promise((resolve, reject) => {
            const params = {

                TableName: this.table,
                FilterExpression: "#date > :from AND #actual_precipitation > :precipitation",
                ExpressionAttributeNames:{
                    "#date": "date",
                    "#actual_precipitation" : "actual_precipitation"
                },
                ExpressionAttributeValues: {
                    ":from": new Date(from).valueOf(),
                    ":precipitation": minPrecipitation 
                },
                ProjectionExpression: "#date, #actual_precipitation",
                ScanIndexForward: true
            };
    
            
            this.client.scan( params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not retrieve results");
                    reject(err);
                } else {
                    resolve(data.Items);
                }
            });
        });
    }

    addDays(date, days) {
        let oldDate = new Date(date);
        let newDate = new Date(oldDate.valueOf());

        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    getPreviousSevenDayForcast(start) {
        let from = new Date(start);
        let to = this.addDays(from, 6);
        
        const params = {

            TableName: this.table,
            FilterExpression: "#date BETWEEN :from AND :to",
            ExpressionAttributeNames:{
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":from": from.valueOf(),
                ":to": to.valueOf()
            },
            ProjectionExpression: "#date, actual_mean_temp, actual_min_temp, actual_max_temp, average_min_temp, average_max_temp,record_min_temp, record_max_temp, record_max_temp_year, actual_precipitation, average_precipitation, record_precipitation",
            ScanIndexForward: true
        };

        return new Promise((resolve, reject) => {
            this.client.scan( params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not retrieve results");
                    reject(err);
                } else {
                    resolve(data.Items);
                }
            });
        });
    }
}

module.exports = new Data;