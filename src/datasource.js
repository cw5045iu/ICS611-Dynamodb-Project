class Data {
    init () {
        return new Promise((resolve, reject) => {
            // Initialize DynamoDb here...
            if (true) {
                resolve();
            }
            else { // some error
                reject();
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