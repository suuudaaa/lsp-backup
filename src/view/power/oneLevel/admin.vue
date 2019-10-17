<template>
  <div class="oneLevelContainer">
    <div>
      <div class="header" v-show="$route.name==='adminOrg' || $route.name==='adminMember'">
        <el-button
          class="addBtn"
          type="primary"
          icon="iconfont icongongsiguanli-xinjian addBtnIcon"
          v-show="$route.name==='adminMember'"
          @click="goAdd"
        >添加超级管理员</el-button>
        <tab-nav :label-data="switchData" @tab-render="changeSwitch" :selection="selection"></tab-nav>
      </div>
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
      selection: "",
      switchData: [
        { label: "组织架构", name: "first", path: "/power/admin/org" },
        { label: "管理员成员", name: "second", path: "/power/admin/member" }
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
        routeName === "adminOrg"
          ? "first"
          : routeName === "adminMember"
          ? "second"
          : "";
    },
    changeSwitch(data) {
      this.$router.push({ path: data.configure.$attrs.path });
    },
    goAdd() {
      this.$router.push({ path: "/power/admin/addMember" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/view/power/styles/oneLevel";
</style>

<style lang="scss">
.oneLevelContainer {
  .adminAddBtn {
    width: 160px;
    text-indent: 6px;
    .addBtnIcon {
      position: absolute;
      text-indent: 0px;
      left: 6px;
      font-size: 14px;
    }
  }
  .addComBtn {
    margin: 10px 0px 0px 20px;
    position: relative;
    width: 101px;
    // height: 36px;
    text-indent: 8px;
    .addBtnIcon {
      position: absolute;
      text-indent: 10px;
      left: 0px;
      font-size: 14px;
    }
  }
}
</style>