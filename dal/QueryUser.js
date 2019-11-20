var db = require('./dbconnection');
var Promise = require('promise');
var log =require('../log/Log')

class QueryUser {

    QueryUser() { }

    insertUser({ name, lastname, avtar, type, email }) {

        console.log(name + '\n' + lastname + '\n' + avtar + '\n' + type + '\n' + email)

        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var q = "INSERT INTO MeditationDB.user_table(user_name,user_lastname,user_avatar,user_type,Email) values ('" + name + "','" + lastname + "','" + avtar + "', " + type + ",'" + email + "')"
            
            con.query(q, (err, result, fields) => {
                //con.end();
                console.log("login result: " + result)
                


                if (err)
                    reject(err)
                else {


                    var query = "SELECT MeditationDB.user_table.uid as id FROM MeditationDB.user_table WHERE email ='" + email + "'"

                    new log().LogFgYellow(query)
                    con.query(query, (err, result, fields) => {
                        con.end();
                        if (err){
                            new log().LogFgYellow(err)
                            reject(err)
                        }
                        else {
                            if (result.length == 0)
                     {          new log().LogFgYellow("zero length")
                           
                           reject('')
                              }      else{
                                new log().LogFgYellow(JSON.parse(JSON.stringify(result[0])).id)
                                
                                resolve(JSON.parse(JSON.stringify(result[0])).id)
                            }
                        }
                    });
                
                    console.log("login result: " + result)
                    //resolve(result)
                }
            });
        });
    }
   
    getUsers(email) {
        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var query = "SELECT * FROM MeditationDB.user_table WHERE email ='" + email + "'"
            con.query(query, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else {
                    if (result.length == 0)
                        reject('')
                    else
                        resolve(result[0])
                }
            });
        });
    }

    updateProfile({ name, lastname, avtar, email }) {
        return new Promise(function (resolve, reject) {
            var con = new db.getDbConnectionObject();
            var query = "UPDATE MeditationDB.user_table SET user_name = '" + name + "', user_lastname = '" + lastname + "', user_avatar = '" + avtar + "' WHERE email = '" + email + "'"

            con.query(query, (err, result, fields) => {
                con.end();
                if (err)
                    reject(err)
                else {
                    if (result.affectedRows == 0)
                        reject({ 'affectedRows': 0 })
                    else
                        resolve({ 'affectedRows': 1 })
                }
            });
        });
    }
}

module.exports = QueryUser;


