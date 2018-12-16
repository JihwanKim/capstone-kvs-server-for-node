const getConnection = require('../db/mysql')
const { Router } = require('express')
const router = Router()

router.post('/:phone_number', function (req, res, next) {
    var phoneNumber = req.params.phone_number;
    var userQuery = 'SELECT * FROM tb_setting WHERE phone_number = ?';
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
    res.json({phone_number:phoneNumber});
});

router.get('/', function (req, res, next) {
  var should = require('should');
  var sms = require('../src/cafe24/sms');
  sms.send({
    msg: '카페24 SMS 테스트',
    mobile: '01065891249'
  }).then(function (result) {
    console.log(result);
    should(result).ok;
    done();
  }).done(null, function(result){
    console.log(result);
  });
  res.json({result:0});
});
module.exports = router