<template>
    <div>
      <Header :navigation = "navigation"></Header>
      <div class="test">
        <GoodsList></GoodsList>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
  import axios from 'axios'
  import Header from '@/components/header/header'
  import Footer from '@/components/footer/footer'
  import GoodsList from '@/components/goods-list/GoodsList'
  export default {
    name:'Home',
    components: {
      Header,
      Footer,
      GoodsList
    },
    data () {
      return {
        navigation:[]
      };
    },
    methods:{
      getHomeData(){
        // axios.get('http://192.168.0.107:3000/data')
        // .then(this._getHomeData);
      },
      _getHomeData(res){
        // this.banners = res.data.banners
        // this.navigation = res.data.navigation
        // this.quickEntrance = res.data.quick_entrance
        // this.goodsList = res.data.goods_list
      }
    },
    mounted(){
      this.getHomeData();
    }

  }

</script>
<style lang='stylus' scoped>
  .test
    background-color #f4f4f4
    padding-bottom 50px
    width 100%


</style>