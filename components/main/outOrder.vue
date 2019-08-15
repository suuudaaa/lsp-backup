<template>
  <div @click="goto">
    出库订单
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goto(){
      this.$router.push({path:'inOrder'})
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>
<style lang='scss'>

</style>


