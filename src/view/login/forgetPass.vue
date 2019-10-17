<template>
  <div class="ld-login">
    <div class="login-card">
      <div>
        <div class="login-nav ld-forget">
          忘记密码
        </div>
      </div>
      <div class="login-content">
        <forget-password></forget-password>
      </div>
    </div>
  </div>
</template>

<script>
import forgetPassword from "@/components/login/forgetPassword";
export default {
  components: {
    forgetPassword
  },
  data() {
    return {
      loginBox: 0,
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.ld-login {
  width: 100%;
  height: 100%;
  background: url("../../../static/img/login_back.jpg") no-repeat center;
  background-size: cover;
  position: relative;
  .ld-forget{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .login-card {
    position: absolute;
    top: 10%;
    right: 12%;
    width: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 32px;
    .login-nav {
      width: 100%;
      /deep/ .el-tabs__nav-scroll {
        overflow: hidden;
        margin-left: 80px;
      }
    }
  }
  .login-content {
    height: 100%;
    /deep/ .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
      margin: 12px 0;
    }
  }
}
</style>