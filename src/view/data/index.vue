<template>
  <div class="container">
    <el-row class="firstLine">
      <el-col :span="6">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="eventDiv" @click="goReport1"></div>
          <water-canvas :data="canvas1"></water-canvas>
          <water-canvas :data="canvas2"></water-canvas>
          <div class="titleBox">
            <span>入库订单概况</span>
          </div>
          <div class="dataBox">
            <div class="leftDataBox">
              <span class="dataValue">{{inStock.allData|intFormat}}</span>
              <span class="dataName">入库订单</span>
            </div>
            <div class="rightDataBox">
              <span class="dataValue">{{inStock.todayData|intFormat}}</span>
              <span class="dataName">今日完成</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="eventDiv" @click="goReport2"></div>
          <water-canvas :data="canvas3"></water-canvas>
          <water-canvas :data="canvas4"></water-canvas>
          <div class="titleBox">
            <span>出库订单概况</span>
          </div>
          <div class="dataBox dataBox2">
            <div class="leftDataBox">
              <span class="dataValue2">{{outStock.allData|intFormat}}</span>
              <span class="dataName">出库订单</span>
            </div>
            <div class="rightDataBox2">
              <!-- <div class="theLine"></div> -->
              <span class="dataValue2">{{outStock.todayData|intFormat}}</span>
              <span class="dataName">今日完成</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="titleBox">
            <span>未完成订单持续时间</span>
          </div>
          <div id="barChart1"></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="titleBox">
            <span>未完成订单状态</span>
          </div>
          <div id="barChart2"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="secondLine lineChartComponents" v-if="true===false">
      <el-col :span="24">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <lineChartExample :title="'库内货物数量'" :data="lineChartData" v-if="isCharts"></lineChartExample>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="theThirdLine">
      <el-col :span="12">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="titleBox">
            <span>库内货物库龄</span>
          </div>
          <div id="pieChart"></div>

          <div class="pieItems">
            <el-tooltip
              v-for="(item,index) in pieItemsData"
              :key="index"
              :content="item.value+'%'"
              :value="tooltipItems[index]"
              :manual="true"
              popper-class="diyTooltip"
              placement="top-end"
            >
              <div
                class="pieItem"
                @mouseout="mouseoutPie(item.index)"
                @mouseover="mouseoverPie(item.index)"
                :class="{pieActive:pieActive==item.index}"
              >
                <span class="pieItemTitle">{{item.title}}</span>
                <div class="pieItemBox">
                  <span
                    class="pieItemValue"
                    :style="{ background: item.color, width: item.value + '%' }"
                  ></span>
                </div>
              </div>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card
          class="box-card"
          :body-style="cardDefaultStyle"
          shadow="hover"
          v-loading="stockWeekLoading"
        >
          <div class="titleBox">
            <span>库内货物周转率</span>
          </div>
          <div id="gaugeChart1"></div>
          <div id="gaugeChart2"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="fourth" v-show="1==2">
      <el-col :span="24">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <div class="fourthLeft">
            <div class="titleBox">
              <span>交易总览</span>
            </div>

            <div class="fourthDataBox">
              <div class="fourthDataLine"></div>
              <div class="fourthData">
                <span class="fourthDataName">人民币交易总额</span>

                <span class="fourthDataValue">{{4655653|intFormat}}</span>
              </div>

              <div class="fourthData">
                <span class="fourthDataName">近7日人民币交易额</span>
                <span class="fourthDataValue">{{4564544|intFormat}}</span>
              </div>
            </div>

            <div class="fourthDataBox">
              <div class="fourthData">
                <span class="fourthDataName">美金交易总额</span>
                <span class="fourthDataValue">{{6667655|intFormat}}</span>
              </div>

              <div class="fourthData">
                <span class="fourthDataName">近7日人民币交易额</span>
                <span class="fourthDataValue">{{5556744|intFormat}}</span>
              </div>
            </div>
          </div>

          <el-radio-group
            class="lineChartRadio"
            v-model="trendActive"
            size="small"
            text-color="#12BD7B"
            fill="#D0F2E5"
            @change="selectTrend"
          >
            <el-radio-button label="人民币"></el-radio-button>
            <el-radio-button label="美元"></el-radio-button>
          </el-radio-group>
          <div class="titleBox">
            <span>交易走势</span>
          </div>

          <div id="trendChart1" class="trendController" :class="{trendActive:trendActive=='人民币'}"></div>
          <div id="trendChart2" class="trendController" :class="{trendActive:trendActive=='美元'}"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mapBox">
      <el-col :span="24">
        <el-card class="box-card" :body-style="cardDefaultStyle" shadow="hover">
          <!-- <el-radio-group
            class="mapRadio"
            v-model="mapActive"
            size="small"
            text-color="#12BD7B"
            fill="#D0F2E5"
            @change="selectMap"
          >
            <el-radio-button label="收发货点"></el-radio-button>
            <el-radio-button label="货物数量"></el-radio-button>
            <el-radio-button label="货物金额"></el-radio-button>
          </el-radio-group>-->

          <div id="lineMap" class="mapContainer" :class="{mapActive:mapActive=='收发货点'}"></div>
          <div id="hotAreaMap1" class="mapContainer" :class="{mapActive:mapActive=='货物数量'}"></div>
          <div id="hotAreaMap2" class="mapContainer" :class="{mapActive:mapActive=='货物金额'}"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="customerTitle" v-show="1==2">
      <el-col :span="24">顾客列表(8)</el-col>
    </el-row>
    <el-row class="customerContainer" v-show="1==2">
      <el-col :span="6" :key="index" v-for="(item,index) in 8">
        <el-card
          class="box-card customer-box"
          :body-style="cardDefaultStyle"
          @click.native="goDet()"
          shadow="hover"
        >
          <span class="brandName">OPPO</span>
          <div class="brandOrder">
            <div class="brandOrderBox">
              <span class="brandOrderName">进行中订单</span>
              <span class="brandOrderValue">{{1100|intFormat}}</span>
            </div>
            <div class="brandOrderBox">
              <span class="brandOrderName">累积订单</span>
              <span class="brandOrderValue">{{56530|intFormat}}</span>
            </div>
          </div>
          <div class="brandMoney">
            <div class="moneyBox RMB">
              <span class="moneyName">
                <span>近7日人民币交易额</span>
                <div class="trendDiv">
                  <span>7%</span>
                </div>
              </span>
              <span class="moneyValue">{{44545360|intFormat}}</span>
            </div>
            <div class="moneyBox dollar">
              <span class="moneyName">
                <span>7日美金交易额</span>
                <div class="trendDiv">
                  <span>0.1%</span>
                </div>
              </span>
              <span class="moneyValue">{{8686564544|intFormat}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "echarts/extension/bmap/bmap";
import loadBMap from "@/components/map";
import geoCoordData from "@static/data/map/geoCoord.json";
import lineChartExample from "@/components/lineChart";
import waterCanvas from "@/view/data/waterCanvas";
import {
  getIn,
  getOut,
  orderTime,
  orderState,
  stockAge,
  stockWeek,
  getMap,
  getGoodsQty
} from "@/api/getData";

export default {
  components: { lineChartExample, waterCanvas },
  data() {
    return {
      //apiBegin
      inStock: {
        todayData: 0,
        allData: 0
      },
      outStock: {
        todayData: 0,
        allData: 0
      },

      //not order data
      notOrderData: {
        countIn8_24: 0,
        countLess8: 0,
        countLarge24: 10
      },
      //apiEnd
      canvas1: {
        canvasId: "canvas1",
        sp: 0,
        value: 0 //todo
      },
      canvas2: {
        canvasId: "canvas2",
        sp: 2,
        value: 0
      },
      canvas3: {
        canvasId: "canvas3",
        sp: 0,
        value: 0
      },
      canvas4: {
        canvasId: "canvas4",
        sp: 2,
        value: 0
      },

      lineChartData: [[], [], [], [], {}], //折线data
      pieActive: 5,
      trendActive: "人民币",
      trendChart1: {},
      trendChart2: {},
      mapActive: "收发货点",
      lineMap: {},
      hotAreaMap1: {},
      hotAreaMap2: {},
      cardDefaultStyle: {
        padding: 0
      },

      tooltipItems: [false, false, false, false, false],
      pieItemsData: [], //库龄
      // pieItemsData: [
      //   { index: 0, value: 40, name: "30%", title: "3天", color: "#13C2C3" },
      //   { index: 1, value: 40, name: "10%", title: "7天", color: "#3B7EE5" },
      //   { index: 2, value: 10, name: "50%", title: "一个月", color: "#0DA7CB" },
      //   { index: 3, value: 5, name: "15%", title: "半年", color: "#ED9D1B" },
      //   { index: 4, value: 5, name: "5%", title: "半年以上", color: "#FF4D4F" }
      // ],
      colorArr: ["#13C2C3", "#3B7EE5", "#0DA7CB", "#ED9D1B", "#FF4D4F"],

      GZData: [], //map data
      // GZData: [
      //   [{ name: "东莞" }, { name: "东莞", value: 95 }]
      // ],
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#f3f3f3"
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              color: "#fdfdfd"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "label",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999"
            }
          }
        ]
      },
      isCharts: false, //控制渲染
      stockWeekLoading: false
    };
  },
  mounted() {
    this.initInData();
    this.initOutData();
    this.initOrderTime();
    this.initOrderState();
    this.initStockAge();
    this.initMapData();
    this.stockWeekFun(); //库周
    this.initTrendChart1(); //next
    if (true == false) this.getGoodsQtyFun(); //折线
  },
  methods: {
    initMapData() {
      if (this.$store.state.getMapData) {
        let data = this.$store.state.getMapData;
        this.GZData = data;
        this.initFirstMap();
      } else if (window.localStorage.getItem("lsp_map_data")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_map_data"));
        this.GZData = data;
        this.initFirstMap();
      } else {
        getMap()
          .then(res => {
            if (res.ret == "0") {
              let data = JSON.parse(res.data);
              // console.log("-map--data--:", data);
              let result = new Array();
              data.forEach((item, i) => {
                if (
                  item.cityName != "-" &&
                  item.cityName != "新界" &&
                  item.cityName != "九龙半岛" &&
                  item.cityName != "香港岛" &&
                  item.cityName != "中国" &&
                  item.cityName != "广东省" &&
                  i <= 10
                ) {
                  let arr = new Array();
                  let begin = new Object();
                  let end = new Object();
                  begin.name = "东莞";
                  end.name = item.cityName.replace("市", "");
                  end.value = 100;
                  arr.push(begin);
                  arr.push(end);
                  result.push(arr);
                }
              });
              this.GZData = result;
              this.initFirstMap();
            } else {
              if (window.console) console.log("stockWeek error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    initStockAge() {
      if (this.$store.state.stockAgeData) {
        let data = this.$store.state.stockAgeData;
        this.initPieChart(data.stockAgeData);
        this.pieItemsData = data.pieItemsData;
      } else if (window.localStorage.getItem("lsp_stock_age")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_stock_age"));
        this.initPieChart(data.stockAgeData);
        this.pieItemsData = data.pieItemsData;
      } else {
        stockAge()
          .then(res => {
            let data = JSON.parse(res.data);
            if (res.ret == "0") {
              let result = [
                {
                  index: 0,
                  value: data.storageAge3,
                  name: data.storageAge3 + "%",
                  title: "3天",
                  color: this.colorArr[0]
                },
                {
                  index: 1,
                  value: data.storageAge7,
                  name: data.storageAge7 + "%",
                  title: "7天",
                  color: this.colorArr[1]
                },
                {
                  index: 2,
                  value: data.storageAge30,
                  name: data.storageAge30 + "%",
                  title: "一个月",
                  color: this.colorArr[2]
                },
                {
                  index: 3,
                  value: data.storageAge180,
                  name: data.storageAge180 + "%",
                  title: "半年",
                  color: this.colorArr[3]
                },
                {
                  index: 4,
                  value: data.storageAge180Up,
                  name: data.storageAge180Up + "%",
                  title: "半年以上",
                  color: this.colorArr[4]
                }
              ];

              this.pieItemsData = [
                {
                  index: 0,
                  value: data.storageAge3,
                  name: data.storageAge3 + "%",
                  title: "3天",
                  color: this.colorArr[0]
                },
                {
                  index: 1,
                  value: data.storageAge7,
                  name: data.storageAge7 + "%",
                  title: "7天",
                  color: this.colorArr[1]
                },
                {
                  index: 2,
                  value: data.storageAge30,
                  name: data.storageAge30 + "%",
                  title: "一个月",
                  color: this.colorArr[2]
                },
                {
                  index: 3,
                  value: data.storageAge180,
                  name: data.storageAge180 + "%",
                  title: "半年",
                  color: this.colorArr[3]
                },
                {
                  index: 4,
                  value: data.storageAge180Up,
                  name: data.storageAge180Up + "%",
                  title: "半年以上",
                  color: this.colorArr[4]
                }
              ];
              this.initPieChart(result);
            } else {
              if (window.console) console.log("stockAge error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    initOrderState() {
      if (this.$store.state.orderStateData) {
        let data = this.$store.state.orderStateData;
        this.initBarChart2(data);
      } else if (window.localStorage.getItem("lsp_order_state")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_order_state"));
        this.initBarChart2(data);
      } else {
        orderState()
          .then(res => {
            if (res.ret == "0") {
              let data = JSON.parse(res.data);
              let total = parseInt(data[0].number) + parseInt(data[1].number);
              let result = [
                {
                  value: data[0].number,
                  percentage: this.GetPercent(data[0].number, total)
                },
                {
                  value: data[1].number,
                  percentage: this.GetPercent(data[1].number, total)
                }
              ];
              this.initBarChart2(result);
            } else {
              if (window.console) console.log("orderStateData error");
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      }
    },
    initOrderTime() {
      if (this.$store.state.orderTimeData) {
        let data = this.$store.state.orderTimeData;
        this.initBarChart1(data);
      } else if (window.localStorage.getItem("lsp_order_time")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_order_time"));
        this.initBarChart1(data);
      } else {
        orderTime()
          .then(res => {
            if (res.ret == "0") {
              let data = JSON.parse(res.data);
              // console.log("orderTime data begin:", data);
              let total =
                data.countIn8_24 + data.countLarge24 + data.countLess8;

              let result = [
                {
                  value: data.countIn8_24,
                  percentage: this.GetPercent(data.countIn8_24, total)
                },
                {
                  value: data.countLarge24,
                  percentage: this.GetPercent(data.countLarge24, total)
                },
                {
                  value: data.countLess8,
                  percentage: this.GetPercent(data.countLess8, total)
                }
              ];
              this.initBarChart1(result);
            } else {
              if (window.console) console.log("orderTimeData error");
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      }
    },
    initOutData() {
      if (this.$store.state.getOutData) {
        let data = this.$store.state.getOutData;
        this.outStock.todayData = data.todayCount;
        this.outStock.allData = data.allCount;
        this.canvas3.value = data.percentage;
        this.canvas4.value = data.percentage;
      } else if (window.localStorage.getItem("lsp_out_data")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_out_data"));
        this.outStock.todayData = data.todayCount;
        this.outStock.allData = data.allCount;
        this.canvas3.value = data.percentage;
        this.canvas4.value = data.percentage;
      } else {
        getOut()
          .then(res => {
            if (res.ret == "0") {
              let data = JSON.parse(res.data);
              this.outStock.todayData = data.todayCount;
              this.outStock.allData = data.allCount;
              let percentage = this.GetPercent(data.todayCount, data.allCount);
              (this.canvas3.value = percentage * 0.01),
                (this.canvas4.value = percentage * 0.01);
            } else {
              if (window.console) console.log("getOutData error");
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      }
    },
    initInData() {
      if (this.$store.state.getInData) {
        let data = this.$store.state.getInData;
        this.inStock.todayData = data.todayCount;
        this.inStock.allData = data.allCount;
        this.canvas1.value = data.percentage;
        this.canvas2.value = data.percentage;
      } else if (window.localStorage.getItem("lsp_in_data")) {
        let data = JSON.parse(window.localStorage.getItem("lsp_in_data"));
        this.inStock.todayData = data.todayCount;
        this.inStock.allData = data.allCount;
        this.canvas1.value = data.percentage;
        this.canvas2.value = data.percentage;
      } else {
        getIn()
          .then(res => {
            if (res.ret == "0") {
              // console.log("@@@@@@@@@ res:", res.data);
              let data = JSON.parse(res.data);
              this.inStock.todayData = data.todayCount;
              this.inStock.allData = data.allCount;
              let percentage = this.GetPercent(data.todayCount, data.allCount);
              (this.canvas1.value = percentage * 0.01),
                (this.canvas2.value = percentage * 0.01);
            } else {
              if (window.console) console.log("getInData error");
            }
          })
          .catch(err => {
            if (window.console) console.log(err);
          });
      }
    },
    getGoodsQtyFun() {
      getGoodsQty()
        .then(res => {
          if (res.ret == "0") {
            if (res.ret == 0) {
              let data = JSON.parse(res.data);
              // console.log("----getGoodsQty data---:", data);
              this.lineChartData = new Array();
              this.lineChartData.push(
                data.date,
                data.stockInfo,
                data.inExpectedInfo,
                data.outExpectedInfo,
                {
                  inExpectedTotal: data.inExpectedInfoTotal,
                  outExpectedTotal: data.outExpectedInfoTotal,
                  stockTotal: data.stockInfoTotal
                }
              );
              this.isCharts = true;
            } else {
              if (window.console) console.log("getGoodsQtys error");
            }
          } else {
            if (window.console) console.log("getGoodsQtys error");
          }
        })
        .catch(err => {
          if (window.console) console.log(err);
        });
    },
    stockWeekFun() {
      stockWeek()
        .then(res => {
          if (res.ret == "0") {
            let data = JSON.parse(res.data);
            // console.log("--stockWeek data--:", data);
            let turnoverRateAll = Number(data.turnoverRateAll);
            let turnoverRate7 = Number(data.turnoverRate7);
            let turnoverRateAllData = {
                value: turnoverRateAll,
                Percentage: this.GetPercent(turnoverRateAll, 5),
                decimal: this.GetPercent(turnoverRateAll, 5) * 0.01
              },
              turnoverRate7Data = {
                value: turnoverRate7,
                Percentage: this.GetPercent(turnoverRate7, 5),
                decimal: this.GetPercent(turnoverRate7, 5) * 0.01
              };

            //50% value 0.5 value1 50 value 2.5次
            this.initGaugeChart1(turnoverRateAllData); //仪表盘1 all周转率
            this.initGaugeChart2(turnoverRate7Data); //仪表盘2 近七日周转率
            console.log('turnoverRateAllData',turnoverRateAllData)
            console.log('turnoverRate7Data',turnoverRate7Data)
            this.stockWeekLoading = false;
          } else {
            // this.stockWeekLoading = false;
            if (window.console) console.log("stockWeek error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 求百分比
    GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0 ? 0 : Math.round((num / total) * 10000) / 100.0;
    },
    goDet() {
      this.$router.push({ path: "/data/customerDetails" });
    },

    /*getLineChartData() {
      let date = [],
        oneDay = 24 * 3600 * 1000,
        base = +new Date(2018, 8, 1),
        lineChartData1 = [Math.random() * 20000],
        lineChartData2 = [Math.random() * 20000],
        lineChartData3 = [Math.random() * 20000];
      for (let i = 1; i < 365; i++) {
        let now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        lineChartData1.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData1[i - 1])
        );
        lineChartData2.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData2[i - 1])
        );
        lineChartData3.push(
          Math.round((Math.random() - 0.5) * 20000 + lineChartData3[i - 1])
        );
      }
      this.lineChartData.push(
        date,
        lineChartData1,
        lineChartData2,
        lineChartData3
      );
    },*/
    initTrendChart2() {
      let base = +new Date(2018, 8, 1);
      let oneDay = 24 * 3600 * 1000;
      let date1 = [];
      let data1 = [Math.random() * 10000];

      for (let i = 1; i < 365; i++) {
        let now = new Date((base += oneDay));
        date1.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data1.push(Math.round(Math.random() * 10000));
      }

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 2,
            backgroundColor: "rgba(244,246,250,1)",
            bottom: "2px",
            dataBackground: {
              // lineStyle:mylineStyle, //阴影的线条样式
              // areaStyle:myareaStyle, //阴影的填充样式
              type: "inside" //slider表示有滑动块的，inside表示内置的
            }
          }
        ],
        grid: {
          top: "10%",
          left: "0%",
          right: "8%",
          bottom: "16%",
          x: 10,
          x2: 10,
          containLabel: true
        },
        //x轴时间轴
        xAxis: [
          {
            type: "category",
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#AABBC1"
              }
            },
            data: date1.map(str => {
              return str.replace(" ", "\n");
            })
          }
        ],
        //y轴
        yAxis: [
          {
            type: "value",
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#AABBC1"
              }
            }
          }
        ],
        series: [
          {
            smooth: true,
            symbol: "circle", //拐点样式
            symbolSize: 12, //拐点大小
            itemStyle: {
              normal: {
                color: "rgba(45,201,201,1)", //拐点颜色
                borderColor: "#fff", //拐点边框颜色
                borderWidth: 4, //拐点边框大小
                areaStyle: {
                  type: "default",
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.1,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(45,201,201,0)"
                    }
                  ])
                },
                lineStyle: {
                  //线的颜色
                  color: "rgba(45,201,201,1)"
                },
                //以及在折线图每个日期点顶端显示数字
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "white"
                  }
                }
              }
            },
            type: "line",
            animation: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: data1
          }
        ]
      };
      if (option && typeof option === "object") {
        this.trendChart2 = this.$echarts
          .init(document.getElementById("trendChart2"))
          .setOption(option);
      }
    },
    initTrendChart1() {
      let base = +new Date(2018, 8, 1);
      let oneDay = 24 * 3600 * 1000;
      let date1 = [];
      let data1 = [Math.random() * 10000];

      for (let i = 1; i < 365; i++) {
        let now = new Date((base += oneDay));
        date1.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data1.push(Math.round(Math.random() * 10000));
      }

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 2,
            backgroundColor: "rgba(244,246,250,1)",
            bottom: "2px",
            dataBackground: {
              // lineStyle:mylineStyle, //阴影的线条样式
              // areaStyle:myareaStyle, //阴影的填充样式
              type: "inside" //slider表示有滑动块的，inside表示内置的
            }
          }
        ],
        grid: {
          top: "10%",
          left: "0%",
          right: "8%",
          bottom: "16%",
          x: 10,
          x2: 10,
          containLabel: true
        },
        //x轴时间轴
        xAxis: [
          {
            type: "category",
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#AABBC1"
              }
            },
            data: date1.map(str => {
              return str.replace(" ", "\n");
            })
          }
        ],
        //y轴
        yAxis: [
          {
            type: "value",
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#AABBC1"
              }
            }
          }
        ],
        series: [
          {
            smooth: true,
            symbol: "circle", //拐点样式
            symbolSize: 12, //拐点大小
            itemStyle: {
              normal: {
                color: "rgba(45,201,201,1)", //拐点颜色
                borderColor: "#fff", //拐点边框颜色
                borderWidth: 4, //拐点边框大小
                areaStyle: {
                  type: "default",
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.1,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(45,201,201,0)"
                    }
                  ])
                },
                lineStyle: {
                  //线的颜色
                  color: "rgba(45,201,201,1)"
                },
                //以及在折线图每个日期点顶端显示数字
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "white"
                  }
                }
              }
            },
            type: "line",
            animation: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: data1
          }
        ]
      };
      if (option && typeof option === "object") {
        this.trendChart1 = this.$echarts
          .init(document.getElementById("trendChart1"))
          .setOption(option);
      }
    },
    selectTrend(val) {
      switch (val) {
        case "人民币":
          if (Object.keys(this.trendChart1).length === 0)
            this.initTrendChart1();
          break;
        case "美元":
          if (Object.keys(this.trendChart2).length === 0)
            this.initTrendChart2();
          break;
        default:
          break;
      }
    },
    initFirstMap() {
      loadBMap().then(() => {
        this.initLineMap();
      });
    },
    selectMap(val) {
      switch (val) {
        case "收发货点":
          if (Object.keys(this.lineMap).length === 0) this.initLineMap();
          break;
        case "货物数量":
          if (Object.keys(this.hotAreaMap1).length === 0)
            this.initHotAreaMap1();
          break;
        case "货物金额":
          if (Object.keys(this.hotAreaMap2).length === 0)
            this.initHotAreaMap2();
          break;
        default:
          break;
      }
    },
    initHotAreaMap2() {
      let data = [
        { name: "深圳", value: 230 },
        { name: "珠海", value: 142 },
        { name: "宿迁", value: 43 },
        { name: "咸阳", value: 43 },
        { name: "铜川", value: 44 },
        { name: "平度", value: 44 },
        { name: "佛山", value: 44 },
        { name: "海口", value: 144 },
        { name: "江门", value: 45 },
        { name: "成都", value: 58 },
        { name: "大同", value: 58 },
        { name: "镇江", value: 59 },
        { name: "桂林", value: 159 },
        { name: "张家界", value: 59 },
        { name: "宜兴", value: 59 },
        { name: "北海", value: 60 },
        { name: "西安", value: 61 },
        { name: "金坛", value: 62 },
        { name: "东营", value: 62 },
        { name: "牡丹江", value: 63 },
        { name: "遵义", value: 63 },
        { name: "绍兴", value: 63 },
        { name: "扬州", value: 164 },
        { name: "常州", value: 64 },
        { name: "临安", value: 99 },
        { name: "莱芜", value: 148 },
        { name: "常德", value: 152 },
        { name: "长沙", value: 175 }
      ];

      let convertData = data => {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordData[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      let option = {
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: "move", //'scale' 'move'
          mapStyle: this.mapStyle
        },
        series: [
          {
            name: "货物数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: convertData(data),
            symbolSize: val => {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "blue"
              }
            }
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: convertData(
              data
                .sort((a, b) => {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: val => {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "purple",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      if (option && typeof option === "object") {
        this.hotAreaMap2 = this.$echarts
          .init(document.getElementById("hotAreaMap2"))
          .setOption(option);
      }
    },

    initHotAreaMap1() {
      let data = [
        { name: "青岛", value: 18 },
        { name: "乳山", value: 18 },
        { name: "金昌", value: 19 },
        { name: "泉州", value: 21 },
        { name: "云浮", value: 24 },
        { name: "梅州", value: 25 },
        { name: "文登", value: 25 },
        { name: "上海", value: 25 },
        { name: "威海", value: 25 },
        { name: "承德", value: 25 },
        { name: "厦门", value: 26 },
        { name: "汕尾", value: 26 },
        { name: "丹东", value: 27 },
        { name: "太仓", value: 27 },
        { name: "曲靖", value: 27 },
        { name: "烟台", value: 28 },
        { name: "福州", value: 29 },
        { name: "瓦房店", value: 30 },
        { name: "即墨", value: 30 },
        { name: "抚顺", value: 31 },
        { name: "玉溪", value: 31 },
        { name: "张家口", value: 31 },
        { name: "阳泉", value: 31 },
        { name: "莱州", value: 32 },
        { name: "湖州", value: 32 },
        { name: "汕头", value: 212 },
        { name: "昆山", value: 33 },
        { name: "宁波", value: 33 },
        { name: "湛江", value: 33 },
        { name: "揭阳", value: 34 },
        { name: "荣成", value: 34 },
        { name: "连云港", value: 35 },
        { name: "葫芦岛", value: 35 },
        { name: "常熟", value: 36 },
        { name: "东莞", value: 36 },
        { name: "河源", value: 36 },
        { name: "淮安", value: 36 },
        { name: "泰州", value: 36 },
        { name: "南宁", value: 37 },
        { name: "营口", value: 37 },
        { name: "惠州", value: 37 },
        { name: "江阴", value: 37 },
        { name: "蓬莱", value: 37 },
        { name: "韶关", value: 38 },
        { name: "嘉峪关", value: 38 },
        { name: "广州", value: 238 },
        { name: "中山", value: 39 },
        { name: "昆明", value: 39 },
        { name: "寿光", value: 40 },
        { name: "盘锦", value: 40 },
        { name: "长治", value: 41 },
        { name: "深圳", value: 41 },
        { name: "珠海", value: 142 },
        { name: "宿迁", value: 43 },
        { name: "咸阳", value: 43 },
        { name: "铜川", value: 44 },
        { name: "平度", value: 44 },
        { name: "佛山", value: 44 },
        { name: "海口", value: 144 },
        { name: "江门", value: 45 },
        { name: "成都", value: 58 },
        { name: "大同", value: 58 },
        { name: "镇江", value: 59 },
        { name: "桂林", value: 159 },
        { name: "张家界", value: 59 },
        { name: "宜兴", value: 59 },
        { name: "北海", value: 60 },
        { name: "西安", value: 61 },
        { name: "金坛", value: 62 },
        { name: "东营", value: 62 },
        { name: "牡丹江", value: 63 },
        { name: "遵义", value: 63 },
        { name: "绍兴", value: 63 },
        { name: "扬州", value: 164 },
        { name: "常州", value: 64 },
        { name: "临安", value: 99 },
        { name: "莱芜", value: 148 },
        { name: "常德", value: 152 },
        { name: "长沙", value: 175 }
      ];

      let convertData = data => {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordData[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      let option = {
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: "move", //'scale' 'move'
          mapStyle: this.mapStyle
        },
        series: [
          {
            name: "货物数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: convertData(data),
            symbolSize: val => {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "purple"
              }
            }
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: convertData(
              data
                .sort((a, b) => {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: val => {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "purple",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      if (option && typeof option === "object") {
        this.hotAreaMap1 = this.$echarts
          .init(document.getElementById("hotAreaMap1"))
          .setOption(option);
      }
    },
    initLineMap() {
      let GZData = this.GZData;

      let planePath =
        "path://M320.32,274.88H79.68q-7.68,0-7.68,7.68v345.6c0,2.56,2.56,7.68,7.68,7.68H320.32q7.68,0,7.68-7.68V282.56q0-7.68-7.68-7.68ZM302.4,129V95.68a51.35,51.35,0,0,0-51.2-51.2H148.8a51.35,51.35,0,0,0-51.2,51.2V129L72,141.76v30.72l25.6-2.56v79.36H302.4V167.36l25.6,2.56V141.76Zm0,0";

      let convertData = data => {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let dataItem = data[i],
            fromCoord = geoCoordData[dataItem[0].name],
            toCoord = geoCoordData[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            });
          }
        }
        return res;
      };

      let series = [];
      [["广州", GZData]].forEach((item, i) => {
        series.push(
          //路线
          {
            type: "lines",
            coordinateSystem: "bmap",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "#fff",
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: "#13C2C2",
                width: 1,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          //移动物
          {
            type: "lines",
            coordinateSystem: "bmap",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: [12, 18]
            },
            lineStyle: {
              normal: {
                color: "#13C2C2",
                width: 1,
                opacity: 0.4,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          //城市名标记
          {
            // name: item[0] + " Top10",
            type: "effectScatter",
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: val => {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: "#13C2C2"
              }
            },
            data: item[1].map(dataItem => {
              let result = {
                name: dataItem[1].name,
                value: geoCoordData[dataItem[1].name].concat([
                  dataItem[1].value
                ])
              };
              return result;
            })
          }
        );
      });
      let option = {
        bmap: {
          //setup map
          center: [115.97, 29.71],
          zoom: 6,
          roam: "move", //'scale' 'move'
          mapStyle: this.mapStyle
        },
        tooltip: {
          trigger: "item"
        },
        roamController: {
          // 显示策略，可选为：true（显示） | false（隐藏）
          show: true,
          // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          x: "right",
          // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          y: "top"
        },
        series: series
      };
      if (option && typeof option === "object") {
        this.lineMap = this.$echarts
          .init(document.getElementById("lineMap"))
          .setOption(option);
      }
    },
    initPieChart(result) {
      console.log('pie result',result)
      let i = 0;
      let option = {
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a}<br/>{b}:{c}%"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["55%", "65%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              borderWidth: 2, //边框的宽度
              borderColor: "#fff", //边框的颜色
              normal: {
                color: () => {
                  return this.colorArr[i++];
                }
              }
            },
            data: result
          }
        ]
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("pieChart"))
          .setOption(option);
      }
      this.$echarts
        .init(document.getElementById("pieChart"))
        .on("mouseover", param => {
          this.tooltipItems[param.data.index] = true;
          this.pieActive = param.data.index;
        });
      this.$echarts
        .init(document.getElementById("pieChart"))
        .on("mouseout", param => {
          this.tooltipItems[param.data.index] = false;
          this.pieActive = 5;
        });
    },
    initGaugeChart1(data) {
      let option = {
        series: [
          //容器
          {
            name: "",
            type: "gauge",
            radius: "60%",
            startAngle: 200, //开始角度
            endAngle: -20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              show: true,
              lineStyle: {
                color: [[1, "#cecece"]],
                width: 18
              }
            },
            splitLine: {
              //刻度 分割线
              show: false
            },
            axisTick: {
              //刻度线
              show: false
            },
            pointer: {
              //指针
              length: "50%",
              width: 4,
              color: "auto"
            },
            itemStyle: {
              //指针样式
              color: "#0DA7CB"
            },
            axisLabel: {
              //刻度标签 show false
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              textStyle: {
                color: "#586777",
                fontSize: 16
              }
            },
            detail: {
              formatter: data.value + "次",
              offsetCenter: [0, "50%"],
              textStyle: {
                color: "#000",
                fontSize: 30
              }
            },
            data: [{ value: data.Percentage, name: "周转率" }]
          },
          //实体
          {
            name: "",
            type: "gauge",
            radius: "60%",
            splitNumber: 10,
            startAngle: 200, //开始角度
            endAngle: 220 * (1 - data.decimal) - 20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              show: true,
              lineStyle: {
                color: [[1, "#13C2C3"]],
                width: 18
              }
            },
            splitLine: {
              //刻度 分割线
              show: false
            },
            axisTick: {
              //刻度线
              show: false
            },
            pointer: {
              //指针
              show: false
            },
            axisLabel: {
              //刻度标签 show false
              show: false
            },
            detail: {
              show: false
            }
          },
          //刻度
          {
            type: "gauge",
            radius: "55%",
            startAngle: 200, //开始角度
            endAngle: -20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              //刻度 分割线
              show: true,
              // splitNumber: 4,
              length: 6,
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              //刻度线
              show: true,
              splitNumber: 4,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            pointer: {
              //指针
              show: false
            },
            axisLabel: {
              //刻度标签 show false
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      };

      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("gaugeChart1"))
          .setOption(option);
      }
    },

    initGaugeChart2(data) {
      let option = {
        series: [
          //容器
          {
            type: "gauge",
            radius: "60%",
            startAngle: 200, //开始角度
            endAngle: -20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              show: true,
              lineStyle: {
                color: [[1, "#cecece"]],
                width: 18
              }
            },
            splitLine: {
              //刻度 分割线
              show: false
            },
            axisTick: {
              //刻度线
              show: false
            },
            pointer: {
              //指针
              length: "50%",
              width: 4
            },
            itemStyle: {
              //指针样式
              color: "#0DA7CB"
              /*
              opacity: 0.5, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              borderWidth: 4, // 描边线宽,默认 0。为 0 时无描边。
              borderType: "dotted", // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
              borderColor: "#000", // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
              shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              shadowColor: "#cecece", // 阴影颜色。支持的格式同color。
              normal: {
                color: "red",
                borderWidth: 1
              }*/
            },
            axisLabel: {
              //刻度标签
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              textStyle: {
                color: "#586777",
                fontSize: 16
              }
            },
            detail: {
              formatter: data.value + "次",
              offsetCenter: [0, "50%"],
              textStyle: {
                color: "#000",
                fontSize: 30
              }
            },
            data: [{ value: data.Percentage, name: "近七日周转率" }]
          },
          //实体
          {
            name: "",
            type: "gauge",
            radius: "60%",
            splitNumber: 10,
            startAngle: 200, //开始角度
            endAngle: 220 * (1 - data.decimal) - 20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              show: true,
              lineStyle: {
                color: [[1, "#0DA7CB"]],
                width: 18
              }
            },
            splitLine: {
              //刻度 分割线
              show: false
            },
            axisTick: {
              //刻度线
              show: false
            },
            pointer: {
              //指针
              show: false
            },
            axisLabel: {
              //刻度标签 show false
              show: false
            },
            detail: {
              show: false
            }
          },
          //刻度
          {
            type: "gauge",
            radius: "55%",
            startAngle: 200, //开始角度
            endAngle: -20, //结束角度
            center: ["50%", "50%"],
            axisLine: {
              //仪表圈
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              //刻度 分割线
              show: true,
              // splitNumber: 4,
              length: 6,
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              //刻度线
              show: true,
              splitNumber: 4,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            pointer: {
              //指针
              show: false
            },
            axisLabel: {
              //刻度标签 show false
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("gaugeChart2"))
          .setOption(option);
      }
    },
    initBarChart1(result) {
      let option = {
        yAxis: {
          show: false
        },
        xAxis: {
          type: "category",
          data: ["8H以内", "8H-24H", "24H以上"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8893A0"
            }
          }
        },
        grid: {
          x: 50,
          x2: 50,
          top: 53
        },
        tooltip: {
          formatter(params) {
            // console.log("result:",result);
            // console.log("params:", params);
            // return params.value;
            return result[params.dataIndex].value;
          }
        },
        series: [
          {
            data: [100, 100, 100],
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            silent: true,
            barGap: "-100%",
            animation: false
          },
          {
            data: [
              result[0].percentage,
              result[1].percentage,
              result[2].percentage
            ],
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color(params) {
                let colorList = ["#13C2C3", "#F5A31E", "#FF4D4F"];
                return colorList[params.dataIndex];
              }
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("barChart1"))
          .setOption(option);
      }
      this.$echarts
        .init(document.getElementById("barChart1"))
        .on("click", param => {
          // alert(param.value);
        });
    },
    initBarChart2(result) {
      let option = {
        yAxis: {
          show: false
        },
        xAxis: {
          type: "category",
          data: ["正常", "加急"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8893A0"
            }
          }
        },
        grid: {
          x: 50,
          x2: 50,
          top: 53
        },
        tooltip: {
          formatter(params) {
            // return params.value;
            return result[params.dataIndex].value;
          }
        },
        series: [
          {
            data: [100, 100],
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            silent: true,
            barGap: "-100%",
            animation: false
          },
          {
            data: [result[0].percentage, result[1].percentage],
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color(params) {
                let colorList = ["#13C2C3", "#FF4D4F"];
                return colorList[params.dataIndex];
              }
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("barChart2"))
          .setOption(option);
      }
      this.$echarts
        .init(document.getElementById("barChart2"))
        .on("click", param => {
          // alert(param.value);
        });
    },
    /* pie function */
    mouseoverPie(index) {
      this.tooltipItems[index] = true;
      let option = {
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("pieChart"))
          .dispatchAction(option);
      }
      this.pieActive = index;
    },
    mouseoutPie(index) {
      this.tooltipItems[index] = false;
      let option = {
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("pieChart"))
          .dispatchAction(option);
      }
      this.pieActive = 5;
    },
    //initMapTestFun
    initMapFun() {
      this.myMap = new BMap.Map("lineMap");
      this.myMap.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      this.myMap.addControl(
        //add Control
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      this.myMap.setCurrentCity("北京");
      this.myMap.enableScrollWheelZoom(true);
      //diy...
    },
    goReport1() {
      this.$router.push({
        path: "/report"
      });
    },
    goReport2() {
      this.$router.push({
        path: "/report",
        query: { act: "", report: "second" }
      });
    }
  }
};
</script>

<style scoped lang="scss">
// .test-a:nth-child(2n + 2) {
//   background: #ff0000;
// }
.firstLine {
  margin-bottom: 25px;
  margin-right: -18px;
  .box-card {
    margin-right: 18px;
    position: relative;
    height: 240px;
    overflow: hidden;
    .eventDiv {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    #barChart1 {
      width: 293px;
      height: 193px;
    }
    #barChart2 {
      width: 293px;
      height: 193px;
    }
    .titleBox {
      padding: 24px 24px 0px 24px;
      span {
        font-size: 16px;
        color: #3a5470;
      }
    }
    .dataBox {
      position: absolute;
      margin-top: 50px;
      padding: 24px;
      .leftDataBox {
        display: inline-block;
        width: 140px;
      }
      .rightDataBox {
        display: inline-block;
        width: 100px;
      }
      .rightDataBox2 {
        position: relative;
        display: inline-block;
        width: 100px;
        // text-align: center;
        .theLine {
          position: absolute;
          left: 0px;
          top: 8px;
          height: 24px;
          width: 1px;
          background: #cecece;
        }
      }
      .dataValue {
        display: block;
        font-size: 36px;
        color: #13c2c3;
        text-indent: -4px;
      }
      .dataValue2 {
        display: block;
        font-size: 36px;
        color: #0da7cb;
        text-indent: -4px;
      }
      .dataName {
        display: block;
        margin-top: 4px;
        font-size: 14px;
        color: #54667a;
        text-indent: -2px;
      }
    }
  }
}

.secondLine {
  width: 100%;
  margin-bottom: 23px;
  .box-card {
    width: 100%;
    height: 560px;
  }
}

.theThirdLine {
  margin-bottom: 24px;
  margin-right: -18px;
  .box-card {
    // width: 626px;
    margin-right: 18px;
    height: 300px;
    #pieChart {
      float: left;
      margin-left: 20px;
      width: 230px;
      height: 245px;
    }
    .pieItems {
      float: right;
      margin-top: 28px;
      margin-right: 30px;
      width: 328px;
      .pieItem {
        position: relative;
        cursor: pointer;
        margin-bottom: 2px;
        width: 330px;
        height: 36px;
        padding-left: 90px;
        .pieItemTitle {
          position: absolute;
          top: 8px;
          left: 18px;
          font-size: 14px;
          color: #8692a0;
          text-align: right;
          width: 60px;
          display: block;
        }
        .pieItemBox {
          display: inline-block;
          position: relative;
          margin-top: 12px;
          width: 210px;
          height: 12px;
          background: rgba(238, 241, 246, 1);
          .pieItemValue {
            position: absolute;
            height: 12px;
            width: 50%;
          }
        }
      }
      .pieActive {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
      }
    }
    #gaugeChart1 {
      display: inline-block;
      margin-left: 20px;
      width: 276px;
      height: 254px;
    }
    #gaugeChart2 {
      display: inline-block;
      width: 276px;
      height: 254px;
    }
    .titleBox {
      padding: 24px 24px 0px 24px;
      span {
        font-size: 16px;
        color: #3a5470;
      }
    }
  }
}
.fourth {
  margin-bottom: 24px;
  .box-card {
    position: relative;
    width: 100%;
    height: 490px;
  }
  .titleBox {
    padding: 24px 24px 0px 24px;
    span {
      font-size: 16px;
      color: #3a5470;
    }
  }
  .lineChartRadio {
    position: absolute;
    top: 18px;
    right: 24px;
  }
  .fourthLeft {
    float: left;
    width: 354px;
    height: 460px;
    .fourthDataBox {
      position: relative;
      width: 100%;
      height: 216px;
      padding: 34px 0px 0px 24px;
      .fourthData {
        width: 100%;
        margin-bottom: 24px;
        .fourthDataName {
          display: block;
          color: #7c8999;
          font-size: 14px;
          width: 100%;
          height: 20px;
          line-height: 20px;
        }
        .fourthDataValue {
          display: block;
          color: #4a555e;
          font-size: 30px;
          width: 100%;
          height: 32px;
          line-height: 32px;
          margin-top: 10px;
        }
      }
      .fourthDataLine {
        position: absolute;
        width: 250px;
        height: 1px;
        background: #cecece;
        bottom: 0px;
      }
    }
  }
  .trendController {
    float: right;
    width: 900px;
    height: 415px;
    display: none;
  }
  .trendActive {
    display: block;
  }
}

.mapBox {
  margin-bottom: 24px;
  .box-card {
    position: relative;
    width: 100%;
    height: 490px;
  }
  .mapContainer {
    width: 100%;
    height: 490px;
    display: none;
  }
  .mapActive {
    display: block;
  }
  .mapRadio {
    z-index: 1;
    position: absolute;
    right: 25px;
    top: 25px;
  }
}

.customerTitle {
  font-size: 16px;
  color: #3a5470;
  margin-bottom: 14px;
}

.customerContainer {
  margin-right: -18px;
  .box-card {
    height: 284px;
    margin-bottom: 24px;
    margin-right: 18px;
    cursor: pointer;
    border-radius: 4px;
    padding: 24px 16px 24px 16px;
    .brandName {
      display: block;
      font-weight: bold;
      font-size: 20px;
      color: rgba(58, 84, 112, 1);
      height: 40px;
    }
    .brandOrder {
      height: 70px;
      width: 100%;
      background: rgba(238, 241, 246, 1);
      padding: 12px 14px 12px 14px;
      border-radius: 4px;
      margin-bottom: 24px;
      .brandOrderBox {
        display: inline-block;
        width: 49%;
        height: 50px;

        .brandOrderName {
          display: block;
          font-size: 14px;
          color: #7c8999;
        }
        .brandOrderValue {
          display: block;
          font-size: 16px;
          color: #4a555e;
          margin-top: 6px;
        }
      }
    }
    .brandMoney {
      .moneyBox {
        .moneyName {
          position: relative;
          display: block;
          font-size: 14px;
          color: #8591a0;
        }
        .moneyValue {
          display: block;
          font-size: 16px;
          color: #4a555e;
          margin-top: 8px;
        }
      }
      .RMB {
        .trendDiv {
          position: absolute;
          left: 130px;
          top: 1px;
          width: 40px;
          height: 18px;
          line-height: 18px;
          background: #fdefeb;
          border-radius: 2px;
          padding: 0px 8px 0px 8px;
          span {
            font-size: 14px;
            font-weight: 500;
            color: rgba(240, 90, 50, 1);
          }
        }
      }
      .dollar {
        margin-top: 12px;
        .trendDiv {
          position: absolute;
          left: 102px;
          top: 1px;
          height: 18px;
          line-height: 18px;
          background: #e8f8f3;
          border-radius: 2px;
          padding: 0px 8px 0px 8px;
          span {
            font-size: 14px;
            font-weight: 500;
            color: rgba(18, 189, 123, 1);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
//element theme begin
.el-radio-group {
  span {
    font-size: 14px;
  }
  span:hover {
    color: #12bd7b;
  }
}
//element theme end

//element diy begin
.lineChartRadio {
  span {
    display: block;
    padding: 0 !important;
    width: 66px;
    height: 28px;
    line-height: 26px;
  }
}

.mapRadio {
  span {
    display: block;
    padding: 0 !important;
    width: 80px;
    height: 28px;
    line-height: 26px;
  }
}

//diy tooltip begin
.diyTooltip {
  background: #909399 !important;
  .popper__arrow {
    border-top-color: #909399 !important;
  }
  .popper__arrow::after {
    border-top-color: #909399 !important;
  }
}
//diy tooltip end

//element diy end
</style>