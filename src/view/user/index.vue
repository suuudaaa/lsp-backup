<template>
  <div class="container">
    <div class="content">
      <div class="userContent">
        <el-row class="head">
          <el-col>
            <img :src="headImg" />
          </el-col>
          <el-col class="name">
            <span>{{userInfo.userName}}</span>
          </el-col>
        </el-row>

        <!-- <el-col class="operation">
          <el-col>
            <el-button
              class="operationBtn"
              type="primary"
              icon="icon iconfont icongongsiguanli-bianji"
            >修改密码</el-button>
            <el-button
              class="operationBtn middleOperationBtn"
              type="primary"
              icon="icon iconfont icontouxiang-quanxianguanli"
            >权限管理</el-button>
            <el-button
              class="operationBtn"
              type="primary"
              icon="icon iconfont icongerenxinxi-tuichudenglu"
              @click="loginOut"
            >退出登录</el-button>
          </el-col>
        </el-col>-->

        <el-form
          :model="userInfoForm"
          status-icon
          :rules="rules"
          ref="userInfoForm"
          :label-position="'left'"
          label-width="70px"
          class="userInfoForm marginTop60"
        >
          <el-row class="marginBottom15">
            <el-col>
              <span class="diyTitle">个人信息</span>
            </el-col>
          </el-row>

          <!-- <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="昵称" prop="name">
                <el-input
                  type="text"
                  v-model="userInfoForm.name"
                  auto-complete="off"
                  placeholder="请输入昵称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="电话" prop="landline">
                <el-input
                  type="text"
                  v-model="userInfoForm.landline"
                  auto-complete="off"
                  placeholder="请输入电话号码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="手机" prop="phone">
                <el-input
                  type="number"
                  v-model="userInfoForm.phone"
                  auto-complete="off"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="密码" prop="pass">
                <input class="seizeSeatInput" type="text" name="seizeSeatInput" />
                <el-input
                  type="password"
                  v-model="userInfoForm.pass"
                  auto-complete="off"
                  placeholder="请输入密码"
                  maxlength="20"
                  @focus="focusFun"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form :label-position="'left'" label-width="70px" class="marginTop40">
          <el-row class="marginBottom15">
            <el-col>
              <span class="diyTitle">公司信息</span>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="公司">{{comInfo.comName}}</el-form-item>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="上级部门">
                <!-- <div class="levelContainer">
                  <el-tag class="level">棋港</el-tag>
                  <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                  <el-tag class="level">销售部</el-tag>
                  <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                  <el-tag class="level thisLevel">销售一部</el-tag>
                </div>-->
                <div class="levelContainer">
                  <span v-for="(item, index) in superiorArr" :key="index">
                    <el-tag
                      class="level"
                      :class="{'thisLevel':(index+1) == superiorArr.length}"
                    >{{item}}</el-tag>
                    <i
                      class="el-breadcrumb__separator el-icon-arrow-right"
                      v-if="(index+1) != superiorArr.length"
                    ></i>
                  </span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="职位">{{comInfo.post}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form :label-position="'left'" label-width="70px" class="marginTop40">
          <el-row class="marginBottom15">
            <el-col>
              <span class="diyTitle">登录信息</span>
            </el-col>
          </el-row>

          <el-row class="marginBottom24">
            <el-col>
              <el-form-item label="登录邮箱
">{{loginInfo.email}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import { userInfo, checkName } from "@/api/getData";
// import headImg from "@assets/img/head.jpg";
import headImg from "@assets/img/avator.png";
import { editUserInfo } from "@/api/getData";
export default {
  data() {
    let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("昵称不能为空"));
        }
        let participation = {
          userName: this.userInfo.userName,
          realName: this.userInfoForm.name
        };
        editUserInfo(participation)
          .then(res => {
            // console.log("checkName res:", res);
            if (res.ret == "0") {
              callback();
            } else {
              return callback(new Error("编辑昵称失败"));
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      },
      checkLandline = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("电话不能为空"));
        }
        if (!/^(\d{3,4}-)?\d{7,8}$/.test(value)) {
          return callback(new Error("请输入正确的座机电话"));
        }
        let participation = {
          userName: this.userInfo.userName,
          tel: this.userInfoForm.landline
        };
        editUserInfo(participation)
          .then(res => {
            // console.log("checkLandline res:", res);
            if (res.ret == "0") {
              callback();
            } else {
              return callback(new Error("编辑电话失败"));
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      },
      checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("手机号码不能为空"));
        }
        if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          return callback(new Error("请输入正确的手机号"));
        }
        let participation = {
          userName: this.userInfo.userName,
          mobile: this.userInfoForm.phone
        };
        editUserInfo(participation)
          .then(res => {
            // console.log("checkPhone res:", res);
            if (res.ret == "0") {
              callback();
            } else {
              return callback(new Error("编辑手机号失败"));
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      },
      checkPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("密码不能为空"));
        }
        if (value.length > 20 || value.length < 6) {
          callback(new Error("请输入密码长度为6-20"));
        }
        let participation = {
          userName: this.userInfo.userName,
          password:
            this.userInfoForm.pass === this.yPsd
              ? this.userInfoForm.pass
              : md5(this.userInfoForm.pass)
        };
        editUserInfo(participation)
          .then(res => {
            // console.log("checkPhone res:", res);
            if (res.ret == "0") {
              callback();
            } else {
              return callback(new Error("修改密码失败"));
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      };
    return {
      headImg: headImg,
      userInfo: {
        userName: ""
      },
      userInfoForm: {
        name: "",
        landline: "",
        phone: "",
        pass: "" //临时修改密码
      },
      comInfo: {
        post: "",
        comName: ""
      },
      loginInfo: {
        email: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        landline: [{ validator: checkLandline, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        pass: [{ validator: checkPass, trigger: "blur" }]
      },
      superiorArr: [],
      yPsd: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.userInfoFun();
    },
    userInfoFun() {
      userInfo()
        .then(res => {
          // console.log("userInfo res:", res.data);
          //userInfo
          this.userInfo.userName = res.data.email;
          //userInfoForm
          this.userInfoForm.name = res.data.realName;
          //进度
          // this.userInfoForm.landline = res.data.tel;
          this.userInfoForm.phone = res.data.mobile;
          this.userInfoForm.pass = res.data.password;
          //comInfo
          this.comInfo.post = res.data.post;
          this.comInfo.comName = res.data.comName;
          //loginInfo
          this.loginInfo.email = res.data.email;
          //superiorArr
          this.superiorArr = res.data.parentRoleInfo.split("->").reverse();
          //change密码
          this.yPsd = res.data.password;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 退出登陆
    loginOut() {
      localStorage.removeItem("token");
      this.$router.replace({
        path: "/login"
      });
    },
    focusFun() {
      if (this.userInfoForm.pass === this.yPsd) {
        this.userInfoForm.pass = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 1300px;
  .content {
    position: relative;
    background: #fff;
    width: 1268px;
    height: 1100px;
    border-radius: 4px;
    .userInfoForm {
      display: inline-block;
      .el-form-item {
        .el-input {
          width: 280px;
        }
      }
    }
    .userContent {
      position: absolute;
      left: 50%;
      margin-left: -174px;
      width: 350px;
      min-height: 800px;
      padding-top: 60px;
      .head {
        text-align: center;
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #cecece;
        }
        .name {
          margin-top: 20px;
          color: #2b3d51;
          font-size: 20px;
        }
      }
      .operation {
        text-align: center;
        margin-top: 40px;
        .operationBtn {
          margin-left: 0px;
        }
        .middleOperationBtn {
          margin: 0px 20px 0px 20px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.userContent {
  .operation {
    .el-button {
      position: relative;
      padding: 0;
      width: 100px;
      height: 36px;
      i {
        position: absolute;
        left: 9px;
        top: 9px;
      }
      span {
        position: absolute;
        left: 30px;
        top: 10px;
      }
    }
  }
}

</style>

<style lang="scss">
@import "~@/assets/scss/form";
</style>