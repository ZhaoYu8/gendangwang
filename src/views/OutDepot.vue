<template>
  <div class="outdepot box">
    <Panel :arr="arr">
      <el-col :span="4" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="panelChange">新增</el-button>
      </el-col>
    </Panel>
    <!-- 表格 -->
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
        <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            <template v-if="item.id === 'outbound_task_serial'">
              <el-link v-if="item.id === 'outbound_task_serial'" type="primary" @click="detailChange(scope.row)">{{ scope.row[item.id] }}</el-link>
            </template>
            <template v-else>
              <el-input v-model="scope.row[item.id]" v-if="item.type === 'input'" v-focus />
              <div v-else-if="item.type === 'serial'" class="t-c">{{ scope.$index + 1 }}</div>
              <div v-else>{{ scope.row[item.id] }}</div>
            </template>
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
    <el-dialog title="" :visible="dialogVisible" width="95%" top="5vh" class="dialog" @close="dialogVisible = false" :close-on-click-modal="false">
      <AddOutDepot v-if="addOrDeatil" @cancel="cancel" @detail="detail" />
      <DetailOutDepot v-if="!addOrDeatil" :detailData="detailData" @update="update" @cancel="cancel" />
    </el-dialog>
  </div>
</template>

<script>
import AddOutDepot from "../components/OutDepot/AddOutDepot";
import DetailOutDepot from "../components/OutDepot/DetailOutDepot";
export default {
  name: "outDepot",
  data() {
    return {
      detailData: {},
      dialogVisible: false,
      addOrDeatil: true, // 默认新增 false 为修改
      currentPage: 1,
      total: 1,
      arr: [
        { label: "仓库", model: "", placeholder: "", type: "select", data: [], id: "inbound_warehouse_id" },
        { label: "仓位", model: "", placeholder: "", type: "page", data: [], id: "warehouse_location_id" },
        { label: "客户", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "销售", model: "", placeholder: "", type: "select", data: [], id: "saler_id" },
        { label: "负责人", model: "", placeholder: "", type: "select", data: [], id: "member_id" },
        { label: "发货时间", model: "", placeholder: "", type: "daterange", span: 8, id: "delivery_date_min" },
        { label: "关键字", model: "", placeholder: "订单编号/产品名称/收货人/收货单位", id: "query_key" },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: "序号", id: "id", width: 70, type: "serial" },
        { label: "发货时间", id: "delivery_date" },
        { label: "收货人", id: "contact_name" },
        { label: "收货单位", id: "contact_company" },
        { label: "客户", id: "customer_name" },
        { label: "出库单号", id: "outbound_task_serial" },
        { label: "发货总数", id: "outbound_number" },
        { label: "当前状态", id: "status_name" },
        { label: "更新时间", id: "updated_at" },
        { label: "最后操作人", id: "updator" },
      ],
    };
  },
  components: {
    AddOutDepot,
    DetailOutDepot,
  },
  methods: {
    detail(res) {
      this.addOrDeatil = false;
      this.$nextTick(() => {
        this.$bus.$emit("detailShow", res);
      });
    },
    // 详情跳修改
    update(res) {
      this.addOrDeatil = true;
      this.$nextTick(() => {
        this.$bus.$emit("panelShow", res);
      });
    },
    // 新增成功更新页面
    cancel(type) {
      this.dialogVisible = false;
      if (type) return;
      this.query();
    },
    detailChange(val) {
      this.detailData = val;
      this.dialogVisible = true;
      this.addOrDeatil = false;
      this.$nextTick(() => {
        this.$bus.$emit("detailShow", val);
      });
    },
    panelChange() {
      this.addOrDeatil = this.dialogVisible = true;
      this.$nextTick(() => {
        this.$bus.$emit("panelShow");
      });
    },
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      if (obj.delivery_date_min) {
        obj.delivery_date_max = moment(obj.delivery_date_min[1]).format("YYYY-MM-DD");
        obj.delivery_date_min = moment(obj.delivery_date_min[0]).format("YYYY-MM-DD");
      }
      let res = await this.$post("outbound_tasks/list", obj);
      this.tableData = res.data.data.items;
      this.total = res.data.data.paginate_meta.total_count;
    },
    currentChange(index) {
      this.currentPage = index;
      this.query();
    },
    init() {
      let x = this.$vuexData.x;
      this.arr[0].data = x.warehouse;
      this.arr[1].data = x.location;
      this.arr[2].data = x.customer;
      [3, 4].map((r) => {
        this.arr[r].data = x.member;
      });
    },
  },
  mounted() {
    this.query();
    this.init();
    this.$bus.$on("user", () => {
      this.init();
    });
  },
};
</script>

<style lang="scss" scoped>
.outdepot {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
