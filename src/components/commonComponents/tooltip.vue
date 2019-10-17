<template>
  <div :style="{'width':width}">
    <div class="kt-tooltip-input__hidden" style="position: fixed; left: -19800px;" ref="tooltip">
      <span>{{ label }}</span>
      {{ value }}
    </div>
    <div
      v-if="flag"
      @mouseenter="visibilityChange($event)"
      style="cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
      :style="{'-webkit-line-clamp':rows,'color':color}"
    >
      <span style="color: #999;cursor: pointer;">{{ label }}</span>
      {{ value }}
    </div>
    <el-tooltip :placement="placement" v-else>
      <div slot="content">
        <div>{{ value }}</div>
      </div>
      <div
        style="cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
        :style="{'-webkit-line-clamp':rows}"
      >
        <span style="color: #999;cursor: pointer;">{{ label }}</span>
        {{ value }}
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true
    };
  },
  methods: {
    visibilityChange(event) {
      let ev = event.target;
      let thisWidth = ev.offsetWidth; // 元素的宽度
      let wordWidth = this.$refs.tooltip.scrollWidth;
      if (wordWidth / thisWidth > this.rows) {
        this.flag = false;
      }
    }
  },
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    rows: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      required: false
    },
    placement: {
      type: String,
      default: "top"
    }
  }
};
</script>

<style>

</style>
