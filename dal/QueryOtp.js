var db = require('./dbconnection');
var Promise = require('promise');

class QueryOtp {

    QueryOtp() {

    }
    insertTokenOtp({ email, token, digit }) {
        return new Promise(function (resolve, reject) {
            console.log("here " + digit + "   " + token)
            var con = new db.getDbConnectionObject();
            var query = "INSERT INTO MeditationDB.otp_table (token,otp_digit,email) values('" + token + "','" + digit + "','" + email + "')"
            con.query(query, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else
                    resolve(result)
            });
        });
    }


    getToken({ digit }) {
        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var query = "SELECT MeditationDB.otp_table.token,MeditationDB.otp_table.email FROM MeditationDB.otp_table where MeditationDB.otp_table.otp_digit = " + digit
            con.query(query, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else if (result != null) {
                    var arr = JSON.parse(JSON.stringify(result))
                    console.log(arr)
                    if (arr.length != 0)
                        resolve(arr[0])
                    else
                        reject("no data found")
                }
            });
        });
    }


    delete(digit) {

        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var query = "delete from MeditationDB.otp_table where otp_digit = " + digit
            con.query(query, (err, result, fields) => {
                con.end();
                console.log(result)
                if (err)
                    reject(err)
                else
                    resolve('')
            });
        });
    }
}

module.exports = QueryOtp;


