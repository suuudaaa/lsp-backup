<template>
  <div class="container">
    <div class="in-order-comp">
      <bread-crumb></bread-crumb>
      <div class="choose-days">
        <el-button
          type="text"
          v-for="(item,index) in cateTime"
          :key="index"
          :style="{'color':index==timeIdx?'#2b3d51':'#7E8C9B'}"
          :class="index==timeIdx?'txt-weight':''"
          style="padding-right:32px;"
          @click="selectTimeSlot(index,item)"
        >{{item}}</el-button>
        <div class="block-date">
          <el-date-picker
            v-model="value1"
            type="daterange"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="pickChangeDate"
            @focus="changeTimeIdx"
            size="small"
          ></el-date-picker>
        </div>
        <div class="report-act">
          <el-button
            type="primary"
            size="small"
            icon="iconfont iconrukuxiangqing-chakanbaobiao"
            @click="gotoReport('')"
          >&nbsp;查看报表</el-button>
          <el-button
            type="primary"
            size="small"
            icon="iconfont iconrukuxiangqing-daochubaobiao"
            @click="gotoReport('download')"
          >&nbsp;导出报表</el-button>
        </div>
      </div>
      <el-card shadow="hover">
        <ul class="in-order-totalnum">
          <li v-for="(item,index) in inOrderTotalNum" :key="index">
            <p class="i-o-num">{{item.num}}</p>
            <p class="i-o-name">{{item.name}}</p>
          </li>
          <!-- <li>
          <p class="i-o-num">{{item.num.()}}</p>
          <p class="i-o-name">出库货物数量</p>
        </li>
        <li>
          <p class="i-o-num">{{item.num.()}}</p>
          <p class="i-o-name">入库品牌数</p>
        </li>
        <li>
          <p class="i-o-num">{{item.num.()}}</p>
          <p class="i-o-name">入库规格型号数</p>
          </li>-->
        </ul>
      </el-card>
      <div class="in-order-table-group">
        <el-row :gutter="12">
          <el-col :span="12" class="table-col">
            <div class="in-order-title-title1">
              <el-row>
                <el-col :span="18">
                  <span class="txt-weight">入库货物品牌</span>
                </el-col>
                <el-col :span="6">
                  <p class="recent-ser">
                    <span class="recent-circle"></span>
                    最近搜索过
                  </p>
                </el-col>
              </el-row>
            </div>
            <brand-or-type-table :tab-index="tabIdx" :t-order-time="headParams"></brand-or-type-table>
          </el-col>
          <el-col :span="12">
            <div class="ld-type-table">
              <div class="in-order-title-title1">
                <el-row>
                  <el-col :span="18">
                    <span class="txt-weight">入库货物规格</span>
                  </el-col>
                  <el-col :span="6">
                    <p class="recent-ser">
                      <span class="recent-circle"></span>
                      最近搜索过
                    </p>
                  </el-col>
                </el-row>
              </div>
              <specs-type-table :t-order-time="headParams"></specs-type-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="in-order-screen">
        <h3>入库订单</h3>
        <screen-order :order-type-label="orderTypeLabel"></screen-order>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import { df } from "../../modules/filters/orderFilter";
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
import specsTypeTable from "@/components/commonComponents/specsTypeTable";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import datePicker from "@/components/commonComponents/datePicker";
import { getInBoundNumberInfo } from "@/api/getData";
import { toThousands } from "@/modules/common";
export default {
  components: {
    BreadCrumb,
    brandOrTypeTable,
    specsTypeTable,
    ScreenOrder,
    datePicker
  },
  data() {
    return {
      orderTypeLabel: [],
      cateTime: ["今日", "近七日", "近一月"],
      timeIdx: 0,
      value1: "",
      params: {
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        page: 1, //页数
        pageSize: 20, //每页大小
        goodsBrand: "", //品牌
        goodsModel: "", //规格型号
        startTime: df(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-mm-dd"), //开始时间
        endTime: df(new Date(), "yyyy-mm-dd"), //结束时间
        name: "", //顾客公司
        custOrderNo: "", //客户单号
        code: "保税仓库", //所属仓库
        isWorryOrder: "JD", //是否急单(JD ,FJD)
        billNo: "" //入/出库单号
      },
      orderTotalNum: 0,
      inOrderTotalNum: [
        { name: "入库货物数量", num: "0" },
        { name: "入库品牌数", num: "0" },
        { name: "入库规格型号数", num: "0" }
      ],
      headParams: {
        startTime: df(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-mm-dd"),
        endTime: df(new Date(), "yyyy-mm-dd")
      },
      tabIdx: 0
    };
  },
  mounted() {
    this.params.orderSymbol = this.$route.params.orderSym;
    this.getInOrderTotalData(this.headParams);
    this.$store.commit("updateOrderTotalNumber", null);
    this.$store.commit("updateIsData", true);
    this.$store.commit("updateLoadingState", true);
    this.$store.commit("updateOrderRequireParams", this.params);
    this.$store.dispatch("implementGetCusOrderData", this.params);
  },
  methods: {
    selectOrderCate(index) {
      this.params.orderStatus = index;
      this.$store.commit("updateOrderRequireParams", this.params);
      this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    selectTimeSlot(index, item) {
      this.timeIdx = index;
      switch (index) {
        case 0: //今日
          this.params.startTime = df(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "yyyy-mm-dd"
          ); //订单开始时间
          this.params.endTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          let obj = {
            startTime: df(
              new Date(new Date().setHours(0, 0, 0, 0)),
              "yyyy-mm-dd"
            ),
            endTime: df(new Date(), "yyyy-mm-dd")
          };
          this.headParams = Object.assign(this.headParams, obj);
          break;
        case 1: //7天
          this.params.startTime = df(new Date(), "yyyy-mm-dd", 7); //订单开始时间
          this.params.endTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          let obj1 = {
            startTime: df(new Date(), "yyyy-mm-dd", 7),
            endTime: df(new Date(), "yyyy-mm-dd")
          };
          this.headParams = Object.assign(this.headParams, obj1);
          break;
        case 2: //一个月
          this.params.startTime = df(new Date(), "yyyy-mm-dd", 29); //订单开始时间
          this.params.endTime = df(new Date(), "yyyy-mm-dd"); //订单结束时间
          let obj2 = {
            startTime: df(new Date(), "yyyy-mm-dd", 29),
            endTime: df(new Date(), "yyyy-mm-dd")
          };
          this.headParams = Object.assign(this.headParams, obj2);
          break;
      }
      this.getInOrderTotalData(this.headParams);
      // this.$store.commit("updateOrderRequireParams", this.params);
      // this.$store.dispatch("implementGetCusOrderData", this.params);
    },
    pickChangeDate(val) {
      this.params.startTime = val[0]; //订单开始时间
      this.params.endTime = val[1]; //订单结束时间
      let obj = {
        startTime: val[0],
        endTime: val[1]
      };
      console.log('datapicKCHANGE',obj)
      this.headParams = Object.assign(this.headParams, obj);
      this.getInOrderTotalData(this.headParams);
    },
    changeTimeIdx() {
      this.timeIdx = 3;
    },
    // 头部卡片
    getInOrderTotalData(p) {
      let that = this;
      getInBoundNumberInfo(p)
        .then(res => {
          if (res.ret == 0) {
            that.inOrderTotalNum[0].num = toThousands(res.data.goodsNumber);
            that.inOrderTotalNum[1].num = toThousands(
              res.data.goodsBrandsNumber
            );
            that.inOrderTotalNum[2].num = toThousands(
              res.data.goodsModelNumber
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoReport(str) {
      this.$router.push({ path: "/report", query: { act: str } });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.in-order-comp {
  width: $container-height;
  padding: $main-padding;
  .in-order-totalnum {
    li {
      width: 33%;
      float: left;
      // text-align: center;
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
        float: right;
        margin-right: 20px;
      }
    }
  }
  .choose-days {
    margin: 24px 0;
    position: relative;
    height: 36px;
    .block-date {
      display: inline-block;
    }
    .report-act {
      float: right;
      .iconfont {
        display: inline-block;
        // width: 13px;
        // height: 12px;
        // vertical-align: middle;
      }
    }
  }
  .in-order-screen {
    h3 {
      font-weight: bold;
    }
  }
  .txt-weight {
    font-weight: bold;
  }
}
/deep/ .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 217px;
}
</style>


