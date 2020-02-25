const Router = require('koa-router');
const productController = require('../controller/product')
//引入multer插件，上传照片
const multer = require('koa-multer')
var path=require('path')
const defpath=path.join(__dirname,'../../')
console.log("defpath",defpath)
const storage = multer.diskStorage({
    destination (req, file, cb) {
        // 设置文件的存储目录，需提前创建
        cb(null, `${defpath}static/img`)
    },
    filename (req, file, cb) {
        // 设置 文件名
        const name = file.originalname;
        // 设置文件的后缀名，
        //我这里取的是上传文件的originalname属性的后四位，
        // 即： .png，.jpg等，这样就需要上传文件的后缀名为3位
        const extension = name.substring(name.length - 4);
        
        	cb(null, 'img-' + Date.now() + extension);
        
    }
})
const upload = multer({ storage: storage })

const router = new Router({
    prefix: '/product'
});

//用户注册
router.get('/getProduct',productController.getProducts)
router.get('/getAllProduct',productController.getAllProduct)
router.post('/deleteProduct',productController.deleteProduct)
router.post('/editProduct',productController.editProduct)
router.post('/editProductFile',upload.array('avatar', 1),productController.editProductFile)

router.post('/addProduct',upload.array('avatar', 1),productController.addProduct)

	


module.exports = router;