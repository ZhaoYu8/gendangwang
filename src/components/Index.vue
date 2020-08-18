<template>
  <div class="hello">
    <el-tabs v-model="activeName" class="p-t-5" type="border-card" @tab-click="chenge">
      <!-- 第一个tab页 -->
      <el-tab-pane label="送货计划单" name="first">
        <First :activeName="activeName" :user="user" :delivery="delivery" />
      </el-tab-pane>
      <el-tab-pane label="送货派货单" name="second">
        <Second v-if="secondShow" :user="user" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane label="送货单列表" name="third">
        <Third v-if="thirdShow" :user="user" :activeName="activeName" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Second from "./Second.vue";
import First from "./First.vue";
import Third from "./Third.vue";

export default {
  name: "Index",
  props: {},
  components: {
    Second,
    First,
    Third,
  },
  data: () => {
    return {
      activeName: "first", // 切换页model
      secondShow: false,
      thirdShow: false,
      user: [],
      delivery: [],
    };
  },
  methods: {
    chenge() {
      if (this.activeName === "second" && !this.secondShow) {
        this.secondShow = true;
      }
      if (this.activeName === "third" && !this.thirdShow) {
        this.thirdShow = true;
      }
    },
  },
  mounted() {
    // 取user数据
    this.$post("/delivery_plans/new_plan", {}).then((res) => {
      res.data.data.customer_options.map((r, i) => {
        this.$set(this.user, i, r);
      });
      res.data.data.delivery_shift_options.map((r, i) => {
        this.$set(this.delivery, i, r);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.f-r {
  float: right;
}
.p-t-5 {
  padding-top: 5px;
}
.p-t-10 {
  padding-top: 10px;
}
.pagination {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
<style lang="scss">
.form-item {
  width: 100%;
  display: inline-flex !important;
}
</style>
