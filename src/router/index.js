import Vue from "vue";
import Router from "vue-router";

const index = r =>
  require.ensure([], () => r(require("@/view/index")), "index");
const main = r => require.ensure([], () => r(require("@/view/stock")), "main");
const data = r => require.ensure([], () => r(require("@/view/data")), "data");
const report = r =>
  require.ensure([], () => r(require("@/view/report")), "report");
const help = r => require.ensure([], () => r(require("@/view/help")), "help");

const customerDetails = r =>
  require.ensure(
    [],
    () => r(require("@/view/data/customerDetails")),
    "customerDetails"
  );

const power = r =>
  require.ensure([], () => r(require("@/view/power")), "power");
const admin = r =>
  require.ensure([], () => r(require("@/view/power/oneLevel/admin")), "admin");
const company = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/oneLevel/company")),
    "company"
  );
const department = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/oneLevel/department")),
    "department"
  );

const adminMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/admin/member")),
    "adminMember"
  );
const adminOrg = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/admin/org")),
    "adminOrg"
  );
const adminEditMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/admin/editMember")),
    "adminEditMember"
  );
const adminAddMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/admin/addMember")),
    "adminAddMember"
  );

const companyOrg = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/org")),
    "companyOrg"
  );
const companyMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/member")),
    "companyMember"
  );
const companyCustomer = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/customer")),
    "companyCustomer"
  );
const companyBrand = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/brand")),
    "companyBrand"
  );
const companyEditMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/editMember")),
    "companyEditMember"
  );
const companyAddMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/addMember")),
    "companyAddMember"
  );

const companyEditDepartment = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/company/editDepartment")),
    "companyEditDepartment"
  );

const departmentOrg = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/org")),
    "departmentOrg"
  );
const departmentManage = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/manage")),
    "departmentManage"
  );
const departmentMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/member")),
    "departmentMember"
  );
const departmentCustomer = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/customer")),
    "departmentCustomer"
  );
const departmentBrand = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/brand")),
    "departmentBrand"
  );
const departmentAddMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/addMember")),
    "departmentAddMember"
  );
const departmentEditMember = r =>
  require.ensure(
    [],
    () => r(require("@/view/power/secondLevel/department/editMember")),
    "departmentEditMember"
  );

const user = r => require.ensure([], () => r(require("@/view/user")), "user");
const unitTest = r =>
  require.ensure([], () => r(require("@/view/unitTest")), "unitTest");
const changePass = r =>
  require.ensure(
    [],
    () => r(require("@/view/user/changePass.vue")),
    "changePass"
  );

// 业务看板
const inOrder = r =>
  require.ensure([], () => r(require("@/components/main/inOrder")), "inOrder");
const outOrder = r =>
  require.ensure(
    [],
    () => r(require("@/components/main/outOrder")),
    "outOrder"
  );
const brands = r =>
  require.ensure([], () => r(require("@/components/main/brands")), "brands");
const specsType = r =>
  require.ensure(
    [],
    () => r(require("@/components/main/specsType")),
    "specsType"
  );
const specsDetail = r =>
  require.ensure(
    [],
    () => r(require("@/components/main/specsDetail")),
    "specsDetail"
  );
const brandsDetail = r =>
  require.ensure(
    [],
    () => r(require("@/components/main/brandsDetail")),
    "brandsDetail"
  );
const orderDetail = r =>
  require.ensure(
    [],
    () => r(require("@/components/main/orderDetail")),
    "orderDetail"
  );
// 搜索
const orderSearchResult = r =>
  require.ensure(
    [],
    () => r(require("@/components/search/orderSearchResult")),
    "orderSearchResult"
  );
const orderSearchTable = r =>
  require.ensure(
    [],
    () => r(require("@/components/search/orderSearchTable")),
    "orderSearchTable"
  );
// 登陆
const login = r =>
  require.ensure([], () => r(require("@/view/login/index")), "login");
const forgetPass = r =>
  require.ensure([], () => r(require("@/view/login/forgetPass")), "forgetPass");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/data",
      component: index,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "data",
          name: "data",
          component: data,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "main",
          name: "业务看板",
          meta: { requireAuth: true, bread: [{ title: "业务看板" }] },
          component: main
        },
        // 业务看板下
        {
          path: "/inOrder",
          component: inOrder,
          name: "入库详情",
          meta: {
            requireAuth: true,
            bread: [{ title: "库存看台", path: "/main" }, { title: "入库详情" }]
          }
        },
        {
          path: "/outOrder",
          component: outOrder,
          name: "出库详情",
          meta: {
            bread: [{ title: "库存看台", path: "/main" }, { title: "出库详情" }]
          }
        },
        {
          path: "/brands",
          component: brands,
          name: "库内货物品牌",
          meta: {
            bread: [
              { title: "库存看台", path: "/main" },
              { title: "库内货物品牌" }
            ]
          }
        },
        {
          path: "/specsType",
          component: specsType,
          name: "库内货物规格型号",
          meta: {
            bread: [
              { title: "库存看台", path: "/main" },
              { title: "库内货物规格型号" }
            ]
          }
        },
        {
          path: "/specsDetail",
          component: specsDetail,
          name: "规格型号详情",
          meta: {
            bread: [
              { title: "库存看台", path: "/main" },
              { title: "规格型号详情" }
            ]
          }
        },
        {
          path: "/brandsDetail",
          component: brandsDetail,
          name: "品牌详情",
          meta: {
            bread: [{ title: "库存看台", path: "/main" }, { title: "品牌详情" }]
          }
        },
        {
          path: "/orderDetail",
          component: orderDetail,
          name: "订单详情",
          meta: {
            bread: [{ title: "库存看台", path: "/main" }, { title: "订单详情" }]
          }
        },
        // search
        {
          path: "/orderSearchResult",
          component: orderSearchResult,
          name: "搜索",
          meta: {
            bread: [{ title: "库存看台", path: "/main" }, { title: "库存搜索" }]
          }
        },
        {
          path: "/orderSearchTable",
          component: orderSearchTable,
          name: "搜索"
        },
        {
          path: "data/customerDetails",
          name: "customerDetails",
          component: customerDetails
        },
        {
          path: "report",
          component: report,
          meta: {
            requireAuth: true
          },
          name: "报表看板"
        },
        {
          path: "help",
          component: help,
          name: "帮助中心",
          meta: {
            requireAuth: true
          }
        },
        {
          path: "power",
          component: power,
          children: [
            {
              path: "/power/admin",
              name: "powerAdmin",
              component: admin,
              children: [
                {
                  path: "/power/admin/member",
                  name: "adminMember",
                  component: adminMember,
                  meta: {
                    requireAuth: true
                  }
                },
                {
                  path: "/power/admin/org",
                  name: "adminOrg",
                  component: adminOrg,
                  meta: {
                    requireAuth: true
                  }
                },
                {
                  path: "/power/admin/editMember",
                  name: "adminEditMember",
                  component: adminEditMember,
                  meta: {
                    requireAuth: true,
                    bread: [
                      { title: "管理员成员", path: "/power/admin/member" },
                      { title: "管理员成员编辑" }
                    ]
                  }
                },
                {
                  path: "/power/admin/addMember",
                  name: "adminAddMember",
                  component: adminAddMember,
                  meta: {
                    requireAuth: true,
                    bread: [
                      { title: "管理员成员", path: "/power/admin/member" },
                      { title: "添加超级管理员" }
                    ]
                  }
                }
              ]
            },
            {
              path: "/power/company",
              name: "powerCompany",
              component: company,
              children: [
                {
                  path: "/power/company/org",
                  name: "companyOrg",
                  meta: {
                    requireAuth: true
                  },
                  component: companyOrg
                },
                {
                  path: "/power/company/member",
                  name: "companyMember",
                  meta: {
                    requireAuth: true
                  },
                  component: companyMember
                },
                {
                  path: "/power/company/customer",
                  name: "companyCustomer",
                  meta: {
                    requireAuth: true
                  },
                  component: companyCustomer
                },
                {
                  path: "/power/company/brand",
                  name: "companyBrand",
                  meta: {
                    requireAuth: true
                  },
                  component: companyBrand
                },
                {
                  path: "/power/company/editMember",
                  name: "companyEditMember",
                  component: companyEditMember,
                  meta: {
                    requireAuth: true,
                    bread: [
                      { title: "员工管理", path: "/power/company/member" },
                      { title: "员工编辑" }
                    ]
                  }
                },
                {
                  path: "/power/company/addMember",
                  name: "companyAddMember",
                  component: companyAddMember,
                  meta: {
                    requireAuth: true,
                    bread: [
                      { title: "员工管理", path: "/power/company/member" },
                      { title: "添加员工" }
                    ]
                  }
                },
                {
                  path: "/power/company/editDepartment",
                  name: "companyEditDepartment",
                  component: companyEditDepartment,
                  meta: {
                    requireAuth: true,
                    bread: [
                      { title: "组织架构", path: "/power/company/org" },
                      { title: "部门编辑" }
                    ]
                  }
                }
              ]
            },
            {
              path: "/power/department",
              name: "powerDepartment",
              component: department,
              children: [
                {
                  path: "/power/department/org",
                  name: "departmentOrg",
                  component: departmentOrg
                },
                {
                  path: "/power/department/manage",
                  name: "departmentManage",
                  component: departmentManage
                },
                {
                  path: "/power/department/member",
                  name: "departmentMember",
                  component: departmentMember
                },
                {
                  path: "/power/department/customer",
                  name: "departmentCustomer",
                  component: departmentCustomer
                },
                {
                  path: "/power/department/brand",
                  name: "departmentBrand",
                  component: departmentBrand
                },
                {
                  path: "/power/department/addMember",
                  name: "departmentAddMember",
                  component: departmentAddMember,
                  meta: {
                    bread: [
                      { title: "员工管理", path: "/power/department/member" },
                      { title: "添加员工" }
                    ]
                  }
                },
                {
                  path: "/power/department/EditMember",
                  name: "departmentEditMember",
                  component: departmentEditMember,
                  meta: {
                    bread: [
                      { title: "员工管理", path: "/power/department/member" },
                      { title: "员工编辑" }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          path: "user",
          name: "user",
          component: user
        },
        {
          path: "unitTest",
          name: "unitTest",
          component: unitTest
        },
        {
          path: "changePass",
          name: "changePass",
          component: changePass
        }
      ]
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/forget",
      component: forgetPass
    },
    { path: "*", redirect: "/data" }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
