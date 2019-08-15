<template>
  <div class="stock-specs-detail">
    <bread-crumb></bread-crumb>
    <order-header-info :header-info="headerInfo"></order-header-info>
    <el-card>
      <ul class="in-order-totalnum">
        <li v-for="(item,index) in inOrderTotalNum" :key="index">
          <p class="i-o-num">{{item.num.toLocaleString()}}</p>
          <p class="i-o-name">
            {{item.name}}
            <i
              class="color-green iconfont iconhuowuxiangqing-zoushitu"
              v-if="index==0"
            ></i>
            <span class="color-green zoushi" v-if="index==0">走势图</span>
          </p>
        </li>
      </ul>
      <ul class="in-order-des">
        <li v-for="(item,index) in inOrderTotalNum1" :key="index">
          <p class="i-o-name">
            {{item.name}}
          </p>
          <p class="i-o-num">{{item.num.toLocaleString()}}</p>
        </li>
      </ul>
    </el-card>
    <screen-order :order-type-label="orderTypeLabel"></screen-order>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import OrderHeaderInfo from "@/components/commonComponents/orderGroup/OrderHeaderInfo";
export default {
  components: {
    BreadCrumb,
    ScreenOrder,
    OrderHeaderInfo
  },
  data() {
    return {
      headerInfo: {
        titleText: "SSCDFGGG1244",
        seviceTime: "12",
        isPhoneScan: false
      },
      inOrderTotalNum: [
        { name: "在库数量", num: "5955212" },
        { name: "可用数量", num: "58" },
        { name: "今日入库", num: "5955" },
        { name: "今日出库", num: "4251" }
      ],
      inOrderTotalNum1: [
        { name: "货物品牌", num: "OSRAM" },
        { name: "单位", num: "PCS" },
        { name: "物料名称", num: "发光二极" },
        { name: "总金额", num: "212456" },
        { name: "总箱数", num: "212456" },
        { name: "总毛重", num: "212456" },
        { name: "总净重", num: "212456" },
      ],
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" },
      ],
    };
  }
};
</script>
<style lang='scss'>
.in-order-totalnum {
  // height: 121px;
  overflow: hidden;
  border-bottom: 2px solid #E8E8E8;
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
.in-order-des{
  padding:10px 0;
  li {
    width: 25%;
    float: left;
    padding-bottom: 5px;
    p{
      display: inline-block;
    }
    .i-o-num {
      height: 32px;
      font-size: 14px;
      font-family: DINPro-Medium;
      font-weight: 500;
      color: #586777;
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


