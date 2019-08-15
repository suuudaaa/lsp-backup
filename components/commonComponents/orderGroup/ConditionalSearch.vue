<template>
  <div class="condition-ser">
    <el-card class="box-card">
      <div class="con-cate-group1">
        <span>分类：</span>
        <div
          v-for="(item,index) in cateButton"
          :key="index"
          class="cate-buttons"
          @click="selectOrderCate(index)"
        >
          <el-button type="text" :style="{'color':index==params.orderStatus?'#2b3d51':'#7E8C9B'}">{{item}}</el-button>
        </div>
      </div>
      <div class="con-cate-group2">
        <span>筛选：</span>
        <div class="all-time">
          <el-button type="text" @click="showSelectTime">
            {{timeType}}
            <span v-show="isChooseDay">{{customChooseDay}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
        </div>
        <div class="all-time">
          <label for="input-label1" class="input-label">顾客公司：</label>
          <el-input v-model="params.input1" size="small" id="input-label1" @change="cusCompanyKeyword"></el-input>
        </div>
        <div class="all-time">
          <label class="input-label" for="input-label2">客户单号：</label>
          <el-input v-model="params.input2" size="small" id="input-label2" @change="cusOrderKeyword"></el-input>
        </div>
        <div class="screen-num fr">已筛选出{{orderTotalNum}}个订单</div>
      </div>
    </el-card>
    <el-card class="box-card" v-show="selectTimeOption">
      <el-button
        type="text"
        v-for="(item,index) in cateTime"
        :key="index"
        :style="{'color':index==timeIdx?'#2b3d51':'#7E8C9B'}"
        style="padding:16px;"
        @click="selectTimeSlot(index,item)"
      >{{item}}</el-button>
      <span v-show="isChooseDay">{{customChooseDay}}</span>
    </el-card>
    <div class="calendarBox">
      <Calendar :cal-show="calshow" v-on:choose-order-day="getCalendarTime"></Calendar>
    </div>
  </div>
</template>
<script>
import { df } from "../../../modules/filters/orderFilter";
import Calendar from "@/components/commonComponents/Calendar";
export default {
  components: {
    Calendar
  },
  props: ["orderType"],
  data() {
    return {
      cateButton: ["进行中", "加急", "异常", "正常", "已完成"],
      cateTime: ["全部时间", "今日", "七日", "一月", "选择时间段"],
      selectTimeOption: false,
      orderStatus: 0,
      timeIdx: 0,
      timeType: "全部时间",
      chooseDay1: "",
      chooseDay2: "",
      params: {
        input1: '',
        input2: '',
        GT_orderTime: df(new Date(), "yyyy-mm-dd", 29), //订单开始时间
        LT_orderTime: df(new Date(), "yyyy-mm-dd"), //订单结束时间
        pageNum: this.$store.orderPageNum, //第一页
        pageSize: this.$store.orderPageSize, //每页显示的条目
        repType1: this.repType, //仓库类型
        orderType: 1, //出入仓标识
        orderStatus: "", //订单状态
        inResouceType: "" ,//入仓类型
        bondedTaxBgType: "" //出仓类型
      },
      orderTotalNum: 0,
      calshow: false,
      customChooseDay: "",
      isChooseDay: false
    };
  },
  methods: {
    showSelectTime() {
      this.calshow = false;
      this.selectTimeOption = !this.selectTimeOption;
      console.log(this.selectTimeOption);
    },
    selectOrderCate(index) {
      // this.isChooseDay = false;
      this.calshow = false;
      this.params.orderStatus = index;
      this.$store.commit('orderRequireParams',this.params)
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    selectTimeSlot(index, item) {
      this.isChooseDay = false;
      this.calshow = false;
      this.timeIdx = index;
      this.timeType = item;
      this.$store.commit('updateOrderRequireParams',this.params)
      this.$store.dispatch("implementGetCusOrderData", this.params);
      switch (index) {
        case 0://全部
          // 全部时间
          this.selectTimeOption = false;
          break;
        case 1://今日
          this.params.GT_orderTime = df(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "yyyy-mm-dd"
          ); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          this.selectTimeOption = false;
          break;
        case 2://7天
          this.params.GT_orderTime = df(new Date(), "yyyy-mm-dd", 7); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          this.selectTimeOption = false;
          break;
        case 3://一个月
          this.params.GT_orderTime = df(new Date(), "yyyy-mm-dd", 29); //订单开始时间
          this.params.LT_orderTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          this.selectTimeOption = false;
          break;
        case 4://自定义
          this.calshow = true;
          this.params.GT_orderTime = "";
          this.params.LT_orderTime = "";
          break;
      }
    },
    cusCompanyKeyword() {
      this.$store.commit('orderRequireParams',this.params)
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    cusOrderKeyword() {
      this.$store.commit('orderRequireParams',this.params)
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
  },
  watch: {
    orderType: function(newVal, oldVal) {
      this.orderType = newVal;
    }
  },
  mounted(){
    this.$store.commit('updateOrderRequireParams',this.params)
    this.$store.dispatch("implementGetCusOrderData", this.params);
  }
};
</script>
<style >
.condition-ser {
  width: 100%;
  margin-bottom: 22px;
  color: #7e8c9b;
  position: relative;
}
.condition-ser .con-cate-group1 {
  color: #7e8c9b;
}
.condition-ser .con-cate-group1 > div {
  display: inline-block;
  margin: 0 16px;
}
.con-cate-group1 .el-button--text {
  color: #7e8c9b;
}
.con-cate-group1 .el-button--text:active {
  color: #2b3d51;
}
.con-cate-group1 .el-button--text:visited {
  color: #2b3d51;
}
.el-button--text.active {
  color: #2b3d51;
}
.condition-ser .con-cate-group2 {
  color: #7e8c9b;
}
.con-cate-group2 .all-time {
  display: inline-block;
  margin: 0 16px;
  color: #7e8c9b;
}
.con-cate-group2 .screen-num {
  margin: 0 16px;
  color: #7e8c9b;
  margin-top: 10px;
}
.el-input {
  width: 60%;
}
.all-time .el-button--text {
  color: #2b3d51;
}
.calendarBox {
  position: absolute;
  z-index: 4;
  top: 210px;
  left: 220px;
}
</style>


