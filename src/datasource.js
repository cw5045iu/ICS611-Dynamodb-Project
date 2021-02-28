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
                this.table = require("../models/schema.json").TableName
                let config = {
                    TableName: this.table
                };
                this.db = new AWS.DynamoDB(); 
                let self = this;
                this.db.describeTable(config, function(err, data) {
                    if (err) {
                        console.error("Datasource: Table not initialized, please run database generation scripts"),
                        console.error(JSON.stringify(err, null, 2));
                        reject(err);
                    } else {
                        self.client = new AWS.DynamoDB.DocumentClient();
                        resolve(data);
                    }
                })
            } catch (error) {
                console.error("Datasource: Intrenal error encountered when initializing database"),
                reject(error);
            }
        });
    }

    insert(element) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: this.table,
                Item: {
                  year: element.year,
                  title: element.title
                }
            };
            this.client.put(params, function(err, data) {
                if (err) {
                    console.error("Datasource: Could not insert row into table")
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    } 
}

module.exports = new Data;