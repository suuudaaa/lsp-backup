<template>
  <div class="s-order-card">
    <div
      class="order-card-comp"
      v-loading="loading1"
      element-loading-background="transparent"
      v-if="orderData"
    >
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in cardNum" :key="item">
          <el-card shadow="hover" style="padding:0;" >
            <div class="order-card-cont" @click="goToDetail(item)">
              <div class="o-card-group1">
                <p class="o-card-group1-title">
                  <span class="urgent-order">加急出库</span>
                  <i class="wechat-icon"></i>
                  <span class="order-date">2019-06-14</span>
                </p>
                <ul class="order-info-name">
                  <li class="show-order-data">
                    <p class="s-o-name">顾客公司</p>
                    <p class="s-o-val">OPPO</p>
                  </li>
                  <li class="show-order-data">
                    <p class="s-o-name">顾客公司</p>
                    <p class="s-o-val">OPPO</p>
                  </li>
                  <li class="show-order-data">
                    <p class="s-o-name">顾客公司</p>
                    <p class="s-o-val">OPPO</p>
                  </li>
                  <li class="show-order-data">
                    <p class="s-o-name">顾客公司</p>
                    <p class="s-o-val">OPPO</p>
                  </li>
                </ul>
              </div>
              <div class="o-card-group2">
                <div class="logistic_box">
                  <div class="logistic_box_content">
                    <ul class="logistic_lists">
                      <li v-for="(item,index) in orderDes" :class="{last:index==0}" :key="index">
                        <div class="box-left"></div>
                        <div class="box-right">
                          <span class="cicle"></span>
                          <strong class="status">{{item.orderStatusName}}</strong>
                          <p class="time" v-if="index==0">
                            {{item.operationTime}}
                            <span
                              class="describe-time"
                              v-if="index==0"
                            >耗时{{item.timeConsumig}}分钟</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                    <p class="order-consuming-time">订单已耗时3小时10分钟</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p class="pull-fresh" v-if="moreData" @click="loadMoreData">点击加载更多...</p>
      <p class="pull-fresh" v-if="NothingData">没有更多数据了</p>
    </div>
    <div class="blank-page" v-if="!orderData">
      <img src="../../../../static/img/no_data.png" alt />
      <p class="no-data-text">暂无订单数据</p>
    </div>
  </div>
</template>
<script>
export default {
  // props:['loading'],
  data() {
    return {
      orderDes: [
        {
          orderStatusName: "货物入库完成",
          operationTime: "2019-07-23 13:54",
          timeConsumig: "23"
        },
        { orderStatusName: "订单已受理", operationTime: "2019-07-22 11:17" }
      ],
      moreData: true,
      NothingData: false,
      loading: false,
      cardNum: 4,
      page: 0,
      params: {}
    };
  },
  methods: {
    // 点击加载更多
    loadMoreData() {
      this.page++;
      let payload = this.page;
      let changePa = this.reParams;
      changePa.pageNum = this.page;
      this.$store.commit("updateOrderPage", payload);
      this.$store.commit("updateOrderRequireParams", changePa);
      this.$store.commit("updateLoadingState", true);
      this.$store.dispatch("implementGetCusOrderData");
    },
    goToDetail(item){
      this.$router.push({path:'/orderDetail',params:item})
    }
  },
  computed: {
    loading1() {
      return this.$store.state.loadingState;
    },
    reParams() {
      return this.$store.state.orderRequireParams;
    },
    orderData() {
      return this.$store.state.customerOrderData;
    }
  },
  watch: {
    loading: function(newVl, oldVal) {
      this.loading = newVal;
    }
  }
};
</script>
<style lang ='scss' scoped>
.el-card__body {
  padding: 0;
}
.o-card-group1 {
  width: 100%;
  height: 183px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 10px 0px rgba(50, 68, 88, 0.06);
  border-radius: 4px;
  font-family: SourceHanSansCN-Regular;
  .o-card-group1-title {
    height: 28px;
    margin: 14px 0;
    width: 100%;
    font-size: 14px;
    position: relative;
    /* 加急 */
    .urgent-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(255, 77, 79, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px;
      z-index: 2;
    }
    /* 异常 */
    .abnormal-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(245, 163, 30, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px;
      z-index: 2;
    }
    /* 正常 */
    .normal-order {
      position: relative;
      width: 96px;
      height: 28px;
      background: rgba(19, 194, 195, 1);
      border-radius: 0px 14px 14px 0px;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      padding: 4px 10px;
      z-index: 2;
    }
    .wechat-icon {
      position: absolute;
      left: 15px;
      top: -4px;
      width: 88px;
      height: 28px;
      background-color: rgba(238, 241, 246, 1);
      border-radius: 0px 14px 14px 0px;
      background: url("../../../../static/img/wechat.png") no-repeat right
        center rgba(238, 241, 246, 1);
      background-size: 20%;
    }
    .order-date {
      display: inline-block;
      margin-left: 23%;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
  }
  .order-info-name {
    padding: 20px;
    li {
      float: left;
      width: 50%;
      padding-bottom: 20px;
      .s-o-name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(113, 127, 143, 1);
      }
      .s-o-val {
        font-size: 16px;
        /* font-weight: 500; */
        line-height: 26px;
        color: rgba(43, 61, 81, 1);
      }
    }
  }
}

/* 设置宽度，如果设宽度由下级元素撑开竖着的滚动条不会出现 */
.logistic_box {
  padding: 20px;
  /* width: 400px; */
  .logistic_box .logistic_box_content {
    background: #ffffff;
  }
  .logistic_box_content .logistic_lists {
    width: calc(100vw - 32px);
    /* width: 100%; */
    /* margin: 16px; */
    li {
      height: auto;
      width: 95%;
      border-bottom: none;
      padding-bottom: 24px;
      border-left: 1px solid #d3d9de;
      text-align: left;
      color: rgba(113, 127, 143, 1);
      position: relative;
      .describe-time {
        display: inline-block;
        margin-left: 20px;
      }
      .cicle {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 0px;
        left: -5.5px;
        border: 2px solid #d3d9de;
        border-radius: 50%;
        background: #fff;
      }
      .status {
        display: inline-block;
        text-align: left;
        margin-left: 21px;
        margin-bottom: 7px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 500;
        color: rgba(113, 127, 143, 1);
      }
      .time {
        text-align: left;
        margin-left: 21px;
        /* height: 20px; */
        width: 100%;
        font-size: 12px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(113, 127, 143, 1);
        /* line-height: 20px; */
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }
    }
    /* 控制高亮部分 */
    li:last-child {
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
  height: 11px;
  font-size: 12px;
  font-family: SourceHanSansCN-Regular;
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
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(126, 140, 155, 1);
  }
}
</style>


