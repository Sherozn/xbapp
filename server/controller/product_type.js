//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const product = Sequelize.import('../module/product')
const productType = Sequelize.import('../module/product_type')

product.hasMany(productType, {foreignKey:'productId'})
productType.belongsTo(product, {foreignKey:'productId'})


//数据库操作类
class productTypeModule {
    // productType表与product表根据productId关联查询
    static async createProductType(data,imgUrl) {
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

    static async getProductType(data) {
        
        return await product.findAll({
            include: [{ 
                model: productType, // 指定关联的model
                where:{
                    type1:data.type1,
                    type2:data.type2
                },
                attributes: ['id'],
            }],
            attributes: ['imgUrl','name','note','price'],
            raw:true,
            where:{
                status:0
            },
            order:[
                [productType,'as_sort','DESC']
            ]
        })
    }
}


class productTypeController {
    static async getProductType(ctx) {
        const data = ctx.request.query
        console.log("data****************",data.type1)
        try {
            const products = await productTypeModule.getProductType(data);

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

    
}

module.exports = productTypeController;