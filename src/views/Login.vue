<template>
  <el-container class="login-container">
    <el-main style="margin-top: 60px;">
      <el-row type="flex" justify="center">
        <el-col class="login-block"
                :span="7"
        >
          <el-row type="flex"
                  align="middle"
                  justify="space-between"
                  class="left-wrapper"
          ><el-col>
              <div>
                <img class="logo-image" src="@/assets/logo.png"/>
                <div>Pizza Express</div>
              </div>
            </el-col>
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
     * 表单提交
     */
    loginSubmit() {
      this.submitLoading = true;
      const rejectSubmit = this.checkInput();
      if (rejectSubmit) {
        this.submitLoading = false;
        throw new Error('表单验证未通过');
      }
      // TODO:后台数据提交
      setTimeout(() => {
        this.submitLoading = false;
      }, 1300);
    },
    /**
     * 回车提交表单
     */
    enterToLogin() {
      this.loginSubmit();
    },
    /**
     *
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
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 16px 0 0 16px;
  padding: 25px 0;
  -webkit-box-shadow: -5px 1px 20px 0px rgba(32,33,36, 0.28);
  -moz-box-shadow: -5px 1px 20px 0px rgba(32,33,36, 0.28);
  box-shadow: -5px 1px 20px 0px rgba(32,33,36, 0.28);
}
.image-wrapper {
  width: 100%;
}
.image-content {
  display: block;
  width:100%;
  border-radius: 0 16px 16px 0;
  box-shadow: 0px 0px 20px 1px rgba(32,33,36, 0.28);
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
  height: 40px!important;
  background: linear-gradient(180deg, rgba(255,255,255, 0.5) 0%, rgba(255,255,255, 0.7) 100%);
}
</style>
