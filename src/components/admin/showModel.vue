<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="content-text">
          <p>{{text}}</p>
        </div>
      </div>
      <div class="modal-footer">
         <!-- 小程序集成的API，通过button来授权登录 -->
         <div class="btnCancel" @click="tapCancel">取消</div>
         <div class="btnConfirm" @click="confirm">确定</div>
         <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["text"],
  methods: {

    //登录成功会调用loginSuccess方法
    tapCancel () {
      this.$emit('ifShow',0)
    },
    confirm(){
      this.$emit('ifShow',1)
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
  width: 350px;
  overflow: hidden;
  top:200px;
  left: 0;
  right: 0;
  position: fixed; 
  margin: auto;
  z-index: 9999;
  background: #fff;
  border-radius: 5px;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding-top: 40px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-text {
  padding:10px 0px 50px 0px;
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
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}
</style>
