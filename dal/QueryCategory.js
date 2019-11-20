var db = require('../dal/dbconnection');
var Promise = require('promise');

class QueryCategory {
    QueryCategory() {

    }
    selectAll(callback) {
        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var query = "SELECT * FROM MeditationDB.category_table INNER JOIN MeditationDB.type_table ON MeditationDB.type_table.type_id=MeditationDB.category_table.type_id"
            con.query(query, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else
                    resolve(result)
            });
        });
    }
}
module.exports = QueryCategory;


