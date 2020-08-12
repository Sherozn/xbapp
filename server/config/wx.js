// some wx fn
const encode = require('./encode')
const config = require('./appid')
const xml = require('./xml')

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
            return xml.jsonToXml({
                xml: {
                    ToUserName: msg.FromUserName,
                    FromUserName: msg.ToUserName,
                    CreateTime: Date.now(),
                    MsgType: "text",
                    Content: "收到第一个点击事件"
                }
            })
        }
        
    }
}