<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="daterange"
      unlink-panels
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
      @change = "pickChange"
      @blur = "pickChange"
      size="small"
    ></el-date-picker>
  </div>
</template>

<script>
import { df } from "@/modules/filters/orderFilter";
export default {
  props:['picker'],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "七日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "一月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "三月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: [df(new Date(), "yyyy-mm-dd", 7),df(new Date(), "yyyy-mm-dd")]
    };
  },
  methods:{
    pickChange(val){
      let arr = this.value;
      this.$emit('date-picker-change',arr)
    }
  },
  mounted() {
    let name = this.$route.name;
    if (name == '入库详情' || name == '出库详情' ){
      this.value = [df(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-mm-dd"),df(new Date(), "yyyy-mm-dd")]
    }
  },
  watch: {
    'picker': function(newVal, oldVal) {
      this.value = '';
    },
  }
};
</script>
<style lang="scss" scoped>
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 238px;
}
</style>