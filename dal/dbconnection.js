var mysql = require('mysql')
exports.getDbConnectionObject = function () {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'MeditationDB'
  })
};

function makeConnection() {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ');
  });
  connection.query("SELECT * FROM dumm_table", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  connection.end();
}



