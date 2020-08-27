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
    text (msg, context,context_type) {
        if(context_type == 0){
            return xml.jsonToXml({
                xml: {
                    ToUserName: msg.FromUserName,
                    FromUserName: msg.ToUserName,
                    CreateTime: Date.now(),
                    MsgType: "text",
                    Content: context
                }
            })
        }else if(context_type == 1){
            const arrs = context.split("**")
            return xml.jsonToXml({
                xml: {
                    ToUserName: msg.FromUserName,
                    FromUserName: msg.ToUserName,
                    CreateTime: Date.now(),
                    MsgType: "news",
                    ArticleCount:1,
                    Articles:{
                        item:{
                            Title:arrs[0],
                            Description:arrs[1],
                            PicUrl:"http://365jia.cn/uploads/13/0301/5130c2ff93618.jpg",
                            Url:arrs[2]
                        }
                    }
                }
            }) 
        }
        
    },
    event (msg, context) {
        console.log("content event",context)
        console.log("msg event",msg)
        if(msg.Event == "CLICK"){
            if(msg.EventKey == "V1001_TODAY_MUSIC"){
                return xml.jsonToXml({
                    xml: {
                        ToUserName: msg.FromUserName,
                        FromUserName: msg.ToUserName,
                        CreateTime: Date.now(),
                        MsgType: context_type,
                        ArticleCount:1,
                        Articles:{
                            item:{
                                Title:"你好",
                                Description:"我也好",
                                PicUrl:"http://365jia.cn/uploads/13/0301/5130c2ff93618.jpg",
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
                        MsgType: context_type,
                        Content: "收到第二个点击事件"
                    }
                })
            }
        }else if(msg.Event == "subscribe"){
            return xml.jsonToXml({
                xml: {
                    ToUserName: msg.FromUserName,
                    FromUserName: msg.ToUserName,
                    CreateTime: Date.now(),
                    MsgType: "text",
                    Content: context
                }
            })
        }
    },
    // subscribe (msg, content) {
    //     return xml.jsonToXml({
    //         xml: {
    //             ToUserName: msg.FromUserName,
    //             FromUserName: msg.ToUserName,
    //             CreateTime: Date.now(),
    //             MsgType: msg.MsgType,
    //             Content: "你好"
    //         }
    //     })
    // },
}