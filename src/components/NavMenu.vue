<template>
  <el-row class="nav-wrapper" id="nav" type="flex" justify="start">
    <el-col :span="2" :offset="4">
      <div class="logo-wrapper">. PDQ .</div>
    </el-col>
    <el-col :span="3" class="left-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/menu">菜单</router-link>
      <router-link to="/about">关于</router-link>
    </el-col>
    <el-col :span="4" :offset="7" style="text-align: right">
      <div class="login-wrapper">
        <router-link to="/login">登录</router-link>
      </div>
      <div class="register-wrapper">
        <router-link :to="{path: '/login', query: { register: true }}">注册</router-link>
      </div>
<!--      <el-dropdown>-->
<!--      <span class="el-dropdown-link">-->
<!--        我的<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--      </span>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <el-dropdown-item>-->
<!--            <i class="icon-cart"></i>购物车-->
<!--          </el-dropdown-item>-->
<!--          <el-dropdown-item>-->
<!--            <i class="icon-user"></i>个人中心-->
<!--          </el-dropdown-item>-->
<!--          <el-dropdown-item>-->
<!--            <i class="icon-switch"></i>退出登录-->
<!--          </el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.nav-wrapper {
  background: #FDD14B;
  .logo-wrapper {
    font-family: AvenirNext-DemiBold, sans-serif, "PingFang SC";
    font-size: 24px;
    color: #000000;
    text-align: center;
    line-height: 60px;
  }
  .left-nav{
    font-family: PingFangSC-Semibold, sans-serif, "PingFang SC";
    font-size: 15px;
    color: #000000;
    text-align: left;
  }
  .login-wrapper {
    display: inline-block;
    border-radius: 15px;
    background: #f56c6c;
    margin: 15px 20px 15px 0;
    transition: background .3s;
    &:hover {
      background: #f54a47;
    }
  }
  .register-wrapper {
    display: inline-block;
    border-radius: 15px;
    background: #f0f9eb;
    border: 1px solid #67C23A;
    margin: 15px 0;
    transition: background .3s;
    &:hover {
      background: #67C23A;
    }
  }
}
</style>
<style lang="less">
  // 样式覆写
.nav-wrapper {
  .left-nav {
    a {
      display: inline-block;
      line-height: 30px;
      margin: 15px 15px;
      padding: 0 5px;
      color: #000000;
      &.router-link-exact-active {
        border-bottom: 2px solid #000000;
      }
    }
  }
  .login-wrapper {
    text-align: center;
    a {
      display: inline-block;
      width: 75px;
      line-height: 30px;
      color: #ffffff;
    }
  }
  .register-wrapper {
    text-align: center;
    a {
      display: inline-block;
      width: 75px;
      line-height: 30px;
      color: #67C23A;
      transition: color .3s;
      &:hover {
        color: #ffffff;
      }
    }
  }
}
</style>
