<!--
 * @Author: 赵宇
 * @Description: 
 * @Date: 2022-07-25 16:22:40
 * @LastEditTime: 2023-01-07 13:54:21
 * @LastEditors: zhao 13370229059@163.com
 * @FilePath: \yuanyibaozhuang\src\components\Tabs.vue
-->
<template>
  <div class="tabs">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="border-card" @tab-click="chenge">
        <el-tab-pane :label="item.label" :name="item.key" v-for="(item, index) in tabs" :key="item.key + index"></el-tab-pane>
      </el-tabs>
      <div class="tabs-box-user">
        <el-link type="primary" :underline="false" class="mr-10 f-18" href="https://yy.yiyuanmaidian.com/settings/members/choose_org">{{ user.orgName }}</el-link>
        <el-link type="success" :underline="false" class="f-18">{{ user.name }}</el-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {
      tabs: [
        { label: '入库管理', key: 'enterDepot' },
        { label: '待确认表', key: 'depot' },
        { label: '出入库表', key: 'depotInfo' },
        { label: '库存报表', key: 'report' },
        { label: '发货管理', key: 'outDepot' },
        { label: '送货计划单', key: 'plan' },
        { label: '送货派货单', key: 'deliverGoods' },
        { label: '送货单列表', key: 'deliveryList' },
        { label: '发货财务审核', key: 'reviewDepot' },
        { label: '客户款项对账单', key: 'formTable' },
        { label: '出入库详情', key: 'depotDetail' }
      ],
      activeName: 'outDepot', // 切换页model
      user: {
        name: '',
        orgName: ''
      }
    };
  },
  methods: {
    chenge() {
      this.$router.push({ path: this.activeName });
    }
  },
  async mounted() {
    // 取user数据
    let a = this.$vuexFn.getCommon();
    let b = this.$vuexFn.getCust();
    let c = this.$vuexFn.getLocation();
    let d = this.$vuexFn.getFilter();
    Promise.all([a, b, c, d]).then(() => {
      this.$bus.$emit('user');
    });
    setTimeout(() => {
      this.activeName = this.$route.name;
    }, 500);
    let { data } = await this.$post('outbound_tasks/current_account');
    this.user = {
      name: data.data.current_member.name,
      orgName: data.data.current_org.name
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-box {
    position: relative;
    &-user {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
