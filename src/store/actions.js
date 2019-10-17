/*
通过mutation间接更新state的多个方法的对象
 */
import { inOrderList, outOrderList } from "@/api/getData";
import { toThousands } from "@/modules/common";
const actions = {
  // 获取业务看台入库数据
  implementGetCusOrderData(context, params) {
    if (params == "") {
      params = context.state.orderRequireParams;
    }
    context.commit('updateTotalNum',0);
    // console.log("nothingData", context.state.nothingData);
    if (context.state.orderTotalNumber == null) {
      inOrderList(params)
        .then(res => {
          context.commit("updateNothingData", false);
          context.commit("updateMoreData", false);
          context.commit("updateIsData", true);
          context.commit("updateLoadingState", false);
          if (res.ret == 0) {
            let totalPage = res.data.total;
            let num = Math.ceil(totalPage / 20);
            let arr = res.data.rows;
            let datas = arr.map((item, index) => {
              item.totalBoxqty = toThousands(item.totalBoxqty);
              item.expectedQty = toThousands(item.expectedQty);
              if (item.orderStatusTrailList.length != 0) {
                item.orderStatusTrailList = item.orderStatusTrailList.map(
                  (item1, idx) => {
                    if (item1.trailTime) {
                      item1.trailTime = item1.trailTime.substring(0, 16);
                    }
                    return item1;
                  }
                );
              }
              return item;
            });
            context.commit("updateOrderTotalNumber", num);
            context.commit("updateTotalNum", totalPage);
            if (num > 1) {
              context.commit("updateMoreData", true);
            } else {
              context.commit("updateNothingData", true);
            }

            if (datas.length == 0) {
              context.commit("updateIsData", false);
            } else {
              context.commit("updateIsData", true);
            }
            context.commit({
              type: "getCustomerOrderData",
              datas
            });
          } else {
            context.commit("updateIsData", false);
          }
        })
        .catch(err => {
          console.log(err);
          context.commit("updateIsData", false);
        });
    } else {
      // console.log(
      //   "context.state.orderTotalNumber",
      //   context.state.orderTotalNumber
      // );
      if (params.page > context.state.orderTotalNumber) {
        // console.log("nothingData2", context.state.nothingData);
        context.commit("updateNothingData", true);
        context.commit("updateMoreData", false);
        context.commit("updateLoadingState", false);
        return;
      } else {
        inOrderList(params)
          .then(res => {
            context.commit("updateIsData", true);
            context.commit("updateLoadingState", false);
            if (res.ret == 0) {
              if (params.page >= context.state.orderTotalNumber) {
                context.commit("updateNothingData", true);
                context.commit("updateMoreData", false);
              }
              let arr = res.data.rows;
              arr = arr.map((item, index) => {
                item.totalBoxqty = toThousands(item.totalBoxqty);
                item.expectedQty = toThousands(item.expectedQty);
                if (item.orderStatusTrailList.length != 0) {
                  item.orderStatusTrailList = item.orderStatusTrailList.map(
                    (item1, idx) => {
                      if (item1.trailTime) {
                        item1.trailTime = item1.trailTime.substring(0, 16);
                      }
                      return item1;
                    }
                  );
                }
                return item;
              });
              let totalPage = res.data.total;
              context.commit("updateTotalNum", totalPage);
              let arr1 = context.state.customerOrderData.datas;
              let datas = arr.concat(arr1);
              context.commit({
                type: "getCustomerOrderData",
                datas
              });
            } else {
              context.commit("updateIsData", false);
            }
          })
          .catch(err => {
            console.log(err);
            context.commit("updateIsData", false);
          });
      }
    }
  },
  // 获取业务看台出库数据
  implementGetOutOrderData(context, params) {
    if (params == "") {
      params = context.state.outOrderRequireParams;
    }
    context.commit('updateTotalNum',0);

    // console.log("nothingData", context.state.nothingData);
    if (context.state.orderTotalNumber == null) {
      outOrderList(params)
        .then(res => {
          context.commit("updateLoadingState", false);
          context.commit("updateNothingData", false);
          context.commit("updateMoreData", false);
          context.commit("updateIsData", true);
          if (res.ret == 0) {
            let totalPage = res.data.total;
            let num = Math.ceil(totalPage / 20);
            context.commit("updateTotalNum", totalPage);
            context.commit("updateOrderTotalNumber", num);
            let arr = res.data.rows;
            let data = arr.map((item, index) => {
              item.totalBoxqty = toThousands(item.totalBoxqty);
              item.expectedQty = toThousands(item.expectedQty);
              if (item.orderStatusTrailList.length != 0) {
                item.orderStatusTrailList = item.orderStatusTrailList.map(
                  (item1, idx) => {
                    if (item1.trailTime) {
                      item1.trailTime = item1.trailTime.substring(0, 16);
                    }
                    return item1;
                  }
                );
              }
              return item;
            });
            if (num > 1) {
              context.commit("updateMoreData", true);
            } else {
              // console.log("nothingData3", context.state.nothingData);
              context.commit("updateNothingData", true);
            }
            if (data.length == 0) {
              context.commit("updateIsData", false);
            } else {
              context.commit("updateIsData", true);
            }
            context.commit({
              type: "outGetCustomerOrderData",
              data
            });
          } else {
            context.commit("updateIsData", false);
          }
        })
        .catch(err => {
          console.log(err);
          context.commit("updateIsData", false);
        });
    } else {
      if (params.page > context.state.orderTotalNumber) {
        // console.log("nothingData4", context.state.nothingData);
        context.commit("updateNothingData", true);
        context.commit("updateMoreData", false);
        context.commit("updateLoadingState", false);
        return;
      }
      outOrderList(params)
        .then(res => {
          context.commit("updateIsData", true);
          context.commit("updateLoadingState", false);
          if (res.ret == 0) {
            let arr = res.data.rows;
            if (params.page >= context.state.orderTotalNumber) {
              context.commit("updateNothingData", true);
              context.commit("updateMoreData", false);
            }
            arr = arr.map((item, index) => {
              item.totalBoxqty = toThousands(item.totalBoxqty);
              item.expectedQty = toThousands(item.expectedQty);
              if (item.orderStatusTrailList.length != 0) {
                item.orderStatusTrailList = item.orderStatusTrailList.map(
                  (item1, idx) => {
                    if (item1.trailTime) {
                      item1.trailTime = item1.trailTime.substring(0, 16);
                    }
                    return item1;
                  }
                );
              }
              return item;
            });
            let arr1 = context.state.outCustomerOrderData.data;
            let data = arr.concat(arr1);
            let totalPage = res.data.total;
            context.commit("updateTotalNum", totalPage);
            context.commit({
              type: "outGetCustomerOrderData",
              data
            });
          } else {
            context.commit("updateIsData", false);
          }
        })
        .catch(err => {
          console.log(err);
          context.commit("updateIsData", false);
        });
    }
  }
};

export default actions;
