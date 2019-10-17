<template>
  <div class="order-detail-page2">
    <div v-show = "isData">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
        :row-class-name="tableRowClassName"
        :cell-style="cellStyle"
        stripe
      >
        <template v-for="(item,index) in tableTitle">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :key="index"
            :sortable="item.type"
            :show-overflow-tooltip="true"
            min-width="150"
            fit
          ></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="no-data" v-show="!isData">
      <div class="blank-page">
        <img src="../../../../static/img/no_data.png" alt />
        <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
        <p class="no-data-text">暂无货物明细</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  inOrderGetGoodsDetailInfo,
  outOrderGetGoodsDetailInfo
} from "@/api/getData";
import { toThousands } from "@/modules/common";
export default {
  props: ["tabIdx"],
  data() {
    return {
      tableData: [],
      tableTitle: [],
      params: {
        billNo: ""
      },
      isData:true
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {},
    cellStyle(row, column, rowIndex, columnIndex) {
      //根据报警级别显示颜色,单元格颜色
      if (row.column.label === "姓名" && row.row.name === "张大茂") {
        return "color:red";
      } else if (row.column.label === "姓名" && row.row.name === "李明世") {
        return "color:yellow";
      }
    },
    getPage2Data() {
      let that = this;
      let ids = that.$route.query.id;
      if (ids == 0) {
        inOrderGetGoodsDetailInfo(that.params).then(res => {
          if (res.ret == 0) {
            let data = res.data.rows;
            that.tableData = data;
            that.tableTitle = res.data.title;
          }
        });
      } else {
        outOrderGetGoodsDetailInfo(that.params).then(res => {
          if (res.ret == 0) {
            let data = res.data.rows;
            that.tableData = data;
            that.tableTitle = res.data.title;
          }
        });
      }
      //接口调用
    }
  },
  mounted() {
    this.params.billNo = this.$route.query.billNo;
    this.getPage2Data();
  }
};
</script>

<style>
</style>