<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/base.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
</style>
