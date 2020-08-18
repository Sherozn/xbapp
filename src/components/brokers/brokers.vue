<template>
  <div class="brokers">
    <div class="header">
      订阅港股额度通知
    </div>
    <div class="context">
      <span class="open">打开订阅</span>
      <el-switch
        v-model="rohs"
        active-color="#ff7700"
        inactive-color="#dcdfe7">
      </el-switch>
    </div>

    <div class="in-context" v-if="rohs">
      <div class="broker" v-for="(broker,index) in brokers" :key="index">
        <!-- <elSwitch :broker="broker"></elSwitch> -->
        <span class="in-open">{{broker[0]}}</span>
        <div class="elswitch">
          <el-switch
            v-model="broker[1]"
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
  // import elSwitch from '@/components/brokers/elSwitch'
  import config from '@/config.js'
  import axios from 'axios'
  import elSwitch from '@/components/brokers/elSwitch'
  export default {
    name:'Brokers',
    // components: {
    //   elSwitch
    // },
    data() {
      return {
        brokers:[["辉立",true],["华泰",true],["华赢",true],["东财",true],["尊嘉",true],["富途",true],["玖富",true],["友信",true],["东方",true],["广发",true],["华盛通",true],["青石",true],["佳兆业",true],["方德",true],["利弗莫尔",true],["国都",true],["复星",true],["瑞丰",true],["艾德",true],["雪盈",true],["老虎",true]],
        rohs: true,
        url:"",
        openid:"",
        code:""
      }
    },

    methods:{
      changeInOpen(res,index){
        this.brokers[index][1] = res
        console.log("nihao",this.brokers)
      },
      GetUrlParam(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if(r != null) return unescape(r[2])
        return null
      },
      getCode () { 
        this.openid = localStorage.getItem("UserOpenid")
        console.log("this.openid",this.openid)
        if(!this.openid || this.openid==="undefined"){
          this.code = this.GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
          console.log("code：",this.code)
          if (this.code == null || this.code === '') {
              // 静默授权
            const local = "http://lgshuolicai.com/brokers"
            const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect'
            
            window.location.href = url
            console.log("url", url)
            // const code = this.GetUrlParam('code')
            console.log("code：",this.code)
            
          }else{
            console.log("去获取用户信息") 
            axios({
              url: `${config.host}/wx/getOpenid`,
              method: 'post',
              data:{
                code:this.code
              }
            }).then(res => {
              console.log("getOpenid",res);
              localStorage.setItem("UserOpenid",res.data.openid);
              this.openid = res.data.openid
            })
          }
        }
      }
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
        height 40px
        line-height 40px
        font-size 13px
        border-bottom 1px  solid rgba(0,0,0,.05)
        .in-open
          padding-left:80px
        .elswitch
          width 30%
          float:right
          padding-left 30px                      
</style>