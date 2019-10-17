<template>
  <div>
    <div class="tableContainer">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F8F9FA', color: '#7E8C9B' }"
        :row-style="{ height: '48px' }"
        stripe
      >
        <el-table-column prop="brand" label="品牌名称" align="left" ></el-table-column>
        <el-table-column prop="department" label="所属部门" align="left" ></el-table-column>
      </el-table>
    </div>
    <div class="pageContainer">
      <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/commonComponents/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      setPage: {
        pageTotal: 8,
        pageSize: 10,
        pageSizes: [10, 20, 30]
      },
      params: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        },
        {
          brand: "SUPER",
          department: "销售一部"
        }
      ]
    };
  },
  mounted() {
    this.getTableData(this.params);
  },
  methods: {
    pageChange(data) {
      this.params.pageSize = data.pageSize;
      this.params.pageNum = data.pageNum;
      this.getTableData(this.params);
    },
    getTableData(p) {}
  }
};
</script>

<style lang="scss">
@import "~@/view/power/styles/table";
</style>