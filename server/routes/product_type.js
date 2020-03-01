const Router = require('koa-router');
const productTypeController = require('../controller/product_type')

const router = new Router({
    prefix: '/productType'
});

//获得特定标签下面的产品
router.get('/getType',productTypeController.getProductType)
//创建标签
router.post('/createType',productTypeController.createProductType)
router.post('/deleteType',productTypeController.deleteProductType)
router.post('/editType',productTypeController.editProductType)
	


module.exports = router;