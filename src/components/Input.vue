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
             v-model="content">
      <label class="input-label">{{holder}}</label>
    </div>
    <div class="error-wrapper"
         v-if="errorMsg"
    >{{errorMsg}}</div>
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
  },
  data() {
    return {
      content: '',
    };
  },
  watch: {
    showErrorMsg(curVal) {
      if (curVal) {
        this.errorMsg = curVal;
      }
    },
  },
  methods: {
    /**
     * 发送input内容给父级元素
     */
    inputChange() {
      const input = {
        label: this.holder,
        content: this.content,
      };
      this.$emit('listenInputChange', input);
    },
  },
};
</script>

<style scoped>
  /*输入框样式*/
  .input-fill-x {
    width: -moz-fit-content;
    width: fit-content;
    position: relative;
    margin-bottom: 5px;
    background: #ffffff;
    border-radius: 16px 16px 0 0;
    padding: 0 5px;
    border-bottom: 1px solid #d0d0d5;
  }
  .input-fill-x::after {
    content: '';
    position: absolute;
    border-bottom: 2px solid #a3161e;
    left: 0; right: 0; bottom: -1px;
    transform: scaleX(0);
    transition: transform .25s;
  }
  .input-fill-x:focus-within::after {
    transform: scaleX(1);
  }
  .input-control {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
  }
  .input-fill {
    padding: 20px 16px 6px;
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
    font-size: 16px;
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
    transform: scale(0.75) translateY(-19px) translateX(10px);
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
    text-align: left;
    font-size: 12px;
    margin-bottom: 5px;
    color: #F56C6C;
  }
</style>
