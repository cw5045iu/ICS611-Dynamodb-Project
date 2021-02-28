const AWS = require('aws-sdk');

class Data {
    constructor() {
        this.db = null;
    }
    
    init () {

        return new Promise((resolve, reject) => {
            try {
                let table = require("../models/schema.json");
                this.db = new AWS.DynamoDB();
                this.db.createTable(table, function(err, data) {
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
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    insertRow(element) {
        return new Promise((resolve, reject) => {
            if (true) {
                resolve();
            }
            else { // some error
                reject();
            } 
        });
    }
}

module.exports = new Data;