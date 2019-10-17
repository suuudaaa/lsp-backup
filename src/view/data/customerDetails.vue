<template>
  <div class="container">
    <el-row class="header">
      <el-col :span="24">
        <span class="name">OPPO</span>
        <div class="thrend" @click="visibleFun">走势图</div>
      </el-col>
    </el-row>

    <el-row class="info">
      <el-col :span="12">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="boxHeader">交易信息</div>

          <div class="infoBox leftInfo">
            <div class="infoLine">
              <span class="infoKey">CNY交易总额</span>
              <span class="infoValue">75336842</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">USD交易总额</span>
              <span class="infoValue">6546775</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">进行中订单</span>
              <span class="infoValue">34545456</span>
            </div>
          </div>

          <div class="infoBox rightInfo">
            <div class="infoLine">
              <span class="infoKey">CNY近7日</span>
              <span class="infoValue">4632</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">USD近7日</span>
              <span class="infoValue">563</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">累计订单</span>
              <span class="infoValue">999</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="boxHeader">顾客信息</div>

          <div class="infoBox leftInfo">
            <div class="infoLine">
              <span class="infoKey">联系人</span>
              <span class="infoValue">王思</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">电话</span>
              <span class="infoValue">18223280718</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">公司地址</span>
              <span class="infoValue">广东省东莞市长安镇乌沙社区珠冈路19号</span>
            </div>
          </div>

          <div class="infoBox rightInfo">
            <div class="infoLine">
              <span class="infoKey">客户代码</span>
              <span class="infoValue">0542</span>
            </div>
            <div class="infoLine">
              <span class="infoKey">传真</span>
              <span class="infoValue">021-836251</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="order">
      <screen-order :order-type-label="orderTypeLabel"></screen-order>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="860px">
      <lineChartExample :title="'该品牌库内货物数量走势'" :width="860" :data="lineChartData"></lineChartExample>
    </el-dialog>
  </div>
</template>

<script>
import lineChartExample from "@/components/lineChart";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
export default {
  components: { lineChartExample, ScreenOrder },
  data() {
    return {
      lineChartData: [], //data
      dialogVisible: false,
      cardDefaultStyle: {
        padding: 0
      },
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" }
      ]
    };
  },
  created() {},
  methods: {
    visibleFun() {
      if (this.lineChartData.length === 0) {
        this.getLineChartData();
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.dialogVisible = !this.dialogVisible;
      }
    },
    getLineChartData() {
      let date = [],
        oneDay = 24 * 3600 * 1000,
        base = +new Date(2018, 8, 1),
        lineChartData1 = [Math.random() * 20000],
        lineChartData2 = [Math.random() * 20000],
        lineChartData3 = [Math.random() * 20000];
      for (let i = 1; i < 365; i++) {
        let now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        lineChartData1.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData1[i - 1])
        );
        lineChartData2.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData2[i - 1])
        );
        lineChartData3.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData3[i - 1])
        );
      }
      this.lineChartData.push(
        date,
        lineChartData1,
        lineChartData2,
        lineChartData3
      );
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 1300px;
  min-height: 800px;
  // padding: 32px;
  .header {
    .name {
      color: #2b3d51;
      font-size: 36px;
    }
    .thrend {
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      color: #12bd7b;
      margin-left: 14px;
      margin-bottom: 24px;
    }
  }
  .order{
    width: 1270px;
  }
  .info {
    .box-card {
      position: relative;
      width: 620px;
      height: 188px;
      padding: 24px;
      .boxHeader {
        font-size: 16px;
        color: #3a5470;
        font-weight: bold;
        margin-bottom: 22px;
      }
      .infoBox {
        position: absolute;
        .infoLine {
          position: relative;
          width: 100%;
          padding-left: 100px;
          margin-bottom: 18px;
          .infoKey {
            position: absolute;
            left: 0px;
            display: inline-block;
            font-size: 14px;
            color: #586777;
          }
          .infoValue {
            display: inline-block;
            font-size: 16px;
            color: #2b3d51;
            font-weight: bold;
          }
        }
      }
      .rightInfo {
        left: 340px;
      }
    }
  }
}
</style>
<style lang="scss">
.customerDetails {
  .el-dialog__body {
    padding: 0px 0px 30px 0px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .lineChartComponents .titleBox {
    padding-top: 20px;
  }
}
</style>
