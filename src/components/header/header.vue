<template>
  <div class="header">
    <div class="search-warper">
      <form action="">
        <input type="text" placeholder="搜索产品">
        <i class="iconfont icon-search"></i>
      </form>
    </div>
    <Banner></Banner>
    <QuickEntrance></QuickEntrance>
    <div id="boxFixed" :class="{'is_fixed' : isFixed}">
      
      <div class="searchBar" id="searchBar">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <div class="scroll-item" v-for="(type, index) in emojis" :key="index">
              <div class="scroll-item" :style="parseInt(index)==emojis_index?'background-color:#ffbd00;font-size:16px;color:#000000;padding:0 10px;':'padding:0 10px;'" @click="changeindex(index)">{{type}}</div>
            </div>
          </div>
        </div>
        <TypeItem :emojis_index = "emojis_index"></TypeItem>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Banner from '@/components/banner/banner'
  import QuickEntrance from '@/components/quick-entrance/QuickEntrance'
  import TypeItem from '@/components/type-item/typeItem'
  export default{
    data () {
      return {
        emojis:{0:"按险种配置",1:"按疾病/异常配置",2:"按成员配置",3:"按预算配置"},
        emojis_index:0,
        isFixed: false,
        offsetTop:0
      };
    },
    components: {
      Banner,
      TypeItem,
      QuickEntrance
    },
    mounted() {
      console.log("**************mounted*******************")
      this.init()
      window.addEventListener('scroll',this.initHeight);
      this.$nextTick( () => {
        this.offsetTop = document.querySelector('#boxFixed').offsetTop;
      })
    },
    updated () {
      console.log("**************updated*******************")
      this.bs.refresh()
    },
    beforeDestroy() {
      console.log("**************beforeDestroy*******************")
      this.bs.destroy()
    },
    destroyed () {
      console.log("**************destroyed*******************")
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      init() {
        console.log("**************init*******************")
        this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3 // listening scroll hook
        })
        this._registerHooks(['scroll', 'scrollEnd','touchend'], (pos) => {
        console.log('pos1',pos)
        })
      },
      _registerHooks(hookNames, handler) {
        console.log("**************_registerHooks*******************")
        console.log("this.bs1",this.bs)
        hookNames.forEach((name) => {
          this.bs.refresh()
          this.bs.on(name, handler)
        })
      },
      changeindex(i){
        console.log("**************changeindex*******************")
        this.emojis_index = i
      },
      initHeight () {
        console.log("**************initHeight*******************")
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isFixed = scrollTop > this.offsetTop ? true : false;
      }
    }
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

        .search-warper
            width 100%
            height 50px
            form 
                height 100%
                width 100%
                display flex
                flex-direction column
                justify-content center
                padding 0 15px
                box-sizing border-box
                position relative
                input 
                    margin 0 auto
                    width 100%
                    height 38px
                    border-radius 8px
                    background-color #ededed
                    text-align center
                i  
                    position absolute 
                    top 36%
                    left 36%
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
</style>