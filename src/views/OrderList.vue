<template>
<div class="order-list">
  <NavMenu />
  <div class="order-wrapper">
    <div class="breadcrumb-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-timeline v-loading="loading" reverse>
      <el-timeline-item
        v-for="(item, index) in orderList"
        :key="index"
        :timestamp="formatTime(item.o_create_time)"
        placement="top">
        <el-card class="order-item">
          <el-row type="flex">
            <el-col :span="8">
              <div class="order-main">
                <strong>订单号：</strong>{{item.o_id}}
              </div>
              <div class="order-main">
                <strong>{{briefOrderDetail(item.detail)}}</strong>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="order-main money">
                <strong>支付金额（元）</strong>
                <p>{{item.total_price.toFixed(2)}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="order-main">
                <strong>支付状态：</strong>{{parsePayState(item.o_pay_state)}}
              </div>
              <div class="order-main">
                <strong>配送状态：</strong>{{parseDeliveryState(item.delivery_state)}}
              </div>
            </el-col>
            <el-col :span="4" class="button-wrapper">
              <el-button
                type="danger"
                @click="checkOrderDetail(item.o_id)">查看详情</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-if="this.orderList.length === 0" class="empty-wrapper">
      暂无订单信息
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';
import { timeTrans, parsePayState, parseDeliveryState } from '../utils/methods';

export default {
  name: 'OrderList',
  components: {
    NavMenu,
  },
  data() {
    return {
      orderList: [], // 订单列表
      loading: false, // 加载状态
    };
  },
  beforeMount() {
    this.getOrderList();
  },
  methods: {
    /**
     * 获取用户订单信息
     */
    async getOrderList() {
      const uid = sessionStorage.getItem('pdqUserId').replace(/"/g, '').trim();
      try {
        this.loading = true;
        const url = `/order/view?uid=${uid}&pno=1&pageSize=100`;
        const result = await this.getRequest(url);
        if (result.data) {
          // 如果无错误，则将信息存贮到data中
          this.orderList = result.data.list;
        } else {
          this.$message.error(result.data.errorMsg);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$message.error('订单信息获取失败，请稍后再试');
        console.log(e);
      }
    },
    /**
     * 时间戳格式化
     * @param timestamp
     */
    formatTime(timestamp) {
      const date = timeTrans(timestamp / 1000);
      return `下单时间 ${date}`;
    },
    /**
     * 订单菜品摘要
     * @param orderMenuInfo
     * @returns {string}
     */
    briefOrderDetail(orderMenuInfo) {
      const menu = JSON.parse(orderMenuInfo);
      if (menu[1] && menu[1].name) {
        return `${menu[1].name}等${menu.length}个菜品`;
      }
      return '0个菜品';
    },
    /**
     * 跳转到订单详情页
     * @param orderId
     */
    checkOrderDetail(orderId) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          o_id: orderId,
        },
      });
    },
    parsePayState(payState) {
      return parsePayState(payState);
    },
    parseDeliveryState(deliveryState) {
      return parseDeliveryState(deliveryState);
    },
  },
};
</script>

<style scoped lang="less">
.order-wrapper {
  margin: 20px 18%;
  text-align: left;
  .order-main {
    padding: 6px 0;
    color: #333333;
    strong {
      color: #666666;
    }
    &.money {
      p {
        color: #f46c6c;
        font-size: 18px;
        padding: 10px 15px 0;
        margin: 0;
      }
    }
  }
  .button-wrapper {
    margin:auto;
    padding-right: 40px;
    text-align: right;
  }
}
</style>
<style lang="less">
.order-wrapper {
  .order-item {
    .el-card__body {
      padding:20px;
    }
  }
}
</style>
