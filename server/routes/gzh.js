const Router = require('koa-router');
const gzhController = require('../controller/gzh')

const router = new Router();

//用户登录
router.get('/wx',gzhController.getHandle)

router.post('/wx',gzhController.postHandle)

module.exports = router;