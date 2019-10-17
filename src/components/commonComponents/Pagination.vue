<template>
  <div class="pageing">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="setPage.pageSizes"
      :page-size="setPage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="setPage.pageTotal"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    setPage:Object
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.setPage.pageSize = val;
      this.currentPage = this.setPage.currentPage;
      // 将更改页数传回调用页面，请求数据
      let pageData = {
        pageSize: val,
        pageNum: this.setPage.currentPage
      };
      this.$emit("page-change", pageData);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let pageData = {
        pageSize: this.setPage.pageSize,
        pageNum: val
      };
      this.$emit("page-change", pageData);
    },
  },
  mounted() {
  },
  watch: {
    'setPage': function(newVal, oldVal) {
      this.currentPage = 1;
    },
  },
};
</script>
<style>
.pageing {
  width: 100%;
  text-align: right;
}
</style>