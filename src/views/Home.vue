<template>
  <div class="home">
    <NavMenu />
    <el-row class="pic-wrapper">
      <el-col :span="16" :offset="4">
        <el-carousel :interval="6000" type="card" height="260px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row class="step-wrapper">
      <el-col :span="16" :offset="4">
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <div class="pizza-pic">
              <img style="transform: rotate(-135deg);" src="../assets/logo.png"  alt="pizza"/>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="step-toast">享受美味的Pizza，你只需要以下三步</div>
          </el-col>
          <el-col :span="2">
            <div class="pizza-pic">
              <img style="transform: rotate(45deg);" src="../assets/logo.png"  alt="pizza"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16" :offset="4">
        <el-steps :active="this.activeStep" align-center>
          <el-step
            title="第一步"
            icon="el-icon-goods"
            description="从我们的网页或APP选购你心仪的餐品"
          ></el-step>
          <el-step
            title="第二步"
            icon="el-icon-success"
            description="确认订单，支付"></el-step>
          <el-step
            title="第三步"
            icon="el-icon-loading"
            description="等待我们专业外送员的到来"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="button-wrapper">
          <el-button type="warning" @click="jumpToMenu">
            开始选购
          </el-button>
        </div>
      </el-col>
    </el-row>
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
      activeStep: 0,
    };
  },
  mounted() {
    const stepInterval = setInterval(() => {
      this.activeStep += 1;
      if (this.activeStep === 3) {
        clearInterval(stepInterval);
      }
    }, 1000);
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
  .pic-wrapper {
    padding-top: 20px;
    background: linear-gradient(#E6A23CAD, #ffffff);
  }
  .step-wrapper {
    animation: slowshow;
    animation-duration: 1.3s;
    margin-top: 40px;
    .step-toast {
      line-height: 50px;
      margin-bottom: 40px;
      font-weight: bold;
    }
    .pizza-pic {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .button-wrapper {
    margin-top: 40px;
  }
  @keyframes slowshow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style lang="less">
  // 样式覆写
  .step-wrapper{
    .el-step__title.is-finish,
    .el-step__description.is-finish {
      color: #333333!important;
    }
  }
</style>
