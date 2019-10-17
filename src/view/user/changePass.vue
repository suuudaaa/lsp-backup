<template>
  <div class="password-container">
    <div class="passwordBox">
      <el-steps :active="stepIndex" align-center finish-status="success">
        <el-step title="输入账号"></el-step>
        <el-step title="验证账号"></el-step>
        <el-step title="设置新密码"></el-step>
      </el-steps>
      <div class="step1" v-show="stepIndex===1">
        <el-input class="stepInput" v-model="idVal" placeholder="请输入内容"></el-input>
        <p class="stepTips">若忘记登录邮箱或手机号，请联系负责人重设密</p>
        <el-button class="stepBtn" type="primary" :disabled="idVal.length===0" @click="inputID">下一步</el-button>
      </div>

      <div class="step2" v-show="stepIndex===2">
        <p>
          已向邮箱
          <span>1359009500@qq.com</span>发送重置链接
          <br />请进入邮箱查收邮件，点击链接重置密码
        </p>
      </div>

      <div class="step3" v-show="stepIndex===3">
        <el-input
          class="stepInput"
          placeholder="请输入密码"
          suffix-icon="el-icon-date"
          v-model="pwdVal1"
          type="password"
        ></el-input>

        <el-input
          class="stepInput setPasswordInput2"
          placeholder="再次输入密码"
          suffix-icon="el-icon-date"
          v-model="pwdVal2"
          type="password"
        ></el-input>

        <el-button
          class="stepBtn"
          type="primary"
          :disabled="pwdVal1.length===0 || pwdVal2.length===0"
          @click="inputPassword"
        >设置完成，立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepIndex: 1,
      idVal: "",
      pwdVal1: "",
      pwdVal2: ""
    };
  },
  methods: {
    inputID() {
      this.stepIndex = 2;
    },
    inputPassword() {
      if (this.pwdVal1 !== this.pwdVal2) {
        alert("no");
      } else {
        alert("yes");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 1300px;
  height: 836px;
  .passwordBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 56px 132px 0 132px;
  }
  .step1 {
    margin-top: 50px;
  }
  .stepTips {
    margin-top: 8px;
    text-align: center;
    color: #586777;
    font-size: 12px;
  }
  .stepBtn {
    margin-top: 40px;
    width: 100%;
  }
  .step2 {
    p {
      margin-top: 86px;
      text-align: center;
      font-size: 16px;
      color: #586777;
      line-height: 28px;
    }
    span {
      color: #12bd7b;
      font-weight: bold;
    }
  }
  .step3 {
    margin-top: 50px;
    .setPasswordInput2 {
      margin-top: 24px;
    }
  }
}
</style>

<style lang="scss">
.password-container .el-input__inner {
  background-color: rgba(238, 241, 246, 1);
  color: #2b3d51;
  border-color: rgba(238, 241, 246, 1);
}
</style>