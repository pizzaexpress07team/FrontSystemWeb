<template>
  <div class="third-part">
    <div class="login-tips">使用其他方式登录</div>
    <div class="button-wrapper">
      <el-button class="icon-qq"
                 circle
                 type="danger"
                 size="medium"
                 plain
                 @click="jumpToQQ"
      ></el-button>
      <el-button class="icon-sina-weibo"
                 circle
                 type="danger"
                 size="medium"
                 plain
                 @click="jumpToWeibo"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThirdPartLogin',
  methods: {
    jumpToQQ() {
      // TODO: 这里处理QQ的第三方录入逻辑
    },
    jumpToWeibo() {
      // TODO: 这里处理微博的第三方录入逻辑
    },
  },
};
</script>

<style scoped lang="less">
.third-part {
  .login-tips {
    position: relative;
    margin: 0 0 20px;
    font-size: 12px;
    color: #b5b5b5;
    &:before {
      content: '';
      border-top: 1px solid #b5b5b5;
      display: block;
      position: absolute;
      width: 15%;
      top: 9px;
      left: 20%;
    }
    &:after {
      content: '';
      border-top: 1px solid #b5b5b5;
      display: block;
      position: absolute;
      width: 15%;
      top: 9px;
      right: 20%;
    }
  }
}
</style>
