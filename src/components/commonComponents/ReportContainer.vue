<template>
  <div id="report" v-loading="loading" element-loading-background="transparent">
    <el-row :gutter="12">
      <el-col :span="16">
        <tab-nav
          :selection="this.selection"
          :label-data="labelData"
          v-on:re-tab-render="changeTabs"
        ></tab-nav>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="12">
            <el-button
              type="primary"
              size="small"
              icon="iconfont iconrukuxiangqing-daochubaobiao"
              @click="excelOut"
            >&nbsp;导出报表</el-button>
          </el-col>
          <el-col :span="6">
            <div class="report-screen1">
              <div
                class="report-form"
                :class="screenBox == 0?'active':''"
                @click="showScreenBox(0)"
              >
                <span>筛选项</span>
                <i class="iconfont iconkucunkantai-shaixuan-xiala"></i>
              </div>
              <div class="report-screen1-form" v-if="screenBox == 0">
                <el-card>
                  <el-form ref="form" label-width="100px" label-position="left">
                    <el-form-item label="仓库筛选">
                      <el-button
                        type="text"
                        v-for="(item,index) in repScreenType"
                        :key="index"
                        :style="{'color':index==repIndex?'#2b3d51':'#7E8C9B'}"
                        :class="index==repIndex?'txt-weight':''"
                        @click="selectWareType(index,item)"
                      >{{item}}</el-button>
                    </el-form-item>
                    <el-form-item label="查询时间">
                      <date-picker :picker="clearPicker" v-on:date-picker-change="datePickerChange"></date-picker>
                    </el-form-item>
                    <el-form-item label="订单类型">
                      <el-select v-model="params.search_EQ_orderTypeCode" placeholder="请选择订单类型">
                        <el-option label="加急" value="JD"></el-option>
                        <el-option label="正常" value="FJD"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="收发货类型" v-if="reportType == 4">
                      <el-select v-model="search_EQ_orderType" placeholder="请选择收发货类型">
                        <el-option label="入仓订单" value="RECEIVE"></el-option>
                        <el-option label="出仓订单" value="SHIP"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="系统单号">
                      <el-input v-model="params.search_LIKE_sysOrderNo" placeholder="请输入系统单号"></el-input>
                    </el-form-item>
                    <el-form-item label="客户单号">
                      <el-input v-model="params.search_LIKE_custOrderNo" placeholder="请输入客户单号"></el-input>
                    </el-form-item>
                    <el-form-item label="货主">
                      <el-input v-model="params.search_LIKE_customerName" placeholder="请输入货主"></el-input>
                    </el-form-item>
                    <el-form-item label="规格型号">
                      <el-input v-model="params.search_LIKE_goodsModel" placeholder="请输入规格型号"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                      <el-input v-model="params.search_LIKE_goodsName" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商">
                      <el-input v-model="params.search_LIKE_supplyName" placeholder="请输入供应商"></el-input>
                    </el-form-item>
                    <el-form-item label="商品品牌">
                      <el-input v-model="params.search_LIKE_goodsBrand" placeholder="请输入商品品牌"></el-input>
                    </el-form-item>
                    <el-form-item label="报关单号">
                      <el-input v-model="params.search_LIKE_bgBillNo" placeholder="请输入报关单号"></el-input>
                    </el-form-item>
                    <el-form-item label="DATE CODE">
                      <el-input v-model="params.search_LIKE_dateCode" placeholder="请输入DATE CODE"></el-input>
                    </el-form-item>
                    <el-form-item label="BIN CODE">
                      <el-input v-model="params.search_LIKE_binCode" placeholder="请输入BIN CODE"></el-input>
                    </el-form-item>
                    <el-form-item label="物料编码">
                      <el-input v-model="params.search_LIKE_binCode2" placeholder="请输入物料编码"></el-input>
                    </el-form-item>
                    <el-form-item label="HS编码">
                      <el-input v-model="params.search_LIKE_goodsNumber" placeholder="请输入HS编码"></el-input>
                    </el-form-item>
                    <el-form-item label="客户要求">
                      <el-input v-model="params.search_LIKE_description" placeholder="请输入客户要求"></el-input>
                    </el-form-item>
                    <div class="report-screen-button">
                      <el-button size="medium" @click="emptyData">清除</el-button>
                      <el-button
                        @click="onSubmit"
                        type="primary"
                        size="medium"
                        :disabled="isFormScreen"
                      >确定</el-button>
                    </div>
                  </el-form>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="6" v-on:click.stop.prevent>
            <div class="report-screen2">
              <div
                class="report-form"
                :class="screenBox == 1?'active':''"
                @click="showScreenBox(1)"
              >
                <span>表单设置</span>
                <i class="iconfont iconkucunkantai-shaixuan-xiala"></i>
              </div>
              <div class="report-screen2-form" v-if="screenBox == 1">
                <el-card>
                  <div id="form-set">
                    <p>选择你需要查看的信息类别</p>
                    <el-form label-width="100px">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox
                          v-for="(item,index) in setOption"
                          :key="index"
                          :label="item"
                          style="color:#2B3D51;width:50%;margin:10px 0;"
                          @change="checkChange"
                        ></el-checkbox>
                      </el-checkbox-group>
                      <div class="report-screen-button">
                        <el-button size="medium" @click="emptyCheckList">清除</el-button>
                        <el-button
                          @click="onSubmit1"
                          type="primary"
                          size="medium"
                          :disabled="isCheck"
                        >确定</el-button>
                      </div>
                    </el-form>
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-show="isData">
      <div class="b-table" v-if="tableData.length != 0">
        <div v-if="tableTitle.length != 0">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
            :cell-style="cellStyle"
            stripe
          >
            <template v-for="(item,index) in tableTitle">
              <el-table-column
                :prop="item.codeNo"
                :label="item.name"
                :key="index"
                :sortable="item.isSortable"
                :show-overflow-tooltip="true"
                min-width="150"
                fit
              ></el-table-column>
            </template>
          </el-table>
        </div>
        <div v-else>
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
            :cell-style="cellStyle"
            stripe
          >
            <el-table-column
              v-for="(val,key,index) of tableData[0]"
              :key="index"
              :prop="key"
              :label="key"
              align="center"
              :show-overflow-tooltip="true"
              min-width="150"
              fit
            ></el-table-column>
          </el-table>
        </div>
        <div class="paging">
          <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
        </div>
      </div>
    </div>
    <div class="re-no-data" v-show="!isData">
      <div class="blank-page">
        <img src="../../../static/img/no_data.png" alt />
        <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
        <p class="no-data-text">暂无{{labelData[reportType].label}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import TabNav from "@/components/commonComponents/TabNav";
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import { df } from "../../modules/filters/orderFilter";
import datePicker from "@/components/commonComponents/datePicker";
import Pagination from "@/components/commonComponents/Pagination";
import QS from "qs";
import {
  getInOrderReport,
  getOutofstockReport,
  getOutofstockReport1,
  getInventoryStatement,
  getInvTraStatement,
  getReceiveAndSendGoodsReport,
  fileOut
} from "@/api/getData";
export default {
  components: {
    BreadCrumb,
    TabNav,
    Pagination,
    datePicker
  },
  props: ["labelData"],
  data() {
    return {
      selection: "first",
      screenBox: null,
      labelPosition: "right",
      clearPicker: true,
      checkList: [],
      setOption: [],
      selectCols: "gcbBillNo,orderBillDate,orderTypeName,warehouseName,customerName,custOrderNo,goodsName,goodsModel,goodsBrand,warehousingNum,unit,price,currencyType,bgBillNo,supplyName,goodsNumber,storeDate,lot,carton,locationCode,dateCode,binCode,cpn",
      params: {
        page: 1, //页数
        limit: 20, //每页大小
        search_GTE_createTime: df(new Date(), "yyyy-mm-dd", 7), //开始时间
        search_LTE_createTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        search_EQ_orderTypeCode: "", //订单类型 JD:急单FJD:非急单
        search_EQ_warehouseType: 1, //所属仓库 1:东莞长安保税仓10:东莞长安普通仓20:香港仓
        search_LIKE_sysOrderNo: "", //系统订单号
        search_LIKE_custOrderNo: "", //客户单号
        search_LIKE_customerName: "", //货主
        search_LIKE_goodsModel: "", //规格型号
        search_LIKE_goodsName: "", //商品名称
        search_LIKE_supplyName: "", //供应商
        search_LIKE_goodsBrand: "", //商品品牌
        search_LIKE_bgBillNo: "", //出仓报关单号
        search_LIKE_goodsNumber: "", //HS编码
        search_LIKE_dateCode: "", //DATE CODE
        search_LIKE_binCode: "", //BIN/CAT CODE
        search_LIKE_cpn: "", //物料编码
        search_LIKE_description: "" //客户要求
      },
      search_EQ_orderType: "RECEIVE",
      orderTotalNum: 0,
      screenForm1Show: false,
      setPage: {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSize: 20,
        pageSizes: [20, 40, 60]
      },
      tableData: [],
      tableTitle: [],
      isCheck: false,
      isFormScreen: false,
      repScreenType: ["香港仓库", "保税仓库", "完税仓库"],
      repIndex: 1,
      reportType: 0,
      exportUrl: "/inOrderReport/exportInOrderReport",
      loading: false,
      fileName: "入库报表",
      isData: true
    };
  },
  methods: {
    changeTabs(data) {
      this.loading = true;
      this.reportType = data.configure.index;
      this.selection = data.configure.name;
      this.clearPicker = !this.clearPicker;
      let param = {
        page: 1, //页数
        limit: 20, //每页大小
        search_GTE_createTime: df(new Date(), "yyyy-mm-dd", 7), //开始日期
        search_LTE_createTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        search_EQ_orderTypeCode: "", //订单类型 JD:急单FJD:非急单
        search_EQ_warehouseType: 1, //所属仓库 1:东莞长安保税仓10:东莞长安普通仓20:香港仓
        search_LIKE_sysOrderNo: "", //系统订单号
        search_LIKE_custOrderNo: "", //客户单号
        search_LIKE_customerName: "", //货主
        search_LIKE_goodsModel: "", //规格型号
        search_LIKE_goodsName: "", //商品名称
        search_LIKE_supplyName: "", //供应商
        search_LIKE_goodsBrand: "", //商品品牌
        search_LIKE_bgBillNo: "", //出仓报关单号
        search_LIKE_goodsNumber: "", //HS编码
        search_LIKE_dateCode: "", //DATE CODE
        search_LIKE_binCode: "", //BIN/CAT CODE
        search_LIKE_cpn: "", //物料编码
        search_LIKE_description: "" //客户要求
      };
      this.params = param;
      this.tableData = [];
      this.tableTitle = [];
      this.getRequestData(data.configure.index);
      let obj = {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSize: 20,
        pageSizes: [20, 40, 60]
      };
      this.setPage = Object.assign(this.setPage, obj);
    },
    getRequestData(num) {
      this.loading = true;
      this.isData = true;
      let that = this;
      that.fileName = that.labelData[num].label;
      if (num == 0) {
        that.exportUrl = "/inOrderReport/exportInOrderReport";
        getInOrderReport(that.params)
          .then(res => {
            that.loading = false;
            that.dataProcessing(res);
          })
          .catch(err => {
            that.loading = false;
            that.isData = false;
            console.log(err);
          });
      } else if (num == 1) {
        that.exportUrl = "/outOrderReport/exportOutOrderReport";
        getOutofstockReport(that.params)
          .then(res => {
            that.loading = false;
            that.dataProcessing(res);
          })
          .catch(err => {
            that.loading = false;
            that.isData = false;
            console.log(err);
          });
      } else if (num == 2) {
        that.exportUrl = "/stockReport/exportStock";
        getInventoryStatement(that.params)
          .then(res => {
            that.loading = false;
            that.dataProcessing(res);
          })
          .catch(err => {
            that.loading = false;
            that.isData = false;
            console.log(err);
          });
      } else if (num == 3) {
        that.exportUrl = "/stockSource/exportStockSource";
        getInvTraStatement(that.params)
          .then(res => {
            that.loading = false;
            that.dataProcessing(res);
          })
          .catch(err => {
            that.loading = false;
            that.isData = false;
            console.log(err);
          });
      } else {
        that.exportUrl = "/sourceQuery/exportSourceQuery";
        let obj = {
          search_EQ_orderType: that.search_EQ_orderType
        };
        that.params = Object.assign(that.params, obj);
        getReceiveAndSendGoodsReport(that.params)
          .then(res => {
            that.loading = false;
            that.dataProcessing(res);
          })
          .catch(err => {
            that.loading = false;
            that.isData = false;
            console.log(err);
          });
      }
    },
    // 表头字段排序
    tableHeaderOrder(a, b) {
      return a.orderNum - b.orderNum;
    },
    showScreenBox(num) {
      // this.screenBox = num;
      if (this.screenBox == num) {
        this.screenBox = null;
      } else {
        this.screenBox = num;
        if (num == 0) {
          //获取动态筛选项数据
        } else {
          //获取动态表单设置数据
          window.sessionStorage.setItem("reportChecked", this.checkList);
        }
      }
    },
    // 获取筛选项
    getScreenList(index) {
      // getReportScreenList(index).then(res => {
      //   console.log(JSON.stringify(res));
      //   this.type = res.data.title;
      // });
    },
    // 获取表单设置
    cellStyle(row, column, rowIndex, columnIndex) {
      //根据报警级别显示颜色
      if (row.column.label === "订单类型" && row.row.orderType === "加急") {
        return "color:#FF4D4F";
      } else if (
        row.column.label === "订单类型" &&
        row.row.orderType === "异常"
      ) {
        return "color:#F5A31E";
      }
      // return "padding:0"//改变高度
    },
    checkChange() {
      if (this.checkList.length <= 0) {
        this.isCheck = true;
      } else {
        window.sessionStorage.setItem("reportChecked", this.checkList);
        this.isCheck = false;
      }
    },
    pageChange(data) {
      this.params.limit = data.pageSize;
      this.params.page = data.pageNum;
      this.getRequestData(this.reportType);
    },
    // 清空筛选项
    emptyData() {
      let data = this.params;
      for (let key in data) {
        data[key] = "";
      }
      this.clearPicker = !this.clearPicker;
      // this.isFormScreen = true;
    },
    // 清空多选框
    emptyCheckList() {
      this.checkList = [];
      this.isCheck = true;
    },
    onSubmit() {
      //提交参数，对接接口
      this.getRequestData(this.reportType);
      this.screenBox = null;
    },
    onSubmit1() {
      let arr = [];
      let str = "";
      let tableTitles = sessionStorage.getItem("tableTitle");
      tableTitles = JSON.parse(tableTitles);
      for (let i = 0; i < this.checkList.length; i++) {
        for (let j = 0; j < tableTitles.length; j++) {
          if (this.checkList[i] == tableTitles[j].name) {
            arr.push(tableTitles[j]);
            str += tableTitles[j].codeNo + ",";
          }
        }
      }
      arr.sort(this.tableHeaderOrder);
      str = str.slice(0, -1);
      this.tableTitle = arr;
      this.selectCols = str;
      this.screenBox = null;
    },
    datePickerChange(data) {
      let start = data[0];
      let end = data[1];
      this.params.search_GTE_createTime = start;
      this.params.search_LTE_createTime = end;
      // this.isFormScreen = false;
    },
    dataProcessing(res) {
      let that = this;
      if (res.code == 0) {
        let setOptions = [];
        let str = "";
        let tableTitle = res.heads;
        tableTitle.sort(that.tableHeaderOrder);
        for (let i = 0; i < tableTitle.length; i++) {
          setOptions.push(tableTitle[i].name);
          str += tableTitle[i].codeNo + ",";
        }
        if (res.rows.length == 0) {
          that.isData = false;
        }
        window.sessionStorage.setItem("tableTitle", JSON.stringify(tableTitle));
        str = str.slice(0, -1);
        that.selectCols = str;
        that.setOption = setOptions;
        that.checkList = setOptions;
        that.tableData = res.rows;
        that.tableTitle = tableTitle;
        let total = { pageTotal: res.total };
        that.setPage = Object.assign(that.setPage, total);
      } else {
        that.isData = false;
        that.$message.error(res.msg);
      }
    },
    selectWareType(index, item) {
      this.repIndex = index;
      if (index == 0) {
        this.params.search_EQ_warehouseType = 20;
      } else if (index == 1) {
        this.params.search_EQ_warehouseType = 1;
      } else {
        this.params.search_EQ_warehouseType = 10;
      }
    },
    //文件下载
    excelOut() {
      let param = {
        sort: "realInDate",
        order: "desc",
        search_GTE_createTime: this.params.search_GTE_createTime,
        search_LTE_createTime: this.params.search_LTE_createTime,
        search_EQ_orderTypeCode: this.params.search_EQ_orderTypeCode,
        search_EQ_warehouseType: this.params.search_EQ_warehouseType,
        search_LIKE_sysOrderNo: this.params.search_LIKE_sysOrderNo,
        search_LIKE_custOrderNo: this.params.search_LIKE_custOrderNo,
        search_LIKE_customerName: this.params.search_LIKE_customerName,
        search_LIKE_goodsModel: this.params.search_LIKE_goodsModel,
        search_LIKE_goodsName: this.params.search_LIKE_goodsName,
        search_LIKE_supplyName: this.params.search_LIKE_supplyName,
        search_LIKE_goodsBrand: this.params.search_LIKE_goodsBrand,
        search_LIKE_bgBillNo: this.params.search_LIKE_bgBillNo,
        search_LIKE_goodsNumber: this.params.search_LIKE_goodsNumber,
        search_LIKE_dateCode: this.params.search_LIKE_dateCode,
        search_LIKE_binCode: this.params.search_LIKE_binCode,
        search_LIKE_cpn: this.params.search_LIKE_cpn,
        search_LIKE_description: this.params.search_LIKE_description,
        search_selectCols: this.selectCols,
        token: localStorage.getItem("token")
      };
      console.log("报表参数", param.search_selectCols);
      let fileName = this.labelData[this.reportType];
      if (this.fileName == "收发货溯源报表") {
        let obj = {
          search_EQ_orderType: this.search_EQ_orderType
        };
        param = Object.assign(param, obj);
      }
      let url;
      if (location.hostname === "localhost") {
        url = process.env.API_HOST_DEV + this.exportUrl;
      } else if (location.hostname === "10.8.8.49") {
        url = process.env.API_HOST_TEST + this.exportUrl;
      } else if (location.hostname === "lsp.lordstar.com.cn") {
        url = process.env.API_HOST_PROD + this.exportUrl;
      }
      const postDownloadFile = (action, param) => {
        const form = document.createElement("form");
        form.action = action;
        form.method = "post";
        form.target = "self";
        Object.keys(param).forEach(item => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = item;
          input.value = param[item];
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      };
      postDownloadFile(url, param);
    },
    // 设置多个表单数据参数
    getDataprocess1(res, num) {
      if (res.ret == 0) {
        let total = res.data.total;
        let tableData = res.data.rows;
        let tableTitle = res.data.heads;
        switch (num) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.report == "second") {
      this.selection = "second";
      this.reportType = 1;
    }
    this.getRequestData(this.reportType);
    if (this.$route.query.act == "download") {
      if (this.$route.query.report == "second") {
        this.search_selectCols = 'gcbBillNo,orderBillDate,orderTypeName,warehouseName,customerName,custOrderNo,goodsName,goodsModel,goodsBrand,outWarehouseNum,unit,price,currencyType,bgBillNo,supplyName,goodsNumber,storeDate,lot,carton,locationCode,dateCode,binCode,cpn'
      }
      this.excelOut();
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
#report {
  height: 100vh;
  width: $container-height;
  padding: $main-padding;
  .report-form {
    height: 36px;
    line-height: 36px;
    color: #586777;
    span {
      display: inline-block;
    }
    span.active {
      border-bottom: 2px solid #2b3d51;
    }
  }
  .report-form.active {
    span {
      border-bottom: 2px solid #2b3d51;
      color: #2b3d51;
      font-weight: bold;
    }
  }
  .report-screen1,
  .report-screen2 {
    position: relative;
    /deep/ .el-button--medium {
      padding: 12px 57px;
      font-size: 14px;
      border-radius: 4px;
      margin: 0px 12px;
    }
  }
  .report-screen-button {
    text-align: center;
    margin-top: 20px;
  }
  .report-screen1-form {
    width: 383px;
    position: absolute;
    top: 56px;
    right: -96px;
    z-index: 2;
    /deep/ .el-range-editor--small.el-input__inner {
      height: 40px;
      width: 238px;
    }
    /deep/ .el-range-editor--small .el-range-separator {
      line-height: 30px;
      font-size: 13px;
    }
    /deep/ .el-form-item .el-input .el-input__inner {
      border: 0;
      height: 36px;
      line-height: 36px;
      background: #eef1f6;
      width: 238px;
    }
    /deep/ .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 238px;
    }
    /deep/ .el-select {
      display: inline-block;
      position: relative;
      width: 238px;
    }
    .container {
      /deep/ .el-form-item .el-input {
        width: 238px;
      }
    }
  }
  .report-screen2-form {
    width: 383px;
    position: absolute;
    top: 56px;
    right: 0;
    z-index: 2;
    #form-set {
      p {
        margin-bottom: 20px;
        color: #7e8c9b;
      }
    }
  }
  .re-no-data {
    background-color: #fff;
    width: 100%;
    height: 733px;
  }
  .b-table {
    margin: 24px 0;
  }
  /deep/ .container .el-form-item .el-input .el-input__inner {
    border: 0;
    height: 36px;
    line-height: 36px;
    background: #eef1f6;
    width: 238px;
  }
}
</style>