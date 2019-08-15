import Vue from "vue";
import Router from "vue-router";
const index = r =>
  require.ensure([], () => r(require("@/components/index/index")), "index");
const main = r =>
  require.ensure([], () => r(require("@/view/stock/index")), "main");
const data = r =>
  require.ensure([], () => r(require("@/components/data")), "data");
const report = r =>
  require.ensure([], () => r(require("@/components/report")), "report");
const help = r =>
  require.ensure([], () => r(require("@/components/help")), "help");
// 业务看板
const inOrder = r =>
  require.ensure([], () => r(require("@/components/main/inOrder")), "inOrder");
const outOrder = r =>
  require.ensure([], () => r(require("@/components/main/outOrder")), "outOrder");
const brands = r =>
  require.ensure([], () => r(require("@/components/main/brands")), "brands");
const specsType = r =>
  require.ensure([], () => r(require("@/components/main/specsType")), "specsType");
const specsDetail = r =>
  require.ensure([], () => r(require("@/components/main/specsDetail")), "specsDetail");
const brandsDetail = r =>
  require.ensure([], () => r(require("@/components/main/brandsDetail")), "brandsDetail");
const orderDetail = r =>
  require.ensure([], () => r(require("@/components/main/orderDetail")), "orderDetail");


Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: index,
      name:'业务看板',
      meta:[{title:'业务看板'}],
      children: [
        {
          path: "/",
          component: main,
          name:'业务看板',
          meta:[{title:'业务看板'}],
          props:true,
        },
        {
          path: "/main",
          name:'业务看板',
          meta:[{title:'业务看板'}],
          component: main,
          props:true,
          // children:[
          //   {
          //     path:'/orderDetail',
          //     component:orderDetail,
          //     name:'订单详情'
          //   }
          // ]
        },
        // 业务看板下
        {
          path:'/inOrder',
          component:inOrder,
          name:'入库详情',
          meta:[{title:'库存看台', path:'/main'},{title:'入库详情'}]
        },
        {
          path:'/outOrder',
          component:outOrder,
          name:'出库详情',
          meta:[{title:'库存看台', path:'/main'},{title:'出库详情'}]
        },
        {
          path:'/brands',
          component:brands,
          name:'库内货物品牌',
          meta:[{title:'库存看台', path:'/main'},{title:'库内货物品牌'}]
        },
        {
          path:'/specsType',
          component:specsType,
          name:'库内货物规格型号',
          meta:[{title:'库存看台', path:'/main'},{title:'库内货物规格型号'}]
        },
        {
          path:'/specsDetail',
          component:specsDetail,
          name:'规格型号详情',
          meta:[{title:'库存看台', path:'/main'},{title:'规格型号详情'}]
        },
        {
          path:'/brandsDetail',
          component:brandsDetail,
          name:'品牌详情',
          meta:[{title:'库存看台', path:'/main'},{title:'品牌详情'}]
        },
        {
          path:'/orderDetail',
          component:orderDetail,
          name:'订单详情',
          meta:[{title:'库存看台', path:'/main'},{title:'订单详情'}]
        },
        {
          path: "data",
          component: data
        },
        {
          path: "report",
          component: report
        },
        {
          path: "help",
          component: help
        },
        
      ]
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
