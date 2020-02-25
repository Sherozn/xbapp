const Router = require('koa-router');
const dataController = require('../controller/data')

const router = new Router({
    prefix: '/data'
});

//用户注册
router.get('/getData',dataController.getData)

module.exports = router;