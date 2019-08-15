/*
状态对象
 */
const state = {
  customerOrderData:[],
  loadingState:false,
  moreData:true,//更多数据
  nothingData:false,//没有更多数据
  orderTotalNumber:0,
  orderPageSize:8,
  orderPageNum:0,
  orderRequireParams:{}
}

export default state;
