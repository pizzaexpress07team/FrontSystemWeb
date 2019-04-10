<template>
  <el-row class="nav-wrapper" id="nav" type="flex" justify="start">
    <el-col :span="2" :offset="4">
      <div class="logo-wrapper">. PDQ .</div>
    </el-col>
    <el-col :span="4" class="left-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/menu">菜单</router-link>
      <router-link to="/about">关于</router-link>
    </el-col>
    <el-col :span="4" :offset="6" style="text-align: right">
      <div class="login-wrapper" v-if="!hasLogin">
        <router-link to="/login">登录</router-link>
      </div>
      <div class="register-wrapper" v-if="!hasLogin">
        <router-link :to="{path: '/login', query: { register: true }}">注册</router-link>
      </div>
      <div class="cart-wrapper" v-if="hasLogin">
        <i class="icon-cart"></i>
      </div>
      <el-dropdown v-if="hasLogin" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="icon-wink"></i>{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  command="checkPerson">
            <i class="icon-user"></i>个人中心
          </el-dropdown-item>
          <el-dropdown-item command="changeAddr">
            <i class="icon-home3"></i>地址管理
          </el-dropdown-item>
          <el-dropdown-item command="checkOrder">
            <i class="icon-clipboard"></i>订单中心
          </el-dropdown-item>
          <el-dropdown-item command="userLogout">
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
    return {
      hasLogin: false,
      username: '',
    };
  },
  beforeMount() {
    // 判断是否有登录态
    if (sessionStorage.getItem('pdqUser')) {
      this.username = JSON.parse(sessionStorage.getItem('pdqUser'));
      this.hasLogin = true;
    }
  },
  methods: {
    /**
     * 下拉菜单点击事件
     * @param command
     */
    handleCommand(command) {
      if (command === 'checkPerson') {
        // TODO:跳转到首页
      } else if (command === 'changeAddr') {
        // TODO:跳转到地址管理页
      } else if (command === 'checkOrder') {
        // TODO:跳转到订单管理页
      } else if (command === 'userLogout') {
        sessionStorage.removeItem('pdqUser');
        this.$router.go(0);
      }
    },
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
  .cart-wrapper {
    display: inline-block;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin: 15px;
    padding: 3px;
    background: #f56c6c;
    transition: background .3s;
    transform: translateY(2px);
    i {
      display: inline-block;
      width: 30px;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
    }
    &:hover {
      background: #f56c6c99;
      cursor: pointer;
    }
  }
  .el-dropdown {
    margin: 15px 0;
    padding: 3px 0;
    .el-dropdown-link {
      display: inline-block;
      border: 1px solid #979797;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 15px;
    }
    i {
      display: inline-block;
      line-height: 20px;
      width: 20px;
      text-align: center;
      vertical-align: middle;
      position: relative;
      top: -1px;
      &:first-child {
        margin-right: 4px;
      }
    }
    &:hover {
      cursor: pointer;
      .el-icon--right {
        transform: rotate(-180deg);
        transition: .3s;
      }
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
      position: relative;
      &::after {
        content: '';
        position: absolute;
        border-bottom: 2px solid #000000;
        left: 0; right: 0; bottom: -1px;
        transform: scaleX(0);
        transition: transform .25s;
      }
      &:hover::after {
        transform: scaleX(1);
      }
      &.router-link-exact-active::after {
        transform: scaleX(1);
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
