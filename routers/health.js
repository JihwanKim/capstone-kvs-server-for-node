const { Router } = require('express')
const router = Router()

router.get('/ping', function (req, res, next) {
  res.json({result:0})
});

module.exports = router