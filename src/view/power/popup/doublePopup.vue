<template>
  <div>
    <el-dialog
      :custom-class="'popupContainer'"
      :width="config.width+'px'"
      :show-close="false"
      :visible.sync="config.visible"
      :before-close="show"
      :modal="false"
    >
      <i class="iconfont icongongsiguanli-shanchuanniu diyClose" @click="show"></i>

      <el-row class="diyContainer">
        <el-col :span="12">
          <div class="diyHead" v-if="lData.title">
            <span>{{lData.title}}</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox :indeterminate="l.isAll" v-model="l.checkAll" @change="lChangeAll">全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="l.checked" @change="lChangeChecked">
                  <el-row>
                    <el-col v-for="(item) in lData.data" :key="item">
                      <el-checkbox :label="item">{{item}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </el-form>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="diyHead" v-if="rData.title">
            <span>{{rData.title}}</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox :indeterminate="r.isAll" v-model="r.checkAll" @change="rChangeAll">全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="r.checked" @change="rChangeChecked">
                  <el-row>
                    <el-col v-for="(item) in rData.data" :key="item">
                      <el-checkbox :label="item">{{item}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row class="btnLine">
        <el-col>
          <el-button type="primary" class="formBtn commitBtn" @click="commit">提交</el-button>
          <el-button class="formBtn resetBtn" @click="reset">清除</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: new Object(),
      visible: {
        required: true,
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: "300px"
      }
    },
    lData: {
      type: Object,
      default: new Object(),
      title: {
        type: String,
        default: ""
      },
      data: {
        type: Array,
        default: new Array()
      }
    },
    rData: {
      type: Object,
      default: new Object(),
      title: {
        type: String,
        default: ""
      },
      data: {
        type: Array,
        default: new Array()
      }
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      l: {
        checkAll: false,
        checked: [],
        isAll: true
      },
      r: {
        checkAll: false,
        checked: [],
        isAll: true
      }
    };
  },
  methods: {
    init() {},
    lChangeAll(val) {
      this.l.checked = val ? this.lData.data : [];
      this.l.isAll = false;
    },
    lChangeChecked(value) {
      let count = value.length;
      this.l.checkAll = count === this.lData.data.length;
      this.l.isAll = count > 0 && count < this.lData.data.length;
    },

    rChangeAll(val) {
      this.r.checked = val ? this.lData.data : [];
      this.r.isAll = false;
    },
    rChangeChecked(value) {
      let count = value.length;
      this.r.checkAll = count === this.lData.data.length;
      this.r.isAll = count > 0 && count < this.lData.data.length;
    },
    commit() {
      this.$emit("return", {
        result: [this.l.checked, this.r.checked]
      }),
        this.$emit("show");
    },
    reset() {
      (this.checked = []), (this.l.isAll = false), (this.r.isAll = false);
    },
    show() {
      this.$emit("show");
    }
  }
};
</script>

<style lang="scss">
/* native begin */
.popupContainer {
  border-radius: 8px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 25px 22px 20px 22px;
    .el-button {
      padding: 0px;
    }
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
/* native end */
.popupContainer {
  .diyClose {
    z-index: 1;
    cursor: pointer;
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: 16px;
  }
  .diyHead {
    text-align: center;
    width: 100%;
    line-height: 30px;
    span {
      color: #2b3d51;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .diyBody {
    padding: 14px 0px 0px 0px;
    .scrollBody {
      margin: 20px 0px 10px 0px;
      overflow-y: auto;
      min-height: 30px;
      max-height: 180px;
      padding: 10px;
      .el-checkbox {
        margin-bottom: 24px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .selectAllCol {
      text-align: center;
    }
  }
  .btnLine {
    text-align: center;
    margin: 0px 0px 20px 0px;
    .formBtn {
      width: 144px;
      height: 36px;
    }
    .resetBtn {
      border-color: #12bd7b;
      color: #12bd7b;
    }
  }
}
</style>