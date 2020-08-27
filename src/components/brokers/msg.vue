<template>
  <div class="brokers">
    <div class="header">
      消息设置
    </div>
    <div class="context">
      <div v-if="as_type == 0" class="row2">
        <span>关键词：</span>
        <input v-model="keyword"
          class="input" 
          active-color="#ff7700"
          inactive-color="#dcdfe7"></input>
      </div>
      <div class="row">
        <span>内容：</span>
        <textarea v-model="context"
          class="text" 
          active-color="#ff7700"
          inactive-color="#dcdfe7"></textarea>
      </div>
      <div v-if="as_type == 0" class="row2">
        <span>关键词类型：</span>
        <select v-model="key_type" class="text" @change="changeKeyType($event)">
          <option v-for="(key,index) in key_types" :key="index" :value='index'>{{key}}</option>
        </select>
      </div>  
      <div v-if="as_type == 0" class="row2">
        <span>内容类型：</span>
        <select v-model="context_type" class="text" @change="changeContextType($event)">
          <option v-for="(con,index) in context_types" :key="index" :value='index'>{{con}}</option>
        </select>
      </div>  
      <div class="row2">
        <span>消息类型：</span>
        <select v-model="as_type" class="text" @change="changeType($event)">
          <option v-for="(ty,index) in types" :key="index" :value='index'>{{ty}}</option>
        </select>
      </div>  
      <div class="btnConfirm" @click="submit">提交</div>
    </div>
    <div>
      <div class="table th">
        <div class="date" v-if="as_type == 0">关键词</div>
        <div class="busi">内容</div>
        <div class="date">操作</div>
      </div>
      <div>
        <RecordList :key='index' v-for='(msg,index) in msgs' :msg='msg'></RecordList>

      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/config.js'
  import axios from 'axios'
  import RecordList from '@/components/brokers/RecordList'
  export default {
    name:'Msg',
    components: {
      RecordList
    },
    data() {
      return {
        keyword:"",
        context:"",
        as_type:0,
        types:["关键词回复","关注回复","自动回复"],
        key_type:0,
        key_types:["半匹配","全匹配"],
        context_type:0,
        context_types:["文字","图文"],
        msgs:[]
      }
    },
    methods:{
      changeType(event){
        this.as_type = parseInt(event.target.value);
        console.log("as_type",this.as_type)
        this.getMsg()
      },
      changeKeyType(event){
        this.key_type = parseInt(event.target.value);
        console.log("key_type",this.key_type)
      },
      changeContextType(event){
        this.context_type = parseInt(event.target.value);
        console.log("context_type",this.context_type)
      }
      async submit(){
        if(this.context.length > 0){
          await axios({
            url: `${config.host}/wx/sendMsg`,
            method: 'post',
            data:{
              as_type:this.as_type,
              keyword:this.keyword,
              context:this.context,
              key_type:this.key_type
            }
          }).then(res => {
            console.log("res",res);
          })
        }else{
          console.log("没有填写")
        } 
      },
      async getMsg(){
        await axios({
          url: `${config.host}/wx/getMsg`,
          method: 'get',
          params:{
            as_type:this.as_type
          }
        }).then(res => {
          if(res.data.state == "200"){
            this.msgs = res.data.msgs
          }
          console.log("this.msgs",this.msgs);
        })
      }
    },
    mounted(){
      this.getMsg()
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
          line-height 150px
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
        .input
          height 50px
          width 60%
          line-height 50px
          background-color #f4f4f4
          color #707070
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
    .th
      width 100%
      height 30px
      line-height 30px
      margin-top 20px
      background #EA5149
      color #FFFFFF
      font-size 16px
      font-weight bold
      display flex
      .date
        width 27%
        padding-left 10px
      .busi
        width 46%
        margin-left 5px
      
                   
</style>