<template>
  <div class="forget-pass">
    <div class="forget-step1" v-if="steps == 1">
      <el-form :model="form" ref="dynamicValidateForm">
        <el-form-item
          prop="input1"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确邮箱格式', trigger: ['blur'] }
          ]"
        >
          <el-input placeholder="请输入邮箱" v-model="form.input1" clearable @input="getUserAccount"></el-input>
        </el-form-item>
        
        <div class="login-tip">
          <p class="err-msg"></p>
          <p class="login-message">若忘记登录邮箱，请联系负责人重设密码</p>
        </div>
        <div class="btns">
          <p v-if="disable">
            <el-button type="primary" @click="onSubmit1" style="width:100%;">下一步</el-button>
          </p>
          <p v-if="!disable">
            <el-button type="primary" disabled style="width:100%;">下一步</el-button>
          </p>
        </div>
      </el-form>
    </div>
    <div class="forget-step2" v-else-if="steps == 2">
      <div class="ld-forget-email" v-if="accountType == 1">
        <p>
          已向邮箱
          <span>1359009500@qq.com</span>
          发送重置链接 请进入邮箱查收邮件，点击链接重置密码
        </p>
      </div>
      <div class="ld-forget-tel" v-else>
        <p class="ld-tel-text">通过手机185***992进行安全验证</p>
        <div class="get-identify-code">
          <el-input placeholder="请输入验证码" v-model="input3" @input="identifyCode">
            <!-- <el-button slot="append" type="text">获取验证码</el-button> -->
          </el-input>
          <el-button @click="countTime" type="primary" :disabled="showCode">{{countDown}}</el-button>
        </div>
        <div class="login-tip">
          <p class="err-msg">验证码不一致</p>
        </div>
        <div class="btns">
          <p v-if="step2Disable">
            <el-button type="primary" @click="onSubmit1" style="width:100%;">下一步</el-button>
          </p>
          <p v-if="!step2Disable">
            <el-button type="primary" disabled style="width:100%;">下一步</el-button>
          </p>
        </div>
      </div>
    </div>
    <div class="forget-step3" v-else>
      <el-form :model="form" ref="dynamicValidateForm">
        <el-form-item
          prop="input1"
          :rules="[
            { required: true, message: '请输入修改密码', trigger: 'blur' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入数字和字母组合的长度在 6 到 20 个字符', trigger: ['blur'] }
          ]"
        >
          <el-input
            placeholder="请设置6-20位，包含字母与数字的密码"
            v-model="form.input1"
            show-password
            clearable
            @input="getUserAccount"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="input2"
          :rules="[
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, message: '两次密码输入不一致', trigger: ['blur'] }
          ]"
        >
          <el-input placeholder="再次输入密码" v-model="form.input2" clearable show-password></el-input>
        </el-form-item>
        <!-- <div class="login-tip">
          <p class="err-msg">两次密码输入不一致</p>
        </div>-->
        <div class="btns">
          <el-button type="primary" :disabled="step3Disable" @click="onSubmit3" style="width:100%;">设置完成，立即登陆</el-button>
          <!-- <p v-if="disable">
            <el-button type="primary" @click="onSubmit1" style="width:100%;">设置完成，立即登陆</el-button>
          </p>
          <p v-if="!disable">
            <el-button type="primary" disabled  style="width:100%;">设置完成，立即登陆</el-button>
          </p> -->
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    
    return {
      form: {
        input1:"",
        input2:''
      },
      input3: "",
      disable: false,
      step2Disable: false,
      step3Disable: true,
      steps: 1,
      accountType: 1,
      countDown: "获取验证码",
      showCode: false
    };
  },
  methods: {
    onSubmit1() {
      this.steps = 2;
    },
    onSubmit3() {
      console.log(66666)
    },
    getUserAccount() {
      if (this.form.input1 != "") {
        this.disable = true;
      }
    },
    countTime() {
      let num = 10;
      this.showCode = true;
      let timer = setInterval(() => {
        num--;
        if (num < 0) {
          this.countDown = "获取验证码";
          this.showCode = false;
          clearInterval(timer);
        } else {
          this.countDown = num + "s后重试";
        }
      }, 1000);
    },
    identifyCode() {
      if (this.input3 != "") {
        this.step2Disable = true;
      }
    },
    validatePass2 (rule, value, callback){
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.input1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
        this.step3Disable = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.forget-pass {
  width: 100%;
  height: 320px;
  font-family: Source Han Sans CN;
  width: 100%;
  .btns {
    p {
      margin: 22px 0;
    }
  }
  .login-tip {
    overflow: hidden;
    // margin-bottom: 32px;
    .login-message {
      font-size: 12px;
      font-weight: 400;
      color: #586777;
    }
    .err-msg {
      font-size: 12px;
      font-weight: 400;
      color: #ff4d4f;
    }
  }
  .ld-forget-email {
    margin: 100px 0;
    text-align: center;
    line-height: 22px;
    color: rgba(88, 103, 119, 1);
    span {
      color: #12bd7b;
    }
  }
  .ld-forget-tel {
    .ld-tel-text {
      text-align: center;
      color: #586777;
    }
    .get-identify-code {
      margin: 40px 0 0;
    }
    /deep/ .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 60%;
    }
  }
}
</style>