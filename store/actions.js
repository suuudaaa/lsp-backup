/*
通过mutation间接更新state的多个方法的对象
 */
import { getCustomerOrder } from "../api/getData";
const actions = {
  // 获取业务看台入库、出库、一站通数据
  implementGetCusOrderData(context,params) {
    if(params == ''){
      params = context.state.orderRequireParams;
    }
    console.log(context.state.orderPageNum)
    console.log(JSON.stringify(params))
    getCustomerOrder(params).then(res => {
      context.commit('updateLoadingState',false)
      console.log("滚动后的数据");
      console.log(JSON.stringify(res));
      if (res.code == 200) {
        var datas = res.data.data;
        context.commit({
          type: 'getCustomerOrderData',
          datas
        });
        context.state.loadingState = false;
        console.log(context.state.customerOrderData)
      }
    });
  },
  // 下拉刷新
  pullRefreshing(context) {
    // context.dispatch("implementGetCusOrderData");
    console.log("滚动不滚动，要滚动不");
    let scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0,
      scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    let windowHeight = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    let scollY = scrollTop + windowHeight - scrollHeight;
    let pullRefreshss = true;
    // let scollY = scrollTop + windowHeight - scrollHeight;
    // 把下拉刷新置为false，防止多次请求
    if (scollY >= -50) {
      // if (context.state.orderPageNum > context.state.orderTotalNumber) {
      //   context.state.nothingData = true;
      //   context.state.moreData = false;
      //   return false;
      // }
      // if (!pullRefreshss) {
      //   return false;
      // }
      // // 模拟ajax请求
      // console.log("下拉刷新数据");
      // context.dispatch("implementGetCusOrderData");
      // pullRefreshss = false;
      // // 加页码数
      // context.state.orderPageNum++;
      context.dispatch("implementGetCusOrderData");
    } else {
      // 其他时候把下拉刷新置为true
      pullRefreshss = true;
    }
    console.log(scrollY);

    if (
      document.documentElement.scrollTop + window.innerHeight ==
      document.body.offsetHeight
    ) {
      if (context.state.orderPageNum > context.state.orderTotalNumber) {
        context.state.nothingData = true;
        context.state.moreData = false;
        return;
      } else {
        context.state.orderPageNum++;
        context.state.loadingState = true;
        context.state.nothingData = false;
        context.state.moreData = true;
        context.dispatch("implementGetCusOrderData");
      }
    }
  }
};

export default actions;
