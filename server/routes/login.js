const Router = require('koa-router');
const loginController = require('../controller/login')

const router = new Router({
    prefix: '/user'
});

//用户登录
router.get('/login',loginController.getUser)

module.exports = router;