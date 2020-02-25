const Router = require('koa-router');
const adminController = require('../controller/admin')

const router = new Router({
    prefix: '/admin'
});

//用户注册
router.get('/getData',adminController.getData)

module.exports = router;