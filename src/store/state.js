/*
状态对象
 */
const state = {
  token: "", //token信息
  userInfo: "", //用户信息
  customerOrderData: [], //看台入库信息
  outCustomerOrderData: [], //看台出库信息
  loadingState: false,
  moreData: false, //更多数据
  nothingData: false, //没有更多数据
  isData: true, //初始是否有数据
  orderTotalNumber: null,
  orderPageSize: 8,
  orderPageNum: 0,
  orderRequireParams: {}, //入库参数
  outOrderRequireParams: {}, //出库参数
  formLableData: [], //报表筛选项
  orderTotal: 0,
  hiddenSideBar: false,
  getInData: null,
  getOutData: null,
  orderTimeData: null,
  orderStateData: null,
  stockAgeData: null,
  getMapData: null
};

export default state;
