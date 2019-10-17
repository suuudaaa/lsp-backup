<template>
  <div class="container">
    <div class="order-search-table">
      <div class="order-ser-group" v-loading="loading" element-loading-background="transparent">
        <div class="ld-ser-table" v-show="isData">
          <el-table
            empty-text="数据加载中，请稍等..."
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
            :cell-style="cellStyle"
            @row-click="goToDetail"
            stripe
          >
            <template v-for="(item,index) in tableTitle">
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                :key="index"
                :sortable="item.type"
                sort-by="onHandNumber"
                :show-overflow-tooltip="true"
                min-width="150"
                fit
              ></el-table-column>
            </template>
          </el-table>
          <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
        </div>
      </div>
    </div>
    <div class="no-data">
      <div class="blank-page" v-show="!isData">
        <img src="../../../static/img/no_data.png" alt />
        <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
        <p class="no-data-text">暂无品牌数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { selGoodsModelList, selGoodsBrandList } from "@/api/getData";
import Pagination from "@/components/commonComponents/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      setPage: {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSize: 20,
        pageSizes: [20, 40, 60]
      },
      tableData: [],
      tableTitle: [],
      params: {
        page: 1,
        pingSize: 12,
        goodsBrand: "",
        goodsModel: ""
      },
      differType: "",
      isData: true,
      loading: false
    };
  },
  methods: {
    getSearchTableData(params) {
      // 品牌
      let that = this;
      that.isData = true;
      that.loading = true;
      selGoodsBrandList(params)
        .then(res => {
          that.loading = false;
          if (res.ret == 0) {
            let data = res.data.rows;
            if (data.length == 0) {
              that.isData = false;
            }
            let arr = [];
            arr = data.map((item, index) => {
              item.onHandNumber = Number(item.onHandNumber);
              item.cartons = Number(item.cartons);
              item.totalWeight = Number(item.totalWeight);
              item.goodsModelNumber = Number(item.goodsModelNumber);
              return item;
            });
            that.tableData = arr;
            that.tableTitle = res.data.title;
            let total = { pageTotal: res.data.total };
            that.setPage = Object.assign(that.setPage, total);
          } else {
            that.isData = false;
          }
        })
        .catch(err => {
          this.$message.error(err);
          that.isData = false;
          that.loading = false;
        });
    },
    getSearchTableData1(p) {
      let that = this;
      that.isData = true;
      that.loading = true;
      selGoodsModelList(p)
        .then(res => {
          that.loading = false;
          if (res.ret == 0) {
            let arr = [];
            let data = res.data.rows;
            if (data.length == 0) {
              that.isData = false;
            }
            arr = data.map((item, idx) => {
              item.onHandNumber = Number(item.onHandNumber);
              item.cartons = Number(item.cartons);
              return item;
            });
            that.tableData = arr;
            that.tableTitle = res.data.title;
            let total = { pageTotal: res.data.total };
            that.setPage = Object.assign(that.setPage, total);
          } else {
            that.data = false;
          }
        })
        .catch(err => {
          that.loading = false;
          that.isData = false;
          console.log(err);
        });
    },
    pageChange(data) {
      this.params.pageSize = data.pageSize;
      this.params.pageNum = data.pageNum;
      if (this.differType == "st1") {
        this.getSearchTableData(this.params);
      } else {
        this.getSearchTableData1(this.params);
      }
    },
    cellStyle() {
      // return 'padding:0'
    },
    goToDetail(row, column, event) {
      if (this.differType == "st1") {
        let customerCode = row.customerCode;
        let goodsBrand = row.goodsBrand;
        if (customerCode && goodsBrand) {
          this.$router.push({
            path: "/brandsDetail",
            query: {
              customerCode: row.customerCode,
              goodsBrand: row.goodsBrand
            }
          });
        }
      } else {
        let customerCode = row.customerCode;
        let goodsModel = row.goodsModel;
        if (row.customerCode && row.goodsBrand) {
          this.$router.push({
            path: "/specsDetail",
            query: {
              customerCode: row.customerCode,
              goodsModel: row.goodsModel
            }
          });
        }
      }
      // this.$router.push({
      //   path: "/brandsDetail",
      //   query: {
      //     customerCode: row.customerCode,
      //     goodsBrand: row.goodsBrand
      //   }
      // });
    }
  },
  mounted() {
    let p = this.$route.query;
    if (p.id == "st1") {
      this.differType = p.id;
      this.params.goodsModel = "";
      this.params.goodsBrand = p.key;
      this.getSearchTableData(this.params);
    } else {
      this.differType = p.id;
      this.params.goodsBrand = "";
      this.params.goodsModel = p.key;
      this.getSearchTableData1(this.params);
    }
  },
  watch: {
    $route: function(to, from) {
      let p = this.$route.query;
      if (p.id == "st1") {
        this.differType = p.id;
        this.params.goodsModel = "";
        this.params.goodsBrand = p.key;
        this.getSearchTableData(this.params);
      } else {
        this.differType = p.id;
        this.params.goodsBrand = "";
        this.params.goodsModel = p.key;
        this.getSearchTableData1(this.params);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.order-search-table {
  width: $container-height;
  padding: $main-padding;
  .order-ser-group{
    position: relative;
  }
  .ld-ser-table {
    margin-bottom: 24px;
  }
}
</style>