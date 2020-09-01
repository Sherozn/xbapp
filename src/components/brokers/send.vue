<template>
  <div class="brokers">
    <div class="header">
      发送模板
    </div>
    <div class="context">
      <div class="row">
        <span>内容：</span>
        <textarea v-model="templates"
          class="text" 
          active-color="#ff7700"
          inactive-color="#dcdfe7"></textarea>
      </div>
      <div class="row2">
        <span>券商名称：</span>
        <select v-model="default_broker" class="text" @change="changeBroker($event)">
          <option v-for="(broker,index) in brokers" :key="index" :value='index'>{{broker}}</option>
        </select>
      </div>  
      <div class="row2">
        <span>用户范围：指定</span>
      </div>  
      <div class="btnConfirm" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
  import config from '@/config.js'
  import axios from 'axios'
  export default {
    name:'SendTemplate',
    data() {
      return {
        templates:"",
        brokers:["辉立","华泰","华赢","东财","尊嘉","富途","玖富","友信","有鱼","东方","广发","华盛通","青石","佳兆业","方德","利弗莫尔","国都","复星恒利","瑞丰","艾德","雪盈","老虎","耀才"],
        default_broker:0
      }
    },

    methods:{
      changeBroker(event){
        this.default_broker = parseInt(event.target.value)
        console.log("default_broker",this.default_broker)
      },
      async submit(){
        console.log("this.templates",this.templates)
        if(this.templates.length > 10){
          await axios({
            url: `${config.host}/wx/send`,
            method: 'post',
            data:{
              as_type:0,
              broker:this.default_broker+10,
              templates:this.templates
            }
          }).then(res => {
            console.log("res",res);
          })
        }else{
          console.log("没有填写")
        }
        
      }
    },
    mounted(){
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
      text-align center
    .context
      border-radius 5px
      font-weight bold
      .row 
        height 150px
        line-height 150px
        padding 10px
        margin-bottom 10px
        background-color #ffffff
        .text
          height 150px
          width 80%
          padding-left 10px
          background-color #f4f4f4    
      .row2
        height 50px
        line-height 50px
        padding 10px
        margin-bottom 10px
        background-color #ffffff
        .text
          height 50px
          line-height 50px
          width 50%
          padding-left 10px
      .btnConfirm
        margin:0 auto
        background-color #ff7700
        height 50px
        line-height 50px
        color #ffffff
        font-size 36rpx
        width 50%
        text-align center
                   
</style>