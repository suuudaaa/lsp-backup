<template>
  <div class="s-order-card">
    <div
      class="order-card-comp"
      v-loading="loading1"
      element-loading-background="transparent"
      v-show="isDatas"
    >
      <div v-if="repType ==0 ">
        <el-row :gutter="20" v-if="orderData.datas">
          <el-col
            :span="6"
            v-for="(item,index) in orderData.datas"
            :key="index"
            style="margin-bottom:20px;"
          >
            <el-card shadow="hover" style="padding:0;">
              <div class="order-card-cont" @click="goToDetail(item.billNo)">
                <div class="o-card-group1">
                  <p class="o-card-group1-title">
                    <span class="urgent-order" v-if="item.isWorryOrder === '急单'">加急入库</span>
                    <!-- <span class="abnormal-order" v-else-if="index ===1">异常出库</span> -->
                    <span class="normal-order" v-else>一般入库</span>
                    <!-- <i
                    class="iconfont icondingdanxiangqing-weixin-huihua wechat-icon"
                    v-if="index ===0"
                    ></i>-->
                    <span class="order-date">{{item.createTime.substring(0,10)}}</span>
                  </p>
                  <ul class="order-info-name">
                    <li class="show-order-data">
                      <p class="s-o-name">供应商</p>

                      <kt-tooltip :rows="1" :value="item.name" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.name}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class="s-o-name">客户单号</p>
                      <kt-tooltip :rows="1" :value="item.custOrderNo" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.custOrderNo}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class="s-o-name">货物箱数</p>
                      <kt-tooltip :rows="1" :value="item.totalBoxqty" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.totalBoxqty}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class="s-o-name">货物件数</p>
                      <kt-tooltip :rows="1" :value="item.expectedQty" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.expectedQty}}</p> -->
                    </li>
                  </ul>
                </div>
                <div class="o-card-group2" v-if="item.orderStatusTrailList">
                  <div class="logistic_box">
                    <div class="logistic_box_content">
                      <ul class="logistic_lists">
                        <li class="last" v-if="item.orderStatusTrailList[0]">
                          <div class="box-right">
                            <div class="timeline-item_tail"></div>
                            <span class="cicle"></span>
                            <strong class="status">{{item.orderStatusTrailList[0].trailStatusName}}</strong>
                            <p class="time">
                              {{item.orderStatusTrailList[0].trailTime}}
                              <span
                                class="describe-time"
                              >耗时{{item.orderStatusTrailList[0].consumTime || '0分'}}钟</span>
                            </p>
                          </div>
                        </li>
                        <li v-if="item.orderStatusTrailList[1]">
                          <div class="box-right">
                            <div class="timeline-item_tail"></div>
                            <span class="cicle"></span>
                            <strong class="status">{{item.orderStatusTrailList[1].trailStatusName}}</strong>
                          </div>
                        </li>
                      </ul>
                      <p class="order-consuming-time">订单已耗时{{item.consumTime || '0分'}}钟</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row :gutter="20" v-if="outOrderData.data">
          <el-col
            :span="6"
            v-for="(item,index) in outOrderData.data"
            :key="index"
            style="margin-bottom:20px;"
          >
            <el-card shadow="hover" style="padding:0;">
              <div class="order-card-cont" @click="goToDetail(item.billNo)">
                <div class="o-card-group1">
                  <p class="o-card-group1-title">
                    <span class="urgent-order" v-if="item.isWorryOrder === '急单'">加急出库</span>
                    <!-- <span class="abnormal-order" v-else-if="index ===1">异常出库</span> -->
                    <span class="normal-order" v-else>一般出库</span>
                    <!-- <i
                    class="iconfont icondingdanxiangqing-weixin-huihua wechat-icon"
                    v-if="index ===0"
                    ></i>-->
                    <span class="order-date">{{item.createTime.substring(0,10)}}</span>
                  </p>
                  <ul class="order-info-name">
                    <li class="show-order-data">
                      <p class="s-o-name">货主</p>
                      <kt-tooltip :rows="1" :value="item.name" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.name}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class="s-o-name">客户单号</p>
                      <kt-tooltip :rows="1" :value="item.custOrderNo" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.custOrderNo}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class>货物箱数</p>
                      <kt-tooltip :rows="1" :value="item.totalBoxqty" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.totalBoxqty}}</p> -->
                    </li>
                    <li class="show-order-data">
                      <p class="s-o-name">货物件数</p>
                      <kt-tooltip :rows="1" :value="item.expectedQty" width="100px"></kt-tooltip>
                      <!-- <p class="s-o-val">{{item.expectedQty}}</p> -->
                    </li>
                  </ul>
                </div>
                <div class="o-card-group2">
                  <div class="logistic_box">
                    <div class="logistic_box_content">
                      <ul class="logistic_lists">
                        <li class="last" v-if="item.orderStatusTrailList[0]">
                          <div class="box-right">
                            <div class="timeline-item_tail"></div>
                            <span class="cicle"></span>
                            <strong class="status">{{item.orderStatusTrailList[0].trailStatusName}}</strong>
                            <p class="time">
                              {{item.orderStatusTrailList[0].trailTime}}
                              <span
                                class="describe-time"
                              >耗时{{item.orderStatusTrailList[0].consumTime}}钟</span>
                            </p>
                          </div>
                        </li>
                        <li v-if="item.orderStatusTrailList[1]">
                          <div class="box-right">
                            <div class="timeline-item_tail"></div>
                            <span class="cicle"></span>
                            <strong class="status">{{item.orderStatusTrailList[1].trailStatusName}}</strong>
                          </div>
                        </li>
                      </ul>
                      <p class="order-consuming-time">订单已耗时{{item.consumTime}}钟</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <p class="pull-fresh" v-if="ldDataMore" @click="loadMoreData">点击加载更多...</p>
      <p class="pull-fresh" v-if="ldNothingData">没有更多数据了</p>
    </div>
    <div class="blank-page" v-show="!isDatas">
      <img src="../../../../static/img/no_data.png" alt />
      <p class="no-data-text">暂无订单数据</p>
    </div>
    <!-- <div class="blank-page" v-show="!outOrderData.data.rows">
      <img src="../../../../static/img/no_data.png" alt />
      <p class="no-data-text">暂无订单数据</p>
    </div>-->
  </div>
</template>
<script>
import { toThousands } from "@/modules/common";
import ktTooltip from "@/components/commonComponents/tooltip";
export default {
  props: ["repType"],
  components: {
    ktTooltip
  },
  data() {
    return {
      loading: false,
      cardNum: 8,
      page: 1,
      params: {}
    };
  },
  methods: {
    // 点击加载更多
    loadMoreData() {
      this.page++;
      let payload = this.page;
      let changePa = this.reParams;
      let changePa1 = this.reParams1;
      this.$store.commit("updateLoadingState", true);
      if (this.repType == 0) {
        changePa.page = this.page;
        this.$store.commit("updateOrderRequireParams", changePa);
        this.$store.dispatch("implementGetCusOrderData", "");
      } else {
        changePa1.page = this.page;
        this.$store.commit("updateOutOrderRequireParams", changePa1);
        this.$store.dispatch("implementGetOutOrderData", "");
      }
      this.$store.commit("updateOrderPage", payload);
    },
    goToDetail(item) {
      if (this.repType == 0) {
        this.$router.push({
          name: "订单详情",
          query: { id: this.repType, billNo: item }
        });
      } else {
        this.$router.push({
          name: "订单详情",
          query: { id: this.repType, billNo: item }
        });
      }
    }
  },
  computed: {
    loading1() {
      return this.$store.state.loadingState;
    },
    reParams() {
      return this.$store.state.orderRequireParams;
    },
    reParams1() {
      return this.$store.state.outOrderRequireParams;
    },
    orderData() {
      return this.$store.state.customerOrderData;
    },
    outOrderData() {
      return this.$store.state.outCustomerOrderData;
    },
    ldDataMore() {
      return this.$store.state.moreData;
    },
    ldNothingData() {
      return this.$store.state.nothingData;
    },
    isDatas() {
      return this.$store.state.isData;
    }
  },
  mounted() {}
};
</script>
<style lang ='scss' scoped>
.s-order-card {
  font-family: Source Han Sans CN;
  /deep/ .el-card__body {
    padding: 0;
  }
}
.o-card-group1 {
  margin-top: 24px;
  width: 100%;
  height: 163px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 7px 9px -4px rgba(50, 68, 88, 0.06);
  border-radius: 4px;
  .o-card-group1-title {
    height: 28px;
    margin: 14px 0;
    width: 100%;
    font-size: 14px;
    position: relative;
    /* 加急 */
    .urgent-order {
      font-family: PingFang SC;
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(255, 77, 79, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 20px;
      z-index: 2;
    }
    /* 异常 */
    .abnormal-order {
      font-family: PingFang SC;
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(245, 163, 30, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 20px;
      z-index: 2;
    }
    /* 正常 */
    .normal-order {
      font-family: PingFang SC;
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(19, 194, 195, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px 4px 20px;
      z-index: 2;
    }
    .iconfont {
      position: absolute;
      left: 32px;
      top: -4px;
      width: 88px;
      height: 28px;
      background-color: rgba(238, 241, 246, 1);
      border-radius: 0px 14px 14px 0px;
      text-align: right;
      line-height: 28px;
      padding-right: 5px;
      color: #12bd79;
    }
    .order-date {
      float: right;
      padding-right: 72px;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
  }
  .order-info-name {
    padding: 0 20px 20px 20px;
    li {
      float: left;
      width: 50%;
      padding-bottom: 10px;
      /* overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; */
      .s-o-name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(113, 127, 143, 1);
      }
      .s-o-val {
        font-size: 16px;
        width: 100px;
        line-height: 26px;
        color: rgba(43, 61, 81, 1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

/* 设置宽度，如果设宽度由下级元素撑开竖着的滚动条不会出现 */
.logistic_box {
  padding: 24px;
  height: 147px;
  /* width: 400px; */
  .logistic_box .logistic_box_content {
    background: #ffffff;
  }
  .logistic_box_content .logistic_lists {
    width: 100%;
    /* width: 100%; */
    /* margin: 16px; */
    li {
      height: auto;
      width: 100%;
      border-bottom: none;
      padding-bottom: 12px;
      text-align: left;
      color: rgba(113, 127, 143, 1);
      position: relative;
      .timeline-item_tail {
        position: absolute;
        left: 0px;
        top: 10px;
        height: 100%;
        border-left: 1px solid #d3d9de;
      }
      .describe-time {
        display: inline-block;
        width: 100px;
        margin-left: 7px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: top;
      }
      .cicle {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 4px;
        left: -5px;
        border: 2px solid #d3d9de;
        border-radius: 50%;
        background: #fff;
      }
      .status {
        display: inline-block;
        text-align: left;
        margin-left: 16px;
        margin-bottom: 7px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;

        font-weight: 500;
        color: rgba(113, 127, 143, 1);
      }
      .time {
        text-align: left;
        margin-left: 16px;
        width: 100%;
        font-size: 12px;

        font-weight: 400;
        color: rgba(113, 127, 143, 1);
      }
    }
    /* 控制高亮部分 */
    li:last-child {
      border: none;
    }
    li:last-child .timeline-item_tail {
      border: none;
    }
    li.last .status {
      color: #12bd79;
      font-weight: bolder;
    }
    li.last .cicle {
      border: 2px solid #12bd79;
    }
  }
}

.box-right {
  overflow: hidden;
}
.order-consuming-time {
  height: 15px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(50, 68, 88, 1);
}
.pull-fresh {
  margin: 20px;
  text-align: center;
  width: 100%;
  color: #999999;
  text-decoration: underline;
}
.blank-page {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
  text-align: center;
  img {
    width: 120px;
    height: 120px;
  }
  .no-data-text {
    height: 16px;
    font-size: 16px;

    font-weight: 400;
    color: rgba(126, 140, 155, 1);
  }
}
</style>


