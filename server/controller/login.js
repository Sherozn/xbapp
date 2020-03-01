//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import('../module/user')

//自动创建表
user.sync({ force: false }); 


//数据库操作类
class userModule {
    // productType表与product表根据productId关联查询
    static async getUser(name) {
        return await user.findOne({
            where:{
                name:name
            },
        })
    }
}


class loginController {
    //注册用户
    static async getUser(ctx) {
        console.log("进入到方法中了")
        const data = ctx.request.query
        try {
            const user = await userModule.getUser(data.name);
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '登录成功',
                user:user
            }
        } catch (error) {
            console.log("error",error)
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: '参数不齐全'
            }
        }
    }
}

module.exports = loginController;