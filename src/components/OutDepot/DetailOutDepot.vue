<template>
  <div class="add-outdepot">
    <div class="d-f-c-s-b f-s">
      <span class="f-20"> 新建送货计划单</span>
    </div>
    <div class="table"></div>
  </div>
</template>

<script>
export default {
  name: "DetailOutDepot",
  props: {},
  components: {},
  data: () => {
    return {
      tableData: [],
    };
  },
  methods: {
    async init(val) {
      let res = await this.$post("outbound_tasks/for_show", {
        id: val.id,
      });
      this.detailData = res.data.data;
      console.log(res);
    },
  },
  beforeDestroy() {
    this.$bus.$off("detailShow");
  },
  mounted() {
    this.$bus.$on("detailShow", (res) => {
      console.log("你进来了小伙子", res);
      this.init(res);
    });
  },
};
</script>

<style lang="scss" scoped>
.add-outdepot {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table {
    flex-grow: 1;
    height: 0;
    padding-top: 10px;
    ::v-deep .el-table {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      .el-table__body-wrapper {
        flex: 1;
        overflow-y: scroll;
      }
    }
  }
}
</style>
