<template>
  <div id="report">
    <report-nav :label-data="this.label" v-on:re-tab-render=" changeTabs"></report-nav>
    <el-container v-if='show'>
      <el-aside width="330px">
        <report-form class="r-form" :report-type="this.reportType"></report-form>
      </el-aside>
      <el-container>
        <report-table class="r-table" :report-type="this.reportType"></report-table>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import reportNav from "@/components/reportComp/ReportNav";
import reportForm from "@/components/reportComp/ReportForm";
import reportTable from "@/components/reportComp/ReportTable";
export default {
  components: {
    reportNav,
    reportForm,
    reportTable
  },
  data() {
    return {
      label: [
        { label: "入库报表", id: 1, name: "first", path: "/tab1" },
        { id: 2, label: "出库报表", name: "second", path: "/tab2" },
        { id: 3, label: "库存报表", name: "third", path: "/tab3" },
        { id: 3, label: "库存溯源报表", name: "fourth", path: "/tab3" },
        { id: 3, label: "收发货溯源报表", name: "fifth", path: "/tab3" }
      ],
      reportType:0,
      show:false
    };
  },
  methods:{
     changeTabs(data) {
      this.reportType = data
      console.log(this.reportType)
      this.getFormEvt(data)
    },
    getFormEvt(data){
      this.$http.post('/getFormLabelData',{
        name:data
      }).then(res => {
        console.log(JSON.stringify(res))
        this.$store.commit('getFormLabelData',res)
        this.show = true;
      })
    }
  },
  mounted(){
    this.getFormEvt(1)
  }
};
</script>
<style scoped>
#report {
  background-color: rgba(238,241,246,1);
}
.r-form {
  float: left;
  width: 326px;
  height: 80vh;
}
.r-table {
  /* float: left; */
  width:calc(100vw - 326px);
}
thead{
  background-color: rgba(56, 82, 96, 1);
}
</style>


