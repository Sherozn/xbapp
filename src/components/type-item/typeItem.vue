<template>
    <div class="scroll-wrapper1" ref="scroll1">
      <div class="scroll-content1">
      	<div class="scroll-item" v-for="(item,i) in items" :key="i">
		      <div class="scroll-item border" :style="i==items_index?'border:1px solid #ff7700;color:#ff7700;':''" @click="changeitem(i)">{{item}}</div>
		    </div>
      </div>
    </div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
    props: ['items'],
		data () {
      return {
        items_index:0
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
        this.bs = new BScroll(this.$refs.scroll1, {
        scrollX: true,
        click: true,
        probeType: 3 // listening scroll hook
        })
        this._registerHooks(['scroll', 'scrollEnd'], (pos) => {

        })
      },
      _registerHooks(hookNames, handler) {
        hookNames.forEach((name) => {
          // console.log("this.bs",this.bs)
          this.bs.on(name, handler)
        })
      },
      changeitem(i){
      	console.log("i的值",i)
        this.items_index = i
        this.$emit('asTypeF',i)
      }
    },
    watch:{
      items(){//箭头函数  不然会发生this改变
        this.items_index = 0
      }
    }

	}
</script>

<style lang='stylus' scoped>
    .scroll-wrapper1
      margin 0 auto
      white-space nowrap
      background-color #ffffff
      overflow hidden
      padding 10px 0
      .scroll-content1
        display inline-block
      .scroll-item
          line-height 25px
          font-size 14px
          display inline-block
          text-align center
          padding 2px 10px
          .border
            border-radius 11px
            border 1px solid #C0C0C0
				      
</style>