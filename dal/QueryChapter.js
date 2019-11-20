var db = require('./dbconnection');
var Promise = require('promise');

class QueryChapter {

    QueryChapter() { }

    selectPromise() {
        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var qqq = "SELECT * FROM MeditationDB.chapter_table"
            con.query(qqq, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else
                    resolve(result)
            });
        });
    }
}

module.exports = QueryChapter;