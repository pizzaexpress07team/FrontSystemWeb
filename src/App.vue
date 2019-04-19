<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "./assets/icon/style.less";

body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: AvenirNext-DemiBold, PingFangSC-Semibold, sans-serif, "PingFang SC",
  "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*通用样式*/
a {
  text-decoration: none;
}
.breadcrumb-wrapper {
  margin-bottom: 20px;
  padding-left: 30px;
}
.empty-wrapper {
  padding: 20px;
  line-height: 100px;
  font-size: 22px;
  color: #979797;
  text-align: center;
}
</style>
