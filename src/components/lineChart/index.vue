<template>
  <div class="lineChartComponents">
    <div class="titleBox">
      <span>{{title}}</span>
    </div>
    <div class="lineController">
      <div id="lineChart" :style="{width:width + 'px'}"></div>
      <div class="lineChartData" :style="{width:width + 'px'}">
        <el-row>
          <el-col :span="8" class="dataValueBox">
            <!-- |intFormat -->
            <span class="dataValue">{{data[4].stockTotal | intFormat}}</span>
            <div class="dataName">
              <div class="dataMark markStyle1"></div>
              <span class="datatext">库存数</span>
            </div>
          </el-col>
          <el-col :span="8" class="dataValueBox">
            <!-- |intFormat todo......... -->
            <span class="dataValue">{{data[4].inExpectedTotal | intFormat}}</span>
            <div class="dataName">
              <div class="dataMark markStyle2"></div>
              <span class="datatext">入库数</span>
            </div>
          </el-col>
          <el-col :span="8" class="dataValueBox">
            <span class="dataValue">{{data[4].outExpectedTotal | intFormat}}</span>
            <div class="dataName">
              <div class="dataMark markStyle3"></div>
              <span class="datatext">出库数</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: new Array()
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 1268
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let option = {
        grid: {
          bottom: 80
        },
        tooltip: {
          trigger: "axis",
          padding: [12, 12, 12, 12]
          /*formatter: params => {
            console.log("params:", params);
            var res =
              "<div class='test'><p>" + "1" + ":" + params[0].data + "</p>";
            res += "<p>" + "2" + ":" + params[1].data + "</p>";
            res += "<p>" + "3" + ":" + params[2].data + "</p></div>";
            return res;
          }*/
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
          top: "8%",
          left: "4%",
          right: "4%",
          x: 10,
          x2: 10,
          y2: 160,
          containLabel: true
        },
        //x轴时间轴
        xAxis: [
          {
            type: "category", //default
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dotted", //solid || dotted || dashed
                color: "#D3D9DE"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#AABBC1"
              }
            },
            data: this.data[0].map(str => {
              return str.replace(" ", "\n");
            })
          }
        ],
        //y轴
        yAxis: [
          {
            type: "value", //default
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                type: "dotted", //solid || dotted || dashed
                color: "#D3D9DE"
              }
            },
            axisLabel: { show: true, color: "#AABBC1" },
            axisTick: {
              //axisLine
              show: false
            },
            axisLine: {
              //axisLine
              show: false
            }
          }
        ],
        series: [
          {
            smooth: true, //折线&拐点
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#13C2C3",
                borderColor: "#fff",
                borderWidth: 2,
                lineStyle: {
                  width: 1,
                  color: "#13C2C3"
                }
              }
            },
            type: "line",
            animation: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: this.data[1]
          },
          {
            smooth: true, //折线&拐点
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#EFA42A",
                borderColor: "#fff",
                borderWidth: 2,
                lineStyle: {
                  width: 1,
                  color: "#EFA42A"
                }
              }
            },
            type: "line",
            animation: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: this.data[2]
          },
          {
            smooth: true, //折线&拐点
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#3B7EE6",
                borderColor: "#fff",
                borderWidth: 2,
                lineStyle: {
                  width: 1,
                  color: "#3B7EE6"
                }
              }
            },
            type: "line",
            animation: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: this.data[3]
          }
        ]
      };
      if (option && typeof option === "object") {
        this.$echarts
          .init(document.getElementById("lineChart"))
          .setOption(option);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.lineChartComponents {
  .lineController {
    position: relative;
    #lineChart {
      height: 480px;
    }
    .lineChartData {
      position: absolute;
      bottom: 34px;
      overflow: hidden;
      height: 120px;
      .dataValueBox {
        padding-left: 96px;
        .dataValue {
          display: block;
          margin-top: 26px;

          font-size: 36px;
          color: rgba(74, 85, 94, 1);
        }
        .dataName {
          position: relative;
          padding-left: 20px;
          width: 90px;
          height: 20px;
          .datatext {
            font-size: 14px;
            color: rgba(124, 137, 153, 1);
          }
          .dataMark {
            position: absolute;
            left: 4px;
            top: 6px;
            width: 8px;
            height: 8px;
            border-radius: 10px;
          }
          .markStyle1 {
            background: #3b7ee5;
          }
          .markStyle2 {
            background: #efa42a;
          }
          .markStyle3 {
            background: #13c2c3;
          }
        }
      }
    }
  }
  .titleBox {
    padding: 24px 0px 0px 24px;
    span {
      font-size: 16px;
      color: #3a5470;
    }
  }
}
</style>