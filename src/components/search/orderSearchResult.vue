<template>
  <div class="container">
    <div class="order-search-result">
      <div>
        <tab-nav :label-data="this.orderTypeLabel" v-on:re-tab-render="changeTabs"></tab-nav>
        <div
          class="ld-ser-content"
          v-show="isData"
          v-loading="loading"
          element-loading-background="transparent"
        >
          <div class="ld-ser-group1" v-if="tabIndex == 0">
            <div class="order-ser-res-card">
              <el-row :gutter="20">
                <div class="ld-order-card">
                  <el-col
                    :span="6"
                    v-for="(item,idx) in searchData"
                    :key="idx"
                    style="margin-bottom:20px;"
                  >
                    <el-card shadow="hover" style="margin:-bottom:24px;">
                      <div class="order-card-cont" @click="goToDetail(item.billNo)">
                        <div class="o-card-group1">
                          <div class="o-card-group1-title">
                            <p>
                              <span class="urgent-order" v-if="item.isWorryOrder === '急单'">加急入库</span>
                              <!-- <span class="abnormal-order" v-else-if="item === 2">异常出库</span> -->
                              <span class="normal-order" v-else>一般入库</span>
                              <!-- <i class="iconfont iconkucunkantai-weixin" v-if="item === 1"></i> -->
                              <span class="order-date">{{item.createTime}}</span>
                            </p>
                            <!-- <p v-if="tabIndex == 1">
                              <span class="urgent-order" v-if="item.isWorryOrder === '急单'">加急出库</span>
                              <span class="normal-order" v-else>一般出库</span>
                              <span class="order-date">{{item.createTime}}</span>
                            </p>-->
                          </div>
                          <ul class="order-info-name">
                            <!-- <li class="show-order-data">
                              <p class="s-o-name">顾客公司</p>
                              <kt-tooltip :rows="1" :value="item.name" width="100px" ></kt-tooltip>
                              <p class="s-o-val">{{item.name}}</p>
                            </li> -->
                            <li class="show-order-data">
                              <p class="s-o-name">供应商</p>
                              <kt-tooltip :rows="1" :value="item.supplierCode || '暂无'" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.supplierCode || '暂无'}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">客户单号</p>
                              <kt-tooltip :rows="1" :value="item.custOrderNo || '暂无'" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.custOrderNo || '暂无'}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">货物箱数</p>
                              <kt-tooltip :rows="1" :value="item.totalBoxqty" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.totalBoxqty}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">货物件数</p>
                              <kt-tooltip :rows="1" :value="item.expectedQty" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.expectedQty}}</p> -->
                            </li>
                            
                            <!-- <li class="show-order-data">
                            <p class="s-o-name">包含规格</p>
                            <p class="s-o-val">暂无</p>
                          </li>
                          <li class="show-order-data">
                            <p class="s-o-name">出库时间</p>
                            <p class="s-o-val">{{item.createTime}}</p>
                          </li>
                          <li class="show-order-data">
                            <p class="s-o-name">物流单号</p>
                            <p class="s-o-val">暂无</p>
                            </li>-->
                          </ul>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </div>
              </el-row>
            </div>
            <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
          </div>
          <div class="ld-ser-group2" v-if="tabIndex == 1">
            <div class="order-ser-res-card">
              <el-row :gutter="20">
                <div class="ld-order-card">
                  <el-col
                    :span="6"
                    v-for="(item,idx) in searchData1"
                    :key="idx"
                    style="margin-bottom:20px;"
                  >
                    <el-card shadow="hover" style="margin:-bottom:24px;">
                      <div class="order-card-cont" @click="goToDetail(item.billNo)">
                        <div class="o-card-group1">
                          <div class="o-card-group1-title">
                            <p>
                              <span class="urgent-order" v-if="item.isWorryOrder === '急单'">加急出库</span>
                              <span class="normal-order" v-else>一般出库</span>
                              <span class="order-date">{{item.createTime}}</span>
                            </p>
                          </div>
                          <ul class="order-info-name">
                            <li class="show-order-data">
                              <p class="s-o-name">货主</p>
                              <kt-tooltip :rows="1" :value="item.name" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.name}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">客户单号</p>
                              <kt-tooltip :rows="1" :value="item.custOrderNo || '暂无'" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.custOrderNo || '暂无'}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">货物箱数</p>
                              <kt-tooltip :rows="1" :value="item.totalBoxqty" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.totalBoxqty}}</p> -->
                            </li>
                            <li class="show-order-data">
                              <p class="s-o-name">货物件数</p>
                              <kt-tooltip :rows="1" :value="item.expectedQty" width="100px" ></kt-tooltip>
                              <!-- <p class="s-o-val">{{item.expectedQty}}</p> -->
                            </li>
                            <!-- <li class="show-order-data">
                              <p class="s-o-name">供应商</p>
                              <kt-tooltip :rows="1" :value="item.supplierCode || '暂无'" width="100px" ></kt-tooltip>
                              <p class="s-o-val">{{item.supplierCode || '暂无'}}</p>
                            </li> -->
                            <!-- <li class="show-order-data">
                            <p class="s-o-name">包含规格</p>
                            <p class="s-o-val">暂无</p>
                          </li>
                          <li class="show-order-data">
                            <p class="s-o-name">出库时间</p>
                            <p class="s-o-val">{{item.createTime}}</p>
                          </li>
                          <li class="show-order-data">
                            <p class="s-o-name">物流单号</p>
                            <p class="s-o-val">暂无</p>
                            </li>-->
                          </ul>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </div>
              </el-row>
            </div>
            <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
          </div>
        </div>

        <div class="no-data" v-show="!isData">
          <div class="blank-page">
            <img src="../../../static/img/no_data.png" alt />
            <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
            <p class="no-data-text">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TabNav from "@/components/commonComponents/TabNav";
import Pagination from "@/components/commonComponents/Pagination";
import ktTooltip from "@/components/commonComponents/tooltip";
import { df } from "../../modules/filters/orderFilter";
import { inOrderList, outOrderList } from "@/api/getData";
export default {
  components: {
    TabNav,
    Pagination,
    ktTooltip
  },
  data() {
    return {
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" }
      ],
      cardNum: 12,
      page: 0,
      params: {
        startTime: "",
        endTime: df(new Date(), "yyyy-mm-dd"),
        name: "",
        custOrderNo: "",
        code: "",
        isWorryOrder: "",
        billNo: "",
        page: "1",
        pageSize: "12"
      },
      setPage: {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSize: 20,
        pageSizes: [20, 40, 60],
        currentPage: 1
      },
      searchData: [],
      searchData1: [],
      tabIndex: 0,
      isData: true,
      loading: false
    };
  },
  methods: {
    goToDetail(item) {
      if (this.tabIndex == 0) {
        this.$router.push({
          name: "订单详情",
          query: { id: this.tabIndex, billNo: item }
        });
      } else {
        this.$router.push({
          name: "订单详情",
          query: { id: this.tabIndex, billNo: item }
        });
      }
    },
    //获取数据
    getSearchResult(params) {
      let that = this;
      that.loading = true;
      that.isData = true;
      // 入库
      inOrderList(params)
        .then(res => {
          that.loading = false;
          if (res.ret == 0) {
            let arr = [];
            let data = res.data.rows;
            arr = data.map((item, idx) => {
              item.createTime = item.createTime.substring(0, 10);
              return item;
            });
            that.searchData = arr;
            if (that.searchData.length == 0) {
              that.isData = false;
            } else {
              that.isData = true;
            }
            let total = { pageTotal: res.data.total };
            that.setPage = Object.assign(that.setPage, total);
          } else {
            that.isData = false;
          }
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
          that.isData = false;
        });
    },
    getSearchResult1(params) {
      let that = this;
      that.loading = true;
      that.isData = true;
      // 出库
      outOrderList(params)
        .then(res => {
          that.loading = false;
          if (res.ret == 0) {
            let arr = res.data.rows;
            arr = arr.map(item => {
              item.createTime = item.createTime.substring(0, 10);
              return item;
            });
            that.searchData1 = arr;
            let total = { pageTotal: res.data.total };
            that.setPage = Object.assign(that.setPage, total);
          } else {
            that.isData = false;
          }
        })
        .catch(err => {
          console.log(err);
          that.loading = false;
          that.isData = false;
        });
    },
    changeTabs(data) {
      let idx = data.configure.index;
      this.tabIndex = data.configure.index;
      let params = {
        startTime: "",
        endTime: df(new Date(), "yyyy-mm-dd"),
        name: "",
        custOrderNo: "",
        code: "",
        isWorryOrder: "",
        billNo: this.$route.query.key,
        page: "1",
        pageSize: "12"
      };
      if (idx == 0) {
        this.getSearchResult(params);
      } else {
        this.getSearchResult1(params);
      }
      let obj = {
        pageTotal: 0, //往分页，介入接口，接口的total
        pageSize: 20,
        pageSizes: [20, 40, 60]
      };
      this.setPage = Object.assign(this.setPage, obj);
    },
    pageChange(data) {
      this.params.pageSize = data.pageSize;
      this.params.page = data.pageNum;
      if (this.tabIndex == 0) {
        this.getSearchResult(this.params);
      } else {
        this.getSearchResult1(this.params);
      }
    }
  },
  mounted() {
    let billNo = this.$route.query.key;
    this.params.billNo = billNo;
    //页面初始获取数据
    this.getSearchResult(this.params);
  },
  watch: {
    $route: function(to, from) {
      let billNo = this.$route.query.key;
      this.params.billNo = billNo;
      this.getSearchResult(this.params);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.order-search-result {
  width: $container-height;
  padding: $main-padding;
  /deep/ .el-card__body {
    padding: 0;
  }
  .ld-ser-content{
    position: relative;
  }
}
.o-card-group1 {
  width: 100%;
  height: 183px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  font-family: SourceHanSansCN-Regular;
  .o-card-group1-title {
    height: 28px;
    margin: 14px 0;
    width: 100%;
    font-size: 14px;
    position: relative;
    /* 加急 */
    .urgent-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(255, 77, 79, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 19px;
      z-index: 2;
    }
    /* 异常 */
    .abnormal-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(245, 163, 30, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 19px;
      z-index: 2;
    }
    /* 正常 */
    .normal-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(19, 194, 195, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 19px;
      z-index: 2;
    }
    .iconfont {
      position: absolute;
      left: 32px;
      top: -4px;
      width: 88px;
      height: 28px;
      background-color: rgba(238, 241, 246, 1);
      border-radius: 0px 14px 14px 0px;
      color: #12bd7b;
      text-align: right;
      line-height: 28px;
      padding-right: 5px;
    }
    .order-date {
      display: inline-block;
      margin-left: 20%;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
  }
  .order-info-name {
    padding: 20px;
    li {
      float: left;
      width: 50%;
      padding-bottom: 20px;
      .s-o-name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(113, 127, 143, 1);
      }
      .s-o-val {
        font-size: 16px;
        width: 100px;
        line-height: 26px;
        color: rgba(43, 61, 81, 1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>