<template>
  <div class="org-container">
    <div class="addComDiv">
      <el-button
        class="addBtn addComBtn"
        type="primary"
        icon="iconfont icongongsiguanli-xinjian addBtnIcon"
        @click="goAddCom()"
      >添加公司</el-button>
    </div>

    <org-chart :data="data" @on-hover-click="goEdit" />
  </div>
</template>
<script>
import orgChart from "@/components/orgChart";
import { getCompanyStructure } from "@/api/getData";
export default {
  components: {
    orgChart
  },
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let comId = JSON.parse(window.localStorage.getItem("userInfo")).comId;
      let participation = {
        comId: comId
      };
      getCompanyStructure(participation)
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goEdit(e, data) {
      localStorage.setItem("edit_org_data", JSON.stringify(data));
      this.$router.push({ path: "/power/company/editDepartment" });
    },
    goAddCom(){
      this.$router.push({ path: "/power/admin/addMember" });
    }
  }
};
</script>

<style scoped lang="scss">
.org-container {
  background: #fff;
}
</style>