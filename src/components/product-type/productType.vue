<template>
  <div>
    <div class="item" style="background-color:#B3C0D1;">
      <div class="scroll-item" v-for="(tp,index) in types" :key="index">
        <div :style="parseInt(tp[0])==type_index?'background-color:#ffbd00;font-size:16px;padding:0 10px;':'padding:0 10px;'" @click="changeindex(tp[0])">{{tp[1]}}</div>
      </div>
    </div>
    <div class="item">
      <div class="scroll-item" v-for="(tp_i,index) in typeItem[type_index]" :key="index">
        <div :style="index==items_index?'color:#ff7700;':''" @click="changeitem(index)">{{tp_i}}</div>
      </div>
    </div>
      
    </div>
  </div>
  
  
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
	export default { 
    data(){
      return{
        types:[],
        typeItem:[],
        type_index:0,
        items_index:0,
        products:[]
      }
    },
    methods:{
      getHomeData(){
        axios.get(`${config.host}/data/getData`)
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
      },
      changeitem(items_index){
        this.items_index = items_index
        const data = {
          type1:this.type_index,
          type2:items_index
        }
        console.log("data",data)
        axios.get(`${config.host}/productType/getType`,{
          params:data
        }).then(res => {
            this.products = res.data.products
            console.log("products",this.products)
        })
      }
    },
    mounted(){
      this.getHomeData();
    }
	}
</script>

<style lang='stylus' scoped>
  .item
    width 100%
    display flex
    .scroll-item
      margin 0 auto
      height 50px
      line-height 50px
      display inline-block
      font-size 15px    
</style>
