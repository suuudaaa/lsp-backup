<template>
  <div class="order-de-page1">
    <el-card class="box-card">
      <div class="o-de-title">基本信息</div>
      <ul class="o-d-group1-left-list">
        <li
          v-for="(item,index) in 10"
          :key="item"
          @click="lightenItem(item,index)"
          :class="lightIdx == index?'lightColor':''"
        >
          <i class="iconfont icondingdanxiangqing-dianliang1"></i>
          <span class="left-list-name">客户单号</span>
          <span class="left-list-value">SSC2354768799</span>
        </li>
      </ul>
    </el-card>
    <div class="order-require">
      <el-card class="box-card">
        <div>
          <div class="o-de-title">订单要求</div>
          <p>1.随货请附发票装箱单,外箱请贴标准标签 入仓号BKB1904400065</p>
        </div>
      </el-card>
    </div>
    <div class="decare-info">
      <el-card class="box-card">
        <div class="o-de-title">报关信息</div>
        <ul class="o-d-group1-left-list">
          <li v-for="(item,index) in 10" :key="item" 
          @click="lightenItem1(item,index)"
          :class="lightIdx1 == index?'lightColor':''">
            <i class="iconfont icondingdanxiangqing-dianliang1"></i>
            <span class="left-list-name">报关单号</span>
            <span class="left-list-value">SSC2354768799</span>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="ld-service-fee">
      <el-card class="box-card">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lightingStar: false,
      lightIdx: null,
      lightIdx1: null,
      lightArr:[]
    };
  },
  methods: {
    lightenItem(item,idx) {
      this.lightIdx = idx;
      // 对接接口
    },
    lightenItem1(item,idx) {
      this.lightIdx1 = idx;
      // 对接接口
    }
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
  overflow-x: hidden;
  height: 208px;
  li {
    float: left;
    width: 50%;
    line-height: 40px;
    // height: 40px;
    .left-list-name {
      font-size: 14px;
      font-weight: 400;
      color: rgba(88, 103, 119, 1);
    }
    .left-list-value {
      display: inline-block;
      width: 110px;
      margin: 0 8px 0 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      vertical-align: middle;
    }
    .icondingdanxiangqing-dianliang1 {
      color: #2b3d51;
    }
  }
  .lightColor .left-list-value {
    color: rgba(18, 189, 123, 1);
  }
  .lightColor .icondingdanxiangqing-dianliang1 {
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