<template>
  <div class="order-detail-page3">
    <!-- 暂无数据 -->
    <div class="down-cont" v-show="isData">
      <el-row :gutter="12">
        <el-col
          :span="6"
          v-for="(item,index) in downFiles"
          :key="index+'down'"
          style="margin:20px 0;"
        >
          <el-card shadow="hover" @click.native="downloadFile(item.filePath)">
            <div class="ld-download-card">
              <i class="iconfont iconfujianxiazai-word" v-if="item.fileType == 'doc'"></i>
              <i
                class="iconfont iconfujianxiazai-excl"
                v-else-if="item.fileType == 'xls' || item.fileType == 'xlsx'"
              ></i>
              <i
                class="iconfont iconfujianxiazai-ppt"
                v-else-if="item.fileType == 'pdf' || item.fileType == 'ppt'"
              ></i>
              <img src="../../../../static/img/downJpg.png" alt class="down-img" v-else />
              <!-- <i class="iconfont iconfujianxiazai-ppt" v-else></i> -->
              <div class="download-name">
                <p class="down-fileName">{{item.fileName}}</p>
                <p>{{item.createTime}}</p>
              </div>
              <i class="iconfont iconshuju-xiajiang"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="no-data" v-show="!isData">
      <div class="blank-page">
        <img src="../../../../static/img/no_data.png" alt />
        <!-- <i class="iconfont iconbaobiaozhongxin-zanwushuju"></i> -->
        <p class="no-data-text">暂无下载文件</p>
      </div>
    </div>
  </div>
</template>

<script>
import { inOrderGetBsrcdFiles, outOrderGetBsrcdFiles } from "@/api/getData";
export default {
  data() {
    return {
      isWord: true,
      isPpt: false,
      isExcel: false,
      params: {
        billNo: "BWI1808030003",
        page: 1,
        pageSize: 20
      },
      downFiles: [],
      isData: true
    };
  },
  methods: {
    downloadFile(path) {
      console.log("附件下载", path);
      let url;
      if (location.hostname === "localhost") {
        url = process.env.API_HOST_DEV + "/scmApi/view/" + path;
      } else if (location.hostname === "10.8.8.49") {
        url = process.env.API_HOST_TEST + "/scmApi/view/" + path;
      } else if (location.hostname === "lsp.lordstar.com.cn") {
        url = process.env.API_HOST_PROD + "/scmApi/view/" + path;
      }
      const postDownloadFile = action => {
        const form = document.createElement("form");
        form.action = action;
        form.method = "post";
        form.target = "blank";
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      };
      postDownloadFile(url);
      // let baseUrl = 'http://192.168.8.152:10016/server2/scmApi/view/filePath'
      // window.open(
      //   baseUrl+path
      // );
    },
    getPage3Data() {
      let that = this;
      that.isData = true;
      let ids = that.$route.query.id;
      if (ids == 0) {
        inOrderGetBsrcdFiles(that.params).then(res => {
          that.dataProcess(res);
        });
      } else {
        outOrderGetBsrcdFiles(that.params).then(res => {
          that.dataProcess(res);
        });
      }
    },
    dataProcess(res) {
      let that = this;
      if (res.ret == 0) {
        let data = res.data.rows;
        data = data.map((item, idx) => {
          let arr = item.fileName.split(".");
          let idxs = arr.length - 1;
          let str = arr[idxs].toLowerCase();
          item.fileType = str;
          return item;
        });
        console.log(data);
        that.downFiles = data;
        if (data.length == 0) {
          that.isData = false;
        }
      } else {
        that.isData = false;
      }
    }
  },
  mounted() {
    this.params.billNo = this.$route.query.billNo;
    this.getPage3Data();
  }
};
</script>

<style lang='scss' scoped>
.order-detail-page3 {
  .ld-download-card {
    height: 100px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
  }
  .iconfont {
    display: inline-block;
    vertical-align: middle;
  }
  .iconfujianxiazai-word {
    font-size: 48px;
    color: #13c2c3;

  }
  .iconfujianxiazai-excl {
    font-size: 48px;
    color: #e96737;
  }
  .iconfujianxiazai-ppt {
    font-size: 48px;
    color: #219857;
  }
  .iconshuju-xiajiang {
    font-size: 24px;
    color: #586777;
    border-radius: 50%;
    border: 1px solid #7e8c9b;
    vertical-align: super;
    float: right;
    margin-top: 22px;
  }
  .down-img {
    width: 48px;
    height: 48px;
  }
  .download-name {
    display: inline-block;
    vertical-align: middle;
    width: 68%;
    .down-fileName {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(43, 61, 81, 1);
      line-height: 24px;
      word-wrap:break-word;
    }
    span {
      color: #586777;
      font-size: 12px;
    }
  }
}
</style>