<template>
  <div>
    <aside class="leftNav">
      <el-menu
        :router="true"
        default-active="main"
        class="el-menu-vertical"
        background-color="#F3F5F7"
        text-color="#000"
        active-text-color="#20a0ff"
      >
        <el-menu-item index="main">
          <i class="el-icon-location"></i>
          <span slot="title">港仓宝</span>
        </el-menu-item>

        <el-menu-item index="data">
          <i class="el-icon-menu"></i>
          <span slot="title">数据</span>
        </el-menu-item>
        <el-menu-item index="report">
          <i class="el-icon-document"></i>
          <span slot="title">报表</span>
        </el-menu-item>
        <el-menu-item index="help">
          <i class="el-icon-setting"></i>
          <span slot="title">帮助</span>
        </el-menu-item>
      </el-menu>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.leftNav {
  flex: 0 0 140px;
  width: 140px;
  .el-menu {
    height: 100%;
    border-right: 0px !important;
    .is-active {
      background: #fff !important;
    }
  }
}
</style>
