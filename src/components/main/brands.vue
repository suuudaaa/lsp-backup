<template>
  <div class="container">
    <div class="brands-table-page">
      <bread-crumb></bread-crumb>
      <div class="ld-brand-cont" v-show="isData" v-loading ="loading" element-loading-background="transparent">
        <div class="b-table" >
          <el-table
            empty-text="数据加载中，请稍等..."
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
            stripe
            @row-click="gotoDetail"
          >
            <template v-for="(item,index) in tableTitle">
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                :key="index"
                :sortable="item.type"
                :show-overflow-tooltip="true"
                min-width="150"
                fit
              ></el-table-column>
            </template>
          </el-table>
        </div>
        <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
      </div>
      <div class="no-data">
        <div class="blank-page" v-show="!isData">
          <img src="../../../static/img/no_data.png" alt />
          <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
          <p class="no-data-text">暂无品牌数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import Pagination from "@/components/commonComponents/Pagination";
import { goodsBrandListModel } from "@/api/getData";
import { toThousands } from "@/modules/common";
export default {
  components: {
    BreadCrumb,
    Pagination
  },
  data() {
    return {
      tableData: [],
      tableTitle: [],
      params: {
        pageSize: 20,
        page:1
      },
      setPage: {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSizes: [20, 40, 60],
        pageSize: 20
      },
      loading: false,
      isData: true
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {},
    cellStyle(row, column, rowIndex, columnIndex) {
      //根据报警级别显示颜色,单元格颜色
      if (row.column.label === "姓名" && row.row.name === "张大茂") {
        return "color:red";
      } else if (row.column.label === "姓名" && row.row.name === "李明世") {
        return "color:yellow";
      }
    },
    getBrandTableData(params) {
      let that = this;
      that.loading = true;
      that.isData = true;
      goodsBrandListModel(params)
        .then(res => {
          that.loading = false;
          if (res.ret == 0) {
            let data = res.data.rows;
            let arr = [];
            arr = data.map((item, index) => {
              // 加千分号变成字符串，字符串排序按字符串顺序
              item.qtyNumber = Number(item.qtyNumber);
              item.todayInBoundNumber = Number(item.todayInBoundNumber);
              item.cartons = Number(item.cartons);

              // item.qtyNumber = toThousands(item.qtyNumber);
              // item.onHandNumber = toThousands(item.onHandNumber);
              // item.todayInBoundNumber = toThousands(item.todayInBoundNumber);
              // item.cartons = toThousands(item.cartons);
              return item;
            });
            that.tableData = res.data.rows;
            that.tableTitle = res.data.title;
            let obj = {
              pageTotal: res.data.total
            };
            that.setPage = Object.assign(that.setPage, obj);
          }else {
            that.isData = false;
          }
        })
        .catch(err => {
          that.loading = false;
          that.isData = false;
          this.$message.error(err);
        });
    },
    pageChange(data) {
      this.params.pageSize = data.pageSize;
      this.params.page = data.pageNum;
      this.getBrandTableData(this.params);
    },
    gotoDetail(row, column, event) {
      if (row.goodsBrand== null) {
        return;
      }
      this.$router.push({
        path: "/brandsDetail",
        query: {
          customerCode: row.customerCode,
          goodsBrand: row.goodsBrand
        }
      });
    },
  },
  mounted() {
    this.getBrandTableData(this.params);
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.brands-table-page {
  height: 100vh;
  .b-table {
    // height: 100vh;
    margin: 24px 0;
  }
}
</style>


