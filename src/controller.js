
const Data = require("./datasource");
const uuid = require('uuid');

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
        data.ID = uuid.v4();
        data.date = (new Date(data.date)).valueOf();
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
                (results) => {
                    results.forEach(e => {
                        e.date = new Date(e.date);
                    });
                    results.sort((a, b) => b.date - a.date);
                    let temp = Math.max.apply(Math, results.map(function(o) { return o.actual_max_temp; }));
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
                (results) => {
                    results.forEach(e => {
                        e.date = new Date(e.date);
                    });
                    results.sort((a, b) => b.date - a.date);
                    resolve({
                        min : results[0].actual_min_temp,
                        max : results[0].actual_max_temp,
                        date : results[0].date
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
                    results.forEach(e => {
                        e.date = new Date(e.date);
                    });
                    results.sort((a, b) => b.date - a.date);
                    resolve(results);
                }, 
                (err) => {
                    console.error(`Controller: Database failed get record precipitation data`);
                    reject(err);
                }
            );
        });
    }

    getPreviousSevenDayForcast(start) {
        return new Promise((resolve, reject) => {
            this.db.getPreviousSevenDayForcast(start).then(
                (results) => {
                    results.forEach(e => {
                        e.date = new Date(e.date);
                    });
                    results.sort((a, b) => b.date - a.date);
                    resolve(results);
                }, 
                (err) => {
                    console.error(`Controller: Database failed get seven day forcast form database`);
                    reject(err);
                }
            );
        });
    }   
}

module.exports = new Controller;