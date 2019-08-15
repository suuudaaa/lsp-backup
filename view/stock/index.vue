<template>
  <div id="stock-data">
    <div class="container" v-if="stockData">
      <div class="group1" v-for="item in num" :key="item">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <div class="left-top-card">
                  <el-card
                    class="box-card"
                    style="margin:0 24px 24px 0"
                    shadow="hover"
                    v-for="(item,idx) in stockTotal"
                    :key="idx"
                  >
                    <div class="card-box" @click="goTo(idx)">
                      <div class="text">
                        <div class="totalNum">{{item.num.toLocaleString()}}</div>
                        <div class="des">{{item.name}}</div>
                      </div>
                      <div class="semi-circle"></div>
                      <img :src="item.icon" alt />
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <div class="right-top">
              <div class="r-t-title">
                <el-row>
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
              <brand-or-type-table :tab-index="speType"></brand-or-type-table>
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
      <p class="no-data-text">暂无订单数据</p>
    </div>
  </div>
</template>
<script>
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
import TabNav from "@/components/commonComponents/TabNav";
import Calendar from "@/components/commonComponents/Calendar";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import Pagination from "@/components/commonComponents/Pagination";
export default {
  components: {
    brandOrTypeTable,
    TabNav,
    ScreenOrder,
    Calendar,
    Pagination
  },
  data() {
    return {
      stockTotal: [],
      brands: [],
      speType: [],
      routeParams: {},
      speLabel: [
        { label: "库内品牌", name: "first" },
        { label: "库内规格型号", name: "second" }
      ],
      orderTypeLabel: [
        { label: "入库订单", name: "first" },
        { label: "出库订单", name: "second" },
        { label: "一站通订单", name: "third" }
      ],
      pageChange: true,
      num: 1,
      stockData: []
    };
  },
  methods: {
    getData() {
      this.$http.get("/stockTotal").then(res => {
        // console.log(JSON.stringify(res));
        this.stockTotal = res.data.data;
        console.log(this.stockTotal);
      });
    },
    goTo(idx) {
      switch(idx){
        case 0:
          this.$router.push({path: "/inOrder"});
          break;
        case 1:
          this.$router.push({path: "/outOrder"});
          break;
        case 2:
          this.$router.push({path: "/brands"});
          break;
        case 3:
          this.$router.push({path: "/specsType"});
          break;
      }
    },
    changeType(data) {
      this.speType = data;
    },
    changeType1(data) {
      console.log(data);
    },
    
    aa() {
      if (
        document.documentElement.scrollTop + window.innerHeight ==
        document.body.offsetHeight
      ) {
        console.log("滚动刷新");
        var data = "aa";
        // this.$store.dispatch("implementGetCusOrderData", data);
      }
    }
  },
  mounted() {
    var obj = {
      params: "13333"
    };
    this.pageChange = true;
    this.getData();
    this.routeParams = this.$route.params;
    // window.addEventListener("scroll", this.aa,true);
    // window.addEventListener("scroll", this.scrollChange,true);
    // this.$store.dispatch("pullRefreshing")
    // this.pullRefresh()
  }
};
</script>
<style lang='scss'>
#stock-data {
  .left-top-card {
    text-align: left;
    float: left;
    // width: 600px;
    height: 324px;
    .box-card {
      float: left;
      position: relative;
      width: 43%;
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
      /* opacity: .3; */
      border-radius: 400px 0 0 0;
      transition: all ease-in-out 1s;
    }
    img {
      position: absolute;
      right: 6px;
      bottom: 8px;
      z-index: 1;
      height: 35px;
      width: 35px;
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
    .r-t-title {
      padding-left: 24px;
      background: #fff;
      height: 64px;
      .recent-ser {
        height: 12px;
        font-size: 12px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(88, 103, 119, 1);
        line-height: 40px;
        padding-left: 5px;
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
    img {
      width: 120px;
      height: 120px;
    }
    .no-data-text {
      height: 16px;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(126, 140, 155, 1);
    }
  }
}
</style>


