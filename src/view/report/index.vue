<template>
  <div class="container">
    <div class="ld-report">
      <transition name="fade" mode="out-in" appear>
        <report-container :label-data="this.label"></report-container>
      </transition>
    </div>
  </div>
</template>
<script>
import reportContainer from "@/components/commonComponents/ReportContainer";
export default {
  components: {
    reportContainer
  },
  data() {
    return {
      label: [
        { label: "入库报表", id: 1, name: "first", path: "/tab1" },
        { id: 2, label: "出库报表", name: "second", path: "/tab2" },
        { id: 3, label: "库存报表", name: "third", path: "/tab3" },
        { id: 3, label: "库存溯源报表", name: "fourth", path: "/tab3" },
        { id: 3, label: "收发货溯源报表", name: "fifth", path: "/tab3" }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>