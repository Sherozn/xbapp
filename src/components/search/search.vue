<template>
  <div class="search-warper">
    <form action="">
      <input type="text" placeholder="搜索产品">
      <i class="iconfont icon-search"></i>
    </form>
  </div>
</template>

<script>
  export default{
   
  }
</script>

<style lang='stylus' scoped>
    .header
        top 0
        left 0
        background-color #ff7700
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
         
</style>