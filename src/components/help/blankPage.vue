<template>
  <div class="blank-page">
    <img src="../../../static/img/no_data.png" alt />
    <p class="no-data-text">暂无问答数据</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.blank-page {
  height: 100%;
  width: 100%;
  padding: 200px 0;
  text-align: center;
  vertical-align: middle;
  background-color: #eef1f6;
  img {
    width: 120px;
    height: 120px;
  }
  .no-data-text {
    height: 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(126, 140, 155, 1);
  }
}
</style>