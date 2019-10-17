<template>
  <div class="account-login">
    <el-form :model="form" ref="dynamicValidateForm">
      <el-form-item
        prop="step1input1"
        :rules="[
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { max: 32, message: '账号不能超过32个字符', trigger: 'blur' },
            { pattern: /^([\S])+@([\S])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式错误', trigger: 'blur' },
          ]"
      >
        <el-input placeholder="请输入邮箱" v-model="form.step1input1" clearable @input="inputTxtChange"></el-input>
      </el-form-item>
      <el-form-item
        prop="step1input2"
        :rules="[
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ]"
      >
        <el-input
          placeholder="请输入密码"
          v-model="form.step1input2"
          show-password
          @input="inputTxtChange"
        ></el-input>
      </el-form-item>
      <div class="login-tip">
        <p class="login-message">{{loginMessage}}</p>
        <!-- <p class="forget-pass" @click="forgetPassword">忘记密码?</p> -->
      </div>
      <div class="btns">
        <el-button
          type="primary"
          @click="submitForm('dynamicValidateForm')"
          :disabled="disable"
          :loading="loginLoading"
          style="width:100%;"
        >登录</el-button>
        <!-- <p v-if="disable">
          @click="submitForm('dynamicValidateForm')"
          <el-button type="primary" @click="onSubmit" style="width:100%;">登陆</el-button>
        </p>
        <p v-if="!disable">
          <el-button type="primary" @click="onSubmit" :disabled="disable" style="width:100%;">登陆</el-button>
        </p>-->
      </div>
    </el-form>
    <!-- <div class="third-type-login">
      <p>第三方登陆</p>
      <i class="iconfont iconkucunkantai-weixin"></i>
    </div>-->
  </div>
</template>

<script>
import md5 from "md5";
import {
  accountLogin,
  getIn,
  getOut,
  orderTime,
  orderState,
  stockAge,
  getMap
} from "@/api/getData";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        step1input1: "",
        step1input2: "",
        input1: "",
        input2: "",
        buttonState: false
      },
      loginMessage: "",
      disable: true,
      loginLoading: false,
      loginCount: 0
    };
  },
  methods: {
    onSubmit() {
      let that = this;
      this.loginLoading = true;
      let code = that.form.step1input2.trim();
      let username = that.form.step1input1;
      window.localStorage.setItem("username", username);
      let obj = {
        userName: username.trim(), //"xlei@lordstar.net",
        password: md5(code), //"8dbf04ae17cbc8240c45d53b92c8d43a8a97fe58",
        deviceNumber: get_uuid() //"21111111111111"
      };
      function get_uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      }
      accountLogin(obj)
        .then(res => {
          // console.log("res:", res);
          if (res.ret == 0) {
            console.log(res.data)
            that.$store.commit("updateUserInfo", JSON.stringify(res.data));
            window.localStorage.setItem("userInfo", JSON.stringify(res.data));
            let menuPower = {
              data: false,
              report: false,
              business: false
            };
            console.log('res.data.menuInfo',res.data.menuInfo)
            res.data.menuInfo.forEach((v, i, l) => {
              if (v.menuName == "Boss看板") menuPower.data = true;
              if (v.menuName == "Report看板") menuPower.report = true;
              if (v.menuName == "Business看板") menuPower.business = true;
            });
            window.localStorage.setItem(
              "lsp_menu_power",
              JSON.stringify(menuPower)
            );

            if (res.data.token != "") {
              that.$store.commit("updateToken", res.data.token);
              window.localStorage.setItem("token", res.data.token);
            }

            if (menuPower.data) {
              that.$router.push({ path: "/data" });
              this.loginLoading = false;
              return;
            } else if (menuPower.business) {
              that.$router.push({ path: "/main" });
              this.loginLoading = false;
              return;
            } else if (menuPower.report) {
              that.$router.push({ path: "/report" });
              this.loginLoading = false;
              return;
            } else {
              that.$router.push({ path: "/help" });
              this.loginLoading = false;
              return;
            }

            /*this.getDataView(() => {
              if (menuPower.data) {
                that.$router.push({ path: "/data" });
                this.loginLoading = false;
                return;
              } else if (menuPower.business) {
                that.$router.push({ path: "/main" });
                this.loginLoading = false;
                return;
              } else if (menuPower.report) {
                that.$router.push({ path: "/report" });
                this.loginLoading = false;
                return;
              } else {
                that.$router.push({ path: "/help" });
                this.loginLoading = false;
                return;
              }
            });*/
          } else if (res.ret == 9998) {
            that.loginMessage = res.msg;
            that.disable = true;
            this.loginLoading = false;
            return;
          } else if (res.ret == 1001) {
            that.$message.error(
              "账号在本地登录，其他设备您已被登出，请注意账号安全！"
            );
          } else {
            that.loginMessage = res.msg;
            // that.disable = true;
            this.loginLoading = false;
            return;
          }
        })
        .catch(err => {
          this.loginLoading = false;
          if (window.console) console.log(err);
        });
    },
    forgetPassword() {
      this.$router.push({ path: "/forget" });
      this.$emit("forget-pwd", 2);
    },
    submitForm(dynamicValidateForm) {
      this.$refs[dynamicValidateForm].validate(valid => {
        if (valid) {
          this.onSubmit();
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    inputTxtChange(val) {
      if (this.form.step1input1 != "" && this.form.step1input1 != "") {
        this.disable = false;
      } else {
        this.disable = true;
      }
    },
    getDataView(callback) {
      this.$axios
        .all([
          this.getInApi(),
          this.getOutApi(),
          this.orderTimeApi(),
          this.orderStateApi(),
          this.stockAgeApi(),
          this.getMapApi()
        ])
        .then(
          this.$axios.spread(
            (
              getInApi,
              getOutApi,
              orderTimeApi,
              orderStateApi,
              stockAgeApi,
              getMapApi
            ) => {
              this.countInData(getInApi.data);
              this.countOutData(getOutApi.data);
              this.countOrderTime(orderTimeApi.data);
              this.countOrderState(orderStateApi.data);
              this.countStockAge(stockAgeApi.data);
              this.countMapData(getMapApi.data);
              callback();
            }
          )
        );
    },
    countMapData(record) {
      let data = JSON.parse(record);
      let result = new Array();
      data.forEach((v, i, l) => {
        if (
          v.cityName != "-" &&
          v.cityName != "新界" &&
          v.cityName != "九龙半岛" &&
          v.cityName != "香港岛" &&
          v.cityName != "中国" &&
          v.cityName != "广东省" &&
          i <= 10
        ) {
          let itemArray = new Array();
          let begin = new Object();
          let end = new Object();
          begin.name = "东莞";
          end.name = v.cityName.replace("市", "");
          end.value = 100;
          itemArray.push(begin);
          itemArray.push(end);
          result.push(itemArray);
        }
      });
      this.$store.commit("updateMapData", result);
      window.localStorage.setItem("lsp_map_data", JSON.stringify(result));
    },
    countStockAge(record) {
      let data = JSON.parse(record);
      let colorArr = ["#13C2C3", "#3B7EE5", "#0DA7CB", "#ED9D1B", "#FF4D4F"];
      let pieItemsData = [
        {
          index: 0,
          value: data.storageAge3,
          name: data.storageAge3 + "%",
          title: "3天",
          color: colorArr[0]
        },
        {
          index: 1,
          value: data.storageAge7,
          name: data.storageAge7 + "%",
          title: "7天",
          color: colorArr[1]
        },
        {
          index: 2,
          value: data.storageAge30,
          name: data.storageAge30 + "%",
          title: "一个月",
          color: colorArr[2]
        },
        {
          index: 3,
          value: data.storageAge180,
          name: data.storageAge180 + "%",
          title: "半年",
          color: colorArr[3]
        },
        {
          index: 4,
          value: data.storageAge180Up,
          name: data.storageAge180Up + "%",
          title: "半年以上",
          color: colorArr[4]
        }
      ];
      let stockAgeData = [
        {
          index: 0,
          value: data.storageAge3,
          name: data.storageAge3 + "%",
          title: "3天",
          color: colorArr[0]
        },
        {
          index: 1,
          value: data.storageAge7,
          name: data.storageAge7 + "%",
          title: "7天",
          color: colorArr[1]
        },
        {
          index: 2,
          value: data.storageAge30,
          name: data.storageAge30 + "%",
          title: "一个月",
          color: colorArr[2]
        },
        {
          index: 3,
          value: data.storageAge180,
          name: data.storageAge180 + "%",
          title: "半年",
          color: colorArr[3]
        },
        {
          index: 4,
          value: data.storageAge180Up,
          name: data.storageAge180Up + "%",
          title: "半年以上",
          color: colorArr[4]
        }
      ];
      let result = {
        pieItemsData: pieItemsData,
        stockAgeData: stockAgeData
      };
      this.$store.commit("updateStockAgeData", result);
      window.localStorage.setItem("lsp_stock_age", JSON.stringify(result));
    },
    countOrderState(record) {
      let data = JSON.parse(record);
      let total = parseInt(data[0].number) + parseInt(data[1].number);
      let result = [
        {
          value: data[0].number,
          percentage: this.getPercent(data[0].number, total)
        },
        {
          value: data[1].number,
          percentage: this.getPercent(data[1].number, total)
        }
      ];
      this.$store.commit("updateOrderState", result);
      window.localStorage.setItem("lsp_order_state", JSON.stringify(result));
    },
    countOrderTime(record) {
      let data = JSON.parse(record);
      let total = data.countIn8_24 + data.countLarge24 + data.countLess8;
      let result = [
        {
          value: data.countIn8_24,
          percentage: this.getPercent(data.countIn8_24, total)
        },
        {
          value: data.countLarge24,
          percentage: this.getPercent(data.countLarge24, total)
        },
        {
          value: data.countLess8,
          percentage: this.getPercent(data.countLess8, total)
        }
      ];
      this.$store.commit("updateOrderTime", result);
      window.localStorage.setItem("lsp_order_time", JSON.stringify(result));
    },
    countOutData(record) {
      let data = JSON.parse(record);
      let todayCount = data.todayCount;
      let allCount = data.allCount;
      let percentage = this.getPercent(todayCount, allCount);
      let result = {
        todayCount: todayCount,
        allCount: allCount,
        percentage: percentage * 0.01
      };
      this.$store.commit("updateOutData", result);
      window.localStorage.setItem("lsp_out_data", JSON.stringify(result));
    },
    countInData(record) {
      let data = JSON.parse(record);
      let todayCount = data.todayCount;
      let allCount = data.allCount;
      let percentage = this.getPercent(todayCount, allCount);
      let result = {
        todayCount: todayCount,
        allCount: allCount,
        percentage: percentage * 0.01
      };
      this.$store.commit("updateInData", result);
      window.localStorage.setItem("lsp_in_data", JSON.stringify(result));
    },
    getInApi() {
      return getIn();
    },
    getOutApi() {
      return getOut();
    },
    orderTimeApi() {
      return orderTime();
    },
    orderStateApi() {
      return orderState();
    },
    stockAgeApi() {
      return stockAge();
    },
    getMapApi() {
      return getMap();
    },
    // 求百分比
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0 ? 0 : Math.round((num / total) * 10000) / 100.0;
    }
  },
  mounted() {
    let username = localStorage.getItem("username");
    this.form.step1input1 = username || "";
    this.inputTxtChange('');
  },
  created() {
    let that = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        that.submitForm("dynamicValidateForm");
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.account-login {
  font-family: Source Han Sans CN;
  width: 100%;
  .btns {
    margin: 20px 0 40px;
    p {
      margin: 22px 0;
    }
  }
  .login-tip {
    overflow: hidden;
    margin-top: 18px;
    .login-message {
      float: left;
      font-size: 12px;
      font-weight: 400;
      color: #f56c6c;
    }
    .forget-pass {
      // margin: 5px 0;
      float: right;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #586777;
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
  .forget-pass:active {
    color: #000;
  }
  .third-type-login {
    margin: 32px 0;
    text-align: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(126, 140, 155, 1);
      margin-bottom: 10px;
    }
    .iconfont {
      font-size: 40px;
      color: rgba(7, 193, 96, 1);
    }
  }
}
</style>