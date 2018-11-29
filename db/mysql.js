var mysql      = require('mysql');

var pool = mysql.createPool({
  host     : '',
  user     : '',
  password : '',
  port     : 3306,
  database : '',
  connectionLimit : 10
});

var getConnection = function (cb) {
  pool.getConnection(function (err, connection) {
      //if(err) throw err;
      //pass the error to the cb instead of throwing it
      if(err) {
        return cb(err);
      }
      cb(null, connection);
  });
};
module.exports = getConnection;