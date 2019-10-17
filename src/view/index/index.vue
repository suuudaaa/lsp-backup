<template>
  <el-row class="ancestors">
    <header-example :power="power"></header-example>
    <el-col :span="24" class="content-container">
      <aside class="sidebar-container" :class="{ 'sidebar-change': isSideBar === true }">
        <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical"
          background-color="#fff"
          text-color="#7E8C9B"
          active-text-color="#12BD7B"
        >
          <el-menu-item index="/data" v-if="menuPower.data">
            <i class="icon iconfont iconzuocelan-zongcaikanban-xuanzhong data-icon"></i>
            <span slot="title">Boss</span>
          </el-menu-item>

          <el-menu-item index="/main" v-if="menuPower.business">
            <i class="icon iconfont icondingwei"></i>
            <span slot="title">Business</span>
          </el-menu-item>

          <el-menu-item index="/report" v-if="menuPower.report">
            <i class="icon iconfont iconzuocelan-baobiaokanban-xuanzhong report-icon"></i>
            <span slot="title">Report</span>
          </el-menu-item>

          <el-menu-item index="/help">
            <i class="icon iconfont iconzuocelan-bangzhuzhongxin-xuanzhong help-icon"></i>
            <span slot="title">Help</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <el-main class="main-container">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>
import HeaderExample from "@/components/header";
export default {
  components: { HeaderExample },
  data() {
    return {
      power: "0",
      menuPower: {},
      sidebarChange: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getUserPower();
      this.getMenuPower();
    },
    getMenuPower() {
      this.menuPower = JSON.parse(
        window.localStorage.getItem("lsp_menu_power")
      );
    },
    getUserPower() {
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.power = userInfo.power;
    },
    sidebarChangeFun() {
      this.sidebarChange = !this.sidebarChange;
    }
  },
  computed: {
    isSideBar() {
      return this.$store.state.hiddenSideBar;
    }
  }
};
</script>

<style scoped lang="scss">
.ancestors {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .content-container {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0px;
    overflow: hidden;
    .sidebar-container {
      // display: none;
      text-align: center;
      ul {
        display: inline-block;
        height: 100%;
        border-right: 0px !important;
        padding-top: 20px;
        li {
          position: relative;
          width: 80px;
          height: 80px;
          line-height: 110px;
          margin-bottom: 16px;
          padding: 0px !important;
          // padding-top: 30px;
          text-align: center;
          i {
            position: absolute;
            font-size: 24px;
            display: block;
            left: 50%;
            margin-left: -12px;
            top: 28px;
            line-height: 1px;
          }
          .data-icon {
            font-size: 28px;
            margin-left: -14px;
          }
          .report-icon {
            font-size: 32px;
            margin-left: -16px;
          }
          .help-icon {
            font-size: 30px;
            margin-left: -15px;
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
    .main-container {
      padding: 0;
      z-index: 1;
      flex: 1;
      background: rgba(238, 241, 246, 1);
      overflow-y: auto;
    }
    .sidebar-change {
      flex: 0 0 0px;
      width: 0px;
      opacity: 0;
      animation: sidebar-change 0.3s;
      -webkit-animation: sidebar-change 0.3s;
    }
  }
}

@keyframes sidebar-change {
  0% {
    flex: 0 0 120px;
    opacity: 0.9;
  }
  10% {
    flex: 0 0 108px;
    opacity: 0.8;
  }
  20% {
    flex: 0 0 96px;
    opacity: 0.7;
  }
  30% {
    flex: 0 0 84px;
    opacity: 0.6;
  }
  40% {
    flex: 0 0 72px;
    opacity: 0.5;
  }
  50% {
    flex: 0 0 60px;
    opacity: 0.4;
  }
  60% {
    flex: 0 0 48px;
    opacity: 0.3;
  }
  70% {
    flex: 0 0 36px;
    opacity: 0.2;
  }
  80% {
    flex: 0 0 24px;
    opacity: 0.1;
  }
  90% {
    flex: 0 0 12px;
    opacity: 0;
  }
  100% {
    flex: 0 0 0px;
  }
}
</style>