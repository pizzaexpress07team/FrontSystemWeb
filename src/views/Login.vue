<template>
  <el-container class="login-container">
    <el-main style="padding-top: 60px;">
      <el-collapse-transition>
        <div v-show="showLogin">
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
                          justify="space-around"
                          class="left-wrapper-inner"
                  >
                    <el-col :span="24">
                      <el-form class="login-wrapper"
                               @keyup.enter.native="enterToLogin"
                      >
                        <input-fill holder="帐号"
                                    icon="icon-user"
                                    @listenInputChange="formChange"
                                    :errorMsg="errorMsg[0]"
                                    style="margin-bottom: 18px;"
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
                                 size="medium"
                                 round
                      >登陆</el-button>
                      <el-button class="register-button"
                                 @click="registerJump"
                                 size="medium"
                                 type="success"
                                 plain
                                 round
                      >注册</el-button>
                    </el-col>
                    <el-col>
                      <third-part-login></third-part-login>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="second">
                  <el-row type="flex"
                          align="middle"
                          justify="space-around"
                          class="left-wrapper-inner"
                  >
                    <el-col :span="24">
                      <el-form class="login-wrapper"
                               @keyup.enter.native="enterPhoneToLogin"
                      >
                        <input-fill holder="手机号"
                                    icon="icon-phone"
                                    @listenInputChange="formChange"
                                    :errorMsg="errorPhoneMsg[0]"
                                    style="margin-bottom: 18px;"
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
                                 size="medium"
                                 round
                      >登陆</el-button>
                      <el-button class="register-button"
                                 @click="registerJump"
                                 type="success"
                                 size="medium"
                                 plain
                                 round
                      >注册</el-button>
                    </el-col>
                    <el-col>
                      <third-part-login></third-part-login>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="6">
              <div class="image-wrapper">
                <img class="image-content" src="@/assets/images/personalCenter/login.jpg"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="showRegister">
          <el-row class="register-block"
                  type="flex"
                  justify="center"
          >
            <el-col :span="7"
                    class="left-wrapper"
                    style="height: auto;"
            >
              <el-row type="flex"
                      align="middle"
                      justify="space-around"
                      class="left-wrapper-inner"
              >
                <el-col :span="24">
                  <el-form class="login-wrapper"
                           @keyup.enter.native="enterToLogin"
                  >
                    <input-fill holder="帐号"
                                icon="icon-user"
                                @listenInputChange="registerChange"
                                :errorMsg="errorRegisterMsg[2]"
                                style="margin-bottom: 18px;"
                    ></input-fill>
                    <input-fill holder="密码"
                                icon="icon-key"
                                @listenInputChange="registerChange"
                                :errorMsg="errorRegisterMsg[3]"
                                @keydown.enter="enterToLogin"
                                style="margin-bottom: 18px;"
                                security
                                needRepeatCheck
                    ></input-fill>
                    <input-fill holder="手机号"
                                icon="icon-phone"
                                @listenInputChange="registerChange"
                                :errorMsg="errorRegisterMsg[0]"
                                style="margin-bottom: 18px;"
                    ></input-fill>
                    <input-fill holder="验证码"
                                icon="icon-ticket"
                                @listenInputChange="registerChange"
                                :errorMsg="errorRegisterMsg[1]"
                                @keydown.enter="enterToRegister"
                                :captchaPhone="registerInfo.phone"
                                security
                    ></input-fill>
                  </el-form>
                </el-col>
                <el-col>
                  <el-button class="login-button"
                             @click="registerSubmit"
                             type="warning"
                             :loading="registerLoading"
                             size="medium"
                             round
                  >确认注册</el-button>
                  <el-button class="register-button"
                             @click="loginJump"
                             size="medium"
                             type="success"
                             plain
                             round
                  >已有帐号</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <div class="image-wrapper">
                <img class="image-content" src="@/assets/images/personalCenter/register.jpg"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-main>
    <el-footer class="footer-fixed">
      <strong>Copyright</strong> © PDQ All Rights Reserved
    </el-footer>
  </el-container>
</template>

<script>
import Input from '@/components/Input.vue';
import ThirdPartLogin from '@/components/ThirdPartLogin.vue';

export default {
  name: 'login',
  components: {
    'input-fill': Input,
    'third-part-login': ThirdPartLogin,
  },
  data() {
    return {
      showLogin: true,
      showRegister: false,
      loginInfo: {
        username: '',
        password: '',
      },
      errorMsg: [],
      submitLoading: false, // 登录的按钮loading状态
      registerLoading: false, // 注册的按钮loading状态
      activeName: 'second', // 登录方式面板标识
      captchaInfo: {
        phone: '0',
        captcha: '',
      }, // 验证的手机号码
      errorPhoneMsg: [],
      submitPhoneLoading: false,
      errorRegisterMsg: [], // 注册错误信息
      registerInfo: { // 注册信息
        username: '',
        password: '',
        phone: '0',
        captcha: '',
      },
    };
  },
  methods: {
    /**
     * input组件修改监听-登录相关
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
          this.checkPhoneInput(this.captchaInfo, 'errorPhoneMsg', data.otherInfo);
          return;
        }
        this.captchaInfo.captcha = data.content;
      }
    },
    /**
     * input组件修改监听-注册相关
     * @param data
     */
    registerChange(data) {
      if (data.label === '帐号') {
        this.registerInfo.username = data.content;
      } else if (data.label === '密码') {
        if (data.otherInfo && typeof data.otherInfo === 'string') {
          this.errorRegisterMsg[3] = data.otherInfo;
          return;
        }
        this.registerInfo.password = data.content;
      } else if (data.label === '手机号') {
        this.registerInfo.phone = data.content;
      } else if (data.label === '验证码') {
        if (data.otherInfo && typeof data.otherInfo === 'string') {
          this.checkPhoneInput(this.registerInfo, 'errorRegisterMsg', data.otherInfo);
          return;
        }
        this.registerInfo.captcha = data.content;
      }
    },
    /**
     * 表单格式检查
     * @return {boolean} rejectSubmit 确认是否可以提交表单
     */
    checkInput(info, msgArr) {
      let rejectSubmit = false;
      const errorMsgArr = [];
      if (!info.username) {
        errorMsgArr[0] = '请输入用户名';
        rejectSubmit = true;
      }
      if (!info.password) {
        errorMsgArr[1] = '请输入密码';
        rejectSubmit = true;
      }
      if (msgArr === 'errorMsg') {
        this.errorMsg = errorMsgArr;
      } else if (msgArr === 'errorRegisterMsg') {
        const a = errorMsgArr[0];
        const b = errorMsgArr[1];
        this.errorRegisterMsg[2] = a;
        this.errorRegisterMsg[3] = b;
      }
      return rejectSubmit;
    },
    /**
     * 帐号密码表单提交
     */
    loginSubmit() {
      this.submitLoading = true;
      const rejectSubmit = this.checkInput(this.loginInfo, 'errorMsg');
      if (rejectSubmit) {
        this.submitLoading = false;
        return;
      }
      // TODO:后台数据提交
      setTimeout(() => {
        this.submitLoading = false;
        this.$router.push({
          path: '/',
        });
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
     * @param {object} info 信息来源
     * @param {string} msgArr 错误信息所在数组名
     * @param {string} otherInfo 特殊信息
     * @return {boolean}
     */
    checkPhoneInput(info, msgArr, otherInfo) {
      let rejectSubmit = false;
      const errorMsgArr = [];
      if (otherInfo) {
        errorMsgArr[0] = otherInfo;
        rejectSubmit = true;
        if (msgArr === 'errorPhoneMsg') {
          this.errorPhoneMsg = errorMsgArr;
        } else if (msgArr === 'errorRegisterMsg') {
          this.errorRegisterMsg = errorMsgArr;
        }
        return rejectSubmit;
      }
      if (!info.phone || info.phone === '0') {
        errorMsgArr[0] = '请输入手机号';
        rejectSubmit = true;
      }
      if (!info.captcha) {
        errorMsgArr[1] = '请输入验证码';
        rejectSubmit = true;
      }
      if (msgArr === 'errorPhoneMsg') {
        this.errorPhoneMsg = errorMsgArr;
      } else if (msgArr === 'errorRegisterMsg') {
        const a = errorMsgArr[0];
        const b = errorMsgArr[1];
        this.errorRegisterMsg[0] = a;
        this.errorRegisterMsg[1] = b;
      }
      return rejectSubmit;
    },
    /**
     * 手机号表单提交
     */
    loginPhoneSubmit() {
      this.submitPhoneLoading = true;
      const rejectSubmit = this.checkPhoneInput(this.captchaInfo, 'errorPhoneMsg', '');
      if (rejectSubmit) {
        this.submitPhoneLoading = false;
        return;
      }
      // TODO:后台数据提交
      setTimeout(() => {
        this.submitPhoneLoading = false;
        this.$router.push({
          path: '/',
        });
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
      this.showLogin = false;
      setTimeout(() => {
        this.showRegister = true;
      }, 500);
    },
    /**
     * 跳转回登录
     */
    loginJump() {
      this.showRegister = false;
      setTimeout(() => {
        this.showLogin = true;
      }, 500);
    },
    /**
     * 注册信息提交
     */
    registerSubmit() {
      this.checkPhoneInput(this.registerInfo, 'errorRegisterMsg', '');
      this.checkInput(this.registerInfo, 'errorRegisterMsg');
      // TODO:后台数据提交
    },
    /**
     * 回车提交注册
     */
    enterToRegister() {
      this.registerSubmit();
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
