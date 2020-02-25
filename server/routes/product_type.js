const Router = require('koa-router');
const productTypeController = require('../controller/product_type')

const router = new Router({
    prefix: '/productType'
});

//用户注册
router.get('/getType',productTypeController.getProductType)

	


module.exports = router;