<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="content-text">
          <div class="row">
            <label class="label">保险名称：</label>
            <input v-model='name'
              class="input"
              maxlength='20'
              placeholder="【必填】不超过20个字">
          </div>
          <div class="row">
            <label class="label">描述：</label>
            <input v-model='note'
              class="input"
              maxlength='60'
              placeholder="【必填】不超过58个字">
          </div>
          <div class="row">
            <label class="label">标签：</label>
            <input v-model='label'
              class="input"
              maxlength='4'
              placeholder="【选填】不超过4个字">
          </div>
          <div class="row">
            <label class="label">最低价格：</label>
            <input v-model='price'
              class="input"
              placeholder="【必填】只可填写数字，两位小数">
          </div>
          <div class="row">
            <label class="label">保险链接：</label>
            <input v-model='buyUrl' class="input" placeholder="【必填】">
          </div>
          <div class="row">
            <label class="label">测评链接：</label>
            <input v-model='testUrl' class="input" placeholder="【选填】">
          </div>
          <div class="row">
            <label class="label">保险类型：</label>
            <select v-model="as_type_name" class="input" @change="changeType($event)">
              <option v-for="(ins_type,index) in ins_types" :key="index"  :value='index'>{{ins_type}}</option>

            </select>

          </div>
          <div class="imgType">
            
          </div>
            <label class="" class="label">图片：</label>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              ref="upload"
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
  data(){
    return{
      name:"",
      note:"",
      label:"",
      price:"",
      buyUrl:"",
      testUrl:"",
      as_type:1,
      as_type_name:"重疾险",
      ins_types:["重疾险", "寿险", "医疗险", "意外险", "年金险", "旅行意外险", "家财险"],
      fileList:[],
      error:"",
      user_id:0

    }
  },
  methods: {
    Cancel () {
      this.$emit('ifAdd',0)
    },
    changeType(event){
      this.as_type = parseInt(event.target.value)+1;
      console.log("as_type",this.as_type)
    },
    submitUpload(){
      if(this.name && this.name.length<20 && this.note && this.note.length<60 && this.price && this.buyUrl){
        const data = {
          name:this.name,
          note:this.note,
          price:this.price,
          buyUrl:this.buyUrl,
          testUrl:this.testUrl,
          as_type:this.as_type,
          label:this.label,
          user_id:this.user_id
        };
        console.log("data",data)
        const fileArray = this.$refs.upload.uploadFiles;

        console.log("fileArray",fileArray)
        // 实例化FormData对象
        const fd = new FormData();
        // 遍历文件数组，将所有文件存入fd中
        for(let i = 0; i < fileArray.length; i++) {
          fd.append('avatar', fileArray[i].raw);
        }
        // 发送HTTP请求，发送数据
        axios({
            url: `${config.host}/product/addProduct`,
            method: 'post',
            data: fd,
            params: data
        }).then(res => {
            this.$emit('ifAdd',1)
            console.log("addProduct的res：",res);
        })
      }else{
        this.error = "*必填项为空，或者超出规定长度，请检查重新提交"
      }
      
    }
  },
  mounted(){
    this.user_id = this.$store.getters.userinfo.id
    if(!this.user_id){
      this.user_id = localStorage.getItem("user-xbapp")
    }
    console.log("user_id",this.user_id)
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
.row{
  border-bottom:1px #C0C0C0 solid;
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
button {
  background:#feb600;
  color: #ffffff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
