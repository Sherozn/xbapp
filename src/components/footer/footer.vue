<template>
    <div class="footer">
        <div class="item">
            <span class="iconfont icon-home"></span>
            <span>首页</span>
        </div>
        <div class="item">
            <span class="iconfont icon-tuijian"></span>
            <span>推荐</span>
        </div>
        <div class="item">
            <span class="iconfont icon-category"></span>
            <span>分类</span>
        </div>
        <div class="item">
            <span class="iconfont icon-chat"></span>
            <span>聊天</span>
        </div>
        <div class="item">
            <span class="iconfont icon-wo"></span>
            <span>个人中心</span>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>
<style lang='stylus' scoped>
    .footer
        position fixed
        bottom 0
        left 0
        height 50px
        border-top 1px solid #eee
        box-sizing border-box
        background-color #ffffff
        width 100%
        display flex
        .item
            flex 1
            text-align center
            overflow hidden 
            display flex
            flex-direction column
            justify-content center
            span 
                display block
                color #666
                font-size 12px
            .iconfont 
                font-size 20px
                padding-bottom 5px


</style>