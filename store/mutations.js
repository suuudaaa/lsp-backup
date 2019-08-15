/*
直接更新state的多个方法的对象
 */

 const mutations = {
  getCustomerOrderData(state,payload){
    state.customerOrderData = payload;
  },
  updateOrderPage(state,payload){
    state.orderPageNum = payload
  },
  updateOrderRequireParams(state,payload){
    state.orderRequireParams = payload
    console.log(payload)
  },
  updateLoadingState(state,payload){
    state.loadingState = payload
  },
 }
 export default mutations;
