
const Data = require("./datasource");
class Controller {
    init () {

        return new Promise((resolve, reject) => {
            const inits = [Data.init()];

            Promise.all(inits).then(
                () => {
                    resolve();
                },
                (err) => {
                    reject(err);
                }  
            )
        });

    }

    insertDatabase(data) {
        return new Promise((resolve, reject) => {
            // Call Data function to insert into rows into DynamoDb
            Data.insertRow(data).then(
                (result) => {
                    resolve(result);
                }, 
                (err) => {
                    reject(err)
                }
            );
        });
    }
}
module.exports = new Controller