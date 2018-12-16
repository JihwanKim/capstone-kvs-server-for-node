const { Router } = require('express')
const router = Router()

router.get('/', function (req, res, next) {
  res.json({result:0, message:"this is test!"})
});

module.exports = router