<template>
  <div>
    <div class="tableContainer">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F8F9FA', color: '#7E8C9B' }"
        :row-style="{ height: '48px' }"
        stripe
      >
        <el-table-column prop="goodsBrand" label="品牌名称" align="left"></el-table-column>
        <el-table-column prop="roleName" label="所属部门" align="left"></el-table-column>
      </el-table>
    </div>
    <div class="pageContainer">
      <pagination :set-page="setPage" v-on:page-change="pageChange"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/commonComponents/Pagination";
import { getBrand } from "@/api/getData";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableData: [],
      /*page 属性 begin*/
      params: {
        page: 1,
        limit: 20
      },
      setPage: {
        pageTotal: 0,
        pageSize: 20,
        pageSizes: [20, 40, 60]
      }
      /*page 属性 end*/
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.apiFun();
    },
    apiFun() {
      let comId = JSON.parse(window.localStorage.getItem("userInfo")).comId;
      let participation = {
        comId: comId,
        page: this.params.page,
        pageSize: this.params.limit
      };
      getBrand(participation)
        .then(res => {
          if (res.ret == "0") {
            let total = { pageTotal: res.data.total };
            this.setPage = Object.assign(this.setPage, total);
            this.tableData = res.data.rows;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          if (window.console) console.log(err);
        });
    },
    pageChange(data) {
      this.params.limit = data.pageSize;
      this.params.page = data.pageNum;
      this.apiFun();
    }
  }
};
</script>

<style lang="scss">
@import "~@/view/power/styles/table";
</style>