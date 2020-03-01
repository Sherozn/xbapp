<template>
  <el-container>
    <el-header style="text-align: left; font-size: 18px">
      <router-link tag="div" to="/admin">
        < 回到首页
      </router-link>
      <span>力哥理财</span>
    </el-header>
    <div class="item" style="background-color:#ff7700;">
      <div class="scroll-item" v-for="(tp,index) in types" :key="index">
        <div :style="parseInt(tp[0])==type_index?'background-color:#ffbd00;font-size:16px;padding:0 10px;':'padding:0 10px;'" @click="changeindex(tp[0])">{{tp[1]}}</div>
      </div>
    </div>
    <template v-if="typeItem">
      <div class="item">
        <div class="scroll-item" v-for="(tp_i,index) in typeItem[type_index]" :key="index">
          <div :style="index==items_index?'color:#ff7700;':''" @click="changeitem(index)">{{tp_i}}</div>
        </div>
      </div>
    </template>
    
    <el-main>
      <div class="add" @click="addProductType">
        添加保险
      </div>
      <el-table :data="products">
        <img :src="products.imgUrl">
        <el-table-column prop="imgUrl" label="图片">
           <template  slot-scope="scope">        
              <img :src="scope.row.imgUrl" width="70" height="70" />
           </template>         
      </el-table-column> 
        <el-table-column prop="name" label="保险名称" ></el-table-column>
        <el-table-column prop="note" label="描述" width="300"></el-table-column>
        <el-table-column prop="price" label="最低价格" ></el-table-column>
        <el-table-column label="序号（数字越大，排序越靠前）" >
          <template  slot-scope="scope">
            {{scope.row['product_types.as_sort']}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template  slot-scope="scope">
            <button class="delete" @click="editSort(scope.row['product_types.id'])">编辑
            </button>
            <button class="delete" @click="confirmWindow(scope.$index,scope.row['product_types.id'])">删除
            </button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <addType v-show="ifaddType" @ifType="ifType" :type1="type_index" :type2="items_index"></addType>
    <showModel v-show="ifshowModel" text="确定要删除吗？" @ifShow="ifShow"></showModel>
    <editType v-show="ifeditType" :product_type_id="product_type_id" @ifEdit="ifEdit"></editType>
  </el-container>
  
  
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  import addType from '@/components/product-type/addType'
  import editType from '@/components/product-type/editType'
  import showModel from '@/components/admin/showModel'
	export default { 
    components: {
      addType,
      showModel,
      editType
    }, 
    data(){
      return{
        types:[],
        typeItem:[],
        type_index:0,
        items_index:0,
        products:[],
        ifaddType:false,
        ifshowModel:false,
        ifeditType:false,
        product_type_id:"",
        index:"",
        user_id:0
      }
    },
    methods:{
      getHomeData(){
        axios.get(`${config.host}/data/getData`,{
          params:{
            user_id:this.user_id
          }
        })
        .then(this._getHomeData);
      },
      _getHomeData(res){
        console.log("res",res)
        this.types = res.data.types
        this.typeItem = res.data.typeItem
      },
      changeindex(tp){
        this.type_index = tp
        this.items_index = 0
        this.getProductType()
      },
      changeitem(items_index){
        this.items_index = items_index
        this.getProductType()
      },
      async getProductType(){
        const data = {
          type1:this.type_index,
          type2:this.items_index,
          user_id:this.user_id
        }
        console.log("data",data)
        axios.get(`${config.host}/productType/getType`,{
          params:data
        }).then(res => {
            this.products = res.data.products
            console.log("products",this.products)
        })
      },
      addProductType(){
        this.ifaddType = true
      },
      ifType(data){
        this.ifaddType = false
        if(data == 1){
          this.getProductType()
        }
      },
      confirmWindow(index,product_type_id){
        console.log('product_type_id',product_type_id)
        this.index = index
        this.product_type_id = product_type_id
        this.ifshowModel = true
      },
      async ifShow(data){
        console.log("ifshowModel",data)
        this.ifshowModel = false
        if(data == 1){
          const res =  await axios.post(`${config.host}/productType/deleteType`,{product_type_id:this.product_type_id})
          console.log("res",res)
          if(res.data.code == 0){
            this.products.splice(this.index,1)
          }
        }
      },
      editSort(product_type_id){
        this.ifeditType = true
        this.product_type_id = product_type_id

      },
      ifEdit(data){
        this.ifeditType = false
        console.log("ifEdit",data)
        if(parseInt(data) > 0){
          this.getProductType()
        }
      }
    },
    mounted(){
      this.user_id = this.$store.getters.userinfo.id
      console.log("user_id",this.user_id)
      if(!this.user_id){
        this.user_id = localStorage.getItem("user-xbapp")
      }
      this.getHomeData()
      this.getProductType()
    }
	}
</script>

<style lang='stylus' scoped>
  .el-header
    background-color #ff7700
    color #333
    line-height 60px
  .item
    width 100%
    display flex
    .scroll-item
      margin 0 auto
      height 50px
      line-height 50px
      display inline-block
      font-size 15px    

  .add
    float right
    padding 5px
    margin5px 10px 15px 15px
    border-radius 4px
    font-size 15px
    background  #ff7700
  
  .delete
    margin-left:10px
  
</style>
