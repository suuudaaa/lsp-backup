<template>
  <div class="app-login">
    <!-- <img src="" alt=""> -->
    <div class="ld-login-erweima">二维码展示</div>
    <div class="app-text">
      <p>请使用LSP APP扫描二维码登录</p>
      <p>“LSP 供应链管理平台”</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.app-login {
  width: 100%;
  margin-bottom: 32px;
  .ld-login-erweima {
    height: 200px;
    width: 200px;
    margin: 20px 68px 24px;
    border: 1px solid #ccc;
  }
  .app-text {
    text-align: center;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(88, 103, 119, 1);
  }
}
</style>