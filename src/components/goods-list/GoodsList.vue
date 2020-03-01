<template>
    <div class="goods-list">
        <a class="item" v-for="(product,index) in products" :href='product.buyUrl' :key="index">
            <div class="left">
                <img :src="product.imgUrl">
            </div>
            <div class="right">
                <div class="title">
                    {{product.name}}
                </div>
                <div class="content">
                    {{product.note}}
                </div>
                <div class="price-and-user">
                    <div class="price">
                        <span class="_price"> <i>￥</i>{{product.price}}</span>
                        <span class="sell-num">起</span>
                    </div>
                    <div class="btn">
                        <a :href="product.buyUrl">
                            <div class="buy">购买</div>
                        </a>
                        <a v-show="product.testUrl" :href="product.testUrl">
                            <div class="test">测评</div>
                        </a>
                    </div>
                </div>
                <div class="line"></div>
            </div>
        </a>
    </div> 
</template>

<script>
    import axios from 'axios'
    export default {
        props:{
          products:Array
        }
        // data(){
        //     return{
        //         product_arr:this.products
        //     }
        // }
    }


</script>
<style lang='stylus' scoped>
    .goods-list
        width 100%
        padding-bottom 50px
        .item
            margin-bottom 10px
            padding 15px 15px 0px
            display flex
            .item-a
                display block
            .left
                width 122px
                heigh 172px
                img 
                    width 110px
                    height 100px

            .right
                position relative
                flex 1
                display flex
                flex-direction column
                justify-content space-between
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
                    line-height 28px
                    height 28px
                    overflow hidden
                    letter-spacing 1px
                .content
                    padding-top 4px
                    font-size 12px
                    color #9c9c9c
                .price-and-user
                    width 100%
                    height 30px
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
                    .btn
                        width 50%
                        text-align center
                        line-height 25px

                        .buy
                            border-radius 5px
                            height 25px
                            width 40%
                            float:right
                            background-color #ff7700
                            color #ffffff

                        .test
                            border-radius 5px
                            height 25px
                            width 40%
                            background-color #ffe7d5
                            color #ff5600

                    .sell-num
                        font-size 10px

</style>