
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
                    console.error("Controller: Error initializing");
                    reject(err);
                }  
            );
        });
    }

    insertDatabase(data) {
        return new Promise((resolve, reject) => {
            this.db.insert(data).then(
                (result) => {
                    resolve(result);
                }, 
                (err) => {
                    console.error("Controller: Database failed to insert row");
                    reject(err)
                }
            );
        });
    }

    getMaxTempOnRange(start, end) {
        return new Promise((resolve, reject) => {
            this.db.getEntriesOnRange(start, end).then(
                (result) => {
                    let items = Object.values(result.Items);
                    let temp = Math.max.apply(Math, items.map(function(o) { return o.actual_max_temp; }));
                    resolve(temp);
                }, 
                (err) => {
                    console.error(`Controller: Database failed get max temps between ${start} and ${end}`);
                    reject(err);
                }
            );
        });
    }

    getMinMaxTemp(date) {
        return new Promise((resolve, reject) => {
            this.db.getRecord(date).then(
                (result) => {
                    resolve({
                        min : result.actual_min_temp,
                        max : result.actual_max_temp,
                        date : result.date
                    });
                }, 
                (err) => {
                    console.error(`Controller: Database failed get MIN/MAX temp data for ${date}`);
                    reject(err);
                }
            );
        });
    }

    getPrecipitations(from, minPrecipitation) {
        return new Promise((resolve, reject) => {
            this.db.getPrecipitations(from, minPrecipitation).then(
                (results) => {
                    resolve(results);
                }, 
                (err) => {
                    console.error(`Controller: Database failed get record precipitation data`);
                    reject(err);
                }
            );
        });
    }
}

module.exports = new Controller;