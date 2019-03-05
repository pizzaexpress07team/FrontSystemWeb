<template>
  <el-container class="login-container">
    <el-main style="padding-top: 60px;">
      <el-row class="login-block"
              type="flex"
              justify="center"
      >
        <el-col :span="7">
          <el-tabs v-model="activeName"
                  class="left-wrapper"
          >
            <el-tab-pane label="帐号密码登录" name="first">
              <el-row type="flex"
                      align="middle"
                      justify="space-between"
                      class="left-wrapper-inner"
              >
                <el-col :span="12">
                  <el-form class="login-wrapper"
                           @keyup.enter.native="enterToLogin"
                  >
                    <input-fill holder="帐号"
                                icon="icon-user"
                                @listenInputChange="formChange"
                                :errorMsg="errorMsg[0]"
                                style="margin-bottom: 12px;"
                    ></input-fill>
                    <input-fill holder="密码"
                                icon="icon-key"
                                @listenInputChange="formChange"
                                :errorMsg="errorMsg[1]"
                                @keydown.enter="enterToLogin"
                                security
                    ></input-fill>
                  </el-form>
                </el-col>
                <el-col>
                  <el-button class="login-button"
                             @click="loginSubmit"
                             type="warning"
                             :loading="submitLoading"
                             round
                  >登陆</el-button>
                  <el-button class="register-button"
                             @click="registerJump"
                             type="success"
                             plain
                             round
                  >注册</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="second">
              <el-row type="flex"
                      align="middle"
                      justify="space-between"
                      class="left-wrapper-inner"
              >
                <el-col :span="12">
                  <el-form class="login-wrapper"
                           @keyup.enter.native="enterPhoneToLogin"
                  >
                    <input-fill holder="手机号"
                                icon="icon-phone"
                                @listenInputChange="formChange"
                                :errorMsg="errorPhoneMsg[0]"
                                style="margin-bottom: 12px;"
                    ></input-fill>
                    <input-fill holder="验证码"
                                icon="icon-ticket"
                                @listenInputChange="formChange"
                                @keydown.enter="enterPhoneToLogin"
                                :errorMsg="errorPhoneMsg[1]"
                                :captchaPhone="captchaInfo.phone"
                    ></input-fill>
                  </el-form>
                </el-col>
                <el-col>
                  <el-button class="login-button"
                             @click="loginPhoneSubmit"
                             type="warning"
                             :loading="submitPhoneLoading"
                             round
                  >登陆</el-button>
                  <el-button class="register-button"
                             @click="registerJump"
                             type="success"
                             plain
                             round
                  >注册</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="5">
          <div class="image-wrapper">
            <img class="image-content" src="@/assets/images/personalCenter/login.jpg"/>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="footer-fixed">
      <strong>Copyright</strong> © PDQ All Rights Reserved
    </el-footer>
  </el-container>
</template>

<script>
import Input from '@/components/Input.vue';

export default {
  name: 'login',
  components: {
    'input-fill': Input,
  },
  data() {
    return {
      loginInfo: {
        username: '',
        password: '',
      },
      errorMsg: [],
      submitLoading: false,
      activeName: 'second', // 登录方式面板标识
      captchaInfo: {
        phone: '0',
        captcha: '',
      }, // 验证的手机号码
      errorPhoneMsg: [],
      submitPhoneLoading: false,
    };
  },
  methods: {
    /**
     * input组件修改监听
     * @param data
     */
    formChange(data) {
      if (data.label === '帐号') {
        this.loginInfo.username = data.content;
      } else if (data.label === '密码') {
        this.loginInfo.password = data.content;
      } else if (data.label === '手机号') {
        this.captchaInfo.phone = data.content;
      } else if (data.label === '验证码') {
        if (data.otherInfo && typeof data.otherInfo === 'string') {
          this.checkPhoneInput(data.otherInfo);
          return;
        }
        this.captchaInfo.captcha = data.content;
      }
    },
    /**
     * 表单格式检查
     * @return {boolean} rejectSubmit 确认是否可以提交表单
     */
    checkInput() {
      let rejectSubmit = false;
      this.errorMsg = [];
      if (!this.loginInfo.username) {
        this.errorMsg[0] = '请输入用户名';
        rejectSubmit = true;
      }
      if (!this.loginInfo.password) {
        this.errorMsg[1] = '请输入密码';
        rejectSubmit = true;
      }
      return rejectSubmit;
    },
    /**
     * 帐号密码表单提交
     */
    loginSubmit() {
      this.submitLoading = true;
      const rejectSubmit = this.checkInput();
      if (rejectSubmit) {
        this.submitLoading = false;
        return;
      }
      // TODO:后台数据提交
      setTimeout(() => {
        this.submitLoading = false;
      }, 1300);
    },
    /**
     * 帐号密码回车提交表单
     */
    enterToLogin() {
      this.loginSubmit();
    },
    /**
     * 手机号输入检测
     * @param {string} otherInfo 特殊信息
     * @return {boolean}
     */
    checkPhoneInput(otherInfo) {
      let rejectSubmit = false;
      this.errorPhoneMsg = [];
      if (otherInfo) {
        this.errorPhoneMsg[0] = otherInfo;
        rejectSubmit = true;
        return rejectSubmit;
      }
      if (!this.captchaInfo.phone || this.captchaInfo.phone === '0') {
        this.errorPhoneMsg[0] = '请输入手机号';
        rejectSubmit = true;
      }
      if (!this.captchaInfo.captcha) {
        this.errorPhoneMsg[1] = '请输入验证码';
        rejectSubmit = true;
      }
      return rejectSubmit;
    },
    /**
     * 手机号表单提交
     */
    loginPhoneSubmit() {
      this.submitPhoneLoading = true;
      const rejectSubmit = this.checkPhoneInput();
      if (rejectSubmit) {
        this.submitPhoneLoading = false;
        return;
      }
      // TODO:后台数据提交
      setTimeout(() => {
        this.submitPhoneLoading = false;
      }, 1300);
    },
    /**
     * 手机号回车提交表单
     */
    enterPhoneToLogin() {
      this.loginPhoneSubmit();
    },
    /**
     * 注册跳转
     */
    registerJump() {
      this.$router.push({
        path: '/',
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background-image: url('../assets/images/personalCenter/background.jpg');
  background-size: 100%;
  background-repeat:no-repeat;
}
.logo-image {
  width: 50px;
}
.left-wrapper {
  height: 100%;
  background: #ffffff;
  border-radius: 16px 0 0 16px;
  padding: 25px 0;
  box-sizing: border-box;
}
.left-wrapper-inner {
  padding: 40px 0 20px;
  flex-direction: column;
  height: 100%;
}
.login-wrapper {
  /*margin-bottom: 40%;*/
}
.image-wrapper {
  width: 100%;
}
.image-content {
  display: block;
  width:100%;
  border-radius: 0 16px 16px 0;
}
.login-button, .register-button {
  width: 100px;
  font-weight: bold;
}
.footer-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  white-space: pre-wrap;
  line-height: 40px;
  height: 40px !important;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.7) 100%);
}
</style>
<style lang="less">
  .login-container {
    .el-tabs__header {
      width: fit-content;
      margin: 0 auto;
      .el-tabs__item.is-active {
        color: #E6A23C;
      }
      .el-tabs__item:hover {
        color: #E6A23C;
      }
      .el-tabs__active-bar {
        background-color: #E6A23C;
      }
    }
    .el-tabs__content {
      height: 85%;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
</style>
