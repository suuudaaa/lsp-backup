<template>
  <div class="feed-back-act">
    <div class="feed-mask" v-show="maskShow"></div>
    <div class="feed-back-button">
      <el-tooltip class="item" effect="dark" content="意见反馈" placement="left">
        <div class="feed-btn">
          <img src="../../../static/img/feedback_btn.png" alt />
        </div>
      </el-tooltip>
    </div>
    <div class="feed-back-content">
      <h3 class="feedback-head">意见反馈</h3>
      <div class="feedback-form">
        <el-form label-position="right" label-width="80px" :model="feedBackForm">
          <el-form-item label="类型">
            <el-radio v-model="feedBackForm.radio" label="1">功能建议</el-radio>
            <el-radio v-model="feedBackForm.radio" label="2">产品问题</el-radio>
          </el-form-item>
          <el-form-item label="标题">
            <el-input
              type="text"
              placeholder="请输入标题"
              v-model="feedBackForm.title"
              maxlength="15"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="feedBackForm.content"
              maxlength="150"
              :rows="6"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :limit="uploadLimit"
              :on-exceed="imgLimit"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedBackForm: {
        radio: "1",
        title: "",
        content: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      maskShow: true,
      uploadLimit: 3
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.maskShow = !this.maskShow;
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return true;
      //
    },
    imgLimit() {
      this.$message({
        message: "最多只能上传三张图片，图片上传超过限制",
        type: "error"
      });
    },
    onSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.feed-back-act {
  font-family: Source Han Sans CN;
  .feed-mask {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 50;
  }
  .feed-back-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 10;
    .feed-btn {
      width: 46px;
      height: 46px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 11px 2px rgba(141, 147, 157, 0.32);
      text-align: center;
      .img {
        height: 21px;
        width: 21px;
        // vertical-align: middle;
      }
    }
  }
  .feed-back-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // margin-left: -50%;
    // margin-top: -50%;
    z-index: 51;
    // margin: auto auto;
    width: 492px;
    height: 547px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    .feedback-head {
      text-align: center;
      height: 60px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(43, 61, 81, 1);
      line-height: 60px;
      .feedback-form {
        margin-top: 10px;
      }
    }
  }
  /deep/ .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 83%;
  }
  /deep/ .el-textarea {
    position: relative;
    display: inline-block;
    width: 83%;
    vertical-align: bottom;
    font-size: 14px;
  }

  /deep/ .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    line-height: 79px;
    vertical-align: top;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 8px 0 0;
    display: inline-block;
  }
}
</style>