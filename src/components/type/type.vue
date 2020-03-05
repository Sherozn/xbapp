<template>
  <div>
  <div class="header">
    <!-- <div id="boxFixed" :class="{'is_fixed' : isFixed}"> -->
      <div class="searchBar" id="searchBar">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <div class="scroll-item" v-for="(tp,index) in types" :key="index">
              <div class="scroll-item" :style="parseInt(tp[0])==type_index?'background-color:#ffbd00;font-size:16px;color:#000000;padding:0 10px;':'padding:0 10px;'" @click="changeindex(tp[0])">{{tp[1]}}</div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
    <template v-if="typeItem">
      <TypeItem :items = "items" @asTypeF="getAsTypeF"></TypeItem>
    </template>
    
  </div>
    <div class="goods-list">
      <GoodsList :products="products"></GoodsList>    
    </div>
  </div>        
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  import BScroll from 'better-scroll'
  import TypeItem from '@/components/type-item/typeItem'
  import GoodsList from '@/components/goods-list/GoodsList'
  export default{
    props:{
      types:Array,
      typeItem:Array
    },
    data () {
      return {
        items:["重疾险", "寿险", "医疗险", "意外险", "年金险", "旅行意外险", "家财险"],
        type_index:0,
        // isFixed: false,
        offsetTop:0,
        products:[],
        items_index:0
      };
    },
    components: {
      TypeItem,
      GoodsList
    },
    mounted() {
      this.getProductType()
      this.init()
      // window.addEventListener('scroll',this.initHeight);
      // this.$nextTick( () => {
      //   this.offsetTop = document.querySelector('#boxFixed').offsetTop;
      // })
      
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3 // listening scroll hook
        })
        this._registerHooks(['scroll', 'scrollEnd','touchend'], (pos) => {
        // console.log('pos1',pos)
        })
      },
      _registerHooks(hookNames, handler) {
        // console.log("this.bs1",this.bs)
        hookNames.forEach((name) => {
          this.bs.refresh()
          this.bs.on(name, handler)
        })
      },
      // initHeight () {
      //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   this.isFixed = scrollTop > this.offsetTop ? true : false;
      // },
      changeindex(tp){
        this.type_index = tp
        if(this.typeItem){
          this.items = this.typeItem[tp]
        }
        this.items_index = 0
        this.getProductType()
      },
      async getProductType(){
        const data = {
          type1:this.type_index,
          type2:this.items_index,
          user_id:this.$route.params.id
        }
        // console.log("data",data)
        axios.get(`${config.host}/productType/getType`,{
          params:data
        }).then(res => {
            this.products = res.data.products
            console.log("products",this.products)
        })
      },
      getAsTypeF(data){
        // console.log("父data",data)
        this.items_index = data
        this.getProductType()
      }
    }
    // watch:{
    //   isFixed(){
    //     this.bs.refresh()
    //   }
    // }
  }
</script>

<style lang='stylus' scoped>
  .header
      top 0
      left 0
      background-color #ff7700
      .is_fixed
        position fixed
        background-color #ff7700
        top 0
        z-index 999
      .scroll-wrapper
          margin 0 auto
          white-space nowrap
          overflow hidden
          .scroll-content
            display inline-block
          .scroll-item
              height 50px
              line-height 50px
              font-size 15px
              display inline-block
              text-align center
              color #ffffff  
  .goods-list
    background-color #ffffff
</style>