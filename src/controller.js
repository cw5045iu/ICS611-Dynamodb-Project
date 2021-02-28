
const Data = require("./datasource");
class Controller {
    constructor() {
        this.db = Data;
    }
    init () {
        return new Promise((resolve, reject) => {
            
            const inits = [this.db.init()];

            Promise.all(inits).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }  
            )
        });

    }

    insertDatabase(data) {
        return new Promise((resolve, reject) => {
            this.db.insert(data).then(
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