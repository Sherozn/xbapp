<template>
	<div>
    菜单信息（仅支持json）：
		<input v-model='menus'
           class="input">
    <div class="modal-footer btnConfirm" @click="submit">提交</div>
	</div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  export default {
    data(){
      return{
        menus:""
      }
    },
    methods:{
    	submit(){
        if(this.menus.length > 1){
          const data = {
            menus:this.menus,
            part:this.$route.params.part
          }
          console.log("data",data)
          axios({
            url: `${config.host}/wx/addMenu`,
            method: 'get',
            params: data
          }).then(res => {
            console.log("submit",res);
          })
        }
	      
	    }
    }
  }
</script>
<style scoped>
	.input{
    height:50px;
    width: 80%;
    line-height:50px;
    background: #fff;
    color: #707070;
  }
  .modal-footer {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e5e5e5;
    font-size: 16px;
    font-weight:bold;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background:#feb600;
  }
  .btnConfirm {
    font-size: 32rpx;
    width: 50px;
    height: 50px;
    text-align: center;
  }
</style>
