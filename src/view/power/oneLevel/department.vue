<template>
  <div class="oneLevelContainer">
    <div
      class="header"
      v-show="$route.name==='departmentOrg' || $route.name==='departmentManage' || $route.name==='departmentMember' || $route.name==='departmentCustomer' || $route.name==='departmentBrand'"
    >
      <el-button
        class="addBtn departmentAddBtn"
        type="primary"
        icon="iconfont icongongsiguanli-xinjian addBtnIcon"
        @click="goAdd"
        v-show="$route.name==='departmentMember'"
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
  data() {
    return {
      selection: "first",
      switchData: [
        { label: "组织架构", name: "first", path: "/power/department/org" },
        { label: "部门管理", name: "second", path: "/power/department/manage" },
        { label: "部门成员", name: "third", path: "/power/department/member" },
        {
          label: "部门客户",
          name: "fourth",
          path: "/power/department/customer"
        },
        { label: "品牌列表", name: "five", path: "/power/department/brand" }
      ]
    };
  },
  mounted() {
    this.routerControl();
  },
  updated() {
    this.routerControl();
  },
  methods: {
    routerControl() {
      let routeName = this.$route.name;
      this.selection =
        routeName === "departmentOrg"
          ? "first"
          : routeName === "departmentManage"
          ? "second"
          : routeName === "departmentMember"
          ? "third"
          : routeName === "departmentCustomer"
          ? "fourth"
          : routeName === "departmentBrand"
          ? "five"
          : "";
    },
    changeSwitch(data) {
      this.$router.push({ path: data.configure.$attrs.path });
    },
    goAdd() {
      this.$router.push({ path: "/power/department/addMember" });
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
    .departmentAddBtn {
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