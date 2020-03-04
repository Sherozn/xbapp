<template>
    <div>
      <div class="header">
        <!-- <router-link tag="div" to="/admin">
          <Search></Search>
        </router-link> -->
        <Banner :banners="banners"></Banner>
        <template v-if="quickEntrance">
          <QuickEntrance :quickEntrance="quickEntrance"></QuickEntrance>
        </template>
      </div>
      <Type :types="types" :typeItem="typeItem"></Type>


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
  import Footer from '@/components/footer/footer'
  // import Datas from '@/assets/data.json'
  
  export default {
    name:'Home',
    components: {
      Search,
      Banner,
      QuickEntrance,
      Type,
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
        console.log("我开始请求后端，请求的链接是：",`${config.host}/data/getData`)
        console.log("当前的user_id是：",this.$route.params.id)
        axios.get(`${config.host}/data/getData`,{
          params:{
            user_id:this.$route.params.id
          }
        })
        .then(this._getHomeData);
      },
      _getHomeData(res){
        console.log("res",res)
        this.types = res.data.types
        this.typeItem = res.data.typeItem
        this.banners = res.data.banners
        this.quickEntrance = res.data.quickEntrance
      }
      // getHomeData(){
      //   console.log("data:",Datas[1])
      //   const datas = Datas[1]
      //   this.types = datas.types
      //   this.typeItem = datas.typeItem
      //   this.banners = datas.banners
      //   this.quickEntrance = datas.quickEntrance
      // }
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
    


</style>