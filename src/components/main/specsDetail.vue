<template>
  <div class="container">
    <div class="stock-specs-detail">
      <div class="specs-view">
        <bread-crumb></bread-crumb>
        <order-header-info :header-info="headerInfo"></order-header-info>
        <el-card>
          <ul class="in-order-totalnum">
            <li v-for="(item,index) in speTotalNum" :key="index">
              <p class="i-o-num">{{item.num || 0}}</p>
              <p class="i-o-name">
                {{item.name}}
                <span
                  class="color-green zoushi"
                  v-if="index==0"
                  @click="showLineChart"
                  v-show="isCharts"
                >
                  <!-- <i class="color-green iconfont iconhuowuxiangqing-zoushitu"></i>
                  走势图 -->
                </span>
              </p>
            </li>
          </ul>
          <ul class="in-order-des">
            <li v-for="(item,index) in speTotalNum1" :key="index">
              <p class="i-o-name">{{item.name}}</p>
              <p class="i-o-num">
                {{item.num}}
                <span v-if="item.name == '总毛重' || item.name == '总净重'">KG</span>
                <span v-else-if="item.name == '总箱数'">箱</span>
              </p>
            </li>
          </ul>
        </el-card>
        <screen-order :order-type-label="orderTypeLabel"></screen-order>
      </div>
      <div class="stock-line-chart" v-if="isLineChart">
        <div class="mask" @click="closeLinChart"></div>
        <div class="ld-line-chart">
          <p>
            <i class="iconfont icongongsiguanli-shanchuanniu" @click="closeLinChart"></i>
          </p>
          <lineChartExample :title="'该品牌库内货物数量走势'" :width="860" :data="lineChartData"></lineChartExample>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import OrderHeaderInfo from "@/components/commonComponents/orderGroup/OrderHeaderInfo";
import lineChartExample from "@/components/lineChart";
import {
  getGoodsModelDetailTotal,
  getGoodsModelDetailTrend
} from "@/api/getData";
import { toThousands } from "@/modules/common";
import { df } from "@/modules/filters/orderFilter";
export default {
  components: {
    BreadCrumb,
    ScreenOrder,
    OrderHeaderInfo,
    lineChartExample
  },
  data() {
    return {
      headerInfo: {
        titleText: "SSCDFGGG1244",
        seviceTime: "12",
        isPhoneScan: false,
        isLineChart: false
      },
      speTotalNum: [
        { name: "在库数量", num: "0" },
        { name: "可用数量", num: "0" },
        { name: "今日入库", num: "0" },
        { name: "今日出库", num: "0" }
      ],
      speTotalNum1: [
        { name: "货物品牌", num: "暂无" },
        { name: "单位", num: "暂无" },
        { name: "物料名称", num: "暂无" },
        { name: "总金额", num: "暂无" },
        { name: "总箱数", num: "暂无" },
        { name: "总毛重", num: "暂无" },
        { name: "总净重", num: "暂无" }
      ],
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" }
      ],
      isLineChart: false,
      lineChartData: [],
      tabs: "",
      params: {
        customerCode: "",
        goodsModel: ""
      },
      brandNoData: false,
      cardParams: {
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
        code: "保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "" //入/出库单号
      },
      isCharts: true
    };
  },
  methods: {
    getSpeDetailInfo() {
      let that = this;
      getGoodsModelDetailTotal(that.params).then(res => {
        if (res.ret == 0) {
          that.brandNoData = true;
          let arr = [];
          let arr1 = [];
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].name == "在库数量" ||
              data[i].name == "可用数量" ||
              data[i].name == "今日入库" ||
              data[i].name == "今日出库"
            ) {
              let num = toThousands(data[i].num);
              arr.push({ name: data[i].name, num: num });
            } else {
              arr1.push(data[i]);
            }
          }
          that.speTotalNum = arr;
          that.speTotalNum1 = arr1;
        } else {
          that.brandNoData = false;
        }
      });
    },
    showLineChart() {
      this.isLineChart = true;
    },
    closeLinChart() {
      this.isLineChart = false;
    },
    // 折线图数据
    getLineChartData() {
      let that = this;
      let date, lineChartData1, lineChartData2, lineChartData3;
      getGoodsModelDetailTrend(that.params).then(res => {
        if (res.ret == 0) {
          date = res.data.date;
          lineChartData1 = res.data.stockInfo;
          lineChartData2 = res.data.inExpectedInfo;
          lineChartData3 = res.data.outExpectedInfo;
          let inExpectedTotal = res.data.inExpectedInfoTotal;
          let outExpectedTotal = res.data.outExpectedInfoTotal;
          let stockTotal = res.data.stockInfoTotal;
          if (
            date.length == 0 &&
            lineChartData1.length == 0 &&
            lineChartData2.length == 0 &&
            lineChartData3.length == 0
          ) {
            that.isCharts = false;
          } else {
            that.isCharts = true;
          }
          that.lineChartData.push(
            date,
            lineChartData1,
            lineChartData2,
            lineChartData3,
            {
              inExpectedTotal,
              outExpectedTotal,
              stockTotal
            }
          );
        } else {
          that.isCharts = false;
        }
      });
    }
  },
  mounted() {
    let brands = this.$route.query.goodsBrand;
    this.cardParams.goodsBrand = brands;
    this.cardParams.goodsModel = this.$route.query.goodsModel;
    this.headerInfo.titleText = this.$route.query.goodsModel;
    this.params = this.$route.query;
    this.$store.commit("updateOrderTotalNumber", null);
    this.$store.commit("updateIsData", true);
    this.$store.commit("updateLoadingState", true);
    this.$store.commit("updateOrderRequireParams", this.cardParams);
    this.$store.dispatch("implementGetCusOrderData", this.cardParams);
    // this.getLineChartData();//趋势图调用
    this.getSpeDetailInfo();
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.stock-specs-detail {
  width: $container-height;
  padding: $main-padding;
  position: relative;
  .stock-line-chart {
    position: absolute;
    top: -52px;
    bottom: -28px;
    left: -51px;
    right: -27px;
    // background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
    .ld-line-chart {
      margin: 200px auto;
      width: 900px;
      height: 580px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      position: relative;
      z-index: 12;
      .icongongsiguanli-shanchuanniu {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 16px;
      }
    }
  }
}
.in-order-totalnum {
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  li {
    width: 25%;
    float: left;
    padding-bottom: 40px;
    .i-o-num {
      height: 32px;
      font-size: 36px;
      font-family: DINPro-Medium;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      line-height: 40px;
    }
    .i-o-name {
      height: 14px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
      line-height: 40px;
      .color-green {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(18, 189, 123, 1);
      }
    }
  }
}
.in-order-des {
  height: 80px;
  padding: 10px 0;
  li {
    width: 25%;
    float: left;
    padding-bottom: 5px;
    p {
      display: inline-block;
    }
    .i-o-num {
      height: 32px;
      font-size: 14px;
      font-family: DINPro-Medium;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      line-height: 40px;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
    .i-o-name {
      width: 60px;
      height: 14px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
      line-height: 40px;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
}
</style>


