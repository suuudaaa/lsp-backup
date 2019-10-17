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
          title: "一、如何设置权限？",
          data: [
            {
              mode: null,
              datas: [
                {
                  text: "步骤1：公司管理员登录，点击个人中心-权限管理",
                  url: "../../../static/helpImg/powerAct1.png",
                  bigUrl: ["../../../static/helpImg/powerAct1.png"]
                },
                {
                  text:
                    "步骤2：新增/编辑部门信息，可设置部门权限，分配品牌、客户、菜单权限",
                  url: "../../../static/helpImg/powerAct2.png",
                  bigUrl: ["../../../static/helpImg/powerAct2.png"]
                },
                {
                  text:
                    "步骤3：新增员工，归属部门，继承部门权限，在部门权限继承上可以自定义员工权限",
                  url: "../../../static/helpImg/powerAct3.png",
                  bigUrl: ["../../../static/helpImg/powerAct3.png"]
                },
                {
                  text: "步骤4：编辑员工信息，也可以修改权限",
                  url: "../../../static/helpImg/powerAct4.png",
                  bigUrl: ["../../../static/helpImg/powerAct4.png"]
                }
              ],
              bigUrl: [
                "../../../static/helpImg/powerAct1.png",
                "../../../static/helpImg/powerAct2.png",
                "../../../static/helpImg/powerAct3.png",
                "../../../static/helpImg/powerAct4.png"
              ]
            }
          ]
        }
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
    margin: 10px 0;
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
      width: 33%;
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