<template>
  <div class="screen-for-order">
    <!--这里传入切换标签 事件-->
    <tab-nav :label-data="orderTypeLabel" v-on:tab-render="changeType1"></tab-nav>
    <conditonal-search :rep-type="repType" ref="conditonalSearchChild"></conditonal-search>
    <transition name="fade" mode="out-in" appear>
      <show-order-card :rep-type="repType"></show-order-card>
    </transition>
  </div>
</template>
<script>
import TabNav from "@/components/commonComponents/TabNav";
import showOrderCard from "@/components/commonComponents/orderGroup/showOrderCard";
import ConditonalSearch from "@/components/commonComponents/orderGroup/ConditionalSearch";
import { df } from "@/modules/filters/orderFilter";
export default {
  components: {
    TabNav,
    showOrderCard,
    ConditonalSearch
  },
  props: ["orderTypeLabel"],
  data() {
    return {
      index: 0,
      repType: 0,
      params: {
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        page: 1, //页数
        pageSize: 20, //每页大小
        goodsBrand: "", //品牌
        goodsModel: "", //规格型号
        startTime: df(new Date(), "yyyy-mm-dd", 7), //开始时间
        endTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        code: "保税仓库", //"保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "" //入/出库单号
      }
    };
  },
  methods: {
    setDefaultData() {
      this.$refs.conditonalSearchChild.setDefaultData();
    },
    initData() {
      //init
      let initData = {
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        page: 1, //页数
        pageSize: 20, //每页大小
        goodsBrand: this.$route.query.goodsBrand || '', //品牌
        goodsModel: this.$route.query.goodsModel || '', //规格型号
        startTime: df(new Date(), "yyyy-mm-dd", 7), //开始时间
        endTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        name: "", //顾客公司
        code: "保税仓库", //"保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "" //入/出库单号
      };
      this.params = initData;
    },
    changeType1(data) {
      this.repType = data.configure.index;
      this.$store.commit("updateIsData", true);
      this.$store.commit("updateOrderTotalNumber", null);
      this.$store.commit("updateLoadingState", true);
      this.initData(); //初始化本体数据
      this.setDefaultData(); //初始化子组件默认选中
      this.getCusData();
    },
    getCusData() {
      if (this.repType == 0) {
        this.$store.commit("updateLoadingState", true);
        this.$store.dispatch("implementGetCusOrderData", this.params);
      } else {
        this.$store.commit("updateLoadingState", true);
        this.$store.dispatch("implementGetOutOrderData", this.params);
      }
    }
  },
  mounted() {
    let inOrOut = this.$route.name;
    this.params.goodsBrand = this.$route.query.goodsBrand || '';
    this.params.goodsModel = this.$route.query.goodsModel || '';
    if (inOrOut == "出库详情") {
      this.repType = 1;
    }
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.getCusData, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.getCusData, false);
  }
};
</script>
<style>
.screen-for-order {
  margin: 20px 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>


