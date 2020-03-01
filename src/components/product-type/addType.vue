<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="content-text">
          <el-checkbox class="row" v-for="(product,index) in products_name" :key="index" v-model="product[index]" :label="product.name" @change="getProductIds(product.id)" border></el-checkbox>
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
  props:["type1","type2"],
  data(){
    return{
      types_arr:[],
      error:"",
      product:[],
      product_ids:[],
      products_name:[],
      user_id:0
    }
  },
  methods: {
    Cancel () {
      this.$emit('ifType',0)
    },
    getProductName(){
      axios.get(`${config.host}/product/getAllProductName`,{
        params:{
          user_id:this.user_id
        }
      }).then(res => {
        this.products_name = res.data.products
        console.log("products_name",this.products_name)
      })
    },
    getProductIds(product_id){
      var index = this.product_ids.indexOf(product_id);
      if(index>-1){
        this.product_ids.splice(index,1);
      }else{
        this.product_ids.push(product_id)
      }
      console.log("this.product_ids",this.product_ids)
    },
    submitUpload(){
      if(this.product_ids.length > 0){
        
        const data = {
          type1:this.type1,
          type2:this.type2,
          product_ids:this.product_ids,
          user_id:this.user_id
        };
        console.log("data submitUpload",data)
        
        // 发送HTTP请求，发送数据
        axios({
            url: `${config.host}/productType/createType`,
            method: 'post',
            data: data
        }).then(res => {
            this.$emit('ifType',1)
            console.log(res.data);
        })
      }else{
        this.error = "没有选择项，请检查后再重新保存"
      }
      
    }
  },
  mounted(){
    this.user_id = this.$store.getters.userinfo.id
    console.log("user_id",this.user_id)
    if(!this.user_id){
      this.user_id = localStorage.getItem("user-xbapp")
    }

    this.getProductName()
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
  width: 550px;
  top:100px;
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed; 
  margin: auto;
  z-index: 9999;
  background: #fff;
  border-radius: 5px;
}
.modal-content {
  margin: 10px 10px 0 0;
  font-size: 14px;
  overflow-y: scroll;
  height: 400px;
}
.content-text {
  padding:5px 0px 50px 0px;
}
.row{
  border-bottom:1px #C0C0C0 solid;
  margin: 10px 20px 0 10px;
}
.label{
  float: left;
  font-size: 15px;
  line-height:50px;
  
}

.error{
  color: red;
  margin-bottom:10px;
  text-align: center;
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
