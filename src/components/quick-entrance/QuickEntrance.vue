<template>
    <div class="quick-entrance">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <template v-for="item of quickEntrance">
                    <a class="item" tag="div" :href="item[2]">
                        <img :src="item[1]">
                        <span>{{item[0]}}</span>
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name:'',
    props:{
        quickEntrance:Array
    }
  }

</script>
<style lang='stylus' scoped>
    .quick-entrance
        background-color #ffffff
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
                        color #000000

</style>