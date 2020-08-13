const wx = require('../config/wx')
const config = require('../config/appid')
const rp=require('request-promise')

const path=require('path')
//输出绝对路径
const fileName=path.resolve(__dirname,'./access_token.json')
const fs=require('fs')
const urlencode= require('urlencode'); //URL编译模块
const sha1 = require('node-sha1'); //加密模块
const axios = require('axios');

class gzhModule {

  static async getAccessToken() {
    //读取文件
    try{
      const readRes=fs.readFileSync(fileName,'utf8')
      console.log("readRes ",readRes)
      const readObj=JSON.parse(readRes)
      const createTime=new Date(readObj.createTime).getTime()
      const nowTime=new Date().getTime()
      //如果时效大于2小时 重新获取
      if((nowTime-createTime)/1000/60/60>=2){
        await gzhModule.updateAccessToken()
      }
      return readObj.access_token
    }catch(err){
      //刚启动的时候没有 所以读取失败 再更新一次
      console.log("再更新一次 ")
      return await gzhModule.updateAccessToken()
    }
  }


  static async updateAccessToken() {
    console.log("config.appid ",config.wx.appid)
    console.log("config.secret ",config.wx.secret)
    const URL=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wx.appid}&secret=${config.wx.secret}`
    console.log("URL ",URL)
    const resStr = await rp(URL)
    console.log("resStr updateAccessToken",resStr)
    const res=JSON.parse(resStr)
    // 写文件
    if(res.access_token){
      fs.writeFileSync(fileName,JSON.stringify({
        access_token:res.access_token,
        createTime:new Date()
      }))
      return res.access_token
    }
  }

}

class gzhController {

  //接入服务器验证
  static async getHandle(ctx){
    const result = wx.auth(ctx)
      if (result) {
          ctx.body = ctx.query.echostr
      } else {
          ctx.body = { code: -1, msg: "You aren't wechat server !"}
      }
  }
  
  // 公众号自动回复消息
  static async postHandle(ctx){
    let msg,
        MsgType,
        result

    msg = ctx.req.body ? ctx.req.body.xml : ''

    if (!msg) {
        ctx.body = 'error request.'
        return;
    }
    
    MsgType = msg.MsgType[0]
    console.log("MsgType",MsgType)

    switch (MsgType) {
        case 'text':
            result = wx.message.text(msg, msg.Content)
            console.log("resultTest",result)
            break;
        case 'event':
            result = wx.message.event(msg, msg.Content)
            console.log("resultEvent",result)
            break;
        default: 
            result = 'success'
    }
    ctx.res.setHeader('Content-Type', 'application/xml')
    ctx.res.end(result)
  }

  //获取所有关注用户的openid
  static async getUsers(ctx) {
    try{
      var access_token = await gzhModule.getAccessToken()

      const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&next_openid=`

      var res = await rp(url)

      const result = JSON.parse(res)

      console.log("result",result)

      if(!result.data.errCode){
        ctx.body = {
          state: '200',
          msg: '获取用户信息 成功',
          data: result.data
        }
      }else{
        ctx.body = {
          state: '0',
          msg:'获取用户信息失败',
          desc: result.data
        }

      }
    }catch(e){
      console.log("获取用户信息失败",e)
      ctx.body = {
        state: '0',
        msg:'获取用户信息失败',
        desc: e
      }
    }
  }

  // 发送模板消息
  static async sendTemplateMsg() {
    const access_token = await gzhModule.getAccessToken()
    console.log("access_token",access_token)

    var openid = "oHgzEvjh8uBw39MZTyAg_zgawZWU"
    //发送模板消息的接口
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`; 
    const nowTime=new Date().getTime()
    
    //发送模板消息的数据
    const requestData = { 
      "touser": 'oHgzEvjh8uBw39MZTyAg_zgawZWU',
      "template_id": 'hMwj2qBFJYGxpKFztn3j5etNbIJePJnwLowxAZCv6VE',
      "data": {
        "pay": {
          "value": '身份信息'
        },
        "address": {
          "value": '张三'
        },
        "time": {
          "value": '2018-01-01'
        },
        "remark": {
          "value": '已登记！'
        }
      }
    }
    const result = await axios.post(url,requestData)
    console.log("result1111",result.data); 
  }

  // 创建公众号菜单栏
  static async addMenu(ctx) {
    try{
      console.log(ctx.request.query)
      console.log(ctx.request.query['0'])
      const requestData = JSON.parse(ctx.request.query['0'])
      console.log("你好",requestData)
      const access_token = await gzhModule.getAccessToken()
      const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`

      const result = await axios.post(url,requestData)
      console.log("result",result.data)

      if(!result.data.errCode){
        ctx.body = {
          state: '200',
          msg: '创建菜单 成功',
          data: result.data
        }
      }else{
        ctx.body = {
          state: '0',
          msg:'创建菜单 失败',
          desc: result.data
        }
      }
    }catch(e){
      console.log("创建菜单失败",e)
      ctx.body = {
        state: '0',
        msg:'创建菜单 失败',
        desc: e
      }
    }
  }

  // 获取code
  static async getCode(ctx) {
    console.log("我进来了")
    const appid = config.wx.appid;
    const redirect_uri = urlencode(config.wx.serverUrl + "brokerList"); //这里的url需要转为加密格式，它的作用是访问微信网页鉴权接口成功后微信会回调这个地址，并把code参数带在回调地址中
    console.log("redirect_uri ",redirect_uri)
    const scope = 'snsapi_base';
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=123&connect_redirect=1#wechat_redirect`;

    console.log("url",url)
    try{
      // global.origin = url
      // const resStr = ctx.redirect(url)
      // ctx.body = {
      //   data:resStr
      // }
      // console.log("result getCode",result.data)
      console.log("window.location",global.origin)

      // if(!result.data.errCode){
      //   ctx.body = {
      //     state: '200',
      //     msg: '成功',
      //     data: result.data
      //   }
      // }else{
      //   ctx.body = {
      //     state: '0',
      //     msg:'失败',
      //     desc: result.data
      //   }
      // }
      
    }catch(e){
      console.log("获取失败",e)
    }
    
  }

/**
 * 获取openid
 */
  static async getOpenid() {
    console.log("getOpenid",ctx.request.body)
    const code = ctx.request.body['code']
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appid}&secret=${config.wx.secret}&code=${code}&grant_type=authorization_code`;

    const result = await axios.get(url,requestData)
    console.log("result",result.data)

    if(!result.data.errCode){
      ctx.body = {
        state: '200',
        msg: '创建菜单 成功',
        data: result.data
      }
    }else{
      ctx.body = {
        state: '0',
        msg:'创建菜单 失败',
        desc: result.data
      }
    }
  }
}

module.exports = gzhController;
