<template>
  <div class="main-order-detail">
    <bread-crumb></bread-crumb>
    <order-header-info :header-info="headerInfo"></order-header-info>
    <div class="order-detail-group1">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="hover">
            <p class="o-card-group1-title">
              <span class="urgent-order" v-if="orderStatusSym==0">加急出库</span>
              <span class="abnormal-order" v-if="orderStatusSym==1">异常出库</span>
              <span class="normal-order" v-if="orderStatusSym==2">出库</span>
              <span class="un-pushed" v-show="isWechatPush" @click="wechatPushing">
                <i class="iconfont iconkucunkantai-weixin1"></i>
                未推送
              </span>
              <span class="pushed" v-show="!isWechatPush">
                <i class="iconfont iconkucunkantai-weixin1"></i>
                已推送
              </span>
              <span class="wechat-erweima" v-show="isWechatErweima">二维码</span>
            </p>
            <ul class="o-d-group1-left-list">
              <li v-for="(item,idx) in 10" :key="item">
                <span class="left-list-name">客户公司</span>
                <span class="left-list-value">OPPO</span>
                <p class="look-for-detail" v-if="idx==0">
                  <i class="iconfont iconmimaxiugai-chakanmima"></i>
                  <span class="left-list-look">查看</span>
                </p>
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
                  <li v-for="(item,index) in 6" :class="{last:index==0}" :key="index">
                    <span class="cicle"></span>
                    <strong class="status">订单入库</strong>
                    <p class="time" v-if="index==0">
                      <span class="time-detail">2019-04-30 11：00</span>
                      <span
                        class="describe-time"
                      >耗时分钟</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <tab-nav :label-data='detailLabel' v-on:tab-render="changeType"></tab-nav>
    <order-detail-page1 v-if="tabIndex == 0"></order-detail-page1>
    <order-detail-page2 v-if="tabIndex == 1"></order-detail-page2>
    <order-detail-page3 v-if="tabIndex == 2"></order-detail-page3>
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
      headerInfo:{
        titleText:'SSCDFGGG1244',
        seviceTime:'12',
        isPhoneScan:true
      },
      detailLabel: [
        { label: "订单详情", name: "first" },
        { label: "货物明细", name: "second" },
        { label: "附件下载", name: "third" }
      ],
      tabIndex:0,
      isWechatPush:false,
      isWechatErweima:false,
      orderStatusSym:0,
    };
  },
  methods:{
    changeType(idx){
      console.log(idx)
      this.tabIndex = idx;
    },
    wechatPushing(){
      if(this.isWechatPush){
        this.isWechatErweima = true;
      }

    }
  },
  mounted(){
    //获取相应数据
  }
};
</script>
<style lang='scss'>
.main-order-detail {
  font-family: SourceHanSansCN-Medium;
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
  color: #2B3D51;
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
    width: calc(100vw - 32px);
    margin: 16px;
    height: 154px;
    li {
      height: auto;
      width: 95%;
      border-bottom: none;
      padding-bottom: 24px;
      border-left: 1px solid #c7c7c7;
      text-align: left;
      color: #999;
      position: relative;
      .time{
        display: inline-block;
        width: 50%;
      }
      .describe-time {
        // float: right;
        display: inline-block;
        width: 50%;
        margin-left: 30px;
      }
      .time-detail{
        display: inline-block;
        margin-right: 30px;
      }
      .box-right {
        /* text-align: right; */
        overflow: hidden;
      }
      .cicle {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 0px;
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
        width:10%;
        line-height: 14px;
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
    li.last .time-detail{
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
  .wechat-erweima{
    position: absolute;
    display: inline-block;
    top: 30px;
    left: 20px;
    height: 100px;
    width: 100px;
    background-color: #fff;
    box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.08);
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
      text-align: center;
      vertical-align: middle;
    }
    .look-for-detail{
      display: inline-block;
    }
    .left-list-look {
      font-size: 14px;
      font-weight: 400;
      color: rgba(18, 189, 123, 1);
    }
    .iconmimaxiugai-chakanmima{
      color: rgba(18, 189, 123, 1);
    }
  }
}
</style>


