<template>
  <div>
   我是
  </div>
</template>

<script>
  export default {
    name:'BrokerList',
    methods:{
      serUrl(url){
        console.log("url setUrl",url)
        var urlObj = {}
        if(/\?/.test(url)){
          var urlStr = url.split('?')[1]
          var urlArr = urlStr.split('&')
          for(var i=0;i<urlArr.length;i++){
            var urlItem = urlArr[i]
            var item = urlItem.split('=')
            urlObj[item[0]] = item[1]
          }
          return urlObj;
        }
        return null;
      }
    },
    mounted(){
      console.log("urllll",window.location.href)
      this.serUrl(window.location.href)
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