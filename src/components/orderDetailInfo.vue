<template>
<div class="order-detail-component">
  <div class="detail-header">
    <span>订单号：</span>{{orderInfo.o_id || '-'}}
  </div>
  <div class="detail-content">
    <el-row type="flex">
      <el-col :span="12">
        <el-table
          class="order-list"
          :data="cartList"
          stripe>
          <el-table-column
            prop="name"
            label="餐品名称"/>
          <el-table-column
            prop="num"
            label="数量" />
          <el-table-column
            prop="size"
            label="尺寸/分量" />
          <el-table-column
            label="小计">
            <template slot-scope="scope">
              ￥{{scope.row.num * scope.row.price}}
            </template>
          </el-table-column>
        </el-table>
        <div class="total-info">
          <span>总计：</span>
          <span class="money">￥<strong>{{totalMoney}}</strong></span>
          <div class="total-item">共{{cartList.length}}份商品</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="custom-info">
          <div class="info-item">
            <h4>配送信息</h4>
            <p class="info-content">
              配送状态：{{parseDelivery(orderInfo.delivery_state) || '-'}}
            </p>
          </div>
          <div class="info-item">
            <h4>收货人信息</h4>
            <p class="info-content">
              <span>联系人：</span>{{addrInfo.name || '-'}}
            </p>
            <p class="info-content">
              <span>联系电话：</span>{{addrInfo.phone || '-'}}
            </p>
            <p class="info-content">
              <span>收货地址：</span>{{addrInfo.detail || '-'}}<br />
              <span class="addr-note">{{addrInfo.note}}</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'orderDetailInfo',
  props: {
    orderInfo: Object,
    cartList: Array,
    totalMoney: Number,
    addrInfo: Object,
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 配送状态显示
     * @param deliverState
     * @returns {string}
     */
    parseDelivery(deliverState) {
      if (deliverState === 2) {
        return '配送完成';
        // eslint-disable-next-line
      } else if (deliverState === 1) {
        return '配送中';
      }
      return '未配送';
    },
  },
};
</script>

<style scoped lang="less">
.order-detail-component {
  text-align: left;
  border: 1px solid #e3e3e3;
  border-bottom: none;
  border-radius: 8px;
  padding: 20px 20px 40px;
  background: url("../assets/images/checkOrder/bottom.png") bottom repeat-x;
  .detail-header {
    padding: 0 9px 13px;
  }
  .total-info {
    padding: 50px 10px 10px;
    span {
      display: inline-block;
      width: 50%;
      text-align: left;
      font-size: 14px;
      color: #666;
    }
    .money {
      color: #f46c6c;
      text-align: right;
      strong {
        font-size: 28px;
      }
    }
    .total-item {
      text-align: right;
      font-size: 14px;
      color: #999999;
    }
  }
  .custom-info {
    padding: 10px 30px;
    margin-left: 50px;
    background: #e3e3e350;
    border-radius: 4px;
    .info-item {
      border-bottom: 1px dashed #e3e3e3;
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      &:last-child {
        margin-bottom: 20px;
      }
    }
    h4 {
      color: #333333;
      padding: 0 0 15px;
      font-weight: 700;
      margin: 0;
    }
    .info-content {
      padding: 0 0 10px;
      margin: 5px 0 ;
      span {
        display: inline-block;
        width: 70px;
      }
      .addr-note {
        display: block;
        padding: 10px 0 0 70px;
      }
    }
  }
}
</style>
