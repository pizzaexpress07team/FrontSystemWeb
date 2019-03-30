<template>
  <div class="menu">
    <NavMenu />
    <el-row class="bag-menu-container">
      <el-col :span="16" :offset="4">
        <el-row class="bag-menu-inner">
          <el-col :span="18" class="menu-wrapper">
            <el-tabs tab-position="left" style="height: 100%;">
              <el-tab-pane label="肉食主义者">
                <transition name="el-fade-in-linear">
                  <div v-show="firstPanelShow" class="transition-box">
                    <el-card class="item-wrapper" shadow="hover">
                      至尊牛肉披萨
                      <div class="item-arrow">
                        <i class="el-icon-caret-right"></i>
                      </div>
                    </el-card>
                  </div>
                </transition>
                <transition name="el-fade-in">
                  <div v-show="firstPanelShow" class="transition-box">
                    <el-card class="item-wrapper" shadow="hover">
                      sss
                    </el-card>
                  </div>
                </transition>
              </el-tab-pane>
              <el-tab-pane label="最爱的海鲜">菜单2</el-tab-pane>
              <el-tab-pane label="蔬菜水果味">菜单3</el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="6" class="bag-wrapper">
            <div class="bag-title">我的购物车</div>
            <div class="bag-content"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'Menu',
  components: {
    NavMenu,
  },
  data() {
    return {
      firstPanelShow: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.firstPanelShow = true;
    }, 500);
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
    }
  }
  .transition-box {
    width: 50%;
    height: 150px;
    display: inline-block;
    border-radius: 4px;
    background-color: #ffffff;
    text-align: center;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  .menu-wrapper {

  }
</style>

<style>
  .el-card.item-wrapper {
    overflow: visible;
  }
</style>
