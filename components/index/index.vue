<template>
  <div class="container">
    <el-row class="indexContainer">
      <HeaderExample></HeaderExample>
      <el-col :span="24" class="contentContainer">
        <!--nav bvegin-->
        <aside class="sidebarContainer">
          <el-menu
            :router="true"
            :default-active="$route.path"
            class="el-menu-vertical"
            background-color="#fff"
            text-color="#7E8C9B"
            active-text-color="#12BD7B"
          >
            <el-menu-item index="/index/main">
              <i class="el-icon-location"></i>
              <span slot="title">业务看板</span>
            </el-menu-item>
<!-- :class="{ 'footerDivSelect': $route.name === 'index' || $route.name === 'default'}" -->
            <el-menu-item index="/index/data">
              <i class="el-icon-menu"></i>
              <span slot="title">总裁看板</span>
            </el-menu-item>
            <el-menu-item index="/index/report">
              <i class="el-icon-document"></i>
              <span slot="title">报表看板</span>
            </el-menu-item>
            <el-menu-item index="/index/help">
              <i class="el-icon-setting"></i>
              <span slot="title">帮助中心</span>
            </el-menu-item>
          </el-menu>
        </aside>
        <!--nav end-->
        <!--content begin-->
        <el-main class="mainContainer">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view />
              </transition>
            </el-col>
          </div>
        </el-main>
        <!--content end-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderExample from "@/components/header/index.vue";
export default {
  components: { HeaderExample },
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.indexContainer {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .contentContainer {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0px;
    overflow: hidden;
    .mainContainer {
      flex: 1;
      background: rgba(238, 241, 246, 1);
      overflow-y: auto;
      .content-wrapper {
        box-sizing: border-box;
        padding: 32px;
      }
    }
    .sidebarContainer {
      flex: 0 0 120px;
      width: 120px;
      ul {
        height: 100%;
        border-right: 0px !important;
        padding: 20px 20px 0px 20px;
        li {
          position: relative;
          width: 80px;
          height: 80px;
          line-height: 110px;
          margin-bottom: 16px;
          padding: 0px !important;
          padding-top: 30px;
          text-align: center;
          i {
            position: absolute;
            font-size: 24px;
            display: block;
            left: 50%;
            margin-left: -12px;
            top: 18px;
          }
          span {
            margin-top: 30px;
            font-size: 14px;
          }
        }
        .is-active {
          background: rgba(238, 241, 246, 1) !important;
        }
      }
    }
  }
}
</style>