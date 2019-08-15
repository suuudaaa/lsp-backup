<template>
  <div class="screen-for-order">
    <tab-nav :label-data="orderTypeLabel" v-on:tab-render="changeType1"></tab-nav>
    <conditonal-search :rep-type='repType'></conditonal-search>
    <show-order-card></show-order-card>
  </div>
</template>
<script>
import TabNav from "@/components/commonComponents/TabNav";
import ShowOrderCard from "@/components/commonComponents/orderGroup/ShowOrderCard";
import ConditonalSearch from "@/components/commonComponents/orderGroup/ConditionalSearch";
export default {
  components: {
    TabNav,
    ShowOrderCard,
    ConditonalSearch
  },
  props:['orderTypeLabel'],
  data() {
    return {
      // orderTypeLabel: [
      //   { label: "入库订单", name: "first" },
      //   { label: "出库订单", name: "second" },
      //   { label: "一站通订单", name: "third" }
      // ],
      repType:0,
    };
  },
  methods:{
    changeType1(data) {
      console.log(data);
      this.orderType = data
      this.$store.dispatch('implementGetCusOrderData',data)
    },

  }
};
</script>
<style>
.screen-for-order{
  margin:20px 0;
}
</style>


