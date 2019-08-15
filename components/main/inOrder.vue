<template>
  <div class="in-order-comp">
    <bread-crumb></bread-crumb>
    <div class="choose-days">
      <el-button
        type="text"
        v-for="(item,index) in cateTime"
        :key="index"
        :style="{'color':index==timeIdx?'#2b3d51':'#7E8C9B'}"
        style="padding-right:32px;"
        @click="selectTimeSlot(index,item)"
      >{{item}}</el-button>
      <span v-show="isChooseDay">{{customChooseDay}}</span>
      <div class="report-act">
        <el-button type="primary" size="small" icon="iconfont iconrukuxiangqing-chakanbaobiao1">查看报表</el-button>
        <el-button type="primary" size="small" icon="iconfont iconrukuxiangqing-daochubaobiao1">导出报表</el-button>
      </div>
      <div class="calendarBox">
        <Calendar :cal-show="calshow" v-on:choose-order-day="getCalendarTime"></Calendar>
      </div>
    </div>
    <el-card>
      <ul class="in-order-totalnum">
        <li v-for="(item,index) in inOrderTotalNum" :key="index">
          <p class="i-o-num">{{item.num.toLocaleString()}}</p>
          <p class="i-o-name">{{item.name}}</p>
        </li>
      </ul>
    </el-card>
    <div class="in-order-table-group">
      <el-row :gutter="12">
        <el-col :span="12" class="table-col">
          <div class="in-order-title-title1">
            <el-row>
              <el-col :span="18">
                <span>入库货物品牌</span>
              </el-col>
              <el-col :span="6">
                <p class="recent-ser">
                  <span class="recent-circle"></span>
                  最近搜索过
                </p>
              </el-col>
            </el-row>
          </div>
          <brand-or-type-table :tab-index="1"></brand-or-type-table>
        </el-col>
        <el-col :span="12">
          <div class="in-order-title-title1">
            <el-row>
              <el-col :span="18">
                <span>入库货物规格</span>
              </el-col>
              <el-col :span="6">
                <p class="recent-ser">
                  <span class="recent-circle"></span>
                  最近搜索过
                </p>
              </el-col>
            </el-row>
          </div>
          <brand-or-type-table :tab-index="0"></brand-or-type-table>
        </el-col>
      </el-row>
    </div>
    <div class="in-order-screen">
      <h3>入库订单</h3>
      <screen-order></screen-order>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import { df } from "../../modules/filters/orderFilter";
import Calendar from "@/components/commonComponents/Calendar";
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
import TabNav from "@/components/commonComponents/TabNav";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
export default {
  components: {
    BreadCrumb,
    Calendar,
    brandOrTypeTable,
    TabNav,
    ScreenOrder
  },

  data() {
    return {
      orderTypeLabel: [{ label: "入库订单", name: "first" }],
      selectTimeOption: false,
      cateTime: ["今日", "近七日", "近一月", "选择时间段"],
      timeIdx: 0,
      timeType: "全部时间",
      chooseDay1: "",
      chooseDay2: "",
      params: {
        input1: "",
        input2: "",
        GT_orderTime: df(new Date(), "yyyy-mm-dd", 29), //订单开始时间
        LT_orderTime: df(new Date(), "yyyy-mm-dd"), //订单结束时间
        pageNum: this.$store.orderPageNum, //第一页
        pageSize: this.$store.orderPageSize, //每页显示的条目
        repType1: this.repType, //仓库类型
        orderType: 1, //出入仓标识
        orderStatus: "", //订单状态
        inResouceType: "", //入仓类型
        bondedTaxBgType: "" //出仓类型
      },
      orderTotalNum: 0,
      calshow: false,
      customChooseDay: "",
      isChooseDay: false,
      inOrderTotalNum: [
        { name: "入库货物数量", num: "5955212" },
        { name: "入库品牌数", num: "58" },
        { name: "入库规格型号数", num: "5955" }
      ]
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    goto() {
      this.$router.push({ path: "/brands" });
    },
    showSelectTime() {
      this.calshow = false;
      this.selectTimeOption = !this.selectTimeOption;
    },
    selectOrderCate(index) {
      // this.isChooseDay = false;
      this.calshow = false;
      this.params.orderStatus = index;
      this.$store.commit("orderRequireParams", this.params);
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    selectTimeSlot(index, item) {
      this.isChooseDay = false;
      this.calshow = false;
      this.timeIdx = index;
      this.timeType = item;
      this.$store.commit("updateOrderRequireParams", this.params);
      this.$store.dispatch("implementGetCusOrderData", this.params);
      switch (index) {
        case 0: //今日
          this.params.GT_orderTime = df(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "yyyy-mm-dd"
          ); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          break;
        case 1: //7天
          this.params.GT_orderTime = df(new Date(), "yyyy-mm-dd", 7); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          break;
        case 2: //一个月
          this.params.GT_orderTime = df(new Date(), "yyyy-mm-dd", 29); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          break;
        case 3: //自定义
          this.calshow = true;
          this.params.GT_orderTime = "";
          this.params.LT_orderTime = "";
          break;
      }
    },
    cusCompanyKeyword() {
      this.$store.commit("orderRequireParams", this.params);
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    cusOrderKeyword() {
      this.$store.commit("orderRequireParams", this.params);
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    getCalendarTime(data) {
      console.log(data);
      this.params.GT_orderTime = data.chooseDay1; //订单开始时间
      this.params.LT_orderTime = data.chooseDay2; //订单结束时间
      this.isChooseDay = true;
      this.selectTimeOption = false;
      this.customChooseDay =
        ":" + this.params.GT_orderTime + "-" + this.params.LT_orderTime;
    }
  }
};
</script>
<style lang='scss'>
.in-order-comp {
  .in-order-totalnum {
    li {
      width: 33%;
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
      }
    }
  }
  .in-order-table-group {
     font-family: SourceHanSansCN-Medium;
    // background-color: #fff;
    margin: 24px 0;
    .in-order-title-title1 {
      background-color: #fff;
      height: 64px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      line-height: 64px;
      padding-left: 24px;
      .recent-ser {
        font-size: 12px;
        font-weight: 400;
        color: rgba(88, 103, 119, 1);
        line-height: 64px;
      }
    }
  }
  .choose-days {
    .report-act {
      float: right;
    }
  }
}
</style>


