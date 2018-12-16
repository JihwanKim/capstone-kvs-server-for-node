const { Router } = require('express')
const router = Router()
const getConnection = require('../db/mysql')
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "ap-northeast-2";
const awsConfig = require('../config/config_for_aws');

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('file'), function(req, res){
  var phoneNumber = req.query.phone_number;
  var file = req.file;
  var path = file.path;
  var fsiz = file.size;
  var buffer = new Buffer.alloc(fsiz);
  var fs = require('fs');
  fs.readFile(path, function (err, data) {
      console.log(err);
      var result = DetectFace(phoneNumber, data, res);
  });
});

router.get('/:phone_number', function(req, res, next){
  var startDatetime = req.query.datetime;
  var phoneNumber = req.params.phone_number;
  var result = [];
  getConnection(function (err, con) {
    if(err) {
      console.log(err);
    }
    var userQuery = 'SELECT * FROM tb_analysis WHERE phone_number = ? AND insert_at < ? ORDER BY insert_at DESC';
    con.query(userQuery,[phoneNumber, startDatetime], function(err, rows){
      if (err){
        console.log(err);
        res.json({result:0, message:err});
      }
      result = rows;
      res.json({result:0, datetime : startDatetime, phone: phoneNumber, list : result});
    con.release();
  })});
});

function DetectFace(phoneNumber, buffer, res){
  AWS.config = new AWS.Config();
  AWS.config.region = awsConfig.region; // Region
  AWS.config.credentials =  awsConfig.rekognition.credentials;
  
  var rekognition = new AWS.Rekognition();
  var params = {
    Image: { /* required */
      Bytes: buffer,
    },
    Attributes: [
      "ALL",
      /* more items */
    ]
  };
  rekognition.detectFaces(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); 
      res.json({error:err});
    } // an error occurred
    else     {
      getConnection(function (err, con) {
        if(err) {
          console.log(err);
        }
        var userQuery = 'INSERT INTO tb_analysis (phone_number, body) VALUES (?, ?)';
        con.query(userQuery,[phoneNumber, JSON.stringify(data)], function(err, rows){
          if (err){
            console.log(err);
          }
        con.release();
      })});
      res.json({result:0, phoneNumber:phoneNumber, body: data})
    }           // successful response
  });
}

module.exports = router