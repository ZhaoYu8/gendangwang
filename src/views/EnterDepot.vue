<template>
  <div class="p-10">
    <Panel :arr="arr">
      <el-col :span="4" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="panelChange">新增入库单</el-button>
      </el-col>
    </Panel>
    <!-- 表格 -->
    <div class="pt-10 ">
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
    <el-dialog title="新建入库单" :visible="visible" width="95%" top="5vh" @close="visible = false" :close-on-click-modal="false">
      <AddEnterDepot />
    </el-dialog>
  </div>
</template>

<script>
import AddEnterDepot from '../components/EnterDepot/AddEnterDepot';
export default {
  name: 'enterDepot',
  data() {
    return {
      visible: false,
      arr: [
        { label: '仓库', model: '', placeholder: '', type: 'select', data: [], id: 'inbound_warehouse_id' },
        { label: '仓位', model: '', placeholder: '', type: 'select', data: [], id: 'warehouse_location_id' },
        { label: '客户', model: '', placeholder: '', type: 'select', data: [], id: 'customer_id' },
        { label: '销售', model: '', placeholder: '', type: 'select', data: [], id: 'saler_id' },
        { label: '负责人', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '部门', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '入库时间', model: '', placeholder: '', type: 'daterange', span: 8, id: 'delivery_date_min' },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: '序号', id: 'id', width: 70, type: 'serial' },
        { label: '发货时间', id: 'delivery_date' },
        { label: '收货人', id: 'contact_name' },
        { label: '收货单位', id: 'contact_company' },
        { label: '客户', id: 'customer_name' },
        { label: '出库单号', id: 'outbound_task_serial' },
        { label: '发货总数', id: 'outbound_number' },
        { label: '当前状态', id: 'status_name' },
        { label: '更新时间', id: 'updated_at' },
        { label: '最后操作人', id: 'updator' },
      ],
      currentPage: 1,
      total: 1,
    };
  },
  components: { AddEnterDepot },
  methods: {
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      if (obj.delivery_date_min) {
        obj.delivery_date_max = moment(obj.delivery_date_min[1]).format('YYYY-MM-DD');
        obj.delivery_date_min = moment(obj.delivery_date_min[0]).format('YYYY-MM-DD');
      }
      let res = await this.$post('outbound_tasks/list', obj);
      this.tableData = res.data.data.items;
      this.total = res.data.data.paginate_meta.total_count;
    },
    panelChange() {
      this.visible = true;
    },
    currentChange(index) {
      this.currentPage = index;
      this.query();
    },
  },
  mounted() {},
};
</script>

<style lang="" scoped></style>
