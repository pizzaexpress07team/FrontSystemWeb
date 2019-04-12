<template>
  <div class="menu">
    <NavMenu />
    <el-row class="bag-menu-container">
      <el-col :span="16" :offset="4">
        <el-row class="bag-menu-inner">
          <el-col :span="18" class="menu-wrapper">
            <el-tabs
              tab-position="left"
              v-loading="getMenuState"
              style="height: 100%;">
              <el-tab-pane
                v-for="(listName, index) in menuNameList"
                :label="listName"
                :key="index">
                <transition
                  name="el-fade-in-linear"
                  v-for="(item, key) in menuObj[listName]"
                  :key="key">
                  <div
                    v-show="firstPanelShow"
                    class="transition-box"
                    @click="choosePizza(item, key)">
                    <el-card class="item-wrapper" shadow="hover">
                      <div class="item-header">
                        <div class="food-name">{{item.p_name}}</div>
                        <div
                          v-if="item.nowChoose"
                          class="choose-num">当前选购：{{item.nowChoose}}</div>
                      </div>
                      <div class="image-wrapper">
                        <img :src="item.p_picture" :alt="item.p_name">
                      </div>
                      <div class="card-wrapper"><i class="icon-cart"></i></div>
                    </el-card>
                  </div>
                </transition>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="6" class="bag-wrapper">
            <div class="bag-title">
              我的购物车
              <div
                v-if="myCart.length !== 0"
                class="empty-button"
                @click="emptyCart">
                <i class="icon-bin"></i>
              </div>
            </div>
            <div class="bag-empty-content" v-if="myCart.length === 0">购物车空空如也</div>
            <div class="bag-content" v-if="myCart.length !== 0">
              <div
                :key="index"
                class="bag-item-wrapper"
                v-for="(item, index) in myCart">
                <div class="item-header">
                  <div class="item-name">{{item.name}}</div>
                  <div v-if="item.nowChoose" class="item-now-choose">{{item.nowChoose}}</div>
                </div>
                <div class="item-size-price">
                  <span>尺寸：{{item.size}}</span>
                  <span style="text-align: right">单价：{{item.price}}</span>
                </div>
                <div class="item-num">
                  <span>数量：{{item.num}}</span>
                  <span style="text-align: right">
                    <span class="icon-wrapper" @click="addItemNum(item, index)">
                      <i class="icon-plus"></i>
                    </span>
                    <span class="icon-wrapper" @click="deleteItemNum(item, index)">
                      <i class="icon-minus"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="bag-count" v-if="myCart.length !== 0">
              <span>总计：</span>
              <span>
                ￥<strong>{{cartCount}}</strong>
              </span>
            </div>
            <div
              v-if="myCart.length !== 0"
              class="confirm-order-button">
              <el-button
                @click="jumpToCheckOrder"
                size="small"
                type="primary">确认下单</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <div class="dialog-header-wrapper">
        <span class="name">{{nowItem.p_name}}</span>
        <span class="price">￥<strong>{{nowItem.price}}</strong></span>
      </div>
      <div class="image-wrapper">
        <img :src="nowItem.p_picture" :alt="nowItem.p_name">
      </div>
      <div class="resource-wrapper">
        主要原料：<span>鸡肉、蔬菜</span><br/>
        尺寸：<span>{{nowItem.p_size}}寸</span>
      </div>
      <div class="number-wrapper">
        数量：<el-input-number
        v-model="nowItemNum"
        size="small"
        :min="0"
        :max="10"
        label="数量"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addToCart">加入购物车</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';
import { parseMenu } from '../utils/methods';

export default {
  name: 'Menu',
  components: {
    NavMenu,
  },
  data() {
    return {
      firstPanelShow: false, // 首次打开的菜单展示
      getMenuState: false, // 菜品获取状态
      menuObj: {}, // 用于存放不同菜品类型的菜品信息
      menuNameList: [], // 用于存放菜品类型，例如小吃、披萨、饮品
      listTotal: 0, // 列表总数
      dialogVisible: false, // 菜品详细信息展示
      nowItem: {}, // 选中pizza的信息
      nowItemNum: 1, // 选中的pizza数量
      myCart: [], // 购物车信息
      cartCount: 0, // 菜品金额总计
    };
  },
  mounted() {
    this.getMenu();
    setTimeout(() => {
      this.firstPanelShow = true;
    }, 500);
  },
  methods: {
    /**
     * 获取菜单信息
     * @returns {Promise<void>}
     */
    async getMenu() {
      this.getMenuState = true;
      try {
        let result = await this.getRequest('/menu/info');
        this.getMenuState = false;
        result = result.data;
        if (result.errorCode === 1) {
          this.$message({
            message: result.errorMsg,
            type: 'error',
          });
        } else {
          this.listTotal = result.total;
          const { menuObj, menuNameList } = parseMenu(result.list);
          this.menuObj = menuObj;
          this.menuNameList = menuNameList;
        }
      } catch (e) {
        console.log(e);
        this.$message.error('菜单获取失败，请稍后再试');
      }
    },
    /**
     * 点击菜品弹框选择
     * @param pizzaItem
     * @param index
     */
    choosePizza(pizzaItem, index) {
      this.dialogVisible = true;
      this.nowItemNum = 0; // 清除缓存
      this.nowItem = pizzaItem;
      if (pizzaItem.nowChoose) {
        this.nowItemNum = pizzaItem.nowChoose;
      }
      // 用于在菜品上显示选购信息
      this.nowItem.menuIndex = index;
      this.nowItem.menuType = pizzaItem.p_type;
    },
    /**
     * 添加到购物车
     */
    addToCart() {
      // 如果选择为0，则直接返回
      if (this.nowItemNum === 0) {
        this.dialogVisible = false;
        return;
      }
      const cartItem = {
        name: this.nowItem.p_name,
        price: this.nowItem.price,
        size: this.nowItem.p_size,
        menuIndex: this.nowItem.menuIndex,
        menuType: this.nowItem.menuType,
        num: this.nowItemNum,
      };
      // 如果列表已选购该商品，则更新该商品的信息
      let hasItem = false;
      const newCart = this.myCart.map((item) => {
        console.log(item, cartItem);
        if (item.name === cartItem.name) {
          hasItem = true;
          return cartItem;
        }
        return item;
      });
      if (!hasItem) {
        // 如果没有已选购商品，则push新商品
        this.myCart.push(cartItem);
      } else {
        // 如果有，则更新整个商品列表
        this.myCart = newCart;
      }
      this.dialogVisible = false;
      this.cartCount += this.nowItem.price * this.nowItemNum;
      // 对于菜单也要对用户的购物车商品作出标记
      this.menuObj[cartItem.menuType][cartItem.menuIndex].nowChoose = cartItem.num;
    },
    /**
     * 添加菜品数量
     * @param item
     * @param index
     */
    addItemNum(item, index) {
      if (item.num + 1 > 10) {
        this.$message({
          message: '每单最多允许10份同种商品',
          type: 'warning',
        });
      } else {
        this.myCart[index].num = item.num + 1;
        this.menuObj[item.menuType][item.menuIndex].nowChoose = item.num;
      }
      this.cartCount += item.price;
    },
    /**
     * 删除菜品数量
     * @param item
     * @param index
     */
    deleteItemNum(item, index) {
      if (item.num - 1 === 0) {
        this.myCart.splice(index, 1);
        this.menuObj[item.menuType][item.menuIndex].nowChoose = 0;
      } else {
        this.myCart[index].num = item.num - 1;
        this.menuObj[item.menuType][item.menuIndex].nowChoose = item.num;
      }
      this.cartCount -= item.price;
    },
    /**
     * 清空购物车
     */
    emptyCart() {
      this.myCart = [];
      this.getMenu();
    },
    /**
     * 跳转到订单确定页面
     */
    jumpToCheckOrder() {
      console.log(this.myCart);
      this.$router.push({
        name: 'checkOrder',
        params: {
          myCart: this.myCart,
          totalMoney: this.cartCount,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
  .bag-menu-container {
    padding: 40px 0;
    .item-wrapper {
      height: 100%;
      cursor: pointer;
      position: relative;
      .item-arrow {
        position: absolute;
        right: -13px;
        transform: translateY(50%);
        padding: 5px;
        border-radius: 50%;
        background: #E6A23C;
        i {
          color: #ffffff;
        }
      }
      .card-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #FDD14B;
        line-height: 28px;
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
  .transition-box {
    width: 50%;
    height: 278px;
    display: inline-block;
    border-radius: 4px;
    background-color: #ffffff;
    text-align: center;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  .item-header {
    text-align: left;
    .food-name {
      display: inline-block;
      width: 50%;
      text-align: left;
    }
    .choose-num {
      display: inline-block;
      width: 50%;
      text-align: right;
      color: #979797;
    }
  }
  .image-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
  }
  .image-wrapper img {
    display: inline-block;
    width: 100%;
    border-radius: 8px;
  }
  .menu-wrapper {
    .image-wrapper {
      margin-top: 15px;
      height: 150px;
    }
  }
  .dialog-header-wrapper {
    text-align: left;
    margin-bottom: 8px;
    .name {
      font-size: 22px;
      font-weight: bold;
    }
    .price {
      float: right;
      color: #f46c6c;
      strong {
        font-size: 22px;
      }
    }
  }
  .resource-wrapper {
    text-align: left;
    margin-top: 10px;
    line-height: 42px;
    margin-bottom: 6px;
  }
  .number-wrapper {
    text-align: left;
  }
  .bag-wrapper{
    background: #FFFFFF;
    border: 1px solid #E4E7ED;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    overflow: hidden;
    .bag-title {
      background: #f46c6c;
      line-height: 38px;
      color: #ffffff;
      position: relative;
      .empty-button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 15px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .bag-empty-content {
      color: #66666699;
      line-height: 230px;
    }
    .bag-item-wrapper {
      margin-top: 10px;
      padding: 12px;
      text-align: left;
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      border-radius: 4px;
      .item-name {
        font-size: 14px;
        color: #606266;
        letter-spacing: 0;
        line-height: 16px;
        margin-bottom: 8px;
      }
      .item-size-price, .item-num {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 16px;
        span {
          display: inline-block;
          width: 50%;
        }
      }
      .item-size-price {
        margin-bottom: 5px;
      }
      span.icon-wrapper {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #979797;
        transition: color .3s;
        cursor: pointer;
        padding: 3px;
        &:first-child {
          margin-right: 8px;
        }
        &:hover {
          color: #FDD14B;
          border: 1px solid #FDD14B;
        }
        i {
          display: inline-block;
          line-height: 14px;
          width: 14px;
          text-align: center;
        }
      }
    }
    .bag-count {
      border-top: 1px solid #E3E3E3;
      border-radius: 0 0 4px 4px;
      padding: 12px 12px 2px 12px;
      margin-top: 100px;
      span {
        display: inline-block;
        width: 50%;
        text-align: left;
        font-size: 14px;
        color: #606266;
        letter-spacing: 0;
        line-height: 30px;
        &:nth-child(2n) {
          text-align: right;
          color: #f46c6c;
        }
      }
      strong {
        font-size: 18px;
      }
    }
  }
</style>

<style lang="less">
  .menu {
    .el-card.item-wrapper {
      overflow: visible;
    }
    .el-dialog__body {
      padding: 20px;
    }
    .confirm-order-button {
      text-align: right;
      padding: 0 12px 12px 0;
      .el-button {
        color: #666666;
      }
    }
  }
</style>
