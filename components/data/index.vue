<template>
  <div class="container">
    <el-row class="firstLine">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          未完成订单持续时间
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          未完成订单状态
        </el-card>
      </el-col>
    </el-row>

    <el-row class="secondLine">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div>库内货物数量</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="theThirdLine">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div>库内货物库龄</div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div>库内货物周转率</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="fourth">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div>交易总览和交易明细</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mapContainer">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div>map</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="customerContainer">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.container {
  width: 1300px;
  min-height: 1000px;
}
.firstLine {
  margin-bottom: 25px;
  .box-card {
    width: 295px;
    height: 240px;
  }
}

.secondLine {
  margin-bottom: 23px;
  .box-card {
    width: 1270px;
    height: 560px;
  }
}
.theThirdLine {
  margin-bottom: 24px;
  .box-card {
    width: 620px;
    height: 300px;
  }
}
.fourth {
  margin-bottom: 24px;
  .box-card {
    width: 1270px;
    height: 490px;
  }
}

.mapContainer {
  margin-bottom: 24px;
  .box-card {
    width: 1270px;
    height: 490px;
    background: #12bd7b;
  }
}

.customerContainer {
  .box-card {
    width: 295px;
    height: 284px;
    margin-bottom: 24px;
  }
}
</style>
