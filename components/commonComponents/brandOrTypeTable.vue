<template>
  <div class="b-t-table">
    <div v-if="orderData">
      <div class="stock-brand" v-if="tabIndex==1">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
          height="262"
        >
          <el-table-column label="品牌" height="214">
            <template slot-scope="scope">
              <span class="recent-circle" v-if=" scope.row.shows"></span>
              <span>{{ scope.row.name }}</span>
              <span class="show-new" v-if=" scope.row.shows">NEW</span>
            </template>
          </el-table-column>
          <el-table-column label="规格数" height="214">
            <template slot-scope="scope">
              <span>{{ scope.row.typeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="箱数" height="214">
            <template slot-scope="scope">
              <span>{{ scope.row.boxNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="货物数量" height="214">
            <template slot-scope="scope">
              <span>{{ scope.row.goodsNum }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="stock-type-spe" v-else>
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
          height="262"
        >
          <el-table-column label="规格型号" height="214">
            <template slot-scope="scope" v-if="shows">
              <span class="recent-circle" v-if=" scope.row.shows"></span>
              <span>{{ scope.row.name }}</span>
              <span class="show-new" v-if=" scope.row.shows">NEW</span>
            </template>
          </el-table-column>
          <el-table-column label="货物名称" height="214">
            <template slot-scope="scope">
              <span>{{ scope.row.typeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="货物数量" height="214">
            <template slot-scope="scope">
              <span>{{ scope.row.boxNum }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column label="品牌" width="180">
        <template slot-scope="scope" v-if='shows'>
          <span class="recent-circle"></span>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
          <span class="show-new">NEW</span>
        </template>
      </el-table-column>
      <el-table-column label="规格数" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.typeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="箱数">
        <template slot-scope="scope">
          <span>{{ scope.row.boxNum }}</span>
        </template>
      </el-table-column>
      </el-table>-->
      <!-- <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#F8F9FA',color:'#7E8C9B'}"
      height="262"
    >
      <el-table-column
        v-for="(val,key,index) of tableData[1]"
        :key="index"
        :prop="key"
        :label="tabIndex==1?tableTitle1[index]:tableTitle2[index]"
        height="200"
      >
      </el-table-column>
      </el-table>-->
    </div>
    <div class="blank-page" v-if="!orderData">
      <img src="../../../static/img/no_data.png" alt />
      <p class="no-data-text">{{noDataTxt[tabIndex]}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["tabIndex"],
  data() {
    return {
      tableData: [],
      tableTitle1: ["品牌", "规格数", "箱数", "货物数量"], //可接口获取，可组件传参
      tableTitle2: ["规格型号", "物流名称", "货物数量"],
      noDataTxt:['暂无库内品牌', '暂无规格型号'],
      shows: true,
      orderData:[]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.tabIndex == 1) {
        this.$http
          .get("/brandTypeData")
          .then(res => {
            this.tableData = res.data.data;
            console.log(JSON.stringify(res.data.data));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .get("/brandTypeData1")
          .then(res => {
            this.tableData = res.data.data;
            console.log(JSON.stringify(res.data.data));
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  watch: {
    tabIndex: function(oldVal, newVal) {
      this.getData();
    }
  }
};
</script>
<style lang='scss'>
.b-t-table {
  width: 100%;
  float: left;
}

.recent-circle {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: rgba(19, 194, 194, 1);
  border-radius: 50%;
  line-height: 30px;
}
.show-new {
  display: inline-block;
  width: 40px;
  // height: 20px;
  background: rgba(240, 90, 50, 0.56);
  // opacity: 0.12;
  border-radius: 2px;
  font-size: 12px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(240, 90, 50, 1);
  line-height: 20px;
  text-align: center;
}
.blank-page {
  height: 100%;
  width: 100%;
  // margin: 0 auto;
  padding: 40px 0;
  text-align: center;
  background-color: #fff;
  img {
    width: 120px;
    height: 120px;
  }
  .no-data-text {
    height: 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(126, 140, 155, 1);
  }
}
</style>

