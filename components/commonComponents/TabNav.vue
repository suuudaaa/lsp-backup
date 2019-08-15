<template>
  <div class="report-nav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in labelData"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: ["labelData"],
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.index);
      // 表单查询处
      this.$emit("tab-render", tab.index);
      // 报表类型
      this.$emit("re-tab-render", tab.index);
    }
  }
};
</script>
<style lang='scss'>
.report-nav {
  //tab选中时颜色
  .el-tabs__item.is-active {
    color: #2b3d51;
  }
  .el-tabs__item.is-active {
    color: #2b3d51;
    font-weight: bold;
  }
  .el-tabs__item:hover {
    color: #2b3d51;
    cursor: pointer;
  }
  //字体大小
  .el-tabs__item {
    font-size: 16px;
    color: rgba(88, 103, 119, 1);
  }
  // tab下边框色
  .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #2b3d51;
    z-index: 1;
    -webkit-transition: -webkit-transform 0.3s
      cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
  }
  // tab下边框线
}
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  z-index: 1;
}
</style>

