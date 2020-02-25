class adminController {
    //注册用户
    static async getData(ctx) {
        console.log("进入到方法中了")
        try {

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
                desc: '参数不齐全'
            }
        }
    }
}

module.exports = adminController;