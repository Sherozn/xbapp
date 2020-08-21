const Router = require('koa-router');
const gzhController = require('../controller/gzh')

const router = new Router({
    prefix: '/wx'
});

//用户登录
router.get('/',gzhController.getHandle)

router.post('/',gzhController.postHandle)

// router.get('/users',gzhController.getUsers)

router.post('/send',gzhController.sendTemplateMsg)

router.post('/getOpenid',gzhController.getOpenid)

router.get('/addMenu',gzhController.addMenu)

router.get('/getOrder',gzhController.getOrder)
router.post('/changeOrder',gzhController.changeOrder)
router.post('/changeInOpen',gzhController.changeInOpen)


module.exports = router;