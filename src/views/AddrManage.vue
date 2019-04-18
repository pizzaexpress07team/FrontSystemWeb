<template>
  <div class="addr-manage">
    <NavMenu />
    <div class="addr-wrapper">
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>我的</el-breadcrumb-item>
          <el-breadcrumb-item>地址管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="add-addr-wrapper" @click="newAddr">
        <i class="el-icon-circle-plus-outline"></i>添加新的收货地址
      </div>
      <div class="address-wrapper" v-loading="editLoading">
        <el-row
          type="flex"
          v-for="(item, index) in userAddressList"
          :key="index">
          <el-col :span="21" class="content-wrapper">
            <div class="addr-item name"><strong>收货人：</strong>{{item.name || '-'}}</div>
            <div class="addr-item phone"><strong>联系方式：</strong>{{item.phone || '-'}}</div>
            <div class="addr-item detail"><strong>收货地址：</strong>{{item.detail || '-'}}</div>
            <div class="addr-item note"><strong>详细地址：</strong>{{item.note || '-'}}</div>
          </el-col>
          <el-col :span="3">
            <div class="right-button edit-button" @click="editUserAddr(index, 'edit')">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </div>
            <div class="right-button delete-button" @click="editUserAddr(index, 'delete')">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
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
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue';
import axios from 'axios';

export default {
  name: 'AddrManage',
  components: {
    NavMenu,
  },
  data() {
    return {
      userAddressList: [], // 用户收货地址信息
      userInfo: {}, // 用户信息
      dialogFormVisible: false, // 模态框显示
      formLabelWidth: '120px',
      form: { // 模态框信息
        name: '',
        addr: '',
        location: {},
        phone: '',
        note: '',
      },
      isEdit: false, // 是否为编辑地址
      editIndex: 0, // 当为编辑时编辑的地址序号
      editLoading: false, // 加载状态
    };
  },
  beforeMount() {
    this.getUserInfo();
  },
  methods: {
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const uid = JSON.parse(sessionStorage.getItem('pdqUserId'));
      this.editLoading = true;
      try {
        const result = await this.getRequest(`/user/view?uid=${uid}`);
        this.userInfo = result.data.userInfo;
        if (result.data.userInfo.addr !== '') {
          this.userAddressList = JSON.parse(result.data.userInfo.addr);
        }
        this.editLoading = false;
      } catch (e) {
        this.editLoading = false;
        console.log(e);
      }
    },
    /**
     * 添加新地址
     */
    newAddr() {
      this.dialogFormVisible = true;
      this.form = {
        name: '',
        addr: '',
        location: {},
        phone: '',
        note: '',
      };
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
     * 向百度api发起请求
     * @param queryString
     */
    async getSearchAddr(queryString) {
      // const getUrl = `http://api.map.baidu.com/place/v2/suggestion?city_limit=true&output=json&ak=tVhFbEhHkfSXzkpbNtN3g2KOZHBc3LOl&region=上海&query=${queryString}`;
      const result = await axios.get('/baiduApi', {
        params: {
          city_limit: true,
          output: 'json',
          ak: 'tVhFbEhHkfSXzkpbNtN3g2KOZHBc3LOl',
          region: '上海',
          query: queryString,
        },
      });
      console.log(result);
      if (result.data) {
        return result.data.result;
      }
      return [];
    },
    /**
     * 地址搜索下拉框选择事件
     * @param item
     */
    handleSelect(item) {
      this.form.addr = item.value;
      this.form.location = item.location;
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
      const editAddr = {
        detail: this.form.addr,
        lng: this.form.location.lng,
        lat: this.form.location.lat,
        name: this.form.name,
        phone: this.form.phone,
        note: this.form.note,
      };
      if (this.isEdit) {
        // 如果为编辑则修改该项;
        userAddr[this.editIndex] = editAddr;
      } else {
        // 如果为新增，则在数组最前添加1
        userAddr.unshift(editAddr);
      }
      this.userInfo.addr = JSON.stringify(userAddr);
      this.editIndex = 0;
      this.isEdit = false;
      this.updateAddrInfo();
    },
    /**
     * 地址修改请求
     */
    async updateAddrInfo() {
      this.editLoading = true;
      try {
        const url = '/user/modify';
        const params = this.userInfo;
        const result = await this.postRequest(url, params);
        if (result.data.errorCode !== 0) {
          this.$message.error(result.data.errorMsg);
        } else {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.form = {
            name: '',
            addr: '',
            location: {},
            phone: '',
            note: '',
          };
          this.getUserInfo();
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 用户地址信息修改
     * @param index
     * @param method 操作方法
     */
    editUserAddr(index, method) {
      const addressList = this.userAddressList;
      console.log(index, addressList[index], method);
      if (method === 'delete') {
        addressList.splice(index, 1);
        this.userInfo.addr = JSON.stringify(addressList);
        this.updateAddrInfo();
      } else {
        const editAddr = addressList[index];
        this.form = {
          name: editAddr.name,
          addr: editAddr.detail,
          location: {
            lat: editAddr.lat,
            lng: editAddr.lng,
          },
          phone: editAddr.phone,
          note: editAddr.note,
        };
        this.dialogFormVisible = true;
        this.isEdit = true;
        this.editIndex = index;
      }
    },
  },
};
</script>

<style scoped lang="less">
.addr-manage {
  .addr-wrapper {
    margin: 0 18%;
    text-align: left;
    position: relative;
    padding-top: 68px;
    .add-addr-wrapper {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 38px;
      margin: 18px 0;
      padding: 0 10px;
      border-radius: 8px;
      color: #444444;
      transition: background .3s;
      background: #FDD14B;
      &:hover {
        cursor: pointer;
        color: #333333;
        background: #FDD14B99;
      }
      i {
        display: inline-block;
        margin-right: 5px;
        font-weight: 700;
      }
    }
  }
  .addr-item {
    margin-bottom: 5px;
    strong {
      color: #999999;
      display: inline-block;
      width: 80px;
    }
  }
  .content-wrapper {
    padding-left: 30px;
  }
  .right-button {
    display: inline-block;
    line-height: 112px;
    button {
      padding: 18px;
    }
    &:nth-child(2n+1) {
      margin-right: 20px;
    }
  }
}
</style>
<style lang="less">
.addr-manage {
  .addr-wrapper {
    .el-row {
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 2px dotted #e3e3e3;
      &:hover {
        border: 2px solid #FDD14B;
        cursor: pointer;
      }
    }
    .breadcrumb-wrapper {
      position: absolute;
      top: 24px;
    }
  }
  .el-autocomplete {
    display: block;
  }
}
</style>
