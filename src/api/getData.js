import axios from "axios";
import QS from "qs";
import { get, post, post1 } from "./ajax";

// 获取业务看台下入库数据
export const getCustomerOrder = p => post("/business/getTotalInExpectedQty", p);
//  获取业务看台出库数据
export const getCustomerOutOrder = p =>
  post("/business/getTotalOutExpectedQty", p);
//  库内品牌数
export const getGoodsBrandNumber = p =>
  post("/business/getGoodsBrandNumber", p);
// 库内规格型号数
export const getGoodsModelNumber = p =>
  post("/business/getGoodsModelNumber", p);
// 库内品牌
export const goodsBrandListModel = p =>
  post("/business/GoodsBrandListModel", p);
// 品牌详情
export const getGoodsBrandDetailTotal = p =>
  post("/business/getGoodsBrandDetailTotal", p);
// 品牌详情走势图
export const getGoodsBrandDetailTrend = p =>
  post("/business/getGoodsBrandDetailTrend", p);
// 品牌详情2
export const getGoodsBrandDetailGoodsModel = p =>
  post("/business/getGoodsBrandDetailGoodsModel", p);
// 库内规格型号
export const getGoodsModelList = p => post("/business/getGoodsModelList", p);
// 规格型号详情
export const getGoodsModelDetailTotal = p =>
  post("/business/getGoodsModelDetailTotal", p);
// 规格型号详情---走势图
export const getGoodsModelDetailTrend = p =>
  post("/business/getGoodsModelDetailTrend", p);
// 入库详情-入库货物数量、入库品牌数、入库规格型号数
export const getInBoundNumberInfo = p =>
  post("/business/getInBoundNumberInfo", p);
// 入库详情-入库货物品牌
export const getInBoundGoodsBrandInfo = p =>
  post("/business/getInBoundGoodsBrandInfo", p);
// 入库详情-入库货物规格
export const getInBoundGoodsModelInfo = p =>
  post("/business/getInBoundGoodsModelInfo", p);
// 出库详情-出库货物数量、出库品牌数、出库规格型号数
export const getOutBoundNumberInfo = p =>
  post("/business/getOutBoundNumberInfo", p);
//  出库详情-出库货物品牌
export const getOutBoundGoodsBrandInfo = p =>
  post("/business/getOutBoundGoodsBrandInfo", p);
// 出库详情-出库货物规格
export const getOutBoundGoodsModelInfo = p =>
  post("/business/getOutBoundGoodsModelInfo", p);
// 搜索总数
export const selResult = p => post("/business/selResult", p);
// 搜索结果-品牌-品牌列表--ok
export const selGoodsBrandList = p => post("/business/selGoodsBrandList", p);
// 搜索结果-规格型号-规格型号列表
export const selGoodsModelList = p => post("/business/selGoodsModelList", p);
// 搜索结果-规格型号-订单表
export const selOrderList = p => post("/business/selOrderList", p);
// 入库订单列表-ok
export const inOrderList = p => post("/inOrder/list", p);
// 入库订单详情
export const inOrderDetail = p => post("/inOrder/detail", p);
// 入库订单货物明细
export const inOrderGetGoodsDetailInfo = p =>
  post("/inOrder/getGoodsDetailInfo", p);
// 入库订单附件
export const inOrderGetBsrcdFiles = p => post("/inOrder/getBsrcdFiles", p);
// 出库订单列表
export const outOrderList = p => post("/outOrder/list", p);
//  出库订单详情
export const outOrderDetail = p => post("/outOrder/detail", p);
// 出库订单货物明细
export const outOrderGetGoodsDetailInfo = p =>
  post("/outOrder/getGoodsDetailInfo", p);
// 出库订单附件
export const outOrderGetBsrcdFiles = p => post("/outOrder/getBsrcdFiles", p);
// 今日入库货数
export const getTotalInExpectedQty = () =>
  post("/business/getTotalInExpectedQty");
// 今日出库货数
export const getTotalOutExpectedQty = () =>
  post("/business/getTotalOutExpectedQty");
// 库内品牌数
export const getGoodsBrandNum = () => post("/business/getGoodsBrandNumber");
// 库内规格型号数
export const getGoodsModelNum = () => post("/business/getGoodsModelNumber");

// ===============================
//入库报表
export const getInOrderReport = p => post1("/inOrderReport/list", p);
//出库报表
export const getOutofstockReport = p => post1("/outOrderReport/list", p);
// export const getOutofstockReport1 = p => get("/user/getAll", p);
//库存报表
export const getInventoryStatement = p => post1("/stockReport/list", p);
//库存溯源报表
export const getInvTraStatement = p => post1("/stockSource/list", p);
//收发货溯源报表
export const getReceiveAndSendGoodsReport = p => post1("/sourceQuery/list", p);

// ==================================

// 账号登陆
export const accountLogin = p => post("/user/checkLogin", p);

// 文件 导出
export const fileOut = (url, params) => {
  return axios.request({
    url: url,
    method: "post",
    data: QS.stringify(params),
    // responseType: "blob"
    responseType: "ms-stream"
  });
};

// export const exportInOrderReport = p => fileOut('/server2/inOrderReport/exportInOrderReport?',p)

// 获取个人信息
export const userInfo = p => post("/user/getUserCenterInfo", p);
// 创建管理员
export const createM = p => post("/user/createManager", p);
// 查询成员列表 管理员
export const mList = p => post("/user/getAllManager", p);
// 查询成员列表 公司员工 or 部门员工
export const uList = p => post("/user/getAllUser", p);
//获取货主列表
export const getH = p => post("/permission/getAllCustomer", p);
// 获取成员信息 管理员
export const getMemberInfo = p => post("/user/getUserInfo", p);
// 删除成员 管理员
export const delM = p => post("/user/delUserInfo", p);
//编辑成员
export const editMember = p => post("/user/createManager", p);
//获取组织架构
export const getCompanyStructure = p => post("/company/getCompanyStructure", p);
// 检查重名
export const checkName = p => post("/user/checkExistUser", p);
//获取公司品牌列表
export const companyBrand = p => post("/company/getGoodsBrandList", p);

//获取组织架构选中的下级部门
export const subDepartment = p => post("/company/getFirstRole", p);
//编辑部门 or 公司
export const editDepartment = p => post("/permission/updateRole", p);
// 创建公司员工 编辑同理
export const createU = p => post("/user/createUser", p);
//员工编辑页面获取所有部门
export const getRole = p => post("/permission/getAllRole", p);

//获取 客户列表 客户分配
export const companyCustomer = p => post("/permission/getAllShipper", p);
//获取 品牌分配
export const getBrand = p => post("/permission/getAllGoodsBrand", p);
//获取 权限管理分配
export const getMenu = p => post("/permission/getAllMenu", p);

/////////////////////////////////////////////////////

//getCountMapForInBoundOrder
export const getIn = p => post("/president/getCountMapForInBoundOrder", p);
//getCountMapForInBoundOrder
export const getOut = p => post("/president/getCountMapForOutBoundOrder", p);

//getUnfinishOrderHour
export const orderTime = p => post("/president/getUnfinishOrderHour", p);
//getIsWorryOrderNumber
export const orderState = p => post("/president/getIsWorryOrderNumber", p);
//库龄
export const stockAge = p => post("/president/getGoodsAgeMap", p);
//库内货物周转率
export const stockWeek = p => post("/president/getTurnoverRate", p);
//地图
export const getMap = p => post("/president/getGoodsMap", p);
//库内货物数量
export const getGoodsQty = p => post("/president/getStockGoodsQty", p);
//获取部门信息
export const getCompanyInfo = p => post("/company/getCompanyRoleFirstInfo", p);

//个人中心 编辑资料
export const editUserInfo = p => post("/user/updateUserInfo", p);


