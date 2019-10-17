import Vue from "vue";
import App from "./App";
import axios from "axios";
import "./modules/config";
import router from "./router";
import filters from "./filters";
import store from "./store/index";
Vue.config.productionTip = false;
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
(Vue.prototype.$axios = axios), (window.$Vue = Vue), (window.Router = router);

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  mounted() {
    document.dispatchEvent(new Event("render-event"));
  }
});
