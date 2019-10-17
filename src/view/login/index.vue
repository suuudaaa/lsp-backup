<template>
  <div class="ld-login">
    <div class="login-card">
      <a class="change-version" href="https://lsp.roadsimple.net">
        <span class="ld-version">切换旧版</span>
        <img src="../../../static/img/version_arror.png" alt />
      </a>
      <div class="ld-login-cont">
        <div>
          <!-- <div class="login-nav ld-forget" v-if="loginBox==2">忘记密码</div> -->
          <div class="login-nav">
            <h3>账号登录</h3>
            <!-- <tab-nav
              :label-data="orderTypeLabel"
              v-on:tab-render="changeType"
              class="login-nav-tab"
            ></tab-nav>-->
          </div>
        </div>
        <div class="login-content">
          <account-login v-if="loginBox==0" v-on:forget-pwd="forgetPass"></account-login>
          <app-login v-if="loginBox==1"></app-login>
          <!-- <forget-password v-if="loginBox==2"></forget-password> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import versionImg from "@assets/img/switch_version_arror.png";
import tabNav from "@/components/commonComponents/TabNav";
import accountLogin from "@/components/login/accountLogin";
import appLogin from "@/components/login/appLogin";
import forgetPassword from "@/components/login/forgetPassword";
export default {
  components: {
    tabNav,
    accountLogin,
    appLogin,
    forgetPassword
  },
  data() {
    return {
      loginBox: 0,
      orderTypeLabel: [
        { label: "账号登陆", name: "first" },
        { label: "APP扫码", name: "second" }
      ]
    };
  },
  methods: {
    changeType(data) {
      this.loginBox = data.configure.index;
    },
    forgetPass(idx) {
      this.loginBox = idx;
    },
    onSubmit() {}
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
  .ld-forget {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 32px;
  }
  .login-card {
    position: absolute;
    top: 10%;
    right: 12%;
    width: 400px;
    // height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 32px;
    .login-nav {
      width: 100%;
      text-align: center;
      h3 {
        font-weight: bold;
        font-size: 16px;
        font-family: Source Han Sans CN;
        color: rgba(43, 61, 81, 1);
        margin-bottom: 20px;
      }

      /deep/ .el-tabs__nav-scroll {
        overflow: hidden;
        margin-left: 80px;
      }
    }
  }
  .login-content {
    // height: 100%;
    /deep/ .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
      margin: 12px 0;
    }
  }
  .change-version {
    font-family: PingFang SC;
    position: absolute;
    right: 0;
    top: 30px;
    height: 28px;
    line-height: 28px;
    background: #12bd7d;
    border-radius: 14px 0px 0px 14px;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px #1bd38e;
    padding: 0 12px;
    z-index: 2;
    img {
      margin-top: -3px;
      vertical-align: middle;
    }
  }
}
</style>