<template>
<div class="check-order">
  <NavMenu />
  <div class="order-wrapper">
    <el-row>
      <el-col :span="8" :offset="3" class="order-detail">
        <div class="order-header">
          <span class="title">订单详情</span>
          <span class="change-button" @click="backToMenu">返回修改点餐信息</span>
        </div>
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
          <div class="total-item">共{{totalNumber}}份商品</div>
        </div>
      </el-col>
      <el-col :span="10" class="user-info">
        <div class="address-wrapper">
          <div class="header-title">
            收货地址
            <span @click="addMoreAddr" class="more-button">添加更多地址</span>
          </div>
          <div class="address-content">
            <el-radio
              v-for="(item, index) in userAddressList"
              v-model="radio"
              :key="index"
              :label="index">
              <div class="info-wrapper">{{item.name}}</div>
              <div class="info-wrapper">{{item.phone}}</div>
              <div class="info-wrapper">{{item.detail}}  {{item.note}}</div>
              <div class="addr-icon">
                <i class="el-icon-location-outline"></i>
              </div>
            </el-radio>
          </div>
        </div>
        <div class="pay-wrapper">
          <div class="header-title">付款方式</div>
          <div class="pay-content">
            <p>在线支付</p>
            <p class="pay-way">目前仅支持支付宝支付</p>
          </div>
        </div>
        <div class="check-wrapper">
          <el-button type="danger" @click="checkOrder">确认下单</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog title="添加收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-autocomplete
          v-model="form.addr"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth">
        <el-input v-model="form.note" autocomplete="off" placeholder="楼号，门牌号信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleModalCancel">取 消</el-button>
      <el-button type="primary" @click="handleAddAddr">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';
// import axios from 'axios';

export default {
  name: 'CheckOrder',
  components: {
    NavMenu,
  },
  data() {
    return {
      cartList: [], // 菜品信息
      totalMoney: 0, // 菜品总金额
      totalNumber: 0, // 菜品总数量
      userAddressList: [
        {
          name: '曾淦1', detail: '华东师范大学第五宿舍', note: '427', phone: '15317786280',
        },
        {
          name: '曾淦2', detail: '华东师范大学第五宿舍', note: '427', phone: '15317786280',
        },
      ],
      radio: 0,
      dialogFormVisible: false,
      form: {
        name: '',
        addr: '',
        location: {},
        phone: '',
        note: '',
      },
      userInfo: {},
      formLabelWidth: '120px',
    };
  },
  beforeMount() {
    this.cartList = this.$route.params.myCart;
    this.totalMoney = this.$route.params.totalMoney;
    this.totalNumber = this.$route.params.totalNum;
    this.getUserInfo();
  },
  methods: {
    backToMenu() {
      this.$router.go(-1);
    },
    addMoreAddr() {
      this.dialogFormVisible = true;
    },
    /**
     * 弹出框取消事件
     */
    handleModalCancel() {
      this.dialogFormVisible = false;
      this.form = {
        name: '',
        addr: '',
        location: {},
        phone: '',
      };
    },
    /**
     * 确认添加新地址
     */
    handleAddAddr() {
      this.dialogFormVisible = false;
      const userAddr = this.userAddressList;
      userAddr.push({
        detail: this.form.addr,
        lng: this.form.location.lng,
        lat: this.form.location.lat,
        name: this.form.name,
        phone: this.form.phone,
      });
      this.userInfo.addr = JSON.stringify(userAddr);
      this.addNewAddr();
    },
    /**
     * 添加新地址请求
     */
    async addNewAddr() {
      try {
        const url = '/user/modify';
        const params = this.userInfo;
        const result = await this.postRequest(url, params);
        if (result.data.errorCode !== 0) {
          this.$message.error(result.data.errorMsg);
        } else {
          this.$message({
            message: '添加成功',
          });
          this.getUserInfo();
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const uid = JSON.parse(sessionStorage.getItem('pdqUserId'));
      try {
        const result = await this.getRequest(`/user/view?uid=${uid}`);
        this.userInfo = result.data.userInfo;
        if (result.data.userInfo.addr !== '') {
          this.userAddressList = JSON.parse(result.data.userInfo.addr);
        }
        console.log(this.userInfo, this.userAddressList);
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 向百度api发起请求
     * @param queryString
     */
    async getSearchAddr(queryString) {
      const url = `http://api.map.baidu.com/place/v2/suggestion?city_limit=true&output=json&ak=tVhFbEhHkfSXzkpbNtN3g2KOZHBc3LOl&region=上海&query=${queryString}`;
      const result = await this.getRequest(url);
      console.log(result);
      if (result.data) {
        return result.data.result;
      }
      return [];
    },
    /**
     * 自动搜索地址
     * @param queryString
     * @param cb
     */
    async querySearch(queryString, cb) {
      const results = await this.getSearchAddr(queryString);
      // 调用 callback 返回建议列表的数据
      console.log(results);
      const selectList = results.map(item => ({
        value: item.name,
        location: item.location,
        province: item.province,
      }));
      cb(selectList);
    },
    /**
     * 下拉框选择事件
     * @param item
     */
    handleSelect(item) {
      this.form.addr = item.value;
      this.form.location = item.location;
    },
    checkOrder() {
      const uid = JSON.parse(sessionStorage.getItem('pdqUserId'));
      const params = {
        u_id: uid,
        total_price: this.totalMoney,
        detail: JSON.stringify(this.cartList),
      };
      console.log('确认下单', params);
    },
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
  .user-info {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #e3e3e3;
    text-align: left;
    margin-left: 20px;
    .header-title {
      padding: 20px 15px;
      margin-bottom: 3px;
      font-weight: 700;
      font-size: 16px
    }
    .address-wrapper {
      margin-bottom: 20px;
      .more-button {
        font-size: 12px;
        color: #999999;
        float: right;
        transition: color .3s;
        &:hover {
          cursor: pointer;
          color: #e3e3e3;
        }
      }
      .address-content {
        padding: 0 15px;
      }
      .info-wrapper {
        color: #333333;
        margin-bottom: 10px;
      }
      .addr-icon {
        position: absolute;
        top: 0;
        right: 30px;
        i {
          font-size: 32px;
          line-height: 104px;
        }
      }
    }
    .pay-wrapper {
      padding: 0 15px;
      .pay-content {
        padding: 0 15px;
        border: 1px solid #FDD14B;
        border-radius: 4px;
        font-size: 14px;
        width: 200px;
        margin-bottom: 15px;
        .pay-way {
          color: #979797;
          font-size: 13px;
        }
      }
    }
    .check-wrapper {
      padding: 15px;
      text-align: right;
    }
  }
}
</style>
<style lang="less">
  .check-order {
    .el-radio {
      display: block;
      margin-bottom: 15px;
      padding: 15px;
      position: relative;
      margin-right: 0;
      box-sizing: border-box;
      &.is-checked {
        border: 1px solid #FDD14B;
        border-radius: 4px;
      }
      .el-radio__input {
        vertical-align: top;
      }
      .el-radio__label {
        display: inline-block;
      }
    }
    .el-autocomplete {
      display: block;
    }
  }
</style>
