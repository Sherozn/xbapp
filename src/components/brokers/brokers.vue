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

    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    data() {
      return {
        brokers:[["辉立",true],["华泰",true],["华赢",true],["东财",true],["尊嘉",true],["富途",true],["玖富",true],["友信",true],["东方",true],["广发",true],["华盛通",true],["青石",true],["佳兆业",true],["方德",true],["利弗莫尔",true],["国都",true],["复星",true],["瑞丰",true],["艾德",true],["雪盈",true],["老虎",true]],
        rohs: true
      }
    },

    methods:{
      changeInOpen(res,index){
        this.brokers[index][1] = res
        console.log("nihao",this.brokers)
      },
      // getCode(){
      //   axios({
      //       url: `${config.host}/wx/getCode`,
      //       method: 'get'
      //   }).then(res => {
      //       // this.$emit('ifAdd',1)
      //       console.log("getCode",res);
      //   })
      // },
      GetUrlParam(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        console.log("window.location.search", window.location.search)
        console.log("rrrrrr",r)
        if(r != null) return unescape(r[2])
        return null
      },
      getCode () { // 非静默授权，第一次有弹框
        const code = this.GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        console.log("code",code)
        const local = window.location.href
        console.log("local",local)
        console.log("window.APPID",window.APPID)
        if (code == null || code === '') {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'

            
        } else {
            console.log("去获取用户信息")
            // this.getOpenId(code) //把code传给后台获取用户信息
        }
      },
      getOpenId (code) { 
        // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
        let _this = this
        this.$http.post('/api/user/wechat/login', {code: code}).then((res) => {
            let datas = res.data
            if (datas.code === 0 ) {
                console.log('成功')
            }
        }).catch((error) => {
            console.log(error)
        })
      }

    },
    mounted(){
      this.getCode();
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