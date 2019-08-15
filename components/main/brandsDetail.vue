<template>
  <div class="stock-brand-detail">
    <bread-crumb></bread-crumb>
    <h3 class="brand-name">OPPO</h3>
    <div class="stock-brand-group1">
      <el-row :gutter="12">
        <el-col :span="12">
          <div class="s-b-group1-left">
            <el-card style="height:325px;">
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
                  <p class="i-o-name">{{item.name}}</p>
                  <p class="i-o-num">{{item.num.toLocaleString()}}</p>
                </li>
              </ul>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="in-order-title-title1">
            <el-row>
              <el-col :span="18">
                <span>出库货物规格</span>
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
      </el-row>
    </div>
    <screen-order :order-type-label="orderTypeLabel"></screen-order>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
export default {
  components: {
    BreadCrumb,
    ScreenOrder,
    brandOrTypeTable
  },
  data() {
    return {
      inOrderTotalNum: [
        { name: "在库数量", num: "5955212" },
        { name: "可用数量", num: "58" }
      ],
      inOrderTotalNum1: [
        { name: "货物品牌", num: "OSRAM" },
        { name: "单位", num: "PCS" },
        { name: "物料名称", num: "发光二极" },
        { name: "总金额", num: "212456" },
        { name: "物料名称", num: "发光二极" },
        { name: "总金额", num: "212456" },
        { name: "物料名称", num: "发光二极" },
        { name: "总金额", num: "212456" },
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
.stock-brand-detail {
  .brand-name {
    margin: 24px 0;
    height: 28px;
    font-size: 36px;
    font-family: SourceHanSansCN-Bold;
    font-weight: bold;
    color: rgba(43, 61, 81, 1);
    line-height: 40px;
  }
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
  .s-b-group1-left{
    height: 325px;
    overflow-x: hidden;
  }
  .in-order-totalnum {
    // height: 121px;
    overflow: hidden;
    border-bottom: 2px solid #e8e8e8;
    li {
      width: 50%;
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
    padding: 10px 0;
    li {
      width: 50%;
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
}
</style>


