<template>
  <el-row class="nav-wrapper" id="nav" type="flex" justify="start">
    <el-col :span="2" :offset="4">
      <div class="logo-wrapper">PDQ</div>
    </el-col>
    <el-col :span="4" class="left-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/menu">菜单</router-link>
      <router-link to="/about">关于我们</router-link>
    </el-col>
    <el-col :span="2" :offset="8">
      <router-link to="/login">登录</router-link>
      <el-dropdown>
      <span class="el-dropdown-link">
        我的<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="icon-cart"></i>购物车
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="icon-user"></i>个人中心
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="icon-switch"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  padding: 10px 0 0!important;
  line-height: 30px;
  border-bottom: 1px solid #e3e3e3;
  .logo-wrapper {
    letter-spacing: 2px;
    padding-bottom: 4px;
    font-size: 26px;
    font-weight: bold;
  }
  a {
    text-decoration: none;
    padding:0 5px 4px;
    font-weight: bold;
    color: #2c3e50;
    transition: color .3s;
    margin: 0;
    &:hover {
      color: #E6A23C!important;
    }
  }
  a.router-link-exact-active {
    color: #E6A23C!important;
    border-bottom: 2px solid #E6A23C;
  }
  .left-nav {
    a {
      margin-right: 15px;
    }
  }
  .el-dropdown {
    cursor: pointer;
    font-size: 16px;
    padding:0 5px;
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
