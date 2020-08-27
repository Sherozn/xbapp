// some wx fn
const encode = require('./encode')
const config = require('./appid')
const xml = require('./xml')

// const db = require('../config/db')
//引入sequelize对象
// const Sequelize = db.sequelize
// const msgs = Sequelize.import('../module/msgs')

// 返回 true ／ false
exports.auth = (ctx) => {
    console.log("ctx",ctx)
    const token = config.wx.token,
          signature = ctx.query.signature,
          timestamp = ctx.query.timestamp,
          nonce = ctx.query.nonce
        
        // 字典排序
        const arr = [token, timestamp, nonce].sort()
        const result = encode.sha1(arr.join(''))

        if (result === signature) {
            return true
        } else {
            return false
        }
}

exports.message = {
    text (msg, content) {
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: content
            }
        })
    },
    event (msg, content) {
        console.log("content event",content)
        console.log("msg event",msg)
        if(msg.Event == "CLICK"){
            if(msg.EventKey == "V1001_TODAY_MUSIC"){
                return xml.jsonToXml({
                    xml: {
                        ToUserName: msg.FromUserName,
                        FromUserName: msg.ToUserName,
                        CreateTime: Date.now(),
                        MsgType: "news",
                        ArticleCount:1,
                        Articles:{
                            item:{
                                Title:"你好",
                                Description:"我也好",
                                PicUrl:"https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87%E5%95%8A&hs=2&pn=1&spn=0&di=150040&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3094443603%2C1387896325&os=1861416339%2C887580298&simid=4239883631%2C744530036&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%95%8A&objurl=http%3A%2F%2Fgss0.baidu.com%2F-Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F6f061d950a7b0208a0864dbb62d9f2d3572cc819.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fr5oj6_z%26e3Bkwt17_z%26e3Bv54AzdH3Fq7jfpt5gAzdH3Fnab8adnm0_z%26e3Bip4s%3Fqks%3D6jswpj_q7jfpt5g_m&gsm=2&islist=&querylist=",
                                Url:"http://mp.weixin.qq.com/s?__biz=MzIwMDUxOTE5OA==&mid=100000005&idx=1&sn=47e6091cb32d88b8ce2326f0fcd0d93f&chksm=16faba74218d33626c641727c796c0b263a434e6d343a5b8e04722a83c20098350adeeb621d8#rd"
                            }
                        }
                    }
                })
            }else if(msg.EventKey == "V1001_GOOD"){
                return xml.jsonToXml({
                    xml: {
                        ToUserName: msg.FromUserName,
                        FromUserName: msg.ToUserName,
                        CreateTime: Date.now(),
                        MsgType: "text",
                        Content: "收到第二个点击事件"
                    }
                })
            }
        } 
    },
    subscribe (msg, content) {
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: msg.MsgType,
                Content: content
            }
        })
    },
}