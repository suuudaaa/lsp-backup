<template>
  <div class="container">
    <el-header class="header">
      <img class="logo" :src="logoImgUrl" />

      <div class="headerInfo">
        <span class="organization">利亚德</span>
        <span class="title">总裁看板</span>
        <!-- {{routeName}} -->
      </div>

      <el-dropdown class="user">
        <div class="el-dropdown-link">
          <span>ADMIN</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">权限管理</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
import logoImgUrl from "@assets/img/logo.png";
export default {
  data() {
    return {
      logoImgUrl: logoImgUrl,
      // routeName: this.$route.name
    };
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style scoped lang="scss">
.header {
  position: relative;
  height: 64px !important;
  line-height: 64px;
  background: linear-gradient(
    90deg,
    rgba(18, 189, 123, 1),
    rgba(26, 176, 160, 1),
    rgba(43, 55, 115, 1)
  );
  color: #fff;
  border-bottom: 1px solid #20a0ff;
  .headerInfo {
    display: inline-block;
    // height: 64px;
    // width: 100px;
    margin-left: 150px;

    .organization {
      font-size: 20px;
      color: #fff;
    }
    .title {
      margin-left: 12px;
      font-size: 14px;
      color: #fff;
    }
  }
  .logo {
    top: 50%;
    left: 50px;
    width: 66px;
    height: 22px;
    margin-top: -11px;
    cursor: pointer;
    position: absolute;
    // background: url("~@assets/img/logo.png") no-repeat;
  }
  .user {
    cursor: pointer;
    float: right;
    span {
      font-size: 14px;
      color: #fff;
      line-height: 64px;
    }
    i {
      color: #fff;
    }
  }
}
</style>