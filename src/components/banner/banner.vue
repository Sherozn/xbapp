<template>
    <div class="banner">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) of banners" :key="index">
              <img :src='item'>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
  export default {
    name:'Banner',
    props:{
      banners:Array
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
      }
    }

  }
</script>
<style lang='stylus' scoped>

    .banner
        width 100%
        .swiper-container
            width 100%
            .swiper-wrapper
                width 100%
                .swiper-slide
                    width 100%
                    img 
                        width 100%
                        height 120px
            .swiper-pagination
                left 40%
            .swiper-pagination >>> .swiper-pagination-bullet 
                background #ffffff    
                opacity 1
            .swiper-pagination >>> .swiper-pagination-bullet-active
                background #e02e24        
                    
</style>