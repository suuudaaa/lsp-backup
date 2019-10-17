import orgChart from "./orgChart";

const install = Vue => {
  if (install.installed) {
    return;
  }

  install.installed = true;

  Vue.component(orgChart.name, orgChart);
};

orgChart.install = install;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(orgChart);
}

export default orgChart;
