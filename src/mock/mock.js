import Mock from "mockjs";
Mock.setup({
  timeout: 800
});
// 获取 mock.Random 对象
// 引入mockjs
import { Random } from "mockjs";
//业务看台左上卡片数据数据
Mock.mock("/tableData", getData);
Mock.mock("/stockTotal", "get", {
  code: 1001,
  data: [
    {
      name: "今日入库数", // 随机生成中文人名
      "num|10000-100000": Random.natural(),
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
  ],
  msg: "success"
});
//品牌型号表格数据
Mock.mock("/brandTypeData", "post", {
  code: 0,
  "data|4-8": [
    {
      "name|2": "@CNAME", // 随机生成中文人名
      "typeNum|5-8": Random.natural(),
      "boxNum|2-3": Random.natural(),
      "goodsNum|7-9": Random.natural(),
      shows: Random.boolean()
    }
  ],
  msg: "success"
});
//规格型号表格数据
Mock.mock("/brandTypeData1", "post", {
  code: 0,
  "data|4-8": [
    {
      "name|3": "@CNAME", // 随机生成中文人名
      typeNum: "发光二极管",
      "boxNum|2-3": Random.natural(),
      shows: Random.boolean(1, 9, true),
      recent: Random.boolean(1, 9, false)
    }
  ],
  msg: "success"
});
//订单搜索结果表格数据
Mock.mock("/orderResult", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    "data|16": [
      {
        name: "顾客公司",
        value: Random.cname()
      },
      { name: "客户单号", value: Random.character() },
      { name: "货物箱数", value: Random.natural() },
      { name: "货物箱数", value: Random.natural(7) },
      { name: "供应商", value: Random.string() },
      { name: "包含规格", value: 32 },
      { name: "出库时间", value: "暂无" },
      { name: "物流单号", value: "暂无" }
    ],
    stage: [
      { name: "入仓申报", date: "2019-04-12", useTime: "23" },
      { name: "货物出库" }
    ]
  },
  msg: "success"
});

Random.extend({
  constellation: function(date) {
    var constellations = ["加急", "异常", "一般"];
    return this.pick(constellations);
  }
});

Mock.mock("/data2", "get", {
  code: Random.natural(0, 3), //随机自然数
  data: {
    customerNb: Random.string(13), // 随机字符串
    currencyType: Random.constellation(), //随机数组
    name: "@CNAME", //随机人名
    orderAmount: Random.float(60, 100, 3, 5), //随机浮点数
    adress: Random.region(), //随机区域
    totalQty: Random.natural(1000, 99999), //随机自然数
    connect: /^1[385][1-9]\d{8}/, //随机电话
    goodQty: Random.natural(100, 999),
    baoguan: /^1[385][1-9]\d{8}/,
    constellation: Random.string(13)
  },
  msg: "success"
});
//业务看台筛选卡片
Mock.mock("/orderInfo","post",{
  code: Random.natural(0, 3), //随机自然数
  data: {
    customerNb: Random.string(13), // 随机字符串
    currencyType: Random.constellation(), //随机数组
    name: "@CNAME", //随机人名
    orderAmount: Random.float(60, 100, 3, 5), //随机浮点数
    adress: Random.region(), //随机区域
    totalQty: Random.natural(1000, 99999), //随机自然数
    connect: /^1[385][1-9]\d{8}/, //随机电话
    goodQty: Random.natural(100, 999),
    baoguan: /^1[385][1-9]\d{8}/,
    constellation: Random.string(13)
  },
  msg: "success"
})


//库内货物页面数据
Mock.mock("/kuneihuowuguige", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    data: getkunei(),
    title: ["货物规格型号", "规格数", "箱数", "库存数量", "今日入库"]
  },
  msg: "success"
});
//库内品牌页面数据
Mock.mock("/kuneihuowupinpai", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    data: getkunei(),
    title: ["货物品牌", "规格数", "箱数", "库存数量", "今日入库"]
  },
  msg: "success"
});
//订单详情之订单详情数据
Mock.mock("/orderDetail1", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    baseInfo: [],
    data: getkunei(),
    title: ["货物品牌", "规格数", "箱数", "库存数量", "今日入库"]
  },
  msg: "success"
});
//订单详情之货物明细
Mock.mock("/orderDetail2", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    title: ["货物品牌", "规格数", "箱数", "库存数量", "今日入库"]
  },
  msg: "success"
});
//订单详情之下载
Mock.mock("/orderDetail3", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    title: ["货物品牌", "规格数", "箱数", "库存数量", "今日入库"]
  },
  msg: "success"
});
//入库详情
Mock.mock("/StorageDetails", "post", {
  code: 0,
  data: {
    title: [
      { name: "入库货物数量", num: "5955212" },
      { name: "入库品牌数", num: "58" },
      { name: "入库规格型号数", num: "5955" }
    ]
  },
  msg: "success"
});
// 报表筛选项
Mock.mock("/getReportScreenList", "post", {
  code: 0,
  data: {
    title: [
      { name: "订单类型", options: ['加急','异常','正常'] },
      { name: "订单状态",options: ['仓库已接单','订单已受理','一般入库']},
      { name: "系统订单" },
      { name: "客户单号" },
      { name: "货主" },
      { name: "规格型号" },
      { name: "商品名称" },
      { name: "供应商" },
      { name: "商品名称" },
      { name: "供应商" },
      { name: "商品品牌" },
      { name: "报关单号" },
      { name: "DATE CODE" },
      { name: "BIN/CAT CODE" },
      { name: "BIN CODE2" },
      { name: "HS编码" },
      { name: "客户要求" },
    ]
  },
  msg: "success"
});
//报表
Mock.mock("/getReportSettingList", "post", {
  code: 0,
  data: {
    title: [
      { name: "入库日期" },
      { name: "货主"},
      { name: "客户单号" },
      { name: "规格型号" },
      { name: "单位" },
      { name: "入库数量" },
      { name: "商品名称" },
      { name: "品牌" },
      { name: "HS编码" },
      { name: "原产地" },
      { name: "供应商" },
      { name: "系统订单号" },
      { name: "入库报关单号" },
      { name: "DATE CODE" },
      { name: "BIN/CAT CODE" },
      { name: "BIN CODE2" },
      { name: "客户要求" },
    ]
  },
  msg: "success"
});
//品牌详情信息
Mock.mock("/getBrandDetailInfo","post",{
  code:0,
  data:{
    header:[
      {name:'在库数量',value:'599345'},
      {name:'可用数量',value:'48'}
    ],
    info:[
      {name:'规格数',value:'32'},
      {name:'总金额',value:'54793020'},
      {name:'总毛重',value:255769809},
      {name:'总净重',value:3465778},
      {name:'总箱数',value:6433}
    ]
  },
  msg:'success'
})
//规格型号详情
Mock.mock("/getSpeDetailInfo",'post',{
  code:0,
  data:{
    header:[
      {name:'在库数量',value:5955312},
      {name:'可用数量',value:48},
      {name:'今日入库',value:3479},
      {name:'今日出库',value:42551}
    ],
    info:[
      {name:'货物品牌',value:'OSRAM'},
      {name:'单位',value:'PCS'},
      {name:'无聊名称',value:'发光二极管'},
      {name:'总金额',value:212568},
      {name:'总箱数',value:6324},
      {name:'总毛重',value:3546678},
      {name:'总净重',value:3546767}
    ]
  },
  msg:'success'
})

// 订单搜索结果
Mock.mock("/getOrderResult","post",{
  code:0,
  total:50,
  data:[
    {name:'OPPO'}
  ]
})

const reportSetting = ['货主','规格型号','商品名称','批次号','CAT/BIN']
const reportSetting1 = ['货主','规格型号','商品名称','批次号','CAT&BIN','库存数量']
const reportSetting2 = ['订单类型','货主','客户单号','收发货日期','规格型号','收发货数量',
  '品牌','供应商','DATE CODE','LOT ID','PACKAGE ID','BIN/CAT CODE']
const reportScreen = ['系统单号','客户单号','货主','规格型号','商品名称','货物库龄',
  '供应商','商品品牌',]
const reportScreen1 = ['订单类型','系统单号','客户单号','货主','规格型号','品牌','供应商',
 '原产地','LOT ID','DATE CODE','PACKAGE ID','BIB/CAT CODE']
function getkunei() {
  let articles = [];
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      "speType|12-23": Random.character("upper"),
      speNum: Random.natural(),
      boxNum: Random.natural(),
      "stockNum|1000-10000": Random.natural(),
      "inStock|100-10000": Random.natural()
    };

    articles.push(newArticleObject);
  }
  return {
    articles: articles
  };
}

function getData() {
  let articles = [];

  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )

      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码

      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名

      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };

    articles.push(newArticleObject);
  }
  return {
    articles: articles
  };
}
//报表表格数据
Mock.mock("/getTableData", "post", {
  code: 0,
  data: {
    isNormal: 1,
    curDate: "2019-06-13",
    data: getTableData(),
    title: [
      {label:"订单类型","columnNum":9,prop:'orderType'},
      {label:"订单状态","columnNum":4,prop:'orderStatus'},
      {label:"货主","columnNum":5,prop:'shipper'},
      {label:"客户单号","columnNum":2,prop:'customerNb'},
      {label:"规格型号","columnNum":3,prop:'speType'},
      {label:"单位","columnNum":6,prop:'coinUnit'},
      {label:"入库数量","columnNum":8,prop:'inOrderNum'},
      {label:"商品名称","columnNum":7,prop:'commodity'},
      {label:"品牌","columnNum":1,prop:'brands'},
      {label:"品牌打发打发","columnNum":10,prop:'add1'},
      {label:"增加2","columnNum":11,prop:'add2'},
      {label:"增加2","columnNum":12,prop:'add3'},
      {label:"增加3","columnNum":13,prop:'add4'},
      {label:"增加4","columnNum":14,prop:'add5'},
    ]
  },
  msg: "success"
});
function getTableData() {
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      orderType: "@CONSTELLATION",
      orderStatus: "仓库已接单",
      shipper: Random.cname()+'1124', // Random.cname() 随机生成一个常见的中文姓名
      customerNb: "BWI190346768",
      speType: "BWI190385986",
      coinUnit: "CNY",
      inOrderNum:Random.float(100,1000),
      commodity: Random.cname(),
      brands: "世强",
      add1:Random.cname(),
      add2:Random.cname(),
      add3:Random.cname(),
      add4:Random.cname(),
      add5:Random.cname(),
      // add1:Random.cname(),
    };

    articles.push(newArticleObject);
  }
  return {
    articles: articles
  };
}
