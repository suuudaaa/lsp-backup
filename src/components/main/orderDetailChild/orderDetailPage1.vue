<template>
  <div class="order-de-page1">
    <div>
      <el-card class="box-card" shadow="hover" style="padding-bottom:20px;"> 
        <div class="o-de-title">基本信息</div>
        <ul class="o-d-group1-left-list">
          <li
            v-for="(item,index) in baseInfo"
            :key="index+'t'"
            @click="lightenItem(item.name,index)"
            :class="lightIdx == index?'lightColor':''"
          >
            <!-- <i class="iconfont icondingdanxiangqing-dianliang"></i> -->
            <span class="left-list-name">{{item.name}}</span>
            <span class="left-list-value">{{item.num}}</span>
          </li>
        </ul>
      </el-card>
      <div class="order-require">
        <el-card class="box-card" shadow="hover">
          <div>
            <div class="o-de-title">订单要求</div>
            <div v-if="orderRequire">
              <p v-for="(item,index) in orderRequire" :key="index">{{item.num || '暂无'}}</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="decare-info">
        <el-card class="box-card" shadow="hover" style="padding-bottom:20px;">
          <div class="o-de-title">报关信息</div>
          <ul class="o-d-group1-left-list">
            <li
              v-for="(item,index) in customsInfo"
              :key="index +'s'"
              @click="lightenItem1(item.name,index)"
              :class="lightIdx1 == index?'lightColor':''"
            >
              <!-- <i class="iconfont icondingdanxiangqing-dianliang"></i> -->
              <span class="left-list-name">{{item.name}}</span>
              <span class="left-list-value">{{item.num}}</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!-- <div class="ld-service-fee">
        <el-card class="box-card" shadow="hover">
          <div>
            <div class="o-de-title">路迪服务费用（总计）</div>
            <ul>
              <li v-for="item in 2" :key="item">
                <span>仓储</span>
                <span class="fee-num">254776879</span>
              </li>
            </ul>
          </div>
        </el-card>
      </div> -->
    </div>
    
  </div>
</template>
<script>
import { inOrderDetail, outOrderDetail } from "@/api/getData";
export default {
  props: ["tabIdx"],
  data() {
    return {
      lightingStar: false,
      lightIdx: null,
      lightIdx1: null,
      lightArr: [],
      baseInfo: [],
      customsInfo: [],
      orderRequire:[],
      params: {
        billNo: ""
      },
      isData:false
    };
  },
  methods: {
    lightenItem(item, idx) {
      // this.lightIdx = idx;//暂不提供操作
      // 对接接口，应当有返回的数据
    },
    lightenItem1(item, idx) {
      // this.lightIdx1 = idx;//暂不提供操作
      // 对接接口，应当有返回数据
    },
    getOrderDetail() {
      let that = this;
      if (that.params.billNo == "") {
        return;
      }
      let ids = that.$route.query.id;
      if (ids == 0) {
        inOrderDetail(that.params).then(res => {
          if (res.ret == 0) {
            let baseInfo = res.data.titleInfo.baseInfo;
            let customsInfo = res.data.titleInfo.customsInfo;
            that.orderRequire = res.data.titleInfo.customDescription;
            that.customsInfo = customsInfo;
            that.baseInfo = baseInfo;
          }
        });
      } else {
        outOrderDetail(that.params).then(res => {
          if (res.ret == 0) {
            let baseInfo = res.data.titleInfo.baseInfo;
            let customsInfo = res.data.titleInfo.customsInfo;
            that.orderRequire = res.data.titleInfo.customDescription;
            that.customsInfo = customsInfo;
            that.baseInfo = baseInfo;
          }
        });
      }
    }
  },
  mounted() {
    this.params.billNo = this.$route.query.billNo;
    this.getOrderDetail();
  }
};
</script>
<style scoped lang='scss'>
.order-de-page1 {
  font-size: 16px;
  font-family: SourceHanSansCN-Medium;
}
.o-de-title {
  height: 40px;
  font-weight: 500;
  color: rgba(43, 61, 81, 1);
  line-height: 40px;
}
.o-d-group1-left-list {
  padding-bottom: 10px;
  li {
    float: left;
    width: 50%;
    line-height: 40px;

    // height: 40px;
    .left-list-name {
      display: inline-block;
      width: 80px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
    .left-list-value {
      display: inline-block;
      width: 400px;
      margin: 0 8px 0 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
    .icondingdanxiangqing-dianliang {
      color: #2b3d51;
    }
  }
  .lightColor .left-list-value {
    color: rgba(18, 189, 123, 1);
  }
  .lightColor .icondingdanxiangqing-dianliang {
    color: rgba(18, 189, 123, 1);
  }
  .defaultColor .left-list-value {
    color: #2b3d51;
  }
  .defaultColor .iconfont {
    color: #2b3d51;
  }
}
.order-require {
  margin: 24px 0;
  p {
    font-size: 14px;
    font-weight: 400;
    color: rgba(43, 61, 81, 1);
  }
}
.ld-service-fee {
  margin: 24px 0;
  li {
    font-size: 14px;
    font-weight: 400;
    color: rgba(88, 103, 119, 1);
    line-height: 40px;
    .fee-num {
      display: inline-block;
      margin-left: 100px;
    }
  }
}
</style>