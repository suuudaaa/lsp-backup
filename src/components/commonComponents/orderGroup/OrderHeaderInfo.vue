<template>
  <div class="order-header-info clearfix">
    <h3 class="h-left fl">{{headerInfo.titleText}}</h3>
    <div class="h-right fr" v-if="headerInfo.isPhoneScan">
      <span>承诺服务时间{{headerInfo.seviceTime}}</span>
      <p @click='scanErweima'>
        <i class="iconfont icondingdanxiangqing-erweima"></i>  手机查看
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['headerInfo'],
  data() {
    return {
    };
  },
  methods:{
    scanErweima(){
      // 请求二维码
    }
  }
};
</script>
<style scoped>
.order-header-info{
  margin:30px 0;
}
.h-left {
  /* width: 292px; */
  height: 28px;
  font-size: 36px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(43, 61, 81, 1);
  line-height: 40px;
}
.h-right {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(88, 103, 119, 1);
  line-height: 40px;
}
.h-right p i{
  display: inline-block;
  padding-right: 6px;
  width: 16px;
  height: 16px;
}
.h-right p {
  display: inline-block;
  font-weight: 500;
  width: 100px;
  height: 28px;
  line-height: 28px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  text-align: center;
}
.h-right p:active{
  color:#000;
}
</style>