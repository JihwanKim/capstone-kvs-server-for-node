const { Router } = require('Express')
const router = Router()


//{진료대기중인 환자의 목록, 현재 진료중인(호출된) 환자들의 목록}을 뿌려주는 API
router.get('/', function (req, res, next) {
  res.json({result:0, message:"this is test!"})
});

module.exports = router