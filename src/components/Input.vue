<template>
  <div>
    <div class="input-fill-x">
      <i v-if="icon"
         class="input-icon"
         :class="icon"></i>
      <input @change="inputChange"
             class="input-control input-fill"
             :placeholder="holder"
             :type="security ? 'password' : 'text'"
             v-model="content"
             ref="content"
             autocomplete>
      <label class="input-label">{{holder}}</label>
      <div class="error-wrapper"
           v-if="errorMsg"
      >{{errorMsg}}</div>
      <div class="captcha-wrapper"
           v-if="captchaPhone">
        <el-button type="text"
                   style="height:20px;padding:0;"
                   @click="getCaptcha"
                   :disabled="waitingCaptcha"
        >{{captcha}}</el-button>
      </div>
    </div>
    <div v-if="needRepeatCheck"
         style="margin-top: 18px;">
      <div class="input-fill-x">
        <i v-if="icon"
           class="input-icon"
           :class="icon"></i>
        <input @change="checkChange"
               class="input-control input-fill"
               :placeholder='holder'
               :type="security ? 'password' : 'text'"
               v-model="checkContent"
               ref="content"
               autocomplete>
        <label class="input-label">确认输入</label>
        <div class="error-wrapper"
             v-if="errorMsg"
        >{{errorMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    holder: String, // label名称
    icon: String, // icon的类
    security: Boolean, // 是否密文显示
    errorMsg: String, // 错误提示
    captchaPhone: String, // 验证手机号
    needRepeatCheck: Boolean, // 需要确认验证
  },
  data() {
    return {
      content: '',
      focusStatus: false, // 用于自动聚焦
      captcha: '获取验证码', // 验证码文案
      waitingCaptcha: false, // 重新发送禁止标识
      checkContent: '', // 确认xxx的内容
    };
  },
  watch: {
    errorMsg(curVal) {
      if (curVal) {
        this.errorMsg = curVal;
      }
    },
  },
  methods: {
    /**
     * 发送input内容给父级元素
     * @param {string} something 需要报告给父组件的其他信息
     */
    inputChange(something) {
      const input = {
        label: this.holder,
        content: this.content.trim(),
        otherInfo: something,
      };
      this.$emit('listenInputChange', input);
    },
    /**
     * 密码验证
     */
    checkChange() {
      if (this.checkContent.trim() !== this.content.trim()) {
        this.inputChange('密码输入不一致');
      } else {
        this.inputChange(' ');
      }
    },
    /**
     * 获取验证码
     */
    getCaptcha() {
      // 验证手机号
      if (!this.captchaPhone || this.captchaPhone === '0') {
        this.inputChange('请先输入手机号');
        return;
        // eslint-disable-next-line
      } else if (!(/^1[34578]\d{9}$/.test(this.captchaPhone))) {
        this.inputChange('请输入正确的手机号');
        return;
        // eslint-disable-next-line
      } else {
        this.inputChange(' ');
      }

      let waitTime = 60;
      const timeInterval = setInterval(() => {
        waitTime -= 1;
        if (waitTime > 0) {
          this.waitingCaptcha = true;
          this.captcha = `重新发送 ${waitTime}s`;
        } else {
          waitTime = 60;
          this.captcha = '获取验证码';
          this.waitingCaptcha = false;
          clearInterval(timeInterval);
        }
      }, 1000);
      this.$refs.content.focus();
      // TODO: 验证码发送
    },
  },
};
</script>

<style lang="less">
  /*输入框样式*/
  .input-fill-x {
    width: -moz-fit-content;
    width: fit-content;
    position: relative;
    margin: 0 auto 5px;
    background: #ffffff;
    border-radius: 16px 16px 0 0;
    padding: 0 5px;
    border-bottom: 1px solid #d0d0d5;
    .captcha-wrapper {
      position: absolute;
      bottom: 0;
      top: 10px;
      right: 0;
      width: 80px;
      height: 20px;
      font-size: 14px;
      margin: auto;
    }
  }
  .input-fill-x::after {
    content: '';
    position: absolute;
    border-bottom: 2px solid #E6A23C;
    left: 0; right: 0; bottom: -1px;
    transform: scaleX(0);
    transition: transform .25s;
  }
  .input-fill-x:focus-within::after {
    transform: scaleX(1);
  }
  .input-control {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    outline: none;
  }
  .input-fill {
    padding: 20px 12px 6px;
    border: 1px solid transparent;
    background: #ffffff;
    border-radius: 16px 16px 0 0;
  }
  .input-control:placeholder-shown::placeholder {
    color: transparent;
  }
  /* 默认placeholder颜色透明不可见 */
  .input-control:placeholder-shown::placeholder {
    color: transparent;
  }
  .input-label {
    position: absolute;
    font-size: 14px;
    line-height: 1.5;
    left: 40px; top: 19px;
    color: #a2a9b6;
    padding: 0 2px;
    transform-origin: 0 0;
    pointer-events: none;
    transition: all .25s;
  }
  /* 填充样式下label定位 */
  .input-fill:not(:placeholder-shown) ~ .input-label,
  .input-fill:focus ~ .input-label {
    transform: scale(0.75) translateY(-19px) translateX(8px);
  }
  /* 线框交互下有个白色背景 */
  .input-outline ~ .input-label,
  .textarea-outline  ~ .input-label {
    background-color: #fff;
  }
  /*图标样式*/
  .input-icon{
    margin: 0 5px 0 10px;
  }
  .error-wrapper {
    position: absolute;
    text-align: left;
    font-size: 12px;
    color: #F56C6C;
  }
</style>
