<template>
  <div id="stock-data">
    <div class="container" v-if="stockData">
      <div class="group1">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="left-top-card">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="box-card" style="margin:0 24px 24px 0" shadow="hover">
                    <div class="card-box" @click="goTo(0)">
                      <div class="text">
                        <div class="totalNum">{{stockTotal.inExpectedQty || 0}}</div>
                        <div class="des">今日入库货数</div>
                      </div>
                      <div class="semi-circle"></div>
                      <i class="iconfont iconkucunkantai-rukushu"></i>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card" style="margin:0 24px 24px 0" shadow="hover">
                    <div class="card-box" @click="goTo(1)">
                      <div class="text">
                        <div class="totalNum">{{stockTotal.outExpectedQty || 0}}</div>
                        <div class="des">今日出库货数</div>
                      </div>
                      <div class="semi-circle"></div>
                      <i class="iconfont iconkucunkantai-chukushu"></i>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card" style="margin:0 24px 24px 0" shadow="hover">
                    <div class="card-box" @click="goTo(2)">
                      <div class="text">
                        <div class="totalNum">{{stockTotal.brandNum || 0}}</div>
                        <div class="des">库内品牌数</div>
                      </div>
                      <div class="semi-circle"></div>
                      <i class="iconfont iconkucunkantai-pinpai"></i>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card" style="margin:0 24px 24px 0" shadow="hover">
                    <div class="card-box" @click="goTo(3)">
                      <div class="text">
                        <div class="totalNum">{{stockTotal.modelNum || 0}}</div>
                        <div class="des">库内规格型号数</div>
                      </div>
                      <div class="semi-circle"></div>
                      <i class="iconfont iconkucunkantai-guigexinghao"></i>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right-top">
              <div class="r-t-title">
                <el-row :gutter="20">
                  <el-col :span="18">
                    <tab-nav :label-data="speLabel" v-on:tab-render="changeType"></tab-nav>
                  </el-col>
                  <el-col :span="6">
                    <p class="recent-ser">
                      <span class="recent-circle"></span>
                      最近搜索过
                    </p>
                  </el-col>
                </el-row>
              </div>

              <brand-or-type-table
                :tab-index="speType"
                v-if="speType==0"
                :t-order-time="compDefaultTime"
              ></brand-or-type-table>

              <specs-type-table
                v-if="speType==1"
                :tab-index="speType"
                :t-order-time="compDefaultTime"
              ></specs-type-table>
              <a class="change-version" href="https://lsp.roadsimple.net">
                <span class="ld-version">切换旧版</span>
                <img src="../../../static/img/version_arror.png" alt />
              </a>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="group2">
        <screen-order :order-type-label="orderTypeLabel"></screen-order>
      </div>
      
    </div>
    <div class="blank-page" v-if="!stockData">
      <img src="../../../static/img/no_data.png" alt />
      <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
      <p class="no-data-text">暂无订单数据</p>
    </div>
  </div>
</template>
<script>
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
import specsTypeTable from "@/components/commonComponents/specsTypeTable";
import tabNav from "@/components/commonComponents/TabNav";
import calendar from "@/components/commonComponents/Calendar";
import screenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import pagination from "@/components/commonComponents/Pagination";
import { df } from "@/modules/filters/orderFilter";
import { toThousands } from "@/modules/common";
import {
  getTotalInExpectedQty,
  getTotalOutExpectedQty,
  getGoodsBrandNum,
  getGoodsModelNum
} from "@/api/getData";
export default {
  components: {
    brandOrTypeTable,
    specsTypeTable,
    tabNav,
    screenOrder,
    calendar,
    pagination
  },
  data() {
    return {
      stockTotal: {
        inExpectedQty: 0,
        outExpectedQty: 0,
        brandNum: 0,
        modelNum: 0
      },
      brands: [],
      speType: 0,
      routeParams: {},
      speLabel: [
        { label: "库内品牌", name: "first" },
        { label: "库内规格型号", name: "second" }
      ],
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" }
      ],
      pageChange: true,
      num: 1,
      stockData: [],
      tabIndex: 0,
      compDefaultTime: {
        startTime: "",
        endTime: df(new Date(), "yyyy-mm-dd")
      },
      params: {
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        page: 1, //页数
        pageSize: 20, //每页大小
        goodsBrand: "", //品牌
        goodsModel: "", //规格型号
        startTime: df(new Date(), "yyyy-mm-dd", 7), //开始时间
        endTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        code: "保税仓库", //"保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "" //入/出库单号
      }
    };
  },
  methods: {
    getTotalcardData() {
      let that = this;
      getTotalInExpectedQty().then(res => {
        if (res.ret == 0) {
          that.stockTotal.inExpectedQty = toThousands(res.data);
        }
      });
      getTotalOutExpectedQty().then(res => {
        if (res.ret == 0) {
          that.stockTotal.outExpectedQty = toThousands(res.data);
        }
      });
      getGoodsBrandNum().then(res => {
        if (res.ret == 0) {
          that.stockTotal.brandNum = toThousands(res.data);
        }
      });
      getGoodsModelNum().then(res => {
        if (res.ret == 0) {
          that.stockTotal.modelNum = toThousands(res.data);
        }
      });
    },
    goTo(idx) {
      switch (idx) {
        case 0:
          this.$router.push({ path: "/inOrder" });
          break;
        case 1:
          this.$router.push({ path: "/outOrder" });
          break;
        case 2:
          this.$router.push({ path: "/brands" });
          break;
        case 3:
          this.$router.push({ path: "/specsType" });
          break;
      }
    },
    changeType(data) {
      this.speType = Number(data.configure.index);
    }
  },
  mounted() {
    // console.log("$route.path", this.$route);
    this.pageChange = true;
    this.getTotalcardData();
    this.routeParams = this.$route.params;
    this.$store.commit("updateOrderTotalNumber", null);
    this.$store.commit("updateIsData", true);
    this.$store.commit("updateLoadingState", true);
    this.$store.commit("updateOrderRequireParams", this.params);
    this.$store.dispatch("implementGetCusOrderData", this.params);
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
#stock-data {
  position: relative;
  .left-top-card {
    text-align: left;
    float: left;
    height: 324px;
    width: 100%;
    .box-card {
      float: left;
      position: relative;
      // width: 45%;
      width: 100%;
      height: 150px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
    }
    .box-card:nth-child(2n) {
      margin-right: 0;
      margin-bottom: 0;
    }
    .semi-circle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      background: rgba(22, 183, 176, 1);
      opacity: 0.06;
      border-radius: 60px 0 0 0;
      z-index: 0;
    }
    .text {
      position: relative;
      z-index: 1;
    }
    .box-card:hover .semi-circle {
      height: 300px;
      width: 600px;
      border-radius: 400px 0 0 0;
      transition: all ease-in-out 1s;
    }
    .iconfont {
      position: absolute;
      right: 6px;
      bottom: 8px;
      z-index: 1;
      font-size: 35px;
      color: #13c2c3;
    }
    .box-card .totalNum {
      margin-top: 20px;
      font-size: 36px;
      font-family: DINPro-Medium;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      line-height: 40px;
    }
    .box-card .des {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
      line-height: 40px;
    }
  }
  .left-top-card:nth-child(2n) .box-card {
    margin-right: 0;
    margin-bottom: 0;
    float: right;
  }
  .right-top {
    height: 324px;
    position: relative;
    .r-t-title {
      // padding-left: 20px;
      background: #fff;
      height: 64px;
      padding: 6px 0 6px 20px;
      // line-height: 64px;
      .recent-ser {
        float: right;
        height: 12px;
        font-size: 12px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(88, 103, 119, 1);
        line-height: 40px;
        margin-right: 40px;
      }
      .recent-circle {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: rgba(19, 194, 194, 1);
        border-radius: 50%;
        line-height: 30px;
      }
    }
  }
  .group2 {
    margin-top: 40px;
  }
  .pageing {
    width: 100%;
    text-align: center;
  }
  .blank-page {
    height: 100%;
    width: 100%;
    padding: 200px 0;
    text-align: center;
    vertical-align: middle;
    background-color: #eef1f6;
    .iconfont {
      font-size: 120px;
    }
    // img {
    //   width: 120px;
    //   height: 120px;
    // }
    .no-data-text {
      height: 16px;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(126, 140, 155, 1);
    }
  }
  .change-version {
    font-family: PingFang SC;
    position: absolute;
    right: -30px;
    top: -15px;
    height: 28px;
    line-height: 28px;
    background: #12bd7d;
    border-radius: 14px 0px 0px 14px;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px rgba(27, 211, 142, 0.25);
    padding: 0 12px;
    z-index: 2;
    img {
      margin-top: -3px;
      vertical-align: middle;
    }
  }
}
</style>


