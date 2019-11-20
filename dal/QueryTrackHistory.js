var db = require('./dbconnection');
var Promise = require('promise');

class QueryTrackHistory {

  QueryTrackHistory() { }

  insertTrackHistroy({ track_id, user_id, datetimemilli, start_duration, stop_duration, rating }) {

    return new Promise(function (resolve, reject) {
      var con = new db.getDbConnectionObject();
      var q = "INSERT INTO MeditationDB.track_history_table (track_id,user_id,datetime,start_duration,stop_duration,rating) VALUES (" + track_id + "," + user_id + "," + datetimemilli + ",'" + start_duration + "','" + stop_duration + "'," + rating + ")"
      con.query(q, (err, result, fields) => {
        con.end()
        if (err)
          reject(err)
        else
          resolve(result)
      });
    });
  }

  getTrackHistory(user_id) {
    console.log('getTrackHistory db '+user_id)
    return new Promise(function (resolve, reject) {
      var con = new db.getDbConnectionObject();
      var q = "SELECT * FROM MeditationDB.track_history_table where MeditationDB.track_history_table.user_id = " + user_id
      con.query(q, (err, result, fields) => {
        con.end()
        if (err)
          reject(err)
        else
          resolve(result)
      });
    });
  }
}

module.exports = QueryTrackHistory;