import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default {
  init() {
    let mock = new MockAdapter(axios);
    mock.onGet("/stockTotal").reply(200, {
      code: 1001,
      msg: "请求成功",
      data: [
        {
          name: "今日入库货数",
          num: 5955211,
          icon: "iconkucunkantai-rukushu",
          path: "/inOrder"
        },
        {
          name: "今日出库货数",
          num: 729422,
          icon: "iconkucunkantai-chukushu",
          path: "/outOrder"
        },
        {
          name: "库内品牌数",
          num: 675,
          icon: "iconkucunkantai-pinpai",
          path: "/brands"
        },
        {
          name: "库内规格型号数",
          num: 4251,
          icon: "iconkucunkantai-guigexinghao",
          path: "/species"
        }
      ]
    });
    mock.onPost("/brandTypeData").reply(200, {
      code: 1001,
      msg: "请求成功",
      data: [
        {
          name: "MAYA",
          typeNum: 5955211,
          boxNum: 24,
          goodsNum: 2465768787,
          shows: true
        },
        { name: "MAYA", typeNum: 5955211, boxNum: 24, goodsNum: 2465768787 },
        { name: "MAYA", typeNum: 5955211, boxNum: 24, goodsNum: 2465768787 },
        { name: "MAYA", typeNum: 5955211, boxNum: 24, goodsNum: 2465768787 },
        { name: "MAYA", typeNum: 5955211, boxNum: 24, goodsNum: 2465768787 }
      ]
    });
    mock.onPost("/brandTypeData1").reply(200, {
      code: 1001,
      msg: "请求成功",
      data: [
        { name: "MAYA", typeNum: "发光二极管", boxNum: 24 },
        { name: "ODJFKD", typeNum: "发光二极管", boxNum: 24 },
        { name: "MAYA", typeNum: "发光二极管", boxNum: 24 },
        { name: "SGFGHGH", typeNum: "发光二极管", boxNum: 24 },
        { name: "MAYA", typeNum: "发光二极管", boxNum: 24 }
      ]
    });
    //
    const pwdData = [
      { prePwd: "1233", newPwd: "" },
      { prePwd: "123333", newPwd: "" },
      { prePwd: "123", newPwd: "12345" }
    ];
    mock.onPost("/change").reply(config => {
      let { prePwd, newPwd } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let pwd = null;
        setTimeout(() => {
          let hasPwd = pwdData.some(p => {
            if (p.prePwd === prePwd && p.newPwd === newPwd) {
              pwd = JSON.parse(JSON.stringify(p));
              pwd.newPwd = undefined;
              return true;
            }
            if (hasPwd) {
              resolve([200, { code: 200, msg: "success", pwd }]);
            } else {
              resolve([200, { code: 500, msg: "密码修改有误" }]);
            }
          });
        }, 500);
      });
    });
    mock.onPost("/orderInfo").reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // isnormal 1是加急，2是异常，3是正常
          resolve([
            200,
            {
              code: 200,
              msg: "success",
              data: {
                isNormal: 1,
                curDate: "2019-06-13",
                cusInfo: [
                  [
                    { name: "顾客公司", value: "OPPO" },
                    { name: "客户单号", value: "BWI19042345556" },
                    { name: "货物箱数", value: "42" },
                    { name: "货物件数", value: "236764857" }
                  ],
                  [
                    { name: "顾客公司", value: "OPPO" },
                    { name: "客户单号", value: "BWI19042345556" },
                    { name: "货物箱数", value: "42" },
                    { name: "货物件数", value: "236764857" }
                  ],
                  [
                    { name: "顾客公司", value: "OPPO" },
                    { name: "客户单号", value: "BWI19042345556" },
                    { name: "货物箱数", value: "42" },
                    { name: "货物件数", value: "236764857" }
                  ],
                  [
                    { name: "顾客公司", value: "OPPO" },
                    { name: "客户单号", value: "BWI19042345556" },
                    { name: "货物箱数", value: "42" },
                    { name: "货物件数", value: "236764857" }
                  ]
                ],
                stage: [
                  { name: "入仓申报", date: "2019-04-12", useTime: "23" },
                  { name: "货物出库" }
                ],
                useTotalTime: "3小时13分钟"
              }
            }
          ]);
        }, 500);
      });
    });
    mock.onPost("/kuneipinpai").reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // isnormal 1是加急，2是异常，3是正常
          resolve([
            200,
            {
              code: 200,
              msg: "success",
              data: {
                dataTitle: ["规格型号", "货物名称", "货物数量"]
              }
            }
          ]);
        }, 500);
      });
    });
    mock.onPost("/shaixuanshuju").reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // isnormal 1是加急，2是异常，3是正常
          resolve([
            200,
            {
              code: 200,
              msg: "success",
              ret: 0,
              data: {
                pageNum: 2,
                pageSize: 10,
                rows: [
                  {
                    orderTypeStatus: "加急出库", //异常订单状态，加急、异常、正常
                    totalBoxQty: 40, //货物箱数
                    amount: 12650,
                    billNo: "BWI1908140070",
                    currencyName: "USD",
                    customerBillNo: "BWI1908140070",
                    inRepType: "一般入库",
                    orderStatus: 40,
                    orderStatusName: "入仓申报(待放行)",
                    orderPreStatusName: "货物出库", //上一步进度
                    currentSpendTime: "23分钟", //当前阶段花费时间
                    totalSpendTime: "3小时13分钟", //订单总耗时
                    orderTime: "2019-08-14",
                    thAddress: "香港特别行政区 新界 元朗区 洪水橋石埗路5號A座",
                    thDian: "華際國際有限公司",
                    updateTime: "2019-08-16 16:12:53"
                  }
                ],
                total: 283
              }
            }
          ]);
        }, 500);
      });
    });
    mock.onPost("/orderInfo1").reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // isnormal 1是加急，2是异常，3是正常
          resolve([
            200,
            {
              code: 200,
              msg: "success",
              ret: 0,
              data: {
                amount: 61173,
                billNo: "BWI1908120020",
                currencyName: "USD",
                customerBillNo: "9101307513&15&16/PO01119070143&82 S&D",
                customerName: "ASIACOM TECHNOLOGY LIMITED",
                customerRemark:
                  "UPE-00713016 6件（1木板） GH CSSPM1.24-4T2U-1-0-350-R18 按折扣价0.285入仓",
                inRepType: "一般入库",
                items: [
                  {
                    boxQty: 6,
                    brand: "OSRAM",
                    goodsName: "发光二极管",
                    goodsNumber: "8541401000",
                    goodsPlace: "中国",
                    model: "GW JDSTS2.EM-H3H6-XX51-1-65-C-R33",
                    number: 1,
                    quantity: 30000,
                    unit: "PCS"
                  },
                  {
                    boxQty: 0,
                    brand: "OSRAM",
                    goodsName: "发光二极管",
                    goodsNumber: "8541401000",
                    goodsPlace: "马来西亚",
                    model: "GH CSSPM1.24-4T2U-1-0-350-R18",
                    number: 2,
                    quantity: 131400,
                    unit: "PCS"
                  },
                  {
                    boxQty: 0,
                    brand: "OSRAM",
                    goodsName: "发光二极管",
                    goodsNumber: "8541401000",
                    goodsPlace: "马来西亚",
                    model: "GH CSSPM1.24-4T2U-1-0-350-R18",
                    number: 3,
                    quantity: 80400,
                    unit: "PCS"
                  }
                ],
                orderStatus: 110,
                orderStatusLog: [
                  {operationTime: "2019-08-13 09:28:05",orderStatusName: "货物入库完成"},
                  {orderStatusName: "货物已登记", operationTime: "2019-08-12 22:52:41"},
                  {orderStatusName: "入仓申报(已放行)", operationTime: "2019-08-12 17:42:51"},
                  {orderStatusName: "入仓申报(待放行)", operationTime: "2019-08-12 17:42:12"},
                  {orderStatusName: "仓库指令生效", operationTime: "2019-08-12 15:04:57"},
                  {orderStatusName: "仓库已接单", operationTime: "2019-08-12 15:03:00"},
                  {orderStatusName: "订单已受理", operationTime: "2019-08-12 13:54:56"}
                ],
                orderStatusName: "货物入库完成",
                orderTime: "2019-08-12",
                supplyName: "OSRAM OPTO SEMICONDUCTORS (CHINA) CO. LTD",
                thAddress: "香港 香港  沙田坳背灣街26 - 28號富騰工業中心1樓2室",
                thContactName: "李晓怡 /LIVIA LEE",
                thDian: "烨溢科技（香港）有限公司",
                thTelephone: "＋852-31658763 ",
                thTime: "2019-08-12 16:30:24",
                totalAmt: 61173,
                totalBoxQty: 6,
                totalNetWeight: 72.002,
                totalQty: 241800,
                totalWeight: 96.38
              }
            }
          ]);
        }, 500);
      });
    });
  }
};
