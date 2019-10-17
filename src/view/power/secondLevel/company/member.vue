<template>
  <div>
    <div class="tableContainer">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F8F9FA', color: '#7E8C9B' }"
        :row-style="{ height: '48px' }"
        stripe
      >
        <el-table-column prop="realName" label="员工姓名" align="left"></el-table-column>
        <el-table-column prop="email" label="账号" align="left"></el-table-column>
        <el-table-column prop="post" label="职位" align="left"></el-table-column>
        <el-table-column prop="roleName" label="所属部门" align="left"></el-table-column>
        <el-table-column prop="operation" label="操作" align="left">
          <template slot-scope="tableData">
            <div class="editBtn" @click="edit(tableData.$index,tableData)">
              <i class="icon iconfont icongongsiguanli-bianji"></i>
              <span>编辑</span>
            </div>
            <div class="deleteBtn" @click="del(tableData.$index,tableData)">
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
import { uList, delM } from "@/api/getData";
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
      let participation = {
        comId: JSON.parse(window.localStorage.getItem("userInfo")).comId,
        page: this.params.page,
        pageSize: this.params.limit
      };
      uList(participation)
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
    },
    edit(index, item) {
      localStorage.setItem("lsp_query_name", item.row.userName);
      localStorage.setItem("lsp_com_id", item.row.comId);
      this.$router.push({ path: "/power/company/editMember" });
    },
    del(index, item) {
      let i = index,
        userName = item.row.userName;
      this.$confirm("你确定要删除该成员吗?删除后该成员将无法登录。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let participation = {
            userName: item.row.userName
          };
          delM(participation)
            .then(res => {
              if (res.ret == "0") {
                this.tableData.splice(i, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                let msg = res.msg;
                this.$message({
                  type: "error",
                  message: msg
                });
              }
            })
            .catch(err => {
              if (Window.console) console.log(err);
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