<template>
  <div class="container">
    <div class="customer-feed-back">
      <h3>意见反馈</h3>
      <div class="cust-choose-date">
        <span>选择时间段</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size='small'
        ></el-date-picker>
      </div>
      <div class="feeback-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
          stripe
        >
          <template v-for="(item,index) in tableTitle">
            <el-table-column
              :prop="item.prop"
              :label="item.name"
              :key="index"
              :show-overflow-tooltip="true"
              min-width="150"
              fit
            ></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      tableData: [],
      tableTitle: [
        {name:'序号',prop:''},
        {name:'提交日期',prop:''},
        {name:'反馈类型',prop:''},
        {name:'反馈标题',prop:''},
        {name:'反馈内容',prop:''},
        {name:'照片',prop:''},
        {name:'账号',prop:''},
        {name:'设备信息',prop:''}
      ]
    };
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.customer-feed-back {
  font-family: Source Han Sans CN;
  h3 {
    width: 97px;
    height: 24px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
  }
  .cust-choose-date {
    height: 48px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
    margin-bottom: 20px;
  }
}
</style>
