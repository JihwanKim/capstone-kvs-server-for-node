var mysql      = require('mysql');
const mysqlConfig = require('../config/config_for_mysql');

var pool = mysql.createPool(mysqlConfig);

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