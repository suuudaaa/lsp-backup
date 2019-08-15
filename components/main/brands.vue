<template>
  <div class="brands-table-page">
    <bread-crumb></bread-crumb>
    <div class="b-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
        stripe
      >
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <pagination :page-total="pageTotal"></pagination>
  </div>
</template>
<script>
import BreadCrumb from "@/components/commonComponents/BreadCrumb";
import Pagination from "@/components/commonComponents/Pagination";
export default {
  components: {
    BreadCrumb,
    Pagination
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pageTotal:100
    };
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style lang='scss'>
.brands-table-page{
  .b-table{
    margin:24px 0;
  }
}
</style>


