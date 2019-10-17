<template>
  <div class="container">
    <div class="nav">
      <tab-nav :label-data="switchData" @tab-render="changeSwitch" :selection="selection"></tab-nav>
    </div>
    <div class="content">
      <router-view />
    </div>
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
      power: "0",
      selection: "",
      switchData: [
        // { label: "公司管理", name: "first", path: "/power/company/org" },
        // { label: "部门管理", name: "second", path: "/power/department/org" },
        // { label: "超级管理员管理", name: "third", path: "/power/admin/org" }
      ]
    };
  },
  mounted() {
    this.init();
    this.routerControl();
  },
  updated() {
    this.routerControl();
  },
  methods: {
    init() {
      this.getPower();
    },
    getPower() {
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.power = userInfo.power;
      this.operationPower(this.power);
    },
    operationPower(power) {
      this.switchData =
        power == "10"
          ? [
              { label: "公司管理", name: "first", path: "/power/company/org" },
              {
                label: "超级管理员管理",
                name: "third",
                path: "/power/admin/org"
              }
            ]
          : power == "20"
          ? [{ label: "公司管理", name: "first", path: "/power/company/org" }]
          : [];
    },
    routerControl() {
      let routeName = this.$route.name;
      this.selection =
        routeName === "companyOrg"
          ? "first"
          : routeName === "companyMember"
          ? "first"
          : routeName === "companyEditMember"
          ? "first"
          : routeName === "companyAddMember"
          ? "first"
          : routeName === "departmentOrg"
          ? "second"
          : routeName === "departmentManage"
          ? "second"
          : routeName === "departmentMember"
          ? "second"
          : routeName === "departmentCustomer"
          ? "second"
          : routeName === "departmentBrand"
          ? "second"
          : routeName === "companyCustomer"
          ? "first"
          : routeName === "companyBrand"
          ? "first"
          : routeName === "companyEditDepartment"
          ? "first"
          : routeName === "adminOrg"
          ? "third"
          : routeName === "adminMember"
          ? "third"
          : routeName === "adminEditMember"
          ? "third"
          : routeName === "adminAddMember"
          ? "third"
          : "";
    },
    changeSwitch(data) {
      this.$router.push({ path: data.configure.$attrs.path });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  .content {
    min-width: 1000px;
    border-radius: 4px;
    .sonHeader {
      padding: 10px 0px 0px 22px;
    }
  }
}
</style>