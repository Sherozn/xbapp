let fs = require('fs');

class dataController {
    //注册用户
    static async getData(ctx) {
        console.log("进入到方法中了")
        const res = ctx.request.query
        try {
            var path=require('path');
            var defpath=path.join(__dirname,'../')
            console.log("defpath",defpath)
            const data = JSON.parse(fs.readFileSync(defpath+'public/data/data.json', 'utf8'))[res.user_id];

            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                desc: '获取成功',
                types: data.types,
                typeItem:data.typeItem,
                banners:data.banners,
                quickEntrance:data.quickEntrance
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

module.exports = dataController;