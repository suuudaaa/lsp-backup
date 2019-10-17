<template>
  <div class="b-t-table" v-loading="loading" element-loading-background="transparent">
    <div v-show="isData">
      <div class="stock-brand" v-if="tabIndex==0">
        <el-table
          empty-text="数据加载中，请稍等..."
          :data="tableData"
          style="width: 100%;"
          height="262"
          :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B',fontFamily:'SourceHanSansCN-Regular'}"
          @row-click="linkToBrand"
          v-loadmore="loadMore"
        >
          <el-table-column label="品牌" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="recent-circle" v-if="tShow"></span>
              <span>{{ scope.row.goodsBrand }}</span>
              <span class="show-new" v-if="tShow">NEW</span>
            </template>
          </el-table-column>
          <el-table-column label="规格数" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.goodsModelNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="箱数" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.cartons }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="货物数量"
            height="214"
            :show-overflow-tooltip="true"
            v-if="requestSym=='inOrder' || requestSym=='outOrder'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.goodsNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可用数量" height="214" :show-overflow-tooltip="true" v-else>
            <template slot-scope="scope">
              <span>{{ scope.row.qtyNumber }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>-->
      <div class="stock-type-spe" v-if="tabIndex==1">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="262"
          :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
          @row-click="linkToSpecs"
          v-loadmore="loadMore"
        >
          <el-table-column label="规格型号" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope" v-if="tShow">
              <span class="recent-circle" v-if=" scope.row.recent"></span>
              <span>{{ scope.row.goodsModel }}</span>
              <span class="show-new" v-if=" scope.row.shows">NEW</span>
            </template>
          </el-table-column>
          <el-table-column label="货物名称" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="货物数量" height="214" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.onHandNumber }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="blank-page ld-type-data" v-show="!isData">
      <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
      <img src="../../../static/img/no_data.png" alt />
      <p class="no-data-text">{{noDataTxt[tabIndex]}}</p>
    </div>
  </div>
</template>
<script>
import {
  goodsBrandListModel,
  getGoodsModelList,
  getInBoundGoodsBrandInfo,
  getInBoundGoodsModelInfo,
  getOutBoundGoodsBrandInfo,
  getOutBoundGoodsModelInfo
} from "@/api/getData";
import { toThousands } from "@/modules/common";
import { df } from "@/modules/filters/orderFilter";
export default {
  props: {
    tabIndex: {
      type: Number,
      default: new Number()
    },
    tOrderTime: {
      type: Object,
      default: new Object()
    }
  },
  data() {
    return {
      tableData: [],
      tableTitle1: ["品牌", "规格数", "箱数", "货物数量"], //可接口获取
      tableTitle2: ["规格型号", "物流名称", "货物数量"],
      noDataTxt: ["暂无库内品牌", "暂无规格型号"],
      shows: true,
      orderData: [],
      params: {
        customerCode: "",
        goodsBrand: "",
        page: 1,
        pageSize: 20,
        type: "home"
      },
      params1: {
        startTime: df(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-mm-dd"),
        endTime: df(new Date(), "yyyy-mm-dd"),
        page: 1,
        pageSize: 20
      },
      tShow: false,
      requestSym: "",
      isData: true,
      loading: false,
      totalNum: 0,
      loadSign: true,
      pageTotal: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let sym = this.$route.name;
      if (sym == "入库详情") {
        this.requestSym = "inOrder";
      } else if (sym == "出库详情") {
        this.requestSym = "outOrder";
      } else {
        this.requestSym = "";
        this.params.customerCode = this.$route.query.customerCode || "";
        this.params.goodsBrand = this.$route.query.goodsBrand || "";
      }
      this.getData();
    },
    getData() {
      let that = this;
      that.loading = true;
      that.isData = true;
      if (that.requestSym == "inOrder") {
        if (that.tabIndex == 0) {
          // 请求参数
          getInBoundGoodsBrandInfo(that.params1).then(res => {
            that.brandDataProcess(res);
          });
        } else {
          getInBoundGoodsModelInfo(that.params1).then(res => {
            that.speDataProcess(res);
          });
        }
      } else if (that.requestSym == "outOrder") {
        if (that.tabIndex == 0) {
          // 请求参数
          getOutBoundGoodsBrandInfo(that.params1).then(res => {
            that.brandDataProcess(res);
          });
        } else {
          getOutBoundGoodsModelInfo(that.params1).then(res => {
            that.speDataProcess(res);
          });
        }
      } else {
        if (that.tabIndex == 0) {
          // 请求参数
          goodsBrandListModel(that.params).then(res => {
            that.brandDataProcess(res);
          });
        } else {
          getGoodsModelList(that.params).then(res => {
            that.speDataProcess(res);
          });
        }
      }
    },
    brandDataProcess(res) {
      let that = this;
      that.loading = false;
      that.loadSign = true;
      console.log(res);
      if (res.ret == 0) {
        let data = res.data.rows;
        that.totalNum = res.data.total;
        if (that.pageTotal == null) {
          let arr = [];
          arr = data.map((item, index) => {
            item.qtyNumber = toThousands(item.qtyNumber);
            item.onHandNumber = toThousands(item.onHandNumber);
            item.cartons = toThousands(item.cartons);
            return item;
          });
          if (arr.length == 0) {
            that.isData = false;
          }
          that.tableData = arr;
        } else {
          let arr = [];
          arr = data.map((item, index) => {
            item.qtyNumber = toThousands(item.qtyNumber);
            item.onHandNumber = toThousands(item.onHandNumber);
            item.cartons = toThousands(item.cartons);
            return item;
          });
          that.tableData = that.tableData.concat(arr);
        }
      } else {
        that.isData = false;
      }
    },
    speDataProcess(res) {
      let that = this;
      that.loading = false;
      that.loadSign = true;
      if (res.ret == 0) {
        let data = res.data.rows;
        let arr = [];
        that.totalNum = res.data.total;
        if (that.pageTotal == null) {
          arr = data.map((item, index) => {
            item.qtyNumber = toThousands(item.qtyNumber);
            return item;
          });
          if (arr.length == 0) {
            that.isData = false;
          }
          that.tableData = arr;
        } else {
          arr = data.map((item, index) => {
            item.qtyNumber = toThousands(item.qtyNumber);
            return item;
          });
          that.tableData = that.tableData.concat(arr);
        }
      } else {
        that.isData = false;
      }
    },
    linkToBrand(row, column, event) {
      if (row.customerCode && row.goodsBrand) {
        this.$router.push({
          path: "/brandsDetail",
          query: {
            customerCode: row.customerCode,
            goodsBrand: row.goodsBrand
          }
        });
      } else {
        return;
      }
    },
    linkToSpecs(row, column, event) {
      let customerCode = row.customerCode;
      let goodsModel = row.customerCode;
      if (customerCode && goodsModel) {
        this.$router.push({
          path: "/specsDetail",
          query: {
            customerCode: row.customerCode,
            goodsModel: row.goodsModel,
            goodsBrand: row.goodsBrand
          }
        });
      } else {
        return;
      }
    },
    headerCellStyle(row, column, rowIndex, columnIndex) {
      return "text-align:center";
    },
    loadMore() {
      if (this.loadSign) {
        this.loadSign = false;
        if (this.requestSym == "inOrder" || this.requestSym == "outOrder") {
          this.params1.page++;
          this.pageTotal = Math.ceil(this.totalNum / this.params1.pageSize);
          if (this.params1.page > this.pageTotal) {
            this.loadSign = false;
            return;
          } else {
            this.loadSign = true;
          }
          this.getData();
        } else {
          this.params.page++;
          this.pageTotal = Math.ceil(this.totalNum / this.params1.pageSize);
          if (this.params.page > this.pageTotal) {
            this.loadSign = false;
            return;
          } else {
            this.loadSign = true;
          }
          this.getData();
        }
      } else {
        return;
      }
    }
  },
  computed: {
    noMore() {
      if (this.requestSym == "inOrder" || this.requestSym == "outOrder") {
        return this.totalNum >= this.params1.page;
      } else {
        return this.totalNum >= this.params.page;
      }
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {
    tOrderTime: {
      deep: true,
      handler(newVal) {
        let obj = this.tOrderTime;
        this.params1 = Object.assign(this.params1, obj);
        this.getData();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.b-t-table {
  width: 100%;
  float: left;
  /deep/ .el-table th > .cell {
    position: relative;
    word-wrap: normal;
    text-overflow: ellipsis;
    vertical-align: middle;
    width: 100%;
    // padding: 0 20px;
  }
  /deep/ .el-table td,
  .el-table th {
    padding: 10px 12px;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }
}

.recent-circle {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: rgba(19, 194, 194, 1);
  border-radius: 50%;
  line-height: 30px;
}
.show-new {
  display: inline-block;
  width: 40px;
  background: rgba(240, 90, 50, 0.12);
  border-radius: 2px;
  font-size: 12px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(240, 90, 50, 1);
  line-height: 20px;
  text-align: center;
}
.blank-page {
  height: 100%;
  width: 100%;
  padding: 40px 0;
  text-align: center;
  background-color: #fff;
  .iconfont {
    font-size: 120px;
  }
  .no-data-text {
    height: 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(126, 140, 155, 1);
  }
}
.ld-type-data {
  height: 260px;
}
/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
/deep/ .el-table th.gutter {
  display: table-cell !important;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  /* background-color: #212e3e !important; */
  color: #000;
}
</style>

