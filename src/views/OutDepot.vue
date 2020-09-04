<template>
  <div class="outdepot">
    <transition :name="!panelShow ? '' : 'el-zoom-in-bottom'">
      <div v-show="panelShow" class="h-100">
        <Panel :arr="arr">
          <el-col :span="4" class="d-f-e">
            <el-button type="primary" @click="init">查询</el-button>
            <el-button type="warning" @click="panelShow = false">新增</el-button>
          </el-col>
        </Panel>

        <!-- 表格 -->
        <div class="p-t-10">
          <el-table :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
            <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
              <template slot-scope="scope">
                <template v-if="item.id === 'outbound_task_serial'">
                  <el-link v-if="item.id === 'outbound_task_serial'" type="primary">{{ scope.row[item.id] }}</el-link>
                </template>
                <template v-else>
                  <el-date-picker :clearable="false" v-model="scope.row[item.id]" type="date" :placeholder="item.placeholder || '请选择'" style="width: 100%;" v-if="item.type === 'date'" @change="tableChange(scope.row, item)"></el-date-picker>
                  <el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" v-focus />
                  <div v-else-if="item.type === 'serial'" class="t-c">{{ scope.$index + 1 }}</div>
                  <div v-else>{{ scope.row[item.id] }}</div>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="20" class="pagination m-r-10" :current-page.sync="currentPage" @current-change="currentChange"></el-pagination>
      </div>
    </transition>
    <transition :name="panelShow ? '' : 'el-zoom-in-top'">
      <div v-show="!panelShow" class="h-100" style=" box-sizing: border-box;overflow: hidden;">
        <AddOutDepot @cancel="cancel" />
      </div>
    </transition>
  </div>
</template>

<script>
import AddOutDepot from "../components/OutDepot/AddOutDepot";
export default {
  name: "outDepot",
  data() {
    return {
      currentPage: 1,
      total: 1,
      panelShow: true,
      arr: [
        { label: "仓库", model: "", placeholder: "", type: "select", data: [], id: "inbound_warehouse_id" },
        { label: "仓位", model: "", placeholder: "", type: "select", data: [], id: "warehouse_location_id" },
        { label: "客户", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "销售", model: "", placeholder: "", type: "select", data: [], id: "saler_id" },
        { label: "负责人", model: "", placeholder: "", type: "select", data: [], id: "member_id" },
        { label: "发货时间", model: "", placeholder: "", type: "daterange", span: 8, id: "delivery_date_min" },
        { label: "关键字", model: "", placeholder: "", id: "query_key" },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: "序号", id: "id", width: 70, type: "serial" },
        { label: "发货时间", id: "delivery_date" },
        { label: "出库时间", id: "outbounded_at" },
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
  },
  methods: {
    cancel() {
      this.panelShow = true;
    },
    async init() {
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
      let now = await this.$post("outbound_tasks/for_show", {
        id: this.tableData[0].id,
      });
      console.log(now);
    },
    currentChange(index) {
      this.currentPage = index;
      this.init();
    },
  },
  mounted() {
    this.init();
    this.$bus.$on("user", () => {
      this.arr[0].data = this.$vuexData.x.warehouse;
      this.arr[1].data = this.$vuexData.x.location;
      this.arr[2].data = this.$vuexData.x.customer;
      [3, 4].map((r) => {
        this.arr[r].data = this.$vuexData.x.member;
      });
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
