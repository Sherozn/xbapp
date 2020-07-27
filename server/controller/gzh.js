const wx = require('../config/wx')
const config = require('../config/config')
const rp=require('request-promise')

const path=require('path')
//输出绝对路径
const fileName=path.resolve(__dirname,'./access_token.json')
const fs=require('fs')
const urlencode= require('urlencode'); //URL编译模块
const sha1 = require('node-sha1'); //加密模块

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

    switch (MsgType) {
        case 'text':
            result = wx.message.text(msg, msg.Content)
            break;
        default: 
            result = 'success'
    }
    ctx.res.setHeader('Content-Type', 'application/xml')
    ctx.res.end(result)
  }

  //获取access_token
  static async getAccessToken() {
    //读取文件
    try{
      const readRes=fs.readFileSync(fileName,'utf8')
      console.log("readRes ",readRes)
      const readObj=JSON.parse(readRes)
      const createTime=new Date(readObj.createTime).getTime()
      const nowTime=new Date().getTime()
      //如果更新的时候断线了 重新获取
      if((nowTime-createTime)/1000/60/60>=2){
        await updateAccessToken()
      }
      return readObj.access_token
    }catch(err){
      //刚启动的时候没有 所以读取失败 再更新一次
      console.log("再更新一次 ")
      return await updateAccessToken()
    }
  }


  static async updateAccessToken() {
    console.log("updateAccessToken ")
    const URL=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`
    const resStr=await rp(URL)
    console.log("resStr ",resStr)
    const res=JSON.parse(resStr)
    // 写文件
    if(res.access_token){
      fs.writeFileSync(fileName,JSON.stringify({
        access_token:res.access_token,
        createTime:new Date()
      }))
      return res.access_token
    }else{
      //如果失败 继续发送请求
      await updateAccessToken()
    }
  }

  static async getUsers(ctx) {
    try{
      var access_token = await getAccessToken()

      const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&next_openid=`

      var result = await rp(url)

      if(!result.data.errCode){
        ctx.body = {
          state: '200',
          msg: '获取用户信息 成功',
          data: result.data
        }
        console.log("result.data",result.data)
      }else{
        ctx.body = {
          state: '0',
          msg:'获取用户信息失败',
          desc: e
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

  //获取code
  // static async getCode(ctx) {
  //   const appid = config.appid;
  //   const redirect_uri = urlencode("http://www.lgshuolicai.com/wx"); //这里的url需要转为加密格式，它的作用是访问微信网页鉴权接口成功后微信会回调这个地址，并把code参数带在回调地址中
  //   const scope = 'snsapi_userinfo';
  //   const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`;

  //   const resStr=await rp(url)
  //   const html =
  //     `<!DOCTYPE html>
  //     <html>
  //         <head>
  //         <meta charset="utf-8" >
  //         <title>微信鉴权引导</title>
  //         </head>
  //         <body><a href="${url}">跳转到鉴权页面</a></body>
  //     </html>`;
    
  //   res.setHeader('Content-Type', 'text/html');
  //   res.send(html);
  // }


/**
 * 获取openid
 * @param  { string } code [调用获取openid的接口需要code参数]
 */


  // getOpenId(code) {

  //     const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.secret}&code=${code}&grant_type=authorization_code`;

  //     request(url, function(error, response, body) {

  //         if (!error && response.statusCode == 200) {
  //            const openid =  body.openid;
  //            getAccessToken(openid);   //获取openid成功后调用getAccessToken
  //         }

  //     });
  // }


/**
 * 获取code
 */
 
// app.get('/authentication', function(req, res) {

    
// });


/**
 * 发送模板消息
 * @param  { string } openid [发送模板消息的接口需要用到openid参数]
 * @param  { string } access_token [发送模板消息的接口需要用到access_token参数]
 */

// sendTemplateMsg(openid, access_token) {
//         const access_token = getAccessToken()

//         const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`; //发送模板消息的接口
        
//         const requestData = { //发送模板消息的数据
//             touser: openid,
//             template_id: 'hMwj2qBFJYGxpKFztn3j5etNbIJePJnwLowxAZCv6VE',
//             url: 'http://weixin.qq.com/download',
//             data: {
//                 first: {
//                     value: '身份信息',
//                     color: "#173177"
//                 },
//                 keyword1: {
//                     value: '张三',
//                     color: '#1d1d1d'
//                 },
//                 keyword2: {
//                     value: '男',
//                     color: '#1d1d1d'
//                 },
//                 keyword3: {
//                     value: '45',
//                     color: '#1d1d1d'
//                 },
//                 remark: {
//                     value: '已登记！',
//                     color: '#173177'
//                 }
//             }
//         };

//         request({
//             url: url,
//             method: 'post',
//             body: requestData,
//         }, function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log('模板消息推送成功'); 
//             }
//         });
//     }


}

module.exports = gzhController;
