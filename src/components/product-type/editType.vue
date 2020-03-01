<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="content-text">
          <label class="label">序号：</label>
          <input v-model='as_sort'
            type="number" 
            class="input"
            maxlength='5'
            placeholder="序号为非0正整数">
        </div>
        <div class="error"> {{error}}</div>
      </div>
      <div class="modal-footer">
         <!-- 小程序集成的API，通过button来授权登录 -->
         <div class="btnCancel" @click="Cancel">取消</div>
         <div class="btnConfirm" @click="submitUpload">保存</div>
         <!--  -->
      </div>
     
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
import axios from 'axios'
export default { 
  props:['product_type_id'],
  data(){
    return{
      as_sort:"",
      error:""
    }
  },
  methods: {
    Cancel () {
      this.$emit('ifEdit',0)
    },
    async submitUpload(){
      if(this.as_sort){
         const data = {
          id:this.product_type_id,
          as_sort:this.as_sort
        };

        await axios({
            url: `${config.host}/productType/editType`,
            method: 'post',
            data: data
        }).then(res => {
          this.$emit('ifEdit',this.as_sort)
          this.as_sort = ""
        })
      }else{
        this.error = "需要不能为空，请检查重新提交"
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  position: fixed; 
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 500px;
  overflow: hidden;
  top:100px;
  left: 0;
  right: 0;
  position: fixed; 
  margin: auto;
  z-index: 9999;
  background: #fff;
  border-radius: 5px;
}
.modal-content {
  margin: 10px 10px 0 0;
  font-size: 14px;
}
.content-text {
  padding:5px 0px 50px 0px;
}
.label{
  float: left;
  font-size: 15px;
  line-height:50px;
  margin-left: 20px;
}
.input{
  height:50px;
  width: 80%;
  line-height:50px;
  background: #fff;
  color: #707070;
}
.error{
  color: red;
  margin-bottom:10px;
  text-align: center;
}
.imgType{
  margin-left: 15px;
  margin: 0px 15px 15px 6px;

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
.btnCancel {
  width: 50%;
  font-size: 32rpx;
  background:#ffffff;
  text-align: center;
  border-right: 1px solid #e5e5e5;
 }
.btnConfirm {
  font-size: 32rpx;
  width: 50%;
  text-align: center;
}
</style>
