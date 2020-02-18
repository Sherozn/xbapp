<template>
  <div class="scroll-wrapper" ref="scroll">
    <div class="scroll-content">
      <div class="scroll-item" v-for="(type, index) in emojis" :key="index">
        <div class="scroll-item" :style="parseInt(index)==emojis_index?'background-color:#ffbd00;font-size:16px;color:#000000;padding:0 10px;':'padding:0 10px;'" @click="changeindex(index)">{{type}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    data () {
      return {
        emojis:{0:"按险种配置",1:"按疾病/异常配置",2:"按成员配置",3:"按预算配置"},
        emojis_index:0,
      };
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3 // listening scroll hook
        })
        this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
        console.log('pos',pos)
        })
      },
      _registerHooks(hookNames, handler) {
        hookNames.forEach((name) => {
          console.log("this.bs",this.bs)
          this.bs.on(name, handler)
        })
      },
      changeindex(i){
        this.emojis_index = i
      },
    }
  }
</script>

<style lang='stylus' scoped>
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