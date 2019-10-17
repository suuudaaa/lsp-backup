<template>
  <div class="editContainer">
    <div class="breadCrumb">
      <bread-crumb></bread-crumb>
    </div>
    <div class="content">
      <el-form
        :model="formObject"
        status-icon
        :rules="rules"
        ref="formObject"
        :label-position="'left'"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="公司名称" prop="company">
              <el-input
                type="text"
                v-model="formObject.company"
                auto-complete="off"
                placeholder="请输入公司名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col>
            <el-form-item label="账号" prop="id">
              <!--新增页面此处编辑框要改成可编辑状态 disabled -->
              <el-input
                type="text"
                v-model="formObject.id"
                autocomplete="off"
                placeholder="请输入账号"
                maxlength="32"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col>
            <el-form-item label="密码" prop="pass">
              <input class="seizeSeatInput" type="text" name="seizeSeatInput" />
              <el-input
                type="password"
                v-model="formObject.pass"
                autocomplete="off"
                placeholder="请输入密码"
                maxlength="20"
                @focus="focusFun"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="formObject.checkPass"
                autocomplete="off"
                placeholder="再次输入密码"
                maxlength="20"
                @focus="focusFun"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col>
            <el-form-item label="昵称" prop="realName">
              <el-input
                type="text"
                v-model="formObject.realName"
                autocomplete="off"
                placeholder="请输入昵称"
                maxlength="18"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col>
            <el-form-item label="电话" prop="tel">
              <el-input
                type="text"
                v-model="formObject.tel"
                auto-complete="off"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24 marginBottom60">
          <el-col>
            <el-form-item label="手机" prop="mobile">
              <el-input
                type="text"
                v-model="formObject.mobile"
                auto-complete="off"
                placeholder="请输入手机"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          class="marginBottom24"
          v-for="(subDepartment,index) in formObject.subDepartment"
          :key="index"
        >
          <el-col>
            <el-form-item
              label="货主分配"
              :prop="'subDepartment.' + index + '.name'"
              :rules="rules.subDepartment"
            >
              <el-select
                v-model="formObject.subDepartment[index].name"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in hData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <div class="delSonBtn" v-show="formObject.subDepartment.length>1">
                <i class="icon iconfont icongongsiguanli-shanchuanniu" @click.prevent="delH(index)"></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col>
            <el-form-item class="diyFormItem">
              <i class="icon iconfont icongongsiguanli-xinjianbumen addSonBtn" @click="addH"></i>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop40 marginBottom60">
          <el-col>
            <el-form-item>
              <el-button class="formBtn" type="primary" @click="submitForm('formObject')">保存</el-button>
              <el-button class="formBtn cancelBtn" @click="cancel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import { createM, getH, getG, getMemberInfo } from "@/api/getData";
export default {
  components: {
    BreadCrumb
  },
  data() {
    let validateCompany = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("公司名称不能为空"));
        }
        callback();
      },
      validateId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("账号不能为空"));
        }
        if (value.length >= 32) {
          callback(new Error("请输入账号长度为32以内"));
        }
        if (
          !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
        ) {
          return callback(new Error("账号请输入正确邮箱格式"));
        }

        callback();
      },
      validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        }
        if (value.length > 20 || value.length < 6) {
          callback(new Error("请输入密码长度为6-20"));
        }
        if (this.formObject.checkPass !== "") {
          this.$refs.formObject.validateField("checkPass");
        }
        callback();
      },
      validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        }

        if (value.length > 20 || value.length < 6) {
          callback(new Error("请输入密码长度为6-20"));
        }

        if (value !== this.formObject.pass) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      },
      validateRealName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("昵称不能为空"));
        }
        callback();
      },
      validateTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("电话不能为空"));
        }
        if (!/^(\d{3,4}-)?\d{7,8}$/.test(value)) {
          return callback(new Error("电话格式不正确"));
        }
        callback();
      },
      validateMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("手机号不能为空"));
        }
        if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          return callback(new Error("手机号格式不正确"));
        }
        callback();
      },
      validateSubDepartment = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请分配货主"));
        }
        let num = 0;
        this.formObject.subDepartment.forEach((v, i, l) => {
          if (value == v.name) {
            num++;
            if (num >= 2) {
              return callback(new Error("不能选择相同货主"));
            }
          }
        });
        callback();
      };

    return {
      thisComId: "",
      hData: [], //所有货主数据
      formObject: {
        //表单数据
        company: "",
        id: "",
        pass: "",
        checkPass: "",
        realName: "",
        tel: "",
        mobile: "",
        subDepartment: [
          //货主分配 必须至少要有一个
          {
            id: "",
            name: ""
            // customerName: ""
          }
        ]
      },
      rules: {
        company: [{ validator: validateCompany, trigger: "blur" }],
        id: [{ validator: validateId, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        realName: [{ validator: validateRealName, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        subDepartment: [{ validator: validateSubDepartment, trigger: "blur" }]
      },
      yPsd: "" //changePsd
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCustomerFun();
      // this.getInfoFun();//新增管理员页面不用获取个人信息
    },
    /*获取管理员个人信息*/
    getInfoFun() {
      getMemberInfo({
        userName: localStorage.getItem("lsp_query_name"),
        comId: localStorage.getItem("lsp_com_id")
      })
        .then(res => {
          // console.log("---getMemberInfo res---:", res.data);
          this.formObject = {
            company: res.data.comName,
            id: res.data.email,
            pass: res.data.password,
            checkPass: res.data.password,
            realName: res.data.realName,
            tel: res.data.tel,
            mobile: res.data.mobile,
            subDepartment: res.data.customerInfo
          };
          /////
          this.yPsd = res.data.password;
          /////
          this.thisComId = res.data.comId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*获取所有货主*/
    getCustomerFun() {
      let participation = {
        //编辑和新增都是从userInfoL里取comId
        comId: JSON.parse(window.localStorage.getItem("userInfo")).comId
      };
      getH(participation)
        .then(res => {
          this.hData = [];
          res.data.forEach((v, i, l) => {
            // console.log("v:", v);
            this.hData.push({
              name: v.customerName,
              id: v.customerCode
            });
          });
        })
        .catch(err => {
          if (window.console) console.log(err);
        });
    },
    /*提交表单*/
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // console.log("--------this.formObject:", this.formObject);
        if (valid) {
          //包装货主数据格式
          let customerList = [];
          this.formObject.subDepartment.forEach((v, i, l) => {
            customerList.push({ id: v.name });
          });

          let participation = {
            power: "20",
            comName: this.formObject.company,
            // userName: this.formObject.id, //修改 管理员此处 用 userName
            email: this.formObject.id, //新增管理员 此处 userName 改成 email
            password:
              this.formObject.pass === this.yPsd
                ? this.formObject.pass
                : md5(this.formObject.pass),
            realName: this.formObject.realName,
            mobile: this.formObject.mobile,
            tel: this.formObject.tel,
            customerInfo: customerList
          };
          createM(participation)
            .then(res => {
              // console.log("res:", res);
              if (res.ret == "0") {
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
                this.$router.push({ path: "/power/admin/member" });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              if (window.console) console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({ path: "/power/admin/member" });
    },
    delH(index) {
      this.formObject.subDepartment.splice(index, 1);
    },
    addH() {
      this.formObject.subDepartment.push({
        id: "",
        name: ""
        // customerName: ""
      });
    },
    //changePsd
    focusFun() {
      if (this.formObject.pass === this.yPsd) {
        this.formObject.pass = "";
        this.formObject.checkPass = "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/view/power/styles/editContainer";
@import "~@/assets/scss/form";
</style>