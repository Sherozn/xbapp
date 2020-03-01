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
    static async createProductType(data,product_id) {
        return await productType.create({
            type1: data.type1,
            type2: data.type2,
            productId:product_id,
            user_id:data.user_id
        })
    }

    static async getProductType(data) {
        
        return await product.findAll({
            include: [{ 
                model: productType, // 指定关联的model
                where:{
                    type1:data.type1,
                    type2:data.type2,
                    user_id:data.user_id
                },
                attributes: ['id','as_sort'],
            }],
            attributes: ['imgUrl','name','note','price','buyUrl','testUrl'],
            raw:true,
            where:{
                status:0
            },
            order:[
                [productType,'as_sort','DESC']
            ]
        })
    }

    static async deleteProductType(product_type_id){
        return await productType.destroy({
          where: {
            id: product_type_id
          }
        })
    }

    static async editProductType(data){
        return await productType.update(
            {
                as_sort:data.as_sort
            },
            {
                'where': { 'id': data.id }
            }
        )
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

    static async createProductType(ctx) {
        console.log("创建办法中*********")
        const data = ctx.request.body
        console.log("data****************",data)
        const product_ids = data.product_ids
        try{
            for (var i = 0; i < product_ids.length; i++) { 
                await productTypeModule.createProductType(data,product_ids[i]);
            }

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

    static async deleteProductType(ctx){
        console.log("删除办法中*********")
        const data = ctx.request.body
        const product_type_id = data.product_type_id
        try{
            await productTypeModule.deleteProductType(product_type_id);

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

    static async editProductType(ctx){
        console.log("修改办法中*********")
        const data = ctx.request.body
        try{
            await productTypeModule.editProductType(data);

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

module.exports = productTypeController;