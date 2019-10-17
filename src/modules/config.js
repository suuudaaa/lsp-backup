import Vue from "vue";

// 全局通用样式
import "../assets/css/base.css";

// 字体图标
import "../assets/iconfont/iconfont.css";

// axios

import axios from "axios";
Vue.prototype.$http = axios;

//element-ui
import ElementUI from "element-ui";
// 改变主题颜色
import "../assets/theme/index.css";
Vue.use(ElementUI);
//echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

//vuescroll引入
import vuescroll from "vuescroll/dist/vuescroll-native";

//ie11兼容
import "babel-polyfill";
//全局自定义指令
import "./directive";


//cookies
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.prototype.$cookies.clear = function() {
  let keys = Vue.prototype.$cookies.keys();
  keys.forEach(key => {
    this.remove(key);
  });
};

// md5

import md5 from 'md5'

Vue.prototype.md5 = md5

Vue.config.productionTip = false;
