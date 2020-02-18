<template>
    <div class="goods-list">
        <router-link tag="div" to="#" class="item" v-for="(item,index) in goodsList" :key="index">
            <div class="left">
                <img :src="item[0]">
            </div>
            <div class="right">
                <div class="title">
                    {{item[1]}}
                </div>
                <div class="price-and-user">
                    <div class="price">
                        <span class="_price"> <i>￥</i> {{item[2]}}</span>
                        <span class="sell-num">已拼{{item[3]}}万+件</span>
                    </div>
                </div>
                <div class="line"></div>
            </div>
        </router-link>

    </div>
</template>

<script>

    export default {
        data () {
          return {
            goodsList:[[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"],[require("@/assets/img/kefu.png"),"你好","100","1000"]]
          }
        }
    }

</script>
<style lang='stylus' scoped>
    .goods-list
        width 100%
        .item
            margin-bottom 10px
            padding 15px 15px 0px
            display flex
            .left
                width 172px
                heigh 172px
                img 
                    width 100px
                    height 100px
            .right
                position relative
                flex 1
                display flex
                flex-direction column
                justify-content space-between
                padding-left 10px
                .line
                    position absolute
                    bottom -10px
                    right 0px
                    width 199px
                    height 0
                    border-bottom 1px  solid rgba(0,0,0,.05)
                .title
                    font-size 15px
                    color #151516
                    line-height 18px
                    height 34px
                    overflow hidden
                    letter-spacing 1px
                .price-and-user
                    width 100%
                    height 50px
                    display flex
                    align-items flex-end
                    justify-content space-between
                    .price
                        color #9c9c9c
                        ._price
                            color #e02e24
                            font-size 18px
                            font-weight bold
                            i 
                              font-size 12px
</style>