<template>
  <div class="headerContainer">
    <el-header class="header">
      <div class="headBtn" @click="sideBarController">
        <i class="icon iconfont iconkucunkantai-shouqi_zhankai" v-show="iconChange" ref="icon"></i>
        <i class="icon iconfont iconkucunkantai-shouqi_zhankai-copy" v-show="!iconChange"></i>
      </div>
      <img class="logo" :src="logoImg" />

      <div class="headerInfo">
        <span class="organization">{{companyName}}</span>
        <span class="title">{{currentPageName}}</span>
      </div>
      <!-- 搜索框 -->

      <div class="ld-search-input">
        <div class="input-selection">
          <input
            type="text"
            v-model="searchKeyWord"
            placeholder="输入您需要搜索的订单/货物信息"
            @keyup.enter = "keyWordSearch"
          />
          <i class="iconfont iconkucunkantai-icon-sousuo" slot="suffix" @click.stop="handleIconClick"></i>
        </div>
        <div class="search-drop" v-show="searchBoxShow">
          <ul class="search-result">
            <li class="search-order-info" @click="checkOrderDetail">
              <div class="ld-ser-list">
                <span class="ser-type ser-type1">订单</span>
                <p class="ser-cont-group">
                  查询到{{searchNum.orderNum}}条关于“
                  <span class="ser-keyword">{{searchKeyWord}}</span>
                  ”的订单信息
                </p>
              </div>
            </li>
            <li class="search-order-info" @click="orderSearchTables('st1')">
              <div class="ld-ser-list">
                <span class="ser-type ser-type2">品牌</span>
                <p class="ser-cont-group">
                  查询到{{searchNum.goodsBrandNum}}条关于“
                  <span class="ser-keyword">{{searchKeyWord}}</span>
                  ”的品牌信息
                </p>
              </div>
            </li>
            <li class="search-order-info" @click="orderSearchTables('st2')">
              <div class="ld-ser-list">
                <span class="ser-type ser-type3">规格型号</span>
                <p class="ser-cont-group">
                  查询到{{searchNum.goodsModelNum}}条关于“
                  <span class="ser-keyword">{{searchKeyWord}}</span>
                  ”的规格型号信息
                </p>
              </div>
            </li>
          </ul>
          <!-- <div class="history-search">
            <p class="ser-his-title">历史搜索</p>
            <ul class="search-list">
              <li
                class="ser-history-key-word"
                @click="historySearch('yurtghgjkiyutyrf5434678')"
              >yurtghgjkiyutyrf5434678</li>
              <li class="ser-history-key-word">yurtghgjkiyutyrf5434678</li>
              <li class="ser-history-key-word">yurtghgjkiyutyrf5434678</li>
            </ul>
          </div>-->
        </div>
      </div>

      <el-dropdown class="user">
        <div class="el-dropdown-link ld-user-name">
          <span>{{ldUserName}}</span>
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          <i class="icon iconfont iconkucunkantai-shaixuan-xiala"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="clickUser('user')"
            icon="icon iconfont icontouxiang-gerenzhongxin"
          >个人中心</el-dropdown-item>
          <el-dropdown-item
            v-if="power == '10'|| power == '20'"
            @click.native="clickUser('power')"
            icon="icon iconfont icontouxiang-quanxianguanli"
          >权限管理</el-dropdown-item>
          <el-dropdown-item
            @click.native="clickUser('logout')"
            icon="icon iconfont icontouxiang-tuichudenglu"
          >退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <img class="userHeader" :src="headImg" />
    </el-header>
  </div>
</template>

<script>
import logoImg from "@assets/img/logo.png";
import headImg from "@assets/img/avator.png";
import { selResult } from "@/api/getData";
export default {
  data() {
    return {
      logoImg: logoImg,
      headImg: headImg,
      // routeName: this.$route.name
      searchKeyWord: "",
      searchBoxShow: false,
      searchNum: {
        goodsBrandNum: 0,
        goodsModelNum: 0,
        orderNum: 0
      },
      companyName: "",
      ldUserName: "",
      currentPageName: "",
      iconChange:true
    };
  },
  props: {
    power: {
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    clickUser(arg) {
      if (arg === "user") {
        this.$router.push({ path: "/user" });
      } else if (arg === "power") {
        if (this.power != "10" && this.power != "20") return;
        let url = this.power == "10" ? "/power/admin/org" : this.power == "20" ? "/power/company/org" : "";
        this.$router.push({ path: url });
      } else if (arg === "logout") {
        localStorage.removeItem("token");
        this.$router.replace({
          path: "/login"
        });
      } else {
        if (window.console) console.log("clickUser error");
      }
    },
    keyWordSearch() {
      this.searchBoxShow = true;
      if (this.searchKeyWord == "") {
        this.searchBoxShow = false;
      }
      //调用接口
      let params = {
        selInfo: this.searchKeyWord
      };
      let that = this;
      selResult(params).then(res => {
        if (res.ret == 0) {
          that.searchNum = res.data;
        }
      });
    },
    keyWordSearch1(e) {
      this.searchBoxShow = true;
      e.preventDefault();
    },
    handleIconClick() {
      this.keyWordSearch()
    },
    checkOrderDetail() {
      this.searchBoxShow = false;
      if (this.searchNum.orderNum == 0) {
        return;
      }
      this.$router.push({
        path: "/orderSearchResult",
        query: { key: this.searchKeyWord }
      });
      // this.searchKeyWord = "";
    },
    orderSearchTables(guid) {
      this.searchBoxShow = false;
      if (this.searchNum.goodsBrandNum == 0 && guid == "st1") {
        return;
      }
      if (this.searchNum.goodsModelNum == 0 && guid == "st2") {
        return;
      }
      this.$router.push({
        path: "/orderSearchTable",
        query: { id: guid, key: this.searchKeyWord }
      });
    },
    sideBarController(){
      this.iconChange = !this.iconChange;
      if (this.sideBarState) {
        this.$store.commit('updateHiddenSideBar',false)
      } else{
        this.$store.commit('updateHiddenSideBar',true)
      }
    },
    historySearch(data) {
      //接口
      if (this.searchKeyWord == data) {
        return;
      } else {
        this.searchKeyWord = data;
      }
      console.log(data);
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    this.companyName = userInfo.comName;
    this.ldUserName = userInfo.realName;
    let ldPath = this.$route.path;
    ldPath = String(ldPath);
    if (ldPath.indexOf("/power") != -1) {
      this.currentPageName = "权限控制";
    } else if (ldPath.indexOf("/user") != -1) {
      this.currentPageName = "个人中心";
    } else if (ldPath.indexOf("/data") != -1) {
      this.currentPageName = "数据看台";
    } else {
      let pageName = this.$route.name;
      if (pageName == "") {
        this.currentPageName = "";
      } else {
        this.currentPageName = pageName;
      }
    }
  },
  created() {
    let that = this;
    document.onclick = function(e) {
      that.searchBoxShow = true;
      if (that.searchBoxShow) {
        that.searchBoxShow = false;
      }
    };
  },
  watch: {
    $route: function(to, from) {
      let ldPath = this.$route.path;
      if (ldPath.indexOf("/power") != -1) {
        this.currentPageName = "权限控制";
      } else if (ldPath.indexOf("/user") != -1) {
        this.currentPageName = "个人中心";
      } else if (ldPath.indexOf("/data") != -1) {
        this.currentPageName = "数据看台";
      } else {
        let pageName = this.$route.name;
        if (pageName == "") {
          this.currentPageName = "";
        } else {
          this.currentPageName = pageName;
        }
      }
    }
  },
  computed:{
    sideBarState(){
      return this.$store.state.hiddenSideBar;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  padding: 0;
  padding-left: 154px;
  min-width: 1360px;
  position: relative;
  height: 64px !important;
  line-height: 64px;
  background: linear-gradient(
    90deg,
    rgba(18, 189, 123, 1),
    rgba(26, 176, 160, 1)
  );
  color: #fff;
  border-bottom: 1px solid #20a0ff;
  .headBtn {
    position: absolute;
    left: 20px;
    cursor: pointer;
    i {
      font-size: 20px;
    }
  }
  .headerInfo {
    display: inline-block;
    // height: 64px;
    width: 500px;
    // margin-left: 150px;
    vertical-align: top;
    .organization {
      font-size: 20px;
      color: #fff;
    }
    .title {
      margin-left: 12px;
      font-size: 14px;
      color: #fff;
    }
  }
  .logo {
    top: 50%;
    left: 54px;
    width: 66px;
    height: 22px;
    margin-top: -11px;
    cursor: pointer;
    position: absolute;
    // background: url("~@assets/img/logo.png") no-repeat;
  }
  .user {
    position: relative;
    cursor: pointer;
    float: right;
    margin-right: 32px;
    .ld-user-name {
      max-width: 100px;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      font-size: 14px;
      color: #fff;
      line-height: 64px;
    }
    i {
      color: #fff;
    }
  }
  .userHeader {
    // position: absolute;
    // top: 50%;
    // margin-top: -18px;
    // left: -52px;
    margin-top: 14px;
    margin-right: 14px;
    float: right;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  // 搜索框
  .ld-search-input {
    display: inline-block;
    width: 400px;
    margin-left: 30px;
    height: 32px;
    position: relative;
    .input-selection {
      height: 32px;
      margin: 16px 0;
      background: rgba(0, 0, 0, 0.06);
      width: 400px;
      input {
        width: 370px;
        height: 32px;
        background: transparent;
        color: #fff;
        padding: 0 20px;
        vertical-align: top;
      }
      input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      .iconfont {
        display: inline-block;
        line-height: 32px;
        vertical-align: top;
      }
      .iconkucunkantai-shouqi_zhankai{
        transform: translateY(90deg);
      }
    }
    .search-drop {
      position: absolute;
      top: 64px;
      left: 0;
      z-index: 4;
      width: 564px;
      height: 287px;
      background-color: #fff;
      box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      color: #2b3d51;
      .search-result {
        margin: 20px 0;
      }
      .search-order-info {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        position: relative;
        .ld-ser-list {
          width: 100%;
          .ser-cont-group {
            display: inline-block;
            width: 440px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
          }
        }
        .msg-show-box {
          display: none;
        }
        .ser-type {
          display: inline-block;
          width: 60px;
          height: 24px;
          border-radius: 2px;
          line-height: 24px;
          text-align: center;
          margin-right: 12px;
          font-size: 12px;
        }
        .ser-type.ser-type1 {
          background: rgba(255, 77, 79, 0.1);
          color: #ff4d4f;
        }
        .ser-type.ser-type2 {
          background: rgba(245, 163, 30, 0.1);
          color: #f5a31e;
        }
        .ser-type.ser-type3 {
          background: rgba(19, 194, 195, 0.1);
          color: #13c2c3;
        }
        .ser-keyword {
          color: #12bd7b;
          // display: inline-block;
          // vertical-align: top;
        }
      }
      .search-order-info:hover {
        background: rgba(242, 243, 244, 1);
      }
      // hover信息框
      // .search-order-info:hover .msg-show-box {
      //   display: block;
      //   position: absolute;
      //   top: -70px;
      //   left: 100px;
      //   z-index: 5;
      //   background-color: #fff;
      //   box-shadow: 0px 4px 10px 0px rgba(50, 68, 88, 0.06);
      //   border-radius: 4px;
      //   width: 300px;
      //   padding: 20px;
      //   p{
      //     margin-right: 20px;
      //   }
      // }
      .history-search {
        margin: 20px;
        .ser-his-title {
          height: 40px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(88, 103, 119, 1);
          line-height: 40px;
        }
        .search-list {
          width: 100%;
          overflow-x: hidden;
          line-height: 24px;
          .ser-history-key-word {
            display: inline-block;
            height: 24px;
            margin: 10px 0;
            padding: 0 5px;
            color: #2b3d51;
            background: rgba(43, 61, 81, 0.06);
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-dropdown-menu {
  top: 52px !important;
  .popper__arrow {
    display: none;
  }
}
</style>