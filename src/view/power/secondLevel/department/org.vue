<template>
  <div class="org-container">
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
    }
  }
};
</script>

<style scoped lang="scss">
.org-container {
  background: #fff;
}
</style>