<template>
  <div class="order-question">
    <!-- <div class="q-to-a">
      <el-row :gutter="8">
        <el-col :span="24">
          <el-card shadow="hover">
            <h2 class="question">这里是FQA问题标题?</h2>
            <p class="answer">
              这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是
              FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解
              答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里是FQA解答这里
              是FQA解答。
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div> -->
    <div class="act-step" v-for="(item,idx) in helpData" :key="idx+'t'">
      <el-col :span="24">
        <el-card shadow="hover" style="margin-bottom:24px;">
          <h2 class="question">{{item.title}}</h2>
          <div v-for="(item1,idx) in item.data" :key="idx+'c'">
            <h3 class="ques-mode" v-if="item1.mode">{{item1.mode}}</h3>
            <ul class="act-step-show">
              <li class="pic-and-txt" v-for="(item2,idx) in item1.datas" :key="idx+'det'">
                <!-- <el-image :src="item2.url" :preview-src-list="item1.bigUrl"></el-image> -->
                <el-image :src="item2.url" :preview-src-list="item2.bigUrl"></el-image>
                <p>{{item2.text}}</p>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      helpData: [
        {
          title: "一、如何查询订单？",
          data: [
            {
              mode: "方法一：业务看板，输入筛选条件，可查询订单",
              datas: [
                {
                  text: "步骤1：输入筛选条件，可查询订单",
                  url: "../../../static/helpImg/stockAct1.jpg",
                  bigUrl: ["../../../static/helpImg/stockAct1.jpg"]
                },
                {
                  text: "步骤2：选中订单卡片，点击，可查看该订单详情",
                  url: "../../../static/helpImg/stockAct2.png",
                  bigUrl: ["../../../static/helpImg/stockAct2.png"]
                },
                {
                  text: "步骤3：点击可返回订单查询列表页",
                  url: "../../../static/helpImg/stockAct3.png",
                  bigUrl: ["../../../static/helpImg/stockAct3.png"]
                }
              ],
              bigUrl: [
                "../../../static/helpImg/stockAct1.jpg",
                "../../../static/helpImg/stockAct2.png",
                "../../../static/helpImg/stockAct3.png"
              ]
            },
            {
              mode: "方法二：全局搜索，输入订单信息查询",
              datas: [
                {
                  text: "步骤1：输入订单信息查询",
                  url: "../../../static/helpImg/stockActM1.jpg",
                  bigUrl: ["../../../static/helpImg/stockActM1.jpg"]
                }
              ],
              bigUrl: ["../../../static/helpImg/stockActM1.jpg"]
            }
          ]
        },
        {
          title: "二、如何查询报表？",
          data: [
            {
              mode: "方法一：访问报表看板，点击表单设置，自定义表单内容",
              datas: [
                {
                  text: "步骤1：点击表单设置，自定义表单内容",
                  url: "../../../static/helpImg/reportAct1.png",
                  bigUrl: ["../../../static/helpImg/reportAct1.png"]
                },
                {
                  text:
                    "步骤2：点击筛选项，录入查询条件，点击确认，筛选报表信息",
                  url: "../../../static/helpImg/reportAct2.jpg",
                  bigUrl: ["../../../static/helpImg/reportAct2.jpg"]
                }
              ],
              bigUrl: [
                "../../../static/helpImg/reportAct1.png",
                "../../../static/helpImg/reportAct2.jpg"
              ]
            },
            {
              mode:
                "方法二：BOSS看板，点击入库订单概况/出库订单概况，可跳转到报表查询列表页",
              datas: [
                {
                  text:
                    "步骤1：点击入库订单概况/出库订单概况，可跳转到报表查询列表页",
                  url: "../../../static/helpImg/reportActM1.png",
                  bigUrl: ["../../../static/helpImg/reportActM1.png"]
                }
              ],
              bigUrl: ["../../../static/helpImg/reportActM1.png"]
            }
          ]
        },
        
      ]
    };
  }
};
</script>

<style lang='scss'>
.order-question {
  font-size: 16px;
  font-family: Source Han Sans CN;
  .q-to-a {
    margin-bottom: 24px;
  }
  .question {
    font-size: 16px;
    font-weight: bold;
    color: rgba(43, 61, 81, 1);
    line-height: 40px;
  }
  .act-step {
    margin: 10px 0 10px;
    .act-step-show {
      overflow: hidden;
    }
    .ques-mode {
      margin: 10px 0;
      font-size: 15px;
    }
    li {
      font-size: 14px;
      margin: 10px 0;
      float: left;
      width: 33.3%;
      height: 240px;
      p {
        width: 270px;
      }
      .el-image {
        width: 380px;
        height: 171px;
        border-radius: 4px;
        border: 1px solid #999;
      }
    }
  }
}
</style>