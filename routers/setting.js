const getConnection = require('../db/mysql')
const { Router } = require('express')
const router = Router()

router.get('/:phone_number', function (req, res, next) {
    var phoneNumber = req.params.phone_number;
    var userQuery = 'SELECT * FROM tb_setting WHERE phone_number = ? ORDER BY idx DESC';
    getConnection(function (err, con) {
    con.query(userQuery,[phoneNumber], function(err, rows){
      if (err){
        console.log(err);
        res.json({result:0, message:err});
      }
      console.log (rows[0]);
      res.json({result:0, body : rows[0]});
    con.release();
  })});
});

router.post('/:phone_number', function (req, res, next) {
    var phoneNumber = req.params.phone_number;
    var requestTargetPhoneNumber = req.body.phone_number;
    var requestTargetToMessage = req.body.msg;
    console.log(req.body);

    var userQuery = 'replace into kvs.tb_setting SET phone_number=?, request_phone_number=?, msg=?';
    getConnection(function (err, con) {
    con.query(userQuery,[phoneNumber, requestTargetPhoneNumber, requestTargetToMessage], function(err, rows){
      if (err){
        res.status(400).json({result:-1, message:"duplicated insert!"});
      }else{
        res.json({result:0, body : rows[0]});
      }
    con.release();
  })});
});

module.exports = router