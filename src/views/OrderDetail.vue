<template>
<div class="order-detail">
  <NavMenu />
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/orderList' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-collapse-transition>
    <div v-show="!orderHasPay" class="order-pay-wrapper">
      <div class="order-pay-header">
        <h4 class="header-title">
          请选择支付方式
          <span class="time-check-wrapper">
          剩余支付时间 <strong>{{leftPayTime}}</strong>，逾期订单将会取消
        </span>
        </h4>
      </div>
      <div class="pay-way-wrapper">
        第三方支付：<strong>￥{{totalMoney}}</strong>
        <div>
          <div class="pay-way-choose active">
            <img class="pay-way-pic"  alt="支付宝" src="../assets/images/orderDetail/alipay.jpg"/>
          </div>
          <div class="pay-way-choose">
            <img class="pay-way-pic"  alt="微信支付" src="../assets/images/orderDetail/wechatpay.jpg"/>
          </div>
        </div>
      </div>
      <div class="pay-check-wrapper">
        <el-button type="danger" @click="finishPay">确认支付</el-button>
      </div>
    </div>
  </el-collapse-transition>
  <el-collapse-transition>
    <div v-show="orderHasPay" class="order-state-wrapper">
      <el-steps :active="orderState">
        <el-step title="确认订单" icon="icon-cart"></el-step>
        <el-step title="已支付" icon="icon-coin-yen"></el-step>
        <el-step title="配送中" icon="icon-truck"></el-step>
        <el-step title="已完成" icon="icon-checkmark"></el-step>
      </el-steps>
    </div>
  </el-collapse-transition>
  <div class="order-detail-wrapper" v-loading="orderLoading">
    <OrderDetailInfo
      :addrInfo="addrInfo"
      :totalMoney="totalMoney"
      :cartList="cartList"
      :orderInfo="orderInfo" />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';
import OrderDetailInfo from '@/components/orderDetailInfo.vue';

export default {
  name: 'OrderDetail',
  components: {
    NavMenu,
    OrderDetailInfo,
  },
  data() {
    return {
      o_id: '',
      orderInfo: {},
      orderState: 1, // 订单状态
      orderHasPay: false, // 是否支付过
      leftPayTime: '0s',
      cartList: [],
      totalMoney: 0,
      orderLoading: false,
      interval: null,
      addrInfo: {},
    };
  },
  beforeMount() {
    this.o_id = this.$route.query.o_id;
    console.log(this.orderHasPay);
    this.getOrderInfo();
  },
  mounted() {
    let waitTime = 30 * 60; // 默认请求30分钟,每隔5秒请求一次
    this.interval = setInterval(() => {
      waitTime -= 5;
      if (waitTime > 0) {
        this.getOrderInfo();
      } else {
        waitTime = 30 * 60;
        this.leftPayTime = 0;
        clearInterval(this.interval);
      }
    }, 5000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    /**
     * 获取订单信息
     * @returns {Promise<void>}
     */
    async getOrderInfo() {
      try {
        // todo:根据oid获取订单信息
        this.orderLoading = true;
        const url = `/order/query?o_id=${this.o_id}`;
        const result = await this.getRequest(url);
        if (result.data && result.data.errorCode === 0) {
          const info = result.data.order;
          console.log(info);
          // 如果无错误，则将信息存贮到data中
          this.orderInfo = info;
          this.orderState = this.checkOrderState(info.delivery_state, info.o_pay_state); // 订单状态
          this.orderHasPay = info.o_pay_state === 1;
          this.cartList = JSON.parse(info.detail);
          this.totalMoney = info.total_price;
          this.addrInfo = JSON.parse(info.o_delivery_addr);
          if (info.delivery_state === 1 && info.o_pay_state === 1) {
            clearInterval(this.interval);
          }
          if (!this.orderHasPay) {
            // 如果仍在订单支付页面
            this.setPayTimeInterval(5, 0);
          }
        }
        this.orderLoading = false;
      } catch (e) {
        this.orderLoading = false;
        this.$message.error('订单信息获取失败，请稍后再试');
        console.log(e);
      }
    },
    /**
     * 更新订单状态
     */
    async updateOrderInfo() {
      try {
        // todo:更新订单状态
        const url = '/order/confirm';
        const params = this.orderInfo;
        const result = await this.postRequest(url, params);
        if (result.data && result.data.errorCode === 0) {
          this.$message({
            message: '订单状态更新完成',
            type: 'success',
          });
          this.getOrderInfo();
        } else {
          this.$message.error(result.data.errorMsg);
        }
      } catch (e) {
        this.$message.error('订单状态更新失败，如确认支付，请刷新页面');
        console.log(e);
      }
    },
    /**
     * 转义订单状态，用户订单信息展示
     * @param payState
     * @param deliveryState
     */
    checkOrderState(deliveryState, payState) {
      if (deliveryState === 2 && payState === 1) {
        return 4;
        // eslint-disable-next-line
      } else if (deliveryState === 1 && payState === 1) {
        return 3;
      } else if (deliveryState === 0 && payState === 0) {
        return 2;
      }
      return 1;
    },
    /**
     * 确认支付，更新订单状态
     */
    async finishPay() {
      this.orderInfo.o_pay_state = 1;
      try {
        const url = `/order/pay?o_id=${this.o_id}`;
        const result = await this.getRequest(url);
        if (result.data.errorCode === 0) {
          this.getOrderInfo();
        } else {
          this.$message.error(result.data.errorMsg);
        }
      } catch (e) {
        console.log(e);
      }
      clearInterval(this.interval);
    },
    /**
     * 订单支付时间定时器
     * @param minute
     * @param second
     */
    setPayTimeInterval(minute, second) {
      let waitTime = minute * 60 + second;
      const orderInterval = setInterval(() => {
        waitTime -= 1;
        if (waitTime > 0) {
          const waitMinute = parseInt(waitTime / 60, 10);
          const waitSecond = waitTime - waitMinute * 60;
          this.leftPayTime = `${waitMinute}分钟 ${waitSecond}秒`;
        } else {
          waitTime = minute * 60 + second;
          this.leftPayTime = 0;
          // todo:超时应向服务器发起请求，取消订单
          clearInterval(orderInterval);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.order-detail {
  text-align: left;
  strong {
    color: #f46c6c;
  }
  .order-detail-wrapper {
    margin: 0 18%;
    padding-top: 30px;
  }
  .order-state-wrapper {
    margin: 30px 18% 0;
    padding: 30px 70px;
    border-radius: 8px;
    border: 1px solid #e3e3e3;
  }
  .order-pay-wrapper {
    margin: 20px 18% 0;
    padding: 0 70px 15px;
    border-radius: 8px;
    border: 1px solid #e3e3e3;
    .order-pay-header {
      margin-bottom: 15px;
      border-bottom: 1px solid #e3e3e3;
      .header-title {
        margin-bottom: 15px;
        .time-check-wrapper {
          line-height: 20px;
          padding-left: 20px;
          font-size: 14px;
        }
      }
    }
    .pay-way-wrapper {
      .pay-way-choose {
        display: inline-block;
        border: 1px dotted #e3e3e3;
        width: 176px;
        margin: 10px 15px 15px 0;
        border-radius: 4px;
        &:hover {
          border: 1px solid #FDD14B;
          cursor: pointer;
        }
        &.active {
          border: 1px solid #FDD14B;
        }
      }
    }
  }
}
</style>
<style lang="less">
  .order-detail {
    .el-step__icon-inner {
      width: 40px;
      line-height: 40px;
      font-size: 22px;
      padding-left: 8px;
    }
    .breadcrumb-wrapper {
      margin: 20px 18% 0;
    }
  }
</style>
