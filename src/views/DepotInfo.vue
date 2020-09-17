<template>
  <div class="p-10">
    <Panel :arr="arr">
      <el-col :span="10" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="panelChange">新增入库单</el-button>
      </el-col>
    </Panel>
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
  </div>
</template>

<script>
export default {
  name: 'depot',
  data() {
    return {
      arr: [
        { label: '客户', model: '', placeholder: '', type: 'select', data: [], id: 'customer_id' },
        { label: '销售', model: '', placeholder: '', type: 'select', data: [], id: 'saler_id' },
        { label: '跟单', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '分类', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '产品名称', model: '', placeholder: '', id: 'warehouse_location_id' },
        { label: '入库时间', model: '', placeholder: '', type: 'daterange', span: 8, id: 'delivery_date_min' },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: '序号', id: 'id', width: 70, type: 'serial' },
        { label: '销售', id: 'delivery_date' },
        { label: '跟单员', id: 'contact_name' },
        { label: '分类', id: 'contact_company' },
        { label: '客户名称', id: 'customer_name' },
        { label: '产品名称', id: 'outbound_task_serial' },
        { label: '单价', id: 'outbound_number' },
        { label: '数量', id: 'status_name' },
        { label: '金额', id: 'updated_at' },
        { label: '入库日期', id: 'updator' },
        { label: '仓储库位', id: 'updator' },
        { label: '操作', id: 'updator' },
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
