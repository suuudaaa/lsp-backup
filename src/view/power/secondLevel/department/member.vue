<template>
  <div>
    <div class="tableContainer">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F8F9FA', color: '#7E8C9B' }"
        :row-style="{ height: '48px' }"
        stripe
      >
        <el-table-column prop="name" label="员工姓名" align="left" ></el-table-column>
        <el-table-column prop="id" label="账号" align="left" ></el-table-column>
        <el-table-column prop="pass" label="密码" align="left" ></el-table-column>
        <el-table-column prop="position" label="职位" align="left" ></el-table-column>
        <el-table-column prop="department" label="所属部门" align="left" ></el-table-column>
        <el-table-column prop="operation" label="操作" align="left" >
          <template slot-scope="scope">
            <div class="editBtn" @click="edit">
              <i class="icon iconfont icongongsiguanli-bianji"></i>
              <span>编辑</span>
            </div>

            <div class="deleteBtn" @click="del">
              <i class="icon iconfont icongongsiguanli-shanchuanniu"></i>
              <span>删除</span>
            </div>
          </template>
        </el-table-column>
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
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
          department: "销售一部"
        },
        {
          name: "张三",
          id: "a17585969595",
          pass: "123456",
          position: "销售",
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
    getTableData(p) {
      // console.log(res.data.data);
      // this.tableData = res.data.data.data.articles;
      // this.tableTitle = res.data.data.title;
    },
    edit() {
      this.$router.push({ path: "/power/department/editMember" });
    },
    del() {
      this.$confirm("你确定要删除该员工吗?删除后该员工将无法登录。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
@import "~@/view/power/styles/table";
</style>