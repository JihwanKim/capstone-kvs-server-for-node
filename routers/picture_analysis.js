const { Router } = require('Express')
const router = Router()
const getConnection = require('../db/mysql')

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "ap-northeast-2";

var myKey = 'myBucketKey';

router.post('/', function (req, res, next) {
    params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
    var s3 = new AWS.S3();
     s3.putObject(params, function(err, data) {
         if (err) {
             console.log(err)
         } else {
          var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
          var params = {
            Image: { /* required */
              //Bytes: new Buffer('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
              S3Object: {
                Bucket: myBucket,
                Name: 'a',
                Version: '2016-06-27'
              }
            },
            Attributes: [
              DEFAULT | ALL,
              /* more items */
            ]
          };
          rekognition.detectFaces(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
         }
      });
    getConnection(function (err, con) {
      if(err) {
        console.log(err);
      }
      var userQuery = 'INSERT ignore market (market, korean_name, english_name) VALUES (?, ?, ?)';
      con.query(userQuery,[market, ko_name, eng_name], function(err, rows){
        if (err){
          console.log(err);
        }
      con.release();
    })});
});

router.get('/all', function (req, res, next) {
});

router.get('/test', function (req, res, next) {
  AWS.config = new AWS.Config();
  AWS.config.region = 'ap-northeast-2'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  });
  var rekognition = new AWS.Rekognition();
  var params = {
    Image: { /* required */
      //Bytes: new Buffer('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
      S3Object: {
        Version: '2016-06-27'
      }
    },
    Attributes: [
      "DEFAULT", "ALL",
      /* more items */
    ]
  };
  rekognition.detectFaces(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); res.json({error:err});} // an error occurred
    else     {console.log(data); res.json({result:0, list: data})}           // successful response
  });
});

module.exports = router