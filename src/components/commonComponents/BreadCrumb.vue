<template>
  <div class="bread-crumb">
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
        <a :href="item.path == ''?'/':item.path">{{item.title}}</a>
        <!-- <span @click="jump(item)">{{item.title}}</span> -->
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
// 需要在使用面包屑的路由的子路由中配置meta
export default {
  data() {
    return {
      levelList: null,
      breadList: []
    };
  },
  methods: {
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb() {
      let matched = this.$route.meta.bread.filter(item => item.title);
      const first = matched[0];
      this.levelList = matched;
    },
    jump(item) {
      let url = item.path;
      this.$router.push({ path: url });
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
};
</script>
<style>
</style>


