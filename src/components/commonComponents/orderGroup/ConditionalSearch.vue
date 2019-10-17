<template>
  <!--备注：筛选条件 组件-->
  <div class="condition-ser">
    <el-card class="box-card" shadow="hover">
      <div class="con-cate-group1">
        <span>仓库：</span>
        <div
          v-for="(item,index) in cateRep"
          :key="index"
          class="cate-buttons"
          @click="selectRepCate(index)"
        >
          <el-button
            type="text"
            :style="{'color':index == repType1?'#2b3d51':'#7E8C9B'}"
            :class="index == repType1?'txt-weight':''"
          >{{item}}</el-button>
        </div>
      </div>
      <div class="con-cate-group1">
        <span>分类：</span>
        <div
          v-for="(item,index) in cateButton"
          :key="index"
          class="cate-buttons"
          @click="selectOrderCate(index)"
        >
          <el-button
            type="text"
            :style="{'color':index==orderStatus?'#2b3d51':'#7E8C9B'}"
            :class="index==orderStatus?'txt-weight':''"
          >{{item}}</el-button>
        </div>
      </div>
      <div class="con-cate-group2">
        <span>筛选：</span>
        <div class="all-time">
          <date-picker :picker="clearPicker"  v-on:date-picker-change="datePickerChange" class="date-pick"></date-picker>
        </div>
        <div class="all-time" v-if="repType == 0">
          <label for="input-label1" class="input-label">供应商&nbsp;</label>
          <el-input
            v-model="params.supplierCode"
            size="small"
            id="input-label1"
            @input="cusCompanyKeyword1"
          ></el-input>
        </div>
        <div class="all-time" v-if="repType == 1">
          <label for="input-label1" class="input-label">顾客公司&nbsp;</label>
          <el-input v-model="params.name" size="small" id="input-label1" @input="cusCompanyKeyword"></el-input>
        </div>
        <div class="all-time">
          <label class="input-label" for="input-label2">客户单号&nbsp;</label>
          <el-input
            v-model="params.custOrderNo"
            size="small"
            id="input-label2"
            @input="cusOrderKeyword"
          ></el-input>
        </div>
        <div class="screen-num fr">已筛选出{{orderTotalNum}}个订单</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { df } from "@/modules/filters/orderFilter";
import datePicker from "@/components/commonComponents/datePicker";

export default {
  components: {
    datePicker
  },
  props: ["repType"],
  data() {
    return {
      // cateButton: ["进行中", "加急", "异常", "正常", "已完成"],
      cateButton: ["加急", "正常"],
      cateRep: ["香港仓库", "保税仓库", "完税仓库"],
      orderStatus: 0,
      timeIdx: 0,
      repType1: 1,
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
        code: "保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "", //入/出库单号
        supplierCode: "" //供应商
      },
      clearPicker: true,
    };
  },
  methods: {
    selectOrderCate(index) {
      //选择分类
      this.orderStatus = index;
      if (index == 0) {
        this.params.isWorryOrder = "JD";
      } else {
        this.params.isWorryOrder = "FJD";
      }
      this.getData(this.params);
    },
    selectRepCate(index) {
      this.repType1 = index;
      this.params.code = this.cateRep[index];
      this.getData(this.params);
    },
    cusCompanyKeyword() {
      this.getData(this.params);
    },
    cusCompanyKeyword1() {
      this.getData(this.params);
    },
    cusOrderKeyword() {
      this.getData(this.params);
    },
    datePickerChange(data) {
      this.params.startTime = data[0];
      this.params.endTime = data[1];
      this.getData(this.params);
    },
    getData(params) {
      // this.$store.commit("updateLoadingState", true);
      if (this.repType == 0) {
        this.$store.commit("updateOrderTotalNumber", null);
        this.$store.commit("updateIsData", true);
        this.$store.commit("updateLoadingState", true);
        this.$store.commit("updateOrderRequireParams", params);
        this.$store.dispatch("implementGetCusOrderData", params);
      } else {
        this.$store.commit("updateOrderTotalNumber", null);
        this.$store.commit("updateIsData", true);
        this.$store.commit("updateLoadingState", true);
        this.$store.commit("updateOutOrderRequireParams", params);
        this.$store.dispatch("implementGetOutOrderData", params);
      }
    },
    setDefaultData() {
      this.orderStatus = 0;
      this.timeIdx = 0;
      this.repType1 = 1;
      this.params = {
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        page: 1, //页数
        pageSize: 20, //每页大小
        goodsBrand: this.$route.query.goodsBrand || "", //品牌
        goodsModel: this.$route.query.goodsModel || "", //规格型号
        startTime: df(new Date(), "yyyy-mm-dd", 7), //开始时间
        endTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        code: "保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "", //入/出库单号
        supplierCode: "" //供应商
      };
    }
  },
  watch: {
    orderType: function(newVal, oldVal) {
      this.clearPicker = !this.clearPicker;
      this.orderType = newVal;
      this.params.repType1 = newVal;
    },
    repType: function(newVal, oldVal) {
      this.clearPicker = !this.clearPicker;
      this.orderType = newVal;
    }
  },
  computed: {
    orderTotalNum() {
      return this.$store.state.orderTotal;
    }
  },
  mounted() {
    this.params.goodsBrand = this.$route.query.goodsBrand || "";
    this.params.goodsModel = this.$route.query.goodsModel || "";
  },
};
</script>
<style scoped>
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
  /* margin: 0 16px; */
  color: #7e8c9b;
  margin-top: 10px;
}
.el-input {
  width: 60%;
}
.all-time .el-button--text {
  color: #2b3d51;
}
.all-time .date-pick {
  margin-right: 30px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 150px;
}
</style>


