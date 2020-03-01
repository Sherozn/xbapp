<template>
  <div>
    <div class="login">
      <div>
        <label class="label">用户名：</label>
        <input v-model='name' class="input title">
      </div>
      <div>
        <label class="label">密码：</label>
        <input v-model='password' type="password" class="input title" style="margin-left: 14px;">
      </div>
      <div class="error"> {{error}}</div>
      <div class="button" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  export default {
    data() {
      return {
        name:"",
        password:"",
        error:""
      };
    },
    methods: {
      login(){
        const data = {
          name:this.name
        }
        axios.get(`${config.host}/user/login`,{
          params:data
        }).then(res => {
            // this.products = res.data.products
            console.log("res",res.data.user)
            if(res.data.user){

              if(res.data.user.password == this.password){
                localStorage.setItem("Flag", "isLogin");
                localStorage.setItem("user-xbapp", res.data.user.id);
                // this.$store.dispatch("userLogin", true);
                this.$store.dispatch("userInfo",res.data.user)
                this.$router.replace("/admin");
              }else {
                this.error = "密码错误，请确认后再输入";
              }
            }else{
              this.error = "用户名错误，请确认后再输入";
            }
            
        })
      }
    }
  }

</script>

<style scoped>
  .login{
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    text-align:center;
  }
  .label{
    float: left;
    font-size: 15px;
    line-height:50px;
    margin-left: 20px;
  }
  .input{
    height:40px;
    width: 60%;
    line-height:40px;
    background: #fff;
    color: #707070;
    border: 1px solid #eaeaea;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .button{
    width: 20%;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    font-size: 16px;
    background: #ff7700;
    padding: 10px 20px;
    margin: 0 auto;
  }

  .error{
    color: red;
    margin-bottom:10px;
    text-align: center;
  }



</style>