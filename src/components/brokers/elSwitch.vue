<template>
	<div>
		
	</div>

</template>

<script>
  import axios from 'axios'
  export default {
    props:{
      broker:Array
    },
    data(){
      return{
        flag:true
      }
    },
    methods:{
    	changeInOpen(res){
	      // this.brokers.name = !this.brokers.name
	      console.log("nihao",res)
	    }
    }
  }
</script>
<style lang='stylus' scoped>
	.in-open
		padding-right 80px

</style>
