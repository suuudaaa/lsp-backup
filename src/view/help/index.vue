<template>
  <div class="container">
    <div class="help-center">
      <tab-nav :label-data="helpNav" v-on:tab-render="changeType1"></tab-nav>
      <order-question v-if="navIdx == 0"></order-question>
      <action-question v-else-if="navIdx == 1"></action-question>
      <power-question v-else></power-question>
      <!-- <blank-page v-else></blank-page> -->
    </div>
  </div>
</template>

<script>
import tabNav from "@/components/commonComponents/TabNav";
import orderQuestion from "@/components/help/orderQuestion";
import powerQuestion from "@/components/help/powerQuestion";
import actionQuestion from "@/components/help/actionQuestion";
import blankPage from "@/components/help/blankPage";
export default {
  components: {
    tabNav,
    orderQuestion,
    powerQuestion,
    actionQuestion,
    blankPage
  },
  data() {
    return {
      helpNav: [
        { label: "订单问题", name: "first" },
        { label: "操作问题", name: "second" },
        { label: "权限问题", name: "third" }
      ],
      navIdx: 0
    };
  },
  methods: {
    changeType1(data) {
      this.navIdx = data.configure.index;
    }
  }
};
</script>

<style lang='scss'>
@import "../../assets/scss/common.scss";
.help-center {
  width: $container-height;
  padding: $main-padding;
}
</style>