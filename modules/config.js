import Vue from 'vue'



// 全局通用样式
import '../assets/css/base.css'

// 字体图标
import '../assets/iconfont/iconfont.css'

// axios

import axios from 'axios'
Vue.prototype.$http = axios

//element-ui
import ElementUI from 'element-ui';
// 改变主题颜色
import '../assets/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//filters

// mock数据

import  Mock from '../mock/index'
Mock.init()

//全局自定义指令

import './directive'


//loding
import VueLazyload from 'vue-lazyload'
import loading from '../assets/img/loading.gif'
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
    loading
 })

//cookies
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.prototype.$cookies.clear = function () {
    let keys = Vue.prototype.$cookies.keys()
    keys.forEach(key => {
        this.remove(key)
    });
}

// md5

// import md5 from 'js-md5'

// Vue.prototype.md5 = md5

Vue.config.productionTip = false