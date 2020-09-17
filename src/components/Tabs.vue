<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="chenge">
    <el-tab-pane :label="item.label" :name="item.key" v-for="(item, index) in tabs" :key="item.key + index"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      tabs: [
        { label: "库存信息", key: "depotInfo" },
        { label: "入库管理", key: "enterDepot" },
        { label: "出库管理", key: "depot" },
        { label: "发货管理", key: "outDepot" },
        { label: "发货财务审核", key: "reviewDepot" },
        { label: "送货计划单", key: "plan" },
        { label: "送货派货单", key: "deliverGoods" },
        { label: "送货单列表", key: "deliveryList" },
      ],
      activeName: "outDepot", // 切换页model
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
    this.$vuexFn.getUser().then(() => {
      this.$bus.$emit("user");
    });
    setTimeout(() => {
      this.activeName = this.$route.name;
    }, 500);
  },
};
</script>

<style lang="" scoped></style>
