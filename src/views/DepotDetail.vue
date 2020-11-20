<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="6" class="d-f-e">
        <div>
          <el-button type="primary" @click="query">查询</el-button>
        </div>
      </el-col>
    </Panel>
    <div class="pt-10 table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        ref="firstTable"
        stripe
      >
        <el-table-column
          header-align="center"
          :align="item.align || 'left'"
          :label="item.label"
          :width="item.width"
          v-for="(item, index) in tableHeader"
          :key="item.label + index"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row[item.id]"
              v-if="item.type === 'input'"
              v-focus
            />
            <div v-else-if="item.type === 'serial'" class="t-c">
              {{ scope.$index + 1 }}
            </div>
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="20"
      class="pagination mr-10"
      :current-page.sync="currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "depotDetail",
  data() {
    return {
      arr: [
        {
          label: "客户",
          model: "",
          placeholder: "",
          type: "page",
          data: [],
          id: "customer_id",
        },
        {
          label: "销售",
          model: "",
          placeholder: "",
          type: "select",
          data: [],
          id: "saler_id",
        },
        {
          label: "跟单",
          model: "",
          placeholder: "",
          type: "select",
          data: [],
          id: "member_id",
        },
        {
          label: "分类",
          model: "",
          placeholder: "",
          type: "select",
          data: [],
          id: "product_group",
        },
        {
          label: "关键字搜索",
          model: "",
          placeholder: "产品名称、收货单位、收货人",
          id: "product_name",
        },
        {
          label: "入库时间",
          model: "",
          placeholder: "",
          type: "daterange",
          span: 6,
          id: "delivery_date_min",
        },
        {
          label: "出入库类型",
          model: "",
          placeholder: "",
          type: "select",
          data: [
            { name: "入库操作", id: "0" },
            { name: "出库操作", id: "1" },
            { name: "库存调整", id: "2" },
            { name: "库存分配", id: "3" },
            { name: "库存导入", id: "4" },
          ],
          id: "history_source",
        },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        {
          label: "出入库类型",
          id: "history_source",
          width: 90,
          align: "center",
        },
        { label: "销售", id: "saler_name" },
        { label: "跟单员", id: "member_name" },
        { label: "分类", id: "product_group" },
        { label: "客户名称", id: "customer_name" },
        { label: "产品名称", id: "product_name" },
        { label: "单价", id: "product_price", align: "right" },
        { label: "数量", id: "number_switch", align: "right" },
        { label: "金额", id: "money", align: "right" },
        { label: "更新时间/入库时间", id: "updated_at" },
        { label: "仓储库位", id: "location_name" },
      ],
      currentPage: 1,
      total: 1,
    };
  },
  methods: {
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      if (obj.delivery_date_min) {
        obj.created_at_max = moment(obj.delivery_date_min[1]).format(
          "YYYY-MM-DD"
        );
        obj.created_at_min = moment(obj.delivery_date_min[0]).format(
          "YYYY-MM-DD"
        );
      }
      if (obj.customer_id) {
        obj.customer_id = this.$vuexData.x.customer.filter(
          (r) => r.id === obj.customer_id
        )[0].name;
      }
      let res = await this.$post("yuanyi_storage_histories/list", obj);
      this.tableData = res.data.data.entries.map((r) => {
        return {
          ...r,
          ...{ money: (r.product_price * r.number_switch).toFixed(2) },
        };
      });
      this.total = res.data.data.paginate_meta.total_count;
    },
    currentChange(index) {
      this.currentPage = index;
      this.query();
    },
  },
  mounted() {
    this.query();
    this.arr[0].data = this.$vuexData.x.customer;
    this.arr[3].data = this.$vuexData.x.group_options;
    this.arr[1].data = this.$vuexData.x.member_options;
    this.arr[2].data = this.$vuexData.x.member_options;
    this.$bus.$on("user", () => {
      this.arr[0].data = this.$vuexData.x.customer;
      this.arr[3].data = this.$vuexData.x.group_options;
      this.arr[1].data = this.$vuexData.x.member_options;
      this.arr[2].data = this.$vuexData.x.member_options;
    });
  },
};
</script>

<style lang="" scoped></style>
