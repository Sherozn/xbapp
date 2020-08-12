const Router = require('koa-router');
const gzhController = require('../controller/gzh')

const router = new Router({
    prefix: '/wx'
});

//用户登录
router.get('/',gzhController.getHandle)

router.post('',gzhController.postHandle)

router.get('/users',gzhController.getUsers)

router.get('/send',gzhController.sendTemplateMsg)

router.get('/getCode',gzhController.getCode)

router.get('/addMenu',gzhController.addMenu)

module.exports = router;