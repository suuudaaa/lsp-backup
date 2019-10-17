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
                maxlength="32"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop24">
          <el-col :span="10">
            <el-form-item label="账号" prop="id">
              <!--新增页面此处要改成可编辑 disabled -->
              <el-input
                type="text"
                v-model="formObject.id"
                auto-complete="off"
                placeholder="请输入账号"
                maxlength="32"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="密码" prop="pass">
              <input class="seizeSeatInput" type="text" name="seizeSeatInput" />
              <el-input
                type="password"
                v-model="formObject.pass"
                auto-complete="off"
                placeholder="请输入密码"
                @focus="focusFun"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop60">
          <el-col :span="10">
            <el-form-item label="所属部门" prop="department">
              <el-select v-model="formObject.department" placeholder="请选择所属部门" @change="changeFun">
                <el-option
                  v-for="item in departmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
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
            </el-form-item>
          </el-col>
        </el-row>

        <!-- @click="showBrandPopup" -->
        <el-row class="marginTop60">
          <el-col :span="10">
            <el-form-item label="品牌分配">
              <!-- formObject.goodsBrandInfo -->
              <div class="matchBtn" @click="showToBrand(formObject)" v-show="roleId">品牌分配</div>
            </el-form-item>
          </el-col>

          <!-- @click="showPowerPopup" -->
          <el-col :span="14">
            <el-form-item label="权限">
              <div class="matchBtn" @click="showToPower(formObject)" v-show="roleId">权限管理</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="marginTop40">
          <el-col>
            <el-form-item label="客户分配">
              <div class="matchBtn" @click="showToCustomer(formObject)" v-show="roleId">客户分配</div>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 货主分配 begin -->
        <el-row
          class="marginTop60 marginBottom24"
          v-for="(subDepartment,index) in formObject.subDepartment"
          :key="index"
        >
          <el-col>
            <el-form-item
              label="货主分配"
              :prop="'subDepartment.' + index + '.name'"
              :rules="rules.subDepartment"
            >
              <el-select v-model="formObject.subDepartment[index].name" placeholder="请选择" filterable>
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
        <!-- 货主分配 end -->

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

    <!--品牌分配 dialog begin -->
    <el-dialog
      :custom-class="'popupContainer'"
      :width="'300'"
      :show-close="false"
      :visible.sync="visibleToBrand"
      :modal="false"
    >
      <i class="iconfont icongongsiguanli-shanchuanniu diyClose" @click="closeToBrand"></i>
      <el-row class="diyContainer">
        <el-col>
          <div class="diyHead">
            <span>品牌分配</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox
                    :indeterminate="isNoToBrand"
                    v-model="checkAllToBrand"
                    @change="checkAllChangeToBrand"
                  >全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="checkedToBrand" @change="handleCheckedToBrand">
                  <el-row>
                    <el-col
                      v-for="item in dataToBrand"
                      :label="item.name"
                      :key="item.name"
                      :span="8"
                    >
                      <el-checkbox :label="item.name">{{item.name}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row class="btnLine">
        <el-col>
          <el-button type="primary" class="formBtn commitBtn" @click="commitToBrand">提交</el-button>
          <el-button class="formBtn resetBtn" @click="resetToBrand">清除</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 品牌分配 dialog end -->

    <!--客户分配 dialog begin -->
    <el-dialog
      :custom-class="'popupContainer'"
      :width="'300'"
      :show-close="false"
      :visible.sync="visibleToCustomer"
      :modal="false"
    >
      <i class="iconfont icongongsiguanli-shanchuanniu diyClose" @click="closeToCustomer"></i>
      <el-row class="diyContainer">
        <el-col>
          <div class="diyHead">
            <span>客户分配</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox
                    :indeterminate="isNoToCustomer"
                    v-model="checkAllToCustomer"
                    @change="checkAllChangeToCustomer"
                  >全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="checkedToCustomer" @change="handleCheckedToCustomer">
                  <el-row>
                    <el-col
                      v-for="item in dataToCustomer"
                      :label="item.name"
                      :key="item.name"
                      :span="8"
                    >
                      <el-checkbox :label="item.name">{{item.name}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row class="btnLine">
        <el-col>
          <el-button type="primary" class="formBtn commitBtn" @click="commitToCustomer">提交</el-button>
          <el-button class="formBtn resetBtn" @click="resetToCustomer">清除</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 客户分配 dialog end -->

    <!--权限管理分配 dialog begin -->
    <el-dialog
      :custom-class="'popupContainer'"
      :width="'300'"
      :show-close="false"
      :visible.sync="visibleToPower"
      :modal="false"
    >
      <i class="iconfont icongongsiguanli-shanchuanniu diyClose" @click="closeToPower"></i>
      <el-row class="diyContainer">
        <el-col>
          <div class="diyHead">
            <span>权限管理</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox
                    :indeterminate="isNoToPower"
                    v-model="checkAllToPower"
                    @change="checkAllChangeToPower"
                  >全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="checkedToPower" @change="handleCheckedToPower">
                  <el-row>
                    <el-col
                      v-for="item in dataToPower"
                      :label="item.name"
                      :key="item.name"
                      :span="8"
                    >
                      <el-checkbox :label="item.name">{{item.name}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row class="btnLine">
        <el-col>
          <el-button type="primary" class="formBtn commitBtn" @click="commitToPower">提交</el-button>
          <el-button class="formBtn resetBtn" @click="resetToPower">清除</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 权限管理分配 dialog end -->
  </div>
</template>
<script>
import md5 from "md5";
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import BrandPopup from "@/view/power/popup/singlePopup";
import CustomerPopup from "@/view/power/popup/singlePopup";
import PowerPopup from "@/view/power/popup/doublePopup";
import {
  createU,
  getRole,
  getMemberInfo,
  getBrand,
  companyCustomer,
  getMenu,
  getH
} from "@/api/getData";

export default {
  components: {
    BreadCrumb,
    BrandPopup
  },
  data() {
    let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("员工姓名不能为空"));
        }
        callback();
      },
      validateId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("账号不能为空"));
        }
        if (value.length >= 32) {
          callback(new Error("请输入账号长度为32"));
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
      validateDepartment = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择所属部门"));
        }
        callback();
      },
      validatePosition = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("职位不能为空"));
        }
        callback();
      },
      validateSubDepartment = (rule, value, callback) => {
        // console.log("value:", value);
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
      roleId: "", //查询分配
      yPsd: "",
      hData: [], //所有货主数据
      departmentData: [], //所属部门数据
      formObject: {
        // 表单数据
        name: "",
        id: "",
        pass: "",
        department: "",
        position: "",
        goodsBrandInfo: [], //品牌分配
        shipperInfo: [], //客户分配
        menuInfo: [], //权限管理分配
        subDepartment: [
          //新增页面必须要有一个
          //货主分配
          {
            id: "",
            name: ""
          }
        ]
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        id: [{ validator: validateId, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        department: [{ validator: validateDepartment, trigger: "blur" }],
        position: [{ validator: validatePosition, trigger: "blur" }],
        subDepartment: [{ validator: validateSubDepartment, trigger: "blur" }]
      },

      /* 品牌分配的属性 特殊标识toBrand begin */
      dataToBrand: [], //data
      visibleToBrand: false, //show开关
      checkAllToBrand: false, //全选开关
      checkedToBrand: [], //选中的
      isNoToBrand: true, //是否
      thisIndexToBrand: 0, //当前操作的容器 下标
      /* 品牌分配的属性 end */

      /* 客户分配的属性 特殊标识toCustomer begin */
      dataToCustomer: [], //data
      visibleToCustomer: false, //show开关
      checkAllToCustomer: false, //全选开关
      checkedToCustomer: [], //选中的
      isNoToCustomer: true, //是否
      thisIndexToCustomer: 0, //当前操作的容器 下标
      /* 客户分配的属性 end */

      /* 权限管理分配的属性 特殊标识toPower begin */
      dataToPower: [], //data
      visibleToPower: false, //show开关
      checkAllToPower: false, //全选开关
      checkedToPower: [], //选中的
      isNoToPower: true, //是否
      thisIndexToPower: 0 //当前操作的容器 下标
      /* 权限管理分配的属性 end */
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /* 品牌分配 begin */
    //打开窗口
    showToBrand(item) {
      this.checkedToBrand = new Array();
      this.formObject.goodsBrandInfo.forEach((v, i, l) => {
        this.checkedToBrand.push(v.name);
      });
      this.visibleToBrand = !this.visibleToBrand;
    },
    //关闭窗口
    closeToBrand() {
      this.visibleToBrand = false;
    },
    //处理所有选中的更改
    checkAllChangeToBrand(val) {
      this.checkAllToBrand = !!this.checkAllToBrand;
      let _checked = this.dataToBrand.map(item => {
        return item.name;
      });
      this.checkedToBrand = this.checkAllToBrand ? _checked : [];
      this.isNoToBrand = false;
    },
    //处理选中的更改
    handleCheckedToBrand(value) {
      let checkedCount = value.length;
      this.checkAllToBrand = checkedCount === this.dataToBrand.length;
      this.isNoToBrand =
        checkedCount > 0 && checkedCount < this.dataToBrand.length;
    },
    //提交按钮
    commitToBrand() {
      let result = [];
      this.checkedToBrand.forEach(name => {
        result.push({
          id: "",
          name: name
        });
      });
      this.formObject.goodsBrandInfo = result;
      this.visibleToBrand = false;
    },
    //清空
    resetToBrand() {
      (this.checkedToBrand = []), (this.isNoToBrand = false);
    },
    /* 品牌分配 end */

    /* 客户分配 begin */
    //打开窗口
    showToCustomer(item) {
      // this.thisIndexToCustomer = index;
      this.checkedToCustomer = new Array();
      this.formObject.shipperInfo.forEach((v, i, l) => {
        this.checkedToCustomer.push(v.name);
      });
      this.visibleToCustomer = !this.visibleToCustomer;
    },
    //关闭窗口
    closeToCustomer() {
      this.visibleToCustomer = false;
    },
    //处理所有选中的更改
    checkAllChangeToCustomer(val) {
      this.checkAllToCustomer = !!this.checkAllToCustomer;
      let _checked = this.dataToCustomer.map(item => {
        return item.name;
      });
      this.checkedToCustomer = this.checkAllToCustomer ? _checked : [];
      this.isNoToCustomer = false;
    },
    //处理选中的更改
    handleCheckedToCustomer(value) {
      let checkedCount = value.length;
      this.checkAllToCustomer = checkedCount === this.dataToCustomer.length;
      this.isNoToCustomer =
        checkedCount > 0 && checkedCount < this.dataToCustomer.length;
    },
    //提交按钮
    commitToCustomer() {
      let result = [];
      this.checkedToCustomer.forEach(name => {
        result.push({
          id: "",
          name: name
        });
      });
      this.formObject.shipperInfo = result;
      this.visibleToCustomer = false;
    },
    //清空
    resetToCustomer() {
      (this.checkedToCustomer = []), (this.isNoToCustomer = false);
    },
    /* 客户分配 end */

    /* 权限管理分配 begin */
    //打开窗口
    showToPower(item) {
      this.checkedToPower = new Array();
      this.formObject.menuInfo.forEach((v, i, l) => {
        this.checkedToPower.push(v.name);
      });
      this.visibleToPower = !this.visibleToPower;
    },
    //关闭窗口
    closeToPower() {
      this.visibleToPower = false;
    },
    //处理所有选中的更改
    checkAllChangeToPower(val) {
      this.checkAllToPower = !!this.checkAllToPower;
      let _checked = this.dataToPower.map(item => {
        return item.name;
      });
      this.checkedToPower = this.checkAllToPower ? _checked : [];
      this.isNoToPower = false;
    },
    //处理选中的更改
    handleCheckedToPower(value) {
      let checkedCount = value.length;
      this.checkAllToPower = checkedCount === this.dataToPower.length;
      this.isNoToPower =
        checkedCount > 0 && checkedCount < this.dataToPower.length;
    },
    //提交按钮
    commitToPower() {
      let result = [];
      this.checkedToPower.forEach(name => {
        result.push({
          id: "",
          name: name
        });
      });
      this.formObject.menuInfo = result;
      this.visibleToPower = false;
    },
    //清空
    resetToPower() {
      (this.checkedToPower = []), (this.isNoToPower = false);
    },
    /* 权限管理分配 end */

    /* 综合查询三者 */
    query() {
      /* init 获取所有品牌 */
      getBrand({
        roleId: this.roleId //"038588cd-2695-4c50-b57d-39817cec1336"
      })
        .then(res => {
          if (res.ret == "0") {
            // console.log("---获取所有品牌---:", res.data.rows);
            let arr = [];
            res.data.rows.forEach((v, i, l) => {
              arr.push({
                id: v.id,
                name: v.goodsBrand
              });
            });
            this.dataToBrand = arr;
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

      /* init 获取所有客户 */
      companyCustomer({
        roleId: this.roleId //"038588cd-2695-4c50-b57d-39817cec1336"
      })
        .then(res => {
          if (res.ret == "0") {
            // console.log("---获取所有客户---:", res.data.rows);
            let arr = [];
            res.data.rows.forEach((v, i, l) => {
              arr.push({
                id: v.shipperCode,
                name: v.shipperName
              });
            });
            this.dataToCustomer = arr;
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

      /* init 获取所有权限管理分配 */
      getMenu({
        roleId: this.roleId //"038588cd-2695-4c50-b57d-39817cec1336"
      })
        .then(res => {
          if (res.ret == "0") {
            // console.log("---获取所有权限管理---:", res.data);
            let arr = [];
            res.data.forEach((v, i, l) => {
              arr.push({
                id: v.id,
                name: v.menuName
              });
            });
            this.dataToPower = arr;
            // console.log("this.dataToPower:", this.dataToPower);
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
    },
    init() {
      this.getCustomerFun();
      this.getRoleFun();
      // this.getInfoFun(); /*获取个人信息 新增页面不用*/
    },
    /*获取个人信息*/
    getInfoFun() {
      getMemberInfo({
        userName: localStorage.getItem("lsp_query_name")
      })
        .then(res => {
          console.log("userInfo res:", res);
          this.roleId = res.data.roleId;
          if (this.roleId) this.query(); //传来的对象必须有部门，有roleId才查询三者
          this.formObject = {
            name: res.data.realName,
            id: res.data.userName,
            pass: res.data.password,
            department: res.data.roleId,
            position: res.data.post,
            goodsBrandInfo: res.data.goodsBrandInfo, //品牌分配
            shipperInfo: res.data.shipperInfo, //客户分配
            menuInfo: res.data.menuInfo, //权限管理分配
            subDepartment: res.data.customerInfo
          };
          this.yPsd = res.data.password;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*获取所属部门*/
    getRoleFun() {
      /*获取所属部门*/
      let participation = {
        //编辑从列表里取comId、新增从userInfoL里取comId
        comId: JSON.parse(window.localStorage.getItem("userInfo")).comId
        // comId: localStorage.getItem("lsp_com_id")
      };
      getRole(participation)
        .then(res => {
          // console.log("---:", res);
          this.departmentData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*获取所有货主*/
    getCustomerFun() {
      let participation = {
        //编辑从列表里取comId、新增从userInfoL里取comId
        comId: JSON.parse(window.localStorage.getItem("userInfo")).comId
        // comId: localStorage.getItem("lsp_com_id")
      };
      getH(participation)
        .then(res => {
          // console.log("获取货主：", res.data);
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

    /*表单提交*/
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //品牌分配数据格式包装
          this.formObject.goodsBrandInfo.forEach((v, i, l) => {
            v.id = v.name;
            v.name = "";
          });

          //客户分配数据格式包装
          this.formObject.shipperInfo.forEach((v, i, l) => {
            v.id = v.name;
            v.name = "";
          });

          //权限管理分配数据格式包装
          this.formObject.menuInfo.forEach((v, i, l) => {
            v.id = v.name;
            v.name = "";
          });

          //包装货主数据格式
          let customerList = [];
          this.formObject.subDepartment.forEach((v, i, l) => {
            customerList.push({ id: v.name });
          });

          let participation = {
            power: "40",
            userName: this.formObject.id, //新增和编辑都用userName
            // comId: localStorage.getItem("lsp_com_id"), //编辑
            comId: JSON.parse(window.localStorage.getItem("userInfo")).comId, //新增
            realName: this.formObject.name,
            password:
              this.formObject.pass === this.yPsd
                ? this.formObject.pass
                : md5(this.formObject.pass),
            post: this.formObject.position,
            roleId: this.formObject.department,
            goodsBrandInfo: this.formObject.goodsBrandInfo, //品牌分配
            shipperInfo: this.formObject.shipperInfo, //客户分配
            menuInfo: this.formObject.menuInfo, //权限管理分配
            customerInfo: customerList
          };
          createU(participation)
            .then(res => {
              if (res.ret == "0") {
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
                this.$router.push({ path: "/power/company/member" });
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
    /*返回*/
    cancel() {
      this.$router.push({ path: "/power/company/member" });
    },
    /*change密码*/
    focusFun() {
      if (this.formObject.pass === this.yPsd) {
        this.formObject.pass = "";
      }
    },
    /*选择部门时change queryFun*/
    changeFun(val) {
      this.roleId = val;
      this.query();
    },
    /*删除货主*/
    delH(index) {
      this.formObject.subDepartment.splice(index, 1);
    },
    /*添加货主*/
    addH() {
      this.formObject.subDepartment.push({
        customerName: ""
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/view/power//styles/editContainer";
@import "~@/assets/scss/form";

/* native begin */
.popupContainer {
  border-radius: 8px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 25px 22px 20px 22px;
    .el-button {
      padding: 0px;
    }
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
/* native end */
.popupContainer {
  .diyClose {
    z-index: 1;
    cursor: pointer;
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: 16px;
  }
  .diyHead {
    text-align: center;
    width: 100%;
    line-height: 30px;
    span {
      color: #2b3d51;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .diyBody {
    padding: 14px 0px 0px 0px;
    .scrollBody {
      margin: 20px 0px 10px 0px;
      overflow-y: auto;
      min-height: 30px;
      max-height: 180px;
      padding: 10px;
      .el-checkbox {
        margin-bottom: 24px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .selectAllCol {
      text-align: center;
    }
  }
  .btnLine {
    text-align: center;
    margin: 0px 0px 20px 0px;
    .formBtn {
      width: 144px;
      height: 36px;
    }
    .resetBtn {
      border-color: #12bd7b;
      color: #12bd7b;
    }
  }
}
</style>