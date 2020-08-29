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
const Seq = require('sequelize')
const Op = Seq.Op

const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize



//引入数据表模型
const brokers = Sequelize.import('../module/brokers')
const msgs = Sequelize.import('../module/msgs')

//自动创建表
brokers.sync({ force: false }); 
msgs.sync({ force: false }); 


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

  static async getOrder(openid){
    return await brokers.findCreateFind({
      where:{
        openid:openid
      },
      attributes:['id','isOrder','nos'],
      raw:true
    })
  }

  static async changeOrder(data){
    return await brokers.update(
      {
        isOrder:data.isOrder
      },
      {
        'where': { 'id': data.broker_id }
      }
    )
  }

  static async changeInOpen(data){
    return await brokers.update(
      {
        nos:data.nos
      },
      {
        'where': { 'id': data.broker_id }
      }
    )
  }

  static async getOpenId(data){
    return await brokers.findAll({
      where:{
        isOrder:true,
        nos:{
          [Op.notLike]:`%${data.broker}%`
        }
      },
      attributes:['openid'],
      raw:true
    })
  }

  static async getUsers() {
    try{
      var access_token = await gzhModule.getAccessToken()
      const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&next_openid=`
      var res = await rp(url)
      const result = JSON.parse(res)
      console.log("result",result.data.openid)
      return result.data.openid
    }catch(e){
      console.log("获取用户信息失败",e)
    }
  }

  static async addMsg(data) {
    return await msgs.create({
      context: data.context,
      key_type: data.key_type,
      keyword:data.keyword,
      as_type:data.as_type
    })
  }

  static async changeMsg(id,data) {
    return await msgs.update(
      {
        context: data.context,
        key_type: data.key_type,
        context_type: data.context_type
      },
      {
        'where': { 'id': id}
      }
    )
  }

  static async getMsg(data) {
    return await msgs.findOne({
      where:{
        keyword:data.keyword,
        as_type:data.as_type
      },
      attributes:['id',"context","context_type"],
      raw:true
    })
  }

  static async deleteMsg(id) {
    return await msgs.destroy({
      where: {
        id: id
      }
    })
  }

  static async getMsgs(as_type) {
    return await msgs.findAll({
      where:{
        as_type:as_type
      },
      attributes:['id','keyword',"context"],
      raw:true
    })
  }

  static async getKeys() {
    return await msgs.findAll({
      where:{
        as_type:0
      },
      attributes:['id','keyword',"context","context_type"],
      raw:true
    })
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
    // var as_type = 0
    const context = ""
    const context_type = 0
    var flag = true
    // 关注事件

    var data = {
      keyword:msg.Content,
      as_type:0
    }
    if(msg.Event == "subscribe"){
      data.as_type = 1
      const res = await getMsg(data)
    }else if(MsgType == "text"){
      const result = await getKeys()
      for(var i = 0;i<result.length;i++){
        console.log("result",result[i].keyword)
        // 如果用户发的消息包含关键字，
        if(msg.Content.indexOf(result[i].keyword) != -1){
          flag = false
          context = result[i].context
          context_type = result[i].context_type
          console.log("context",context); 
        }
      }
      if(flag){
        data.as_type = 2
        const res = await getMsg(data)
      }
    }
    console.log("res",res)

    if(res){
      context = res.context
      context_type = res.context_type
    }

    switch (MsgType) {
        case 'text':
            result = wx.message.text(msg, context,context_type)
            console.log("resultTest",result)
            break;
        case 'event':
            result = wx.message.event(msg, context)
            console.log("resultEvent",result)
            break;
        default: 
            result = 'success'
    }
    ctx.res.setHeader('Content-Type', 'application/xml')
    ctx.res.end(result)
  }

  // 发送模板消息
  static async sendTemplateMsg(ctx) {
    const data = ctx.request.body
    console.log("data",data)
    try{
      const as_type = ctx.request.body.as_type
      console.log("as_type",as_type)
      const templates = JSON.parse(ctx.request.body.templates)
      console.log("templates",templates)

      const access_token = await gzhModule.getAccessToken()
      console.log("access_token",access_token)

      const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`; 
      const nowTime = new Date().getTime()
      if(as_type == 0){
        const openids = await gzhModule.getOpenId(data) 
        for(var i = 0;i<openids.length;i++){
          console.log("openid",openids[i].openid)
          templates["touser"] = openids[i].openid
          console.log("templates",templates); 
          const result = await axios.post(url,templates)
          console.log("result openid",result); 
        }
      }else if(as_type == 1){
        const openids = await gzhModule.getUsers()
        for(var i = 0;i<openids.length;i++){
          console.log("openid",openids[i])
          templates["touser"] = openids[i]
          console.log("templates",templates); 
          const result = await axios.post(url,templates)
          console.log("result openid",result); 
        }
      }

      
      ctx.body = {
        state: '200',
        msg: '发送 成功'
      }
    }catch(e){
      console.log("error",e)
      ctx.body = {
        state: '0',
        msg:'发送模板 失败'
      }
    }  
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

      if(!result.errCode){
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

  // 获取openid
  static async getOpenid(ctx) {
    console.log("getOpenid",ctx.request.body)
    const code = ctx.request.body['code']
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appid}&secret=${config.wx.secret}&code=${code}&grant_type=authorization_code`;

    const result = await axios.get(url)
    console.log("result",result.data)

    if(!result.errCode){
      ctx.body = {
        state: '200',
        msg: '获取openid 成功',
        openid: result.data.openid
      }
    }else{
      ctx.body = {
        state: '0',
        msg:'获取openid 失败',
        desc: result.data
      }
    }
  }

  static async getOrder(ctx) {
    
    const openid = ctx.request.query.openid
    console.log("openid",openid)
    try{
      const res = await gzhModule.getOrder(openid);

      console.log("res getOrder",res[0])

      ctx.body = {
        state: '200',
        msg: '获取Order 成功',
        brokers: res[0]
      }
    }catch (error) {
      console.log("error",error)
      ctx.body = {
        state: '0',
        msg:'获取Order 失败',
        desc: error
      }
    }
  }

  static async changeOrder(ctx) {
    
    const data = ctx.request.body
    console.log("data",data)
    try{
      const res = await gzhModule.changeOrder(data);

      console.log("res",res)

      ctx.body = {
        state: '200',
        msg: '获取Order 成功'
      }
    }catch (error) {
      ctx.body = {
        state: '0',
        msg:'获取Order 失败',
        desc: error
      }
    }
  }

  static async changeInOpen(ctx) {
    
    const data = ctx.request.body
    console.log("data",data)
    try{
      const res = await gzhModule.changeInOpen(data);

      console.log("res",res)

      ctx.body = {
        state: '200',
        msg: '获取Order 成功'
      }
    }catch (error) {
      ctx.body = {
        state: '0',
        msg:'获取Order 失败',
        desc: error
      }
    }
  }

  // 设置消息回复
  static async sendMsg(ctx) {
    const data = ctx.request.body
    console.log("data",data)
    try{
      const res = await gzhModule.getMsg(data);
      console.log("res",res)

      if(res){
        await gzhModule.changeMsg(res.id,data);
      }else{
        await gzhModule.addMsg(data);
      }

      ctx.body = {
        state: '200',
        msg: '获取Order 成功'
      }
    }catch (error) {
      console.log("error",error)
      ctx.body = {
        state: '0',
        msg:'获取Order 失败',
        desc: error
      }
    }
  }

  // 设置消息回复
  static async getMsg(ctx) {
    const as_type = ctx.request.query.as_type
    console.log("as_type",as_type)
    try{

      const res = await gzhModule.getMsgs(as_type);
      console.log("res",res)

      ctx.body = {
        state: '200',
        msg: '获取Order 成功',
        msgs:res
      }
    }catch (error) {
      ctx.body = {
        state: '0',
        msg:'获取Order 失败',
        desc: error
      }
    }
  }

  // 删除关键词回复
  static async deleteMsg(ctx) {
    const id = ctx.request.body.id
    console.log("id",id)
    try{
      const res = await gzhModule.deleteMsg(id);
      console.log("res",res)

      ctx.body = {
        state: '200',
        msg: '获取Order 成功'
      }
    }catch (error) {
      ctx.body = {
        state: '0',
        msg:'获取Order 失败'
      }
    }
  }
}

module.exports = gzhController;
