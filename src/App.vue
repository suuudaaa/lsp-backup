<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import "./assets/css/base.css";
body {
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "SourceHanSansCN-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: transparent !important;
  z-index: 1;
}
.el-tabs__nav-wrap:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: transparent !important;
  z-index: 1;
}
.el-table td,
.el-table th {
  padding: 12px 12px;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}

.seizeSeatInput {
  display: block;
  height: 0px;
  width: 0px;
}
</style>

<style lang="sass">
@import "./assets/scss/media.scss";
</style>