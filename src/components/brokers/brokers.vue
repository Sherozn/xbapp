<template>
  <div class="brokers">
    <div class="header">
      订阅港股额度通知
    </div>
    <div class="context">
      <span class="open">打开订阅</span>
      <el-switch
        v-model="rohs"
        @change="changeOrder()"
        active-color="#ff7700"
        inactive-color="#dcdfe7">
      </el-switch>
    </div>

    <div class="in-context" v-if="rohs">
      <div class="broker" v-for="(broker,index) in brokers" :key="index">
        <span class="in-open">{{broker}}</span>
        <div class="elswitch">
          <el-switch
            v-model="brokers_status[index]"
            @change="changeInOpen($event,index)"
            active-color="#ff7700"
            inactive-color="#dcdfe7">
          </el-switch>
        </div>
        
      </div>    
    </div>
  </div>
</template>

<script>
  import config from '@/config.js'
  import axios from 'axios'
  export default {
    name:'Brokers',
    data() {
      return {
        brokers:["辉立","华泰","华赢","东财","尊嘉","富途","玖富","友信","有鱼","东方","广发","华盛通","青石","佳兆业","方德","利弗莫尔","国都","复星恒利","瑞丰","艾德","雪盈","老虎","耀才"],
        brokers_status:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
        nos:[],
        rohs: false,
        openid:"",
        code:"",
        broker_id:0
      }
    },

    methods:{
      GetUrlParam(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if(r != null) return unescape(r[2])
        return null
      },
      async getCode () { 
        // localStorage.setItem("UserOpenid","dHgzEvjh9uBw39MZTyAg_zgawZWU");
        this.openid = localStorage.getItem("UserOpenid")
        console.log("this.openid",this.openid)
        if(!this.openid || this.openid==="undefined"){
          this.code = this.GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
          console.log("code：",this.code)
          if (this.code == null || this.code === '') {
              // 静默授权
            const local = `http://lgshuolicai.com/brokers/${this.$route.params.part}`
            const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid[this.$route.params.part] + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect'
            
            window.location.href = url
            console.log("url", url)
            console.log("code：",this.code)
          }else{
            console.log("去获取用户信息") 
            await axios({
              url: `${config.host}/wx/getOpenid`,
              method: 'post',
              data:{
                code:this.code,
                part:this.$route.params.part
              }
            }).then(res => {
              console.log("getOpenid",res);
              localStorage.setItem("UserOpenid",res.data.openid);
              this.openid = res.data.openid
              this.getOrder()
            })
          }
        }else{
          this.getOrder()
        }
      },
      // 获取当前用户的订阅状态
      async getOrder(){
        console.log("this.openid getOrder",this.openid)
        await axios.get(`${config.host}/wx/getOrder`,{
          params:{
            openid:this.openid
          }
        }).then(res => {
          if(res.data.state==='200'){
            console.log("res.data.brokers",res.data.brokers)
            this.rohs = res.data.brokers.isOrder === 1? true : false
            this.broker_id = res.data.brokers.id
            if(res.data.brokers.nos){
              this.nos = JSON.parse(`[${res.data.brokers.nos}]`)
              var i=0,len=this.nos.length;
              for(; i<len;){
                this.brokers_status[this.nos[i]-10] = false
                i++;
              }
            }
            console.log("this.brokers_status",this.brokers_status)
          }else{
            console.log("error",res)
          }
        })
      },
      changeOrder(){
        console.log("this.rohs",this.rohs)
        axios({
          url: `${config.host}/wx/changeOrder`,
          method: 'post',
          data:{
            isOrder:this.rohs,
            broker_id:this.broker_id
          }
        }).then(res => {
          console.log("changeOrder",res);

        })
      },
      changeInOpen(res,index){
        this.brokers_status[index] = res
        index = index + 10
        var ind = this.nos.indexOf(index)
        console.log("ind",ind)
        if(res){
          if(ind > -1){
            this.nos.splice(ind, 1)
          }
        }else{
          if(ind == -1){
            this.nos.push(index)
          }
        }
        console.log("this.nos",this.nos)
        axios({
          url: `${config.host}/wx/changeInOpen`,
          method: 'post',
          data:{
            nos:this.nos.join(","),
            broker_id:this.broker_id
          }
        }).then(res => {
          console.log("changeInOpen",res);

        })
      },
    },
    mounted(){
      this.getCode()
    }

  }
</script>
<style lang='stylus' scoped>
  .brokers
    width 100%
    font-size 15px
    .header
      background-color #ff7700
      height 45px
      line-height 45px
      margin-bottom 15px
      color #ffffff
      font-weight bold
      text-align: center;
    .context
      height 50px
      line-height 50px
      background-color #ffffff
      margin 5px
      border-radius 5px
      font-weight bold
      text-align: center;
      .open
        padding-right 50px
    .in-context
      background-color #ffffff
      border-radius 5px
      margin-top 15px
      .broker
        height 50px
        line-height 50px
        font-size 13px
        border-bottom 1px  solid rgba(0,0,0,.05)
        .in-open
          padding-left:80px
        .elswitch
          width 30%
          float:right
          padding-left 30px                      
</style>