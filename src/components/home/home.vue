<template>
    <div>
      <div class="header">
        <router-link tag="div" to="/admin">
          <Search></Search>
        </router-link>
        <Banner :banners="banners"></Banner>
        <QuickEntrance :quickEntrance="quickEntrance"></QuickEntrance>
      </div>
      <Type :types="types" :typeItem="typeItem"></Type>
      <div class="test">
        <GoodsList></GoodsList>
      </div>
      <!-- <Footer></Footer> -->
    </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config.js'
  import Search from '@/components/search/search'
  import Banner from '@/components/banner/banner'
  import QuickEntrance from '@/components/quick-entrance/QuickEntrance'
  import Type from '@/components/type/type'
  import GoodsList from '@/components/goods-list/GoodsList'
  import Footer from '@/components/footer/footer'
  
  export default {
    name:'Home',
    components: {
      Search,
      Banner,
      QuickEntrance,
      Type,
      GoodsList,
      Footer
    },
    data () {
      return {
        types:[],
        typeItem:[],
        banners:[],
        quickEntrance:[]
      };
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
        this.banners = res.data.banners
        this.quickEntrance = res.data.quickEntrance
      }
    },
    mounted(){
      this.getHomeData();
    }

  }

</script>
<style lang='stylus' scoped>
  .header
      top 0
      left 0
      background-color #ff7700
  .test
    padding-bottom 50px
    width 100%


</style>