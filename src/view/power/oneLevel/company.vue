<template>
  <div class="oneLevelContainer">
    <div
      class="header"
      v-show="$route.name==='companyOrg' || $route.name==='companyMember' || $route.name==='companyCustomer' || $route.name==='companyBrand'"
    >
      <el-button
        class="addBtn companyAddBtn"
        type="primary"
        icon="iconfont icongongsiguanli-xinjian addBtnIcon"
        @click="goAdd"
        v-show="$route.name==='companyMember'"
      >添加员工</el-button>
      <tab-nav :label-data="switchData" @tab-render="changeSwitch" :selection="selection"></tab-nav>
    </div>
    <router-view />
  </div>
</template>
<script>
import tabNav from "@/components/commonComponents/TabNav";

export default {
  components: {
    tabNav
  },
  mounted() {
    this.routerControl();
  },
  updated() {
    this.routerControl();
  },
  data() {
    return {
      selection: "first",
      switchData: [
        { label: "组织架构", name: "first", path: "/power/company/org" },
        { label: "员工管理", name: "second", path: "/power/company/member" },
        { label: "客户列表", name: "third", path: "/power/company/customer" },
        { label: "品牌列表", name: "fourth", path: "/power/company/brand" }
      ]
    };
  },
  methods: {
    routerControl() {
      let routeName = this.$route.name;
      this.selection =
        routeName === "companyOrg"
          ? "first"
          : routeName === "companyMember"
          ? "second"
          : routeName === "companyCustomer"
          ? "third"
          : routeName === "companyBrand"
          ? "fourth"
          : "";
    },
    changeSwitch(data) {
      this.$router.push({ path: data.configure.$attrs.path });
    },
    goAdd() {
      this.$router.push({ path: "/power/company/addMember" });
    }
  }
};
</script>


<style scoped lang="scss">
@import "~@/view/power/styles/oneLevel";
</style>

<style lang="scss">
.oneLevelContainer {
  .header {
    .companyAddBtn {
      width: 100px;
      text-indent: 6px;
      .addBtnIcon {
        position: absolute;
        text-indent: 0px;
        left: 6px;
        font-size: 14px;
      }
    }
  }
}
</style>