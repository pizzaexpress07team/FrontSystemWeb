<template>
  <div class="home">
    <NavMenu />
    <el-row class="banner-container">
      <el-col :span="24" class="banner-wrapper">
        <div class="banner-word">PDQ</div>
        <div class="banner-img-wrapper">
          <img class="banner-img" src="http://d2f7o8gw4q8bay.cloudfront.net/pizza.png"  alt="pizza"/>
        </div>
        <div class="banner-word">
          <span class="typing">EXPRESS</span>
          <el-tag class="word-tag">30分钟必达的美味</el-tag>
        </div>
      </el-col>
    </el-row>
    <el-row class="step-toast">
      <el-col :span="16" :offset="4">
        <el-tag class="tips-tag">享受美味的披萨，你只需要以下三步</el-tag>
      </el-col>
      <el-col :span="16" :offset="4">
        <div class="step-wrapper">
          <div class="step-svg">
            <svg-icon iconClass="add-to-cart" className="step-show"></svg-icon>
            <div class="step-word">在线选购心仪餐品</div>
          </div>
        </div>
        <div class="step-line"></div>
        <div class="step-wrapper">
          <svg-icon iconClass="online-payment" className="step-show"></svg-icon>
          <div class="step-word">确认您的订单并支付</div>
        </div>
        <div class="step-line"></div>
        <div class="step-wrapper">
          <svg-icon iconClass="scooter" className="step-show"></svg-icon>
          <div class="step-word">等待我们送货上门</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="button-wrapper">
          <el-button @click="jumpToMenu">
            开始选购
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="app-container">
        <div class="app-wrapper">
          <img class="app-img" src="../assets/images/home/app.png" alt="APP">
        </div>
        <div class="push-wrapper">
          <div class="push-word">APP新用户首次下单</div>
          <div class="push-word highlight-word">立减15元</div>
          <div class="push-word">立即下载App,享受<br/>更多优惠吧</div>
        </div>
        <div class="qrcode-wrapper">
          <img class="qrcode-img" src="../assets/images/home/qrcode.png" alt="下载享受更多优惠">
        </div>
      </el-col>
    </el-row>
    <el-footer class="footer-fixed">
      <strong>Copyright</strong>
      <span> ©2019 PDQ All Rights Reserved</span>
    </el-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'home',
  components: {
    NavMenu,
  },
  data() {
    return {
      svgName: 'add-to-cart',
      activeStep: 0,
    };
  },
  mounted() {

  },
  methods: {
    jumpToMenu() {
      this.$router.push({
        path: '/menu',
      });
    },
  },
};
</script>

<style scoped lang="less">
  @keyframes slowShow {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .banner-container {
    background: #FDD14B;
    border-radius: 0 0 24px 24px;
    padding-bottom: 60px;
    .banner-word {
      display: inline-block;
      font-family: "Fira Sans", sans-serif;
      font-size: 68px;
      line-height: 200px;
      height: 200px;
      letter-spacing: 2px;
      vertical-align: top;
      position: relative;
      .typing {
        width: 4.2em;
        display: inline-block;
        animation: typing 1s steps(7, end);
        overflow: hidden;
      }
      /* 打印效果 */
      @keyframes typing {
        from { width: 0; }
        to { width: 4.2em; }
      }
      .word-tag {
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        font-size: 18px;
        color: #000000;
        text-align: center;
        background: #FEF0F0;
        line-height: 32px;
        height: 42px;
        border: 1px solid #F56C6C;
        border-radius: 8px;
        padding: 5px 0;
        animation: slowShow;
        animation-duration: 4s;
      }
    }
    .banner-img-wrapper {
      display: inline-block;
      width: 11.5em;
      height: 11.5em;
      padding: 0 70px 0 80px;
    }
    .banner-img {
      display: inline-block;
      width: 11.5em;
      height: 11.5em;
      transform: rotate(-45deg);
    }
  }
  .step-toast {
    animation: slowShow;
    animation-duration: 1.3s;
    margin-top: 30px;
    font-family: "PingFang SC", sans-serif;
    .tips-tag {
      height: 36px;
      padding: 5px 80px;
      font-size: 16px;
      color: #000000;
      text-align: center;
      border: 1px solid #f56c6c;
      background: #FEF0F0;
      line-height: 26px;
      border-radius: 8px;
    }
  }
  .step-wrapper {
    display: inline-block;
    width: 165px;
    height: 170px;
    text-align: center;
    padding:30px 0 20px;
    box-sizing: border-box;
    position: relative;
    .step-show {
      width: 64px;
      height: 64px;
    }
    .step-word {
      font-size: 16px;
      color: #000000;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
    }
  }
  .step-line {
    display: inline-block;
    border: 1px dashed #FDD14B;
    width: 10em;
    height: 0;
    position:relative;
    top: -22px
  }
  .button-wrapper {
    height: 0;
    width: 100%;
    margin-top: 50px;
    border: 1px dashed #FDD14B;
  }
  .app-container {
    background: #FDD14B;
    margin-top: 60px;
    animation: slowShow;
    animation-duration: 2.3s;
    .app-wrapper {
      display: inline-block;
      width: 200px;
      padding: 40px;
      .app-img {
        display: inline-block;
        height: 300px;
      }
    }
    .push-wrapper {
      display: inline-block;
      height: 200px;
      vertical-align: top;
      padding-top: 100px;
      box-sizing: border-box;
      .push-word {
        min-height: 40px;
        padding: 10px;
        font-size: 20px;
        box-sizing: border-box;
        &.highlight-word {
          font-size: 44px;
          padding: 0;
          color: #f56c6c;
        }
      }
    }
    .qrcode-wrapper {
      display: inline-block;
      height: 200px;
      padding: 0 60px;
      -webkit-transform: translateY(-20%);
      transform: translateY(-38%);
      box-sizing: border-box;
      .qrcode-img {
        display: inline-block;
        height: 150px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #979797;
      }
    }
  }
  .footer-fixed {
    text-align: center;
    white-space: pre-wrap;
    line-height: 30px;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.7) 100%);
  }
</style>
<style lang="less">
  // 样式覆写
  .home .button-wrapper {
    .el-button {
      position: relative;
      transform: translateY(-50%);
      width: 12em;
      line-height: 22px;
      background: #FDD14B;
      color: #000000;
      border: 1px solid #979797;
      transition: background, box-shadow .5s;
      &:hover {
        background: #fff33b;
        color: #000000;
        border-color: #979797;
        box-shadow: 0 4px 5px 2px rgba(0,0,0,0.1);
      }
    }
  }
  .home .footer-fixed {
    padding: 5px 0;
    height: 40px!important;
  }
</style>
