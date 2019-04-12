<template>
<div class="check-order">
  <NavMenu />
  <div class="order-wrapper">
    <el-row>
      <el-col :span="6" :offset="4" class="order-detail">
        <div class="order-header">
          <span class="title">订单详情</span>
          <span class="change-button">返回修改点餐信息</span>
        </div>
        <el-table
          class="order-list"
          :data="cartList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="餐品名称"
            width="200" />
          <el-table-column
            prop="num"
            label="数量" />
          <el-table-column
            prop="size"
            label="尺寸/分量" />
          <el-table-column
            label="小计(元)">
            <template slot-scope="scope">
              ￥{{scope.row.num * scope.row.price}}
            </template>
          </el-table-column>
        </el-table>
        <div class="total-info">
          <span>总计：</span>
          <span class="money">￥<strong>{{totalMoney}}</strong></span>
          <div class="total-item">共份商品</div>
        </div>
      </el-col>
      <el-col :span="10" class="user-info"></el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'CheckOrder',
  components: {
    NavMenu,
  },
  data() {
    return {
      cartList: [],
      totalMoney: 0,
    };
  },
  beforeMount() {
    this.cartList = this.$route.params.myCart;
    this.totalMoney = this.$route.params.totalMoney;
  },
};
</script>

<style scoped lang="less">
.check-order {
  .order-wrapper {
    margin-top: 20px;
  }
  .order-detail {
    padding: 12px;
    border-radius: 4px;
    min-height: 300px;
    border: 1px solid #e3e3e3;
    border-bottom: none;
    background: url("../assets/images/checkOrder/bottom.png") bottom repeat-x;
    .order-header {
      height: 60px;
      padding: 20px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #e3e3e3;
      span {
        display: inline-block;
        width: 50%;
        text-align: left;
        line-height: 20px;
      }
      .title {
        font-size: 16px;
        font-weight: 700;
        color: #333;
      }
      .change-button {
        text-align: right;
        font-size: 12px;
        color: #999999;
        &:hover {
          cursor: pointer;
        }
      }
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
  }
}
</style>
