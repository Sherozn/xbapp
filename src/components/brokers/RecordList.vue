<template>
  <div class="book-card">
    <div class="table" width="98%">
      <div class="tr">
        <div class="date">{{msg.keyword}}</div>
        <div class="busi">
          <label>{{msg.context}}</label>
        </div>
        <div class="btns">
          <button class="btn" @click='deleteMsg'>
            <label>删除</label>
          </button>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
import axios from 'axios'
export default {
  props: ['msg'],
  methods: {
    async deleteMsg(){
      console.log("msg",this.msg.id)
      await axios({
        url: `${config.host}/wx/deleteMsg`,
        method: 'post',
        data:{
          id:this.msg.id
        }
      }).then(res => {
        console.log("res",res);
        window.location.reload()
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .book-card
    background #FFFFFF
    margin-bottom 6px
    .table 
      border 0px solid darkgray
      font-size 15px
      height 42px
      line-height 42px
      .tr 
        display flex
        width 100%
      .date
        width 25%
        margin-left 10px
      .busi
        width 50%
        font-weight bold
      button
        color white
        background #ff7700
        margin 5px 4px 0 0
        padding 0 3px
        border-radius 5px
        font-size 13px
        line-height 30px
        height 30px
        float right
      .net
        width 16%
        text-align center
        width 60px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        margin-left 5px
        line-height 42px
        .no-note
          text-decoration underline
          color #C0C0C0
          font-size  13px
      .image
        padding-top 1px
        float right
        margin-left  5px
    .hide
      background #F0F0F0
      font-size 15px
      padding 10px 10px 3px 30px
      .input
        width 60%
        height 30px
        background #FFFFFF
        border 1px solid black
        border-radius 5px
        text-align center
    .img
      width 13px
      height 13px
      margin-right 5px
</style>
