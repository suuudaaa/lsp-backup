<template>
  <div class="container">
    <bread-crumb></bread-crumb>
    <div class="b-t-table" v-loading="loading" element-loading-background="transparent">
      <div v-show="isData">
        <div class="stock-type-spe">
          <el-table
            empty-text="数据加载中，请稍等..."
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
            @row-click="linkToSpecs"
            v-loadmore="loadMore"
          >
            <el-table-column label="规格型号" height="214" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="recent-circle" v-if="shows"></span>
                <span>{{ scope.row.goodsModel }}</span>
                <span class="show-new" v-if="shows">NEW</span>
              </template>
            </el-table-column>
            <el-table-column label="货物名称" height="214" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
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
          <pagination :set-page="setPage" v-on:page-change="pageChange" class="page"></pagination>
        </div>
      </div>
      <div class="blank-page ld-type-data" v-show="!isData">
        <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
        <img src="../../../static/img/no_data.png" alt />
        <p class="no-data-text">暂无规格型号数据</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getGoodsModelList,
  getInBoundGoodsModelInfo,
  getOutBoundGoodsModelInfo
} from "@/api/getData";
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import Pagination from "@/components/commonComponents/Pagination";
import { toThousands } from "@/modules/common";
import { df } from "@/modules/filters/orderFilter";
export default {
  props: {
    tOrderTime: {
      type: Object,
      default: new Object()
    }
  },
   components: {
    BreadCrumb,
    Pagination
  },
  data() {
    return {
      tableData: [],
      tableTitle1: ["品牌", "规格数", "箱数", "货物数量"], //可接口获取，可组件传参
      tableTitle2: ["规格型号", "物流名称", "货物数量"],
      noDataTxt: ["暂无库内品牌", "暂无规格型号"],
      shows: false,
      orderData: [],
      params: {
        page: 1,
        pageSize: 20
      },
      params1: {
        startTime: df(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-mm-dd"),
        endTime: df(new Date(), "yyyy-mm-dd"),
        page: 1,
        pageSize: 20
      },
      setPage: {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSizes: [20, 40, 60],
        pageSize: 20
      },
      requestSym: "",
      loading: false,
      isData: true,
      totalNum: 0,
      loadSign: true,
      pageTotal: null,
      noTableData: false
    };
  },
  mounted() {
    let sym = this.$route.name;
    if (sym == "入库详情") {
      this.requestSym = "inOrder";
    } else if (sym == "出库详情") {
      this.requestSym = "outOrder";
    } else {
      this.requestSym = "";
    }
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      that.loading = true;
      that.isData = true;
      if (that.requestSym == "inOrder") {
        getInBoundGoodsModelInfo(that.params1).then(res => {
          that.dataProcess(res);
        });
      } else if (that.requestSym == "outOrder") {
        getOutBoundGoodsModelInfo(that.params1).then(res => {
          that.dataProcess(res);
        });
      } else {
        getGoodsModelList(that.params).then(res => {
          that.dataProcess(res);
        });
      }
    },
    dataProcess(res) {
      let that = this;
      that.loading = false;
      if (res.ret == 0) {
        let data = res.data.rows;
        that.totalNum = res.data.total;
        let obj = {
          pageTotal: res.data.total
        };
        that.setPage = Object.assign(that.setPage, obj);
        if (that.pageTotal == null) {
          let arr = [];
          arr = data.map((item, index) => {
            item.qtyNumber = toThousands(item.qtyNumber);
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
            return item;
          });
          that.tableData = that.tableData.concat(arr);
        }
      }
    },
    linkToSpecs(row, column, event) {
      let customerCode = row.customerCode;
      let goodsModel = row.goodsModel;
      if (this.requestSym == "inOrder" || this.requestSym == "outOrder") {
        return;
      }
      if (customerCode && goodsModel) {
        this.$router.push({
          path: "/specsDetail",
          query: {
            customerCode: row.customerCode,
            goodsModel: row.goodsModel
          }
        });
      } else {
        return;
      }
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
    },
    pageChange(data) {
      this.params.pageSize = data.pageSize;
      this.params.page = data.pageNum;
      this.getData(this.params);
    }
  }
};
</script>
<style lang='scss' scoped>
.b-t-table {
  margin: 20px 0;
  width: 100%;
  float: left;
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
  .page{
    margin-top:20px;
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
  // height: 20px;
  background: rgba(240, 90, 50, 0.12);
  // opacity: 0.12;
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
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  /* background-color: #212e3e !important; */
  color: #000;
}
</style>

