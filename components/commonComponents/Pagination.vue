<template>
  <div class="pageing">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="8"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props:['pageTotal'],
  data() {
    return {
      currentPage:1,
      pageSizes:[8, 16, 24, 32, 48],
      pageSize:8
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      // 将更改页数传回调用页面，请求数据
      let pageData = {
        pageSize:val,
        pageNum:this.currentPage
      }
      console.log(pageData)
      this.$emit('page-change',pageData)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      let pageData = {
        pageSize:this.pageSize,
        pageNum:val
      }
      console.log(pageData)
      this.$emit('page-change',pageData)
    }
  },
  mounted(){

  }
};
</script>
<style>
.pageing{
  width: 100%;
  text-align: center;
}
.el-pager li.active {
  color: #12bd7b;
  cursor: default;
}
.el-pager li:hover {
  color: #12bd7b;
}
.el-pagination button:hover {
  color: #12bd7b;
}
.el-select .el-input.is-focus .el-input__inner {
  color: #12bd7b;
}

.el-select .el-input.is-focus .el-input__inner {
  color: #12bd7b;
}
.el-select .el-input.is-focus .el-input__inner {
  color: #12bd7b;
}
.el-select .el-input.is-focus .el-input__inner {
  color: #12bd7b;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #12bd7b;
}
.el-input.is-focus .el-input__inner {
  border-color: #12bd7b;
}
.el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #12bd7b;
}
.el-select-dropdown__item.selected {
  color: #12bd7b;
  font-weight: 700;
}
.el-input__inner:hover {
  border-color: #12bd7b;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #12bd7b;
  outline: 0;
}
</style>