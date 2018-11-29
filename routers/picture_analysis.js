const { Router } = require('Express')
const router = Router()
const getConnection = require('./db/mysql')

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucket = 'my.unique.bucket.name';
var myKey = 'myBucketKey';

router.post('/', function (req, res, next) {
    params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
     s3.putObject(params, function(err, data) {
         if (err) {
             console.log(err)
         } else {
          var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
          var params = {
            Image: { /* required */
              Bytes: new Buffer('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
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

module.exports = router