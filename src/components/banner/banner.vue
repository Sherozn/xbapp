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
      data() {
        return {
          swiperOption: {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
              delay: 300000,
              disableOnInteraction: false
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          },
          banners:[require('@/assets/img/1.jpg'),require('@/assets/img/2.jpg')],
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