const db = require('../dal/QueryCategory');
const Promise = require('promise');

class ServiceCategory {
    ServiceCategory() {

    }
    getAllCategory() {
        return new Promise(function (resolve, reject) {
            new db().selectAll().then(function (result) {
                resolve(result)
            }, function (err) {
                reject(err)
            });
        });
    }
}

module.exports = ServiceCategory;