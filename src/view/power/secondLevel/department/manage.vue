<template>
  <div class="edit-container">
    <div class="content">
      <el-form
        :inline="true"
        :model="formObject"
        status-icon
        :rules="rules"
        ref="formObject"
        :label-position="'left'"
        label-width="70px"
      >
        <el-row class="marginBottom40">
          <el-col>
            <el-form-item label="上级部门">
              <div class="levelContainer">
                <el-tag class="level">棋港</el-tag>
                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                <el-tag class="level">销售部</el-tag>
                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                <el-tag class="level thisLevel">销售一部</el-tag>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginBottom40">
          <el-col>
            <el-form-item label="部门名称" prop="department">
              <el-input
                type="text"
                v-model="formObject.department"
                auto-complete="off"
                placeholder="请输入部门名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          class="marginTop24"
          v-for="(subDepartment, index) in formObject.subDepartment"
          :key="subDepartment.key"
        >
          <el-col>
            <div class="diyLabelContainer">
              <span v-show="index===0">下级部门</span>
            </div>
            <el-form-item :prop="'subDepartment.' + index + '.value'" :rules="rules.subDepartment">
              <el-input
                type="text"
                v-model="subDepartment.value"
                auto-complete="off"
                placeholder="请输入下级部门名称"
              ></el-input>
              <div class="delSonBtn">
                <i
                  class="icon iconfont icongongsiguanli-shanchuanniu"
                  @click.prevent="removeSubDepartment(subDepartment)"
                ></i>
              </div>
              <div class="matchBtn2" @click="showBrandPopup">品牌分配</div>
              <div class="matchBtn2" @click="showCustomerPopup">客户分配</div>
              <div class="matchBtn2" @click="showPowerPopup">权限管理</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col>
            <el-form-item class="diyFormItem">
              <i
                class="icon iconfont icongongsiguanli-xinjianbumen marginLeft70 addSonBtn"
                @click="addSubDepartment"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          class="marginTop24"
          v-for="(positions, index) in formObject.positions"
          :key="positions.key"
        >
          <el-col>
            <div class="diyLabelContainer">
              <span v-show="index===0">部门职位</span>
            </div>
            <el-form-item :prop="'positions.' + index + '.value'" :rules="rules.positions">
              <el-input
                type="text"
                v-model="positions.value"
                auto-complete="off"
                placeholder="请输入部门职位名称"
              ></el-input>
              <div class="delSonBtn">
                <i
                  class="icon iconfont icongongsiguanli-shanchuanniu"
                  v-show="index!==0"
                  @click.prevent="removePositions(positions)"
                ></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col>
            <el-form-item class="diyFormItem">
              <i
                class="icon iconfont icongongsiguanli-xinjianbumen marginLeft70 addSonBtn"
                @click="addPositions"
              ></i>
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
    BrandPopup,
    CustomerPopup,
    PowerPopup
  },
  data() {
    let validateDepartment = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("部门名称不能为空"));
        } else {
          callback();
        }
      },
      validateSubDepartment = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("下级部门名称不能为空"));
        } else {
          callback();
        }
      },
      validatePositions = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("部门职位名称不能为空"));
        } else {
          callback();
        }
      };

    return {
      formObject: {
        department: "",
        subDepartment: [],
        positions: [{ value: "" }]
      },
      rules: {
        department: [{ validator: validateDepartment, trigger: "blur" }],
        subDepartment: [{ validator: validateSubDepartment, trigger: "blur" }],
        positions: [{ validator: validatePositions, trigger: "blur" }]
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
    showBrandPopup() {
      this.brandConfig.visible = !this.brandConfig.visible;
    },
    returnBrandPopup(checked) {
      console.log(checked);
    },
    showCustomerPopup() {
      this.customerConfig.visible = !this.customerConfig.visible;
    },
    returnCustomerPopup(checked) {
      console.log(checked);
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "保存成功!",
            type: "success"
          });
          this.$router.push({ path: "/power/company/org" });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({ path: "/power/company/org" });
    },
    removeSubDepartment(item) {
      let index = this.formObject.subDepartment.indexOf(item);
      if (index !== -1) {
        this.formObject.subDepartment.splice(index, 1);
      }
    },
    addSubDepartment() {
      this.formObject.subDepartment.push({
        value: "",
        key: Date.now()
      });
    },
    removePositions(item) {
      let index = this.formObject.positions.indexOf(item);
      if (index !== -1) {
        this.formObject.positions.splice(index, 1);
      }
    },
    addPositions() {
      this.formObject.positions.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped lang="scss">
.edit-container {
  .content {
    padding-top: 20px;
  }
}
</style>
<style lang="scss">
@import "~@/view/power//styles/editContainer";
@import "~@/assets/scss/form";
</style>