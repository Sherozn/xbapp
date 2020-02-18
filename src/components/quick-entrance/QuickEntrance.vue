<template>
    <div class="quick-entrance">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <template v-for="item of quickEntrance">
                <router-link class="item" tag="div" to="#">
                    <img :src="item[1]">
                    <span>{{item[0]}}</span>
                </router-link>
            </template>
        </div>
    </div>
    </div>
</template>

<script>

  export default {
    name:'',
    data() {
      return {
        quickEntrance:[["在线客服",require('@/assets/img/kefu.png')],["预约顾问",require('@/assets/img/预约顾问.png')],["小马理赔",require('@/assets/img/小马理赔.png')],["预核保",require('@/assets/img/预核保.png')]]
      }
    }

  }

</script>
<style lang='stylus' scoped>
    .quick-entrance
        background-color #f4f4f4
        width 100%
        .swiper-wrapper
            width 100%
            .swiper-slide
                width 100%
                display flex
                flex-wrap wrap
                .item
                    width 25%
                    box-sizing border-box
                    padding 10px 10px 20px 10px
                    display flex
                    flex-direction column
                    justify-content center
                    img 
                        height 43px
                        width 43px
                        display block
                        margin 0 auto
                    span 
                        display block
                        text-align center
                        padding-top 5px

</style>