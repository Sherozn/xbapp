//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const product = Sequelize.import('../module/product')
const productType = Sequelize.import('../module/product_type')

//自动创建表
product.sync({ force: false }); 
productType.sync({ force: false }); 

product.hasMany(productType, {foreignKey:'productId'})
productType.belongsTo(product, {foreignKey:'productId'})


//数据库操作类
class productModule {
    // productType表与product表根据productId关联查询
    static async createProduct(data,imgUrl) {
        return await product.create({
            name: data.name,
            note: data.note,
            price: data.price,
            buyUrl: data.buyUrl,
            testUrl: data.testUrl,
            as_type:data.as_type,
            imgUrl:imgUrl
        })
    }

    static async getProduct(as_type) {
        
        return await product.findAll({
            include: [{ 
                model: productType, // 指定关联的model
                where:{
                    as_type:as_type
                },
                attributes: ['productId'],
            }],
            attributes: ['id','imgUrl','name','note','price','buyUrl','testUrl'],
            raw:true,
            where:{
                status:0
            }
        })
    }

    static async getAllProduct() {
        return await product.findAll({
            where:{
                status:0
            }
        })
    }

    static async deleteProduct(product_id) {  
        console.log("product_id***********",product_id)
        return await product.update(
            {
                status:7
            },
            {
                'where': { 'id': product_id }
            }
        ).catch(err => {
                console.log('Error',err)
            })
    }

    static async editProductFile(data,imgUrl) {  
        console.log("data***********",data)
        return await product.update(
            {
                imgUrl:imgUrl,
                name: data.name,
                note: data.note,
                price: data.price,
                buyUrl: data.buyUrl,
                testUrl: data.testUrl
            },
            {
                'where': { 'id': data.id }
            }
        ).catch(err => {
                console.log('Error',err)
            })
    }

    static async editProduct(data) {  
        console.log("data***********",data)
        return await product.update(
            {
                name: data.name,
                note: data.note,
                price: data.price,
                buyUrl: data.buyUrl,
                testUrl: data.testUrl
            },
            {
                'where': { 'id': data.id }
            }
        ).catch(err => {
                console.log('Error',err)
            })
    }
}


class productController {
    //注册用户
    static async getProducts(ctx) {
        console.log("进入到方法中了")
        // const as_type = ctx.request.body;
        const as_type = 1
        try {
            const products = await productModule.getProduct(as_type);

            console.log("products",products)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功',
                products: products
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }

    static async getAllProduct(ctx) {
        console.log("进入到获取所有产品方法中了")
        // const as_type = ctx.request.body;
        try {
            const products = await productModule.getAllProduct();

            console.log("products",products)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功',
                products: products
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }

    static async deleteProduct(ctx) {
        console.log("进入删除方法中了")
        const data = ctx.request.body
        console.log("data****************",data)
        try{
            const products = await productModule.deleteProduct(data.product_id);
            console.log("products——---****************",products)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功'
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }

    static async editProduct(ctx){
        console.log("进入编辑方法中了")
        const data = ctx.request.body
        console.log("data****************",data)
        try{
            const products = await productModule.deleteProduct(data.product_id);
            console.log("products——---****************",products)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功'
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    } 

    static async addProduct(ctx){
        console.log("进入添加保险方法中了")
        const files = ctx.req.files
        const data = ctx.request.query
        const imgUrl = "static/img/" + files[0].filename
        console.log("data****************",data)
        try{
            await productModule.createProduct(data,imgUrl)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功'
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }

    static async editProductFile(ctx){
        console.log("进入编辑保险方法中了")
        const files = ctx.req.files
        const data = ctx.request.query
        const imgUrl = "static/img/" + files[0].filename
        console.log("data****************",data)
        try{
            await productModule.editProductFile(data,imgUrl)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功'
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }

    static async editProduct(ctx){
        console.log("进入编辑保险方法2中了")
        const data = ctx.request.body
        console.log("data****************",data)
        try{
            await productModule.editProduct(data)
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功'
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: error
            }
        }
    }
    
}

module.exports = productController;