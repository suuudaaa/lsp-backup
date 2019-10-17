<template>
  <div class="editContainer">
    <div class="breadCrumb">
      <bread-crumb></bread-crumb>
    </div>
    <div class="content">
      <el-form
        :inline="true"
        :model="formObject"
        status-icon
        :rules="rules"
        ref="formObject"
        :label-position="'left'"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input
                type="text"
                v-model="formObject.name"
                auto-complete="off"
                placeholder="请输入员工姓名"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="formObject.pass"
                auto-complete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col :span="10">
            <el-form-item label="账号" prop="id">
              <el-input type="text" v-model="formObject.id" auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="formObject.checkPass"
                auto-complete="off"
                placeholder="再次输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col :span="10">
            <el-form-item label="所属部门" prop="department">
              <el-select v-model="formObject.department" placeholder="请选择所属部门">
                <el-option label="销售一部" value="shanghai"></el-option>
                <el-option label="销售二部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="职位" prop="position">
              <el-input
                type="text"
                v-model="formObject.position"
                auto-complete="off"
                placeholder="请输入职位"
              ></el-input>
              <!-- <el-select v-model="formObject.position" placeholder="请选择所属职位">
                <el-option label="销售" value="shanghai"></el-option>
                <el-option label="开发" value="beijing"></el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col :span="10">
            <el-form-item label="品牌分配">
              <div class="matchBtn" @click="showBrandPopup">品牌分配</div>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="权限">
              <div class="matchBtn" @click="showPowerPopup">权限管理</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop40">
          <el-col>
            <el-form-item label="客户分配">
              <div class="matchBtn" @click="showCustomerPopup">客户分配</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col>
            <el-form-item>
              <el-button
                class="formBtn marginLeft70"
                type="primary"
                @click="submitForm('formObject')"
              >保存</el-button>
              <el-button class="formBtn cancelBtn" @click="cancel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <brand-popup
      :config="brandConfig"
      :data="brandData"
      @show="showBrandPopup"
      @return="returnBrandPopup"
    ></brand-popup>

    <customer-popup
      :config="customerConfig"
      :data="customerData"
      @show="showCustomerPopup"
      @return="returnCustomerPopup"
    ></customer-popup>

    <power-popup
      :config="powerConfig"
      :lData="lData"
      :rData="rData"
      @show="showPowerPopup"
      @return="returnPowerPopup"
    ></power-popup>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import BrandPopup from "@/view/power/popup/singlePopup";
import CustomerPopup from "@/view/power/popup/singlePopup";
import PowerPopup from "@/view/power/popup/doublePopup";

export default {
  components: {
    BreadCrumb,
    BrandPopup,
    CustomerPopup,
    PowerPopup
  },
  data() {
    let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("员工姓名不能为空"));
        } else {
          callback();
        }
      },
      validateId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("账号不能为空"));
        } else {
          callback();
        }
      },
      validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.formObject.checkPass !== "") {
            this.$refs.formObject.validateField("checkPass");
          }
          callback();
        }
      },
      validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.formObject.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      validateDepartment = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择所属部门"));
        } else {
          callback();
        }
      },
      validatePosition = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("职位不能为空"));
        } else {
          callback();
        }
      };

    return {
      formObject: {
        name: "",
        id: "",
        pass: "",
        checkPass: "",

        department: "",
        position: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        id: [{ validator: validateId, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        department: [{ validator: validateDepartment, trigger: "blur" }],
        position: [{ validator: validatePosition, trigger: "blur" }]
      },
      powerConfig: {
        visible: false,
        width: 600
      },
      lData: {
        title: "功能权限",
        data: [
          "GOOD",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L"
        ]
      },
      rData: {
        title: "数据权限",
        data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
      },
      brandConfig: {
        title: "品牌分配",
        visible: false,
        width: 600
      },
      brandData: [
        "GOOD",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L"
      ],
      customerConfig: {
        title: "客户分配",
        visible: false,
        width: 600
      },
      customerData: [
        "GOOD",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L"
      ]
    };
  },
  methods: {
    showPowerPopup() {
      this.powerConfig.visible = !this.powerConfig.visible;
    },
    returnPowerPopup(checked) {
      console.log("权限分配:", checked);
    },
    showCustomerPopup() {
      this.customerConfig.visible = !this.customerConfig.visible;
    },
    returnCustomerPopup(checked) {
      console.log("客户分配:", checked);
    },
    showBrandPopup() {
      this.brandConfig.visible = !this.brandConfig.visible;
    },
    returnBrandPopup(checked) {
      console.log("品牌分配:", checked);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "保存成功!",
            type: "success"
          });
          this.$router.push({ path: "/power/company/member" });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({ path: "/power/company/member" });
    }
  }
};
</script>

<style lang="scss">
@import "~@/view/power//styles/editContainer";
@import "~@/assets/scss/form";
</style>