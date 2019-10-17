<template>
  <div class="container">
    <div class="main-order-detail">
      <div v-if="isData">
        <bread-crumb></bread-crumb>
        <order-header-info :header-info="headerInfo"></order-header-info>
        <div>
          <div class="order-detail-group1">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="o-card-group1-title">
                    <p v-if="inOrout == 0">
                      <!-- 订单状态判断 -->
                      <span class="urgent-order" v-if="isWorry=='急单'">加急入库</span>
                      <!-- <span class="abnormal-order" v-if="orderStatusSym==1">异常出库</span> -->
                      <span class="normal-order" v-else>入库</span>
                      <!-- <span class="un-pushed" v-show="isWechatPush" @click="wechatPushing">
                        <i class="iconfont iconkucunkantai-weixin1"></i>
                        未推送
                      </span>
                      <span class="pushed" v-show="!isWechatPush">
                        <i class="iconfont iconkucunkantai-weixin1"></i>
                        已推送
                      </span>-->
                      <!-- <span class="wechat-erweima" v-show="isWechatErweima">二维码</span> -->
                    </p>
                    <p v-if="inOrout == 1">
                      <span class="urgent-order" v-if="isWorry=='急单'">加急出库</span>
                      <span class="normal-order" v-else>出库</span>
                    </p>
                  </div>
                  <ul class="o-d-group1-left-list">
                    <li v-for="(item,idx) in titleInfo" :key="idx">
                      <span class="left-list-name">{{item.name}}</span>
                      <span class="left-list-value">{{item.num}}</span>
                      <!-- <p class="look-for-detail" v-if="idx==0">
                      <i class="iconfont iconmimaxiugai-chakanmima"></i>
                      <span class="left-list-look">查看</span>
                      </p>-->
                    </li>
                  </ul>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover">
                  <div class="logistic_box">
                    <div class="logistic_box_title">订单跟踪</div>
                    <div class="logistic_box_content">
                      <ul class="logistic_lists">
                        <li
                          v-for="(item,index) in orderSteps"
                          :class="{last:item.isRun == '进行中'}"
                          :key="index"
                        >
                          <div class="timeline-item_tail"></div>
                          <span class="cicle"></span>
                          <strong class="status">{{item.trailStatusName}}</strong>
                          <p class="time" v-if="item.isRun == '进行中' || item.isRun == '已进行'">
                            <span class="time-detail">{{item.trailTime}}</span>
                            <span
                              class="describe-time"
                              v-if="item.consumTime"
                            >耗时{{item.consumTime}}钟</span>
                          </p>
                          <div
                            class="describe-express"
                            v-if="item.expressDetails"
                          >{{item.expressDetails}}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="tab-change-over">
          <tab-nav :label-data="detailLabel" v-on:tab-render="changeType"></tab-nav>
          <!-- <el-badge is-dot class="item" v-show="isFileChange"></el-badge> -->
        </div>
        <transition name="fade" mode="out-in" appear>
          <order-detail-page1 v-if="tabIndex == 0" :nav-idx="tabIndex"></order-detail-page1>
          <order-detail-page2 v-if="tabIndex == 1" :nav-idx="tabIndex"></order-detail-page2>
          <order-detail-page3 v-if="tabIndex == 2" :nav-idx="tabIndex"></order-detail-page3>
        </transition>
      </div>
      <div class="no-data">
        <div class="blank-page" v-if="!isData">
          <img src="../../../static/img/no_data.png" alt />
          <p class="no-data-text">暂无订单数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import brandOrTypeTable from "@/components/commonComponents/brandOrTypeTable";
import TabNav from "@/components/commonComponents/TabNav";
import ScreenOrder from "@/components/commonComponents/orderGroup/ScreenOrder";
import OrderHeaderInfo from "@/components/commonComponents/orderGroup/OrderHeaderInfo";
import orderDetailPage1 from "@/components/main/orderDetailChild/orderDetailPage1";
import orderDetailPage2 from "@/components/main/orderDetailChild/orderDetailPage2";
import orderDetailPage3 from "@/components/main/orderDetailChild/orderDetailPage3";
import {
  inOrderDetail,
  outOrderDetail,
  inOrderGetBsrcdFiles,
  outOrderGetBsrcdFiles
} from "@/api/getData";
import { toThousands } from "@/modules/common";
export default {
  components: {
    BreadCrumb,
    brandOrTypeTable,
    TabNav,
    ScreenOrder,
    OrderHeaderInfo,
    orderDetailPage1,
    orderDetailPage2,
    orderDetailPage3
  },
  data() {
    return {
      headerInfo: {
        titleText: "SSCDFGGG1244",
        seviceTime: "12",
        isPhoneScan: false
      },
      detailLabel: [
        { label: "订单详情", name: "first" },
        { label: "货物明细", name: "second" },
        { label: "附件下载", name: "third" }
      ],
      titleInfo: [],
      orderSteps: [],
      isWorry: "",
      tabIndex: 0,
      isWechatPush: false,
      isWechatErweima: false,
      orderStatusSym: 0,
      params: {
        billNo: ""
      },
      paramsFile: {
        page: "",
        pageSize: "",
        billNo: ""
      },
      isData: true,
      isFileChange: false,
      inOrout: 0,
      isCurrentStep: 0
    };
  },
  methods: {
    changeType(data) {
      this.tabIndex = data.configure.index;
      if (data.configure.index == 2) {
        this.isFileChange = false;
      }
    },
    wechatPushing() {
      if (this.isWechatPush) {
        this.isWechatErweima = true;
      }
    },
    getOrderDetail() {
      let that = this;
      let ids = that.$route.query.id;
      that.isData = true;
      that.inOrout = ids;
      if (ids == 0) {
        inOrderDetail(that.params).then(res => {
          that.detailDataProcess(res);
        });
        inOrderGetBsrcdFiles(that.paramsFile).then(res => {
          that.fileDataProcess(res);
        });
      } else {
        outOrderDetail(that.params).then(res => {
          that.detailDataProcess(res);
        });
        outOrderGetBsrcdFiles(that.paramsFile).then(res => {
          that.fileDataProcess(res);
        });
      }
    },
    detailDataProcess(res) {
      let that = this;
      if (res.ret == 0) {
        that.isData = true;
        let titleInfo = res.data.titleInfo.orderSummary;
        let isWorry = res.data.inBoundDetailInfo.isWorryOrder;
        let seviceTime = res.data.consumTime;
        let steps = res.data.orderStatusTrailList; //订单信息
        steps = steps.map((item, idx) => {
          if (item.trailTime) {
            item.trailTime = item.trailTime.substring(0, 16);
          }
          return item;
        });
        let express = res.data.inBoundDetailInfo
          ? res.data.inBoundDetailInfo.expressNumberList
          : []; //物流信息
        let arrResult = steps;
        if (express) {
          express.forEach((v, i, l) => {
            let item = new Object();
            item.consumTime = "";
            item.isRun = "已进行";
            item.trailStatusName = v.routeStep;
            item.trailTime = v.routeUploadDate;
            item.expressDetails = v.routeDescription;
            arrResult.push(item);
          });
        }

        if (titleInfo.length == 0 && steps.length == 0) {
          that.isData = false;
        }
        that.isWorry = isWorry;
        that.headerInfo.seviceTime = seviceTime;
        that.titleInfo = titleInfo;

        // that.orderSteps = steps; //最终赋值
        that.orderSteps = arrResult;

        that.isCurrentStep = that.orderSteps.length - 1;
      } else {
        that.isData = false;
      }
    },
    fileDataProcess(res) {
      let that = this;
      if (res.ret == 0) {
        let currentTotal = res.data.total;
        let preTotal = localStorage.getItem("indownFileTotal");
        if (preTotal != undefined) {
          if (preTotal != currentTotal) {
            that.isFileChange = true;
          } else {
            that.isFileChange = false;
          }
        } else {
          that.isFileChange = false;
        }
        window.localStorage.setItem("indownFileTotal", res.data.total);
      }
    }
  },
  mounted() {
    this.params.billNo = this.$route.query.billNo;
    this.paramsFile.billNo = this.$route.query.billNo;
    this.headerInfo.titleText = this.$route.query.billNo;
    this.getOrderDetail();
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss";
.main-order-detail {
  width: $container-height;
  padding: $main-padding;
  font-family: SourceHanSansCN-Medium;
  .order-detail-group1 {
    margin-bottom: 24px;
    position: relative;
  }
}
.no-data {
  width: 100vw;
  // height: 100vh;
}
.logistic_box {
  height: 264px;
}
.logistic_box_title {
  text-align: left;
  padding: 10px;
  background: #ffffff;
  width: 100vw;
  height: 56px;
  line-height: 30px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #2b3d51;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .title-circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #c77;
    border-radius: 50%;
    background: #fff;
  }
}
.logistic_box .logistic_box_content {
  background: #ffffff;
  overflow-x: hidden;
  padding-bottom: 32px;
  .logistic_lists {
    width: 100%;
    margin: 16px;
    height: 154px;
    li {
      height: auto;
      width: 100%;
      border-bottom: none;
      padding-bottom: 24px;
      // border-left: 1px solid #c7c7c7;
      text-align: left;
      color: #999;
      position: relative;
      .timeline-item_tail {
        position: absolute;
        left: 0px;
        top: 10px;
        height: 100%;
        border-left: 1px solid #d3d9de;
      }
      .time {
        display: inline-block;
        width: 60%;
        vertical-align: top;
      }
      .describe-time {
        float: right;
        width: 50%;
        // margin-left: 30px;
      }
      .describe-express {
        margin-left: 21px;
      }
      .time-detail {
        display: inline-block;
        margin-right: 30px;
      }
      .box-right {
        overflow: hidden;
      }
      .cicle {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 4px;
        left: -5.5px;
        border: 2px solid #c7c7c7;
        border-radius: 50%;
        background: #fff;
      }
      .status {
        display: inline-block;
        text-align: left;
        margin-left: 21px;
        margin-bottom: 7px;
        height: 14px;
        width: 30%;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #999;
      }
      .time {
        text-align: left;
        margin-left: 21px;
        height: 20px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #999;
        line-height: 20px;
      }
    }
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
    li.last .describe-time {
      color: #12bd79;
    }
    li.last .time-detail {
      color: #12bd79;
    }
  }
}
.o-card-group1-title {
  height: 28px;
  margin: 14px 0;
  width: 100%;
  font-size: 14px;
  position: relative;
  left: -20px;
  /* 加急 */
  .urgent-order {
    position: relative;
    width: 96px;
    height: 28px;
    background: rgba(255, 77, 79, 1);
    border-radius: 0px 14px 14px 0px;
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    padding: 4px 20px;
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
    padding: 4px 20px;
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
    padding: 4px 20px;
    z-index: 2;
  }
  .un-pushed {
    position: absolute;
    left: 15px;
    top: -4px;
    width: 140px;
    height: 28px;
    background-color: rgba(238, 241, 246, 1);
    border-radius: 0px 14px 14px 0px;
    line-height: 28px;
    color: #586777;
    font-size: 14px;
    cursor: pointer;
  }
  .pushed {
    position: absolute;
    left: 15px;
    top: -4px;
    width: 140px;
    height: 28px;
    background-color: rgba(238, 241, 246, 1);
    border-radius: 0px 14px 14px 0px;
    line-height: 28px;
    color: rgba(18, 189, 123, 1);
    font-size: 14px;
    cursor: pointer;
  }
  .iconfont {
    display: inline-block;
    width: 80px;
    padding-left: 10px;
    vertical-align: middle;
    text-align: right;
  }
  .order-date {
    display: inline-block;
    margin-left: 23%;
    font-weight: 400;
    color: rgba(88, 103, 119, 1);
  }
  .wechat-erweima {
    position: absolute;
    display: inline-block;
    top: 30px;
    left: 20px;
    height: 100px;
    width: 100px;
    background-color: #fff;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  }
}
.o-d-group1-left-list {
  overflow-x: hidden;
  height: 208px;
  li {
    float: left;
    width: 50%;
    line-height: 40px;
    height: 40px;
    .left-list-name {
      display: inline-block;
      width: 80px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
    .left-list-value {
      display: inline-block;
      width: 100px;
      margin: 0 8px 0 10px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
    }
    .look-for-detail {
      display: inline-block;
    }
    .left-list-look {
      font-size: 14px;
      font-weight: 400;
      color: rgba(18, 189, 123, 1);
      cursor: pointer;
    }
    .iconmimaxiugai-chakanmima {
      color: rgba(18, 189, 123, 1);
    }
  }
}
.tab-change-over {
  position: relative;
  .item {
    position: absolute;
    top: 25%;
    left: 22%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>


