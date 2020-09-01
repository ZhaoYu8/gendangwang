<template>
  <el-tabs v-model="activeName" class="p-t-5" type="border-card" @tab-click="chenge">
    <!-- 第一个tab页 -->
    <el-tab-pane label="送货计划单" name="plan"></el-tab-pane>
    <el-tab-pane label="送货派货单" name="deliverGoods"> </el-tab-pane>
    <el-tab-pane label="送货单列表" name="deliveryList"> </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      activeName: "plan", // 切换页model
      user: [],
      delivery: [],
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
