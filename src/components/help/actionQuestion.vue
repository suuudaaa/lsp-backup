<template>
  <div class="order-question">
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
          title: "一、如何登陆?",
          data: [
            {
              mode: null,
              datas: [
                {
                  text: "步骤1：输入指定邮箱及密码，进行登录",
                  url: "../../../static/helpImg/loginAct.png",
                  bigUrl: ["../../../static/helpImg/loginAct.png"]
                }
              ],
              bigUrl: ["../../../static/helpImg/loginAct.png"]
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