<template>
  <div class="org-chart-container">
    <div class="org-chart" :class="{horizontal, collapsable}">
      <org-chart-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @on-expand="(e, data) => {$emit('on-expand', e, data)}"
        @on-node-click="(e, data) => {$emit('on-node-click', e, data)}"
        @on-hover-click="(e, data) => {$emit('on-hover-click', e, data)}"
      />
    </div>
  </div>
</template>

<script>
import render from "./node";

export default {
  name: "orgChart",
  components: {
    OrgChartNode: {
      render,
      functional: true
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        expand: "expand",
        children: "children"
      })
    },
    horizontal: {
      type: Boolean,
      default: true
    },
    selectedKey: String,
    collapsable: Boolean,
    renderContent: {
      type: Function,
      default: (h, data) => {
        return data.label;
      }
    },
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String]
  }
};
</script>

<style lang="scss">
@import "../../styles/orgChart";
</style>
