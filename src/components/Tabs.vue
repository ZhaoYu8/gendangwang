<template>
  <div class="tabs">
    <el-tabs v-model="activeName" type="border-card" @tab-click="chenge">
      <el-tab-pane :label="item.label" :name="item.key" v-for="(item, index) in tabs" :key="item.key + index"></el-tab-pane>
    </el-tabs>
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
        { label: '出库确认', key: 'depot' },
        { label: '库存信息', key: 'depotInfo' },
        { label: '统计报表', key: 'report' },
        { label: '发货管理', key: 'outDepot' },
        { label: '送货计划单', key: 'plan' },
        { label: '送货派货单', key: 'deliverGoods' },
        { label: '送货单列表', key: 'deliveryList' },
        { label: '发货财务审核', key: 'reviewDepot' },
        { label: '客户款项对账单', key: 'formTable' },
      ],
      activeName: 'outDepot', // 切换页model
      user: [],
    };
  },
  methods: {
    chenge() {
      this.$router.push({ path: this.activeName });
    },
  },
  mounted() {
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
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
