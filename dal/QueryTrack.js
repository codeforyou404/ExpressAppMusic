var db = require('../dal/dbconnection');
var Promise = require('promise');



class QueryTrack {

  QueryTrack() { }

  selectPromise() {
    return new Promise(function (resolve, reject) {
      var con = new db.getDbConnectionObject();
      var q = "SELECT MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid"
      //var q = "MeditationDB.track_table.chapter_id,SELECT MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid"
      var qq = "SELECT MeditationDB.track_table.tid,MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating,MeditationDB.track_table.chapter_id FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid LEFT JOIN MeditationDB.chapter_table ON MeditationDB.track_table.chapter_id = MeditationDB.chapter_table.ch_id"
      con.query(qq, (err, result, fields) => {
        con.end();
        if (err)
          reject(err)
        else
          resolve(result)
      });
    });
  }

  select(callback) {

    var con = new db.getDbConnectionObject();
    var q = "SELECT MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid"
    //var q = "MeditationDB.track_table.chapter_id,SELECT MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid"
    var qq = "SELECT MeditationDB.track_table.track_name,MeditationDB.track_table.track_description,MeditationDB.track_table.track_album_art,MeditationDB.track_table.track_path,MeditationDB.track_table.track_category,MeditationDB.track_table.track_time,MeditationDB.narator_table.narator_name,MeditationDB.narator_table.narator_lastname,MeditationDB.narator_table.rating,MeditationDB.track_table.chapter_id FROM MeditationDB.track_table LEFT JOIN MeditationDB.narator_table ON MeditationDB.track_table.narator_id = MeditationDB.narator_table.nid LEFT JOIN MeditationDB.chapter_table ON MeditationDB.track_table.chapter_id = MeditationDB.chapter_table.ch_id"

    con.query(qq, (err, result, fields) => {
      con.end();
      callback(err, result)
      //callback(result.rows, err != null ? "No Record Found" : null);
    });
  }
}

module.exports = QueryTrack;