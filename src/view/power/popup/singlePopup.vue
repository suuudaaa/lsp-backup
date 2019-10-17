<template>
  <div>
    <el-dialog
      :custom-class="'popupContainer'"
      :width="config.width+'px'"
      :show-close="false"
      :visible.sync="config.visible"
      :before-close="show"
      :modal="false"
      :open="openFun"
    >
      <i class="iconfont icongongsiguanli-shanchuanniu diyClose" @click="show"></i>

      <el-row class="diyContainer">
        <el-col>
          <div class="diyHead" v-if="config.title">
            <span>{{config.title}}</span>
          </div>
          <div class="diyBody">
            <el-form>
              <el-row>
                <el-col class="selectAllCol">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                  >全选</el-checkbox>
                </el-col>
              </el-row>

              <div class="scrollBody">
                <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                  <el-row>
                    <el-col v-for="city in data" :label="city.name" :key="city.name" :span="8">
                      <el-checkbox :label="city.name">{{city.name}}</el-checkbox>
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
    data: {
      type: Array,
      default: new Array()
    },
    config: {
      type: Object,
      default: new Object(),
      title: {
        type: String,
        default: ""
      },
      visible: {
        required: true,
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: "300px"
      },
      container: {
        type: [Array],
        default: []
      },
      default: {
        type: [Array],
        default: []
      }
    }
  },
  mounted() {
    console.log("?default:", this.config.default);
  },
  data() {
    return {
      checkAll: false,
      checked: [],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkAll = !!this.checkAll;
      let _checked = this.data.map(item => {
        return item.name;
      });
      this.checked = this.checkAll ? _checked : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.data.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.data.length;
    },
    commit() {
      let result = [];
      this.checked.forEach(id => {
        result.push({
          id: id,
          name: ""
        });
      });
      this.$emit("return", result);
      this.$emit("show");
    },
    reset() {
      (this.checked = []), (this.isIndeterminate = false);
    },
    show() {
      console.log("???@@@");
      this.$emit("show");
    },
    openFun(){
      console.log("???");
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