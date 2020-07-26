<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>配置</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">保险配置</el-menu-item>
              <router-link tag="div" to="/types">
                <el-menu-item index="1-2">编辑标签</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>账户管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">头部图片</el-menu-item>
              <el-menu-item index="2-2">图标配置</el-menu-item>
              <el-menu-item index="2-3">标签配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 18px">
          <span>力哥理财</span>
        </el-header>
        <el-main>
          <div class="add" @click="addProduct">
            添加保险
          </div>
          <el-table :data="products">
            <img :src="products.imgUrl">
            <el-table-column prop="imgUrl" label="图片">
               <template  slot-scope="scope">        
                  <img :src="scope.row.imgUrl" width="70" height="70" />
               </template>         
          </el-table-column> 
            <el-table-column prop="name" label="保险名称" width="120"></el-table-column>
            <el-table-column prop="note" label="描述" width="230"></el-table-column>
            <el-table-column prop="label" label="标签" width="80"></el-table-column>
            <el-table-column prop="price" label="最低价格" width="90"></el-table-column>
            <el-table-column prop="buyUrl" label="购买链接" width="220"></el-table-column>
            <el-table-column prop="testUrl" label="测评链接" width="190"></el-table-column>
            <el-table-column label="操作" width="100">
              <template  slot-scope="scope">
                <button class="delete" @click="editProduct(scope.row)">编辑
                </button>
                <button class="delete" @click="confirmWindow(scope.$index,scope.row.id)">删除
                </button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <showModel v-show="ifshowModel" text="确定要删除吗？" @ifShow="ifShow"></showModel>
    <addProduct v-show="ifaddProduct" @ifAdd="ifAdd"></addProduct>
    <editProduct v-show="ifeditProduct" :product="product" @ifEdit="ifEdit"></editProduct>
  </div>
  
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  import showModel from '@/components/admin/showModel'
  import addProduct from '@/components/admin/addProduct'
  import editProduct from '@/components/admin/editProduct'
  export default {
    components: {
      showModel,
      addProduct,
      editProduct
    },
    data() {
      return {
        products:[],
        ifshowModel:false,
        ifaddProduct:false,
        ifeditProduct:false,
        product_id :"",
        index:"",
        product:{},
        user_id:0
      };
    },
    methods:{
      getHomeData(){
        const data = {
          user_id:this.user_id
        }
        axios.get(`${config.host}/product/getAllProduct`,{
          params:data
        }).then(this._getHomeData);
      },
      _getHomeData(res){
        this.products = res.data.products
        console.log("res",this.products)
      },
      confirmWindow(index,product_id){
        console.log('product_id',product_id)
        this.index = index
        this.product_id = product_id
        this.ifshowModel = true
      },
      async ifShow(data){
        console.log("ifshowModel",data)
        this.ifshowModel = false
        if(data == 1){
          const res =  await axios.post(`${config.host}/product/deleteProduct`,{product_id:
            this.product_id})
          console.log("res",res)
          if(res.data.code == 0){
            this.products.splice(this.index,1)
          }
        }
      },
      addProduct(){
        this.ifaddProduct = true
      },
      editProduct(product){
        this.product = product
        console.log("this.product",this.product)
        this.ifeditProduct = true
      },
      ifAdd(data){
        this.ifaddProduct = false
        if(data == 1){
          window.location.reload()
        }
      },

      ifEdit(data){
        this.ifeditProduct = false
        if(data == 1){
          window.location.reload()
        }
      }

    },
    mounted(){
      this.user_id = this.$store.getters.userinfo.id
      if(!this.user_id){
        this.user_id = localStorage.getItem("user-xbapp")
      }
      console.log("user_id",this.user_id)
      this.getHomeData();
    }
  }
</script>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .add{
    float: right;
    padding: 5px;
    margin:5px 10px 15px 15px;
    border-radius: 4px;
    font-size: 15px;
    background:  #B3C0D1;
  }

  .delete{
    margin-left:10px;
  }
</style>