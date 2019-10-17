/*
直接更新state的多个方法的对象
 */
const mutations = {
  updateToken(state, payload) {
    state.token = payload;
  }, //更新token
  updateUserInfo(state, payload) {
    state.userInfo = payload;
  },
  getCustomerOrderData(state, payload) {
    state.customerOrderData = payload;
  },
  outGetCustomerOrderData(state, payload) {
    state.outCustomerOrderData = payload;
  },
  updateOrderPage(state, payload) {
    state.orderPageNum = payload;
  },
  updateOrderRequireParams(state, payload) {
    state.orderRequireParams = payload;
  }, //入库参数
  updateOutOrderRequireParams(state, payload) {
    state.outOrderRequireParams = payload;
  }, //出库参数
  updateLoadingState(state, payload) {
    state.loadingState = payload;
  },
  updateOrderTotalNumber(state, payload) {
    state.orderTotalNumber = payload;
  },
  updateNothingData(state, payload) {
    state.nothingData = payload;
  },
  updateMoreData(state, payload) {
    state.moreData = payload;
  },
  updateIsData(state, payload) {
    state.isData = payload;
  },
  updateTotalNum(state, payload) {
    state.orderTotal = payload;
  },
  updateHiddenSideBar(state, payload) {
    state.hiddenSideBar = payload;
  },
  updateInData(state, payload) {
    state.getInData = payload;
  },
  updateOutData(state, payload) {
    state.getOutData = payload;
  },
  updateOrderTime(state, payload) {
    state.orderTimeData = payload;
  },
  updateOrderState(state, payload) {
    state.orderStateData = payload;
  },
  updateStockAgeData(state, payload) {
    state.stockAgeData = payload;
  },
  updateMapData(state, payload) {
    state.getMapData = payload;
  }
};
export default mutations;
