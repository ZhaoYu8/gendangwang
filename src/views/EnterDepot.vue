<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="4" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="panelChange">新增入库单</el-button>
      </el-col>
    </Panel>
    <!-- 表格 -->
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border ref="table">
        <el-table-column label="入库日期" align="center" prop="entried_at" header-align="center"> </el-table-column>
        <el-table-column label="销售" align="center" prop="saler_name" header-align="center"></el-table-column>
        <el-table-column label="负责人" align="center" prop="member_name" header-align="center"> </el-table-column>
        <el-table-column label="分类" align="center" prop="product_group" header-align="center"> </el-table-column>
        <el-table-column label="客户名称" align="center" prop="customer_name" header-align="center"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"> </el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center"> </el-table-column>
        <el-table-column label="产品编码" align="center" prop="product_serial" header-align="center"> </el-table-column>
        <el-table-column label="当前库存" align="center" prop="ccccc" header-align="center"> </el-table-column>
        <el-table-column label="入库数量" align="center" prop="entry_number" header-align="center"> </el-table-column>
        <el-table-column label="库位" align="center" prop="location_id" header-align="center"> </el-table-column>
        <el-table-column label="是否结束" align="center" prop="note" header-align="center"></el-table-column>
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
      <AddEnterDepot @cancel="visible = false" />
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
      let res = await this.$post('yuanyi_entries/list', obj);
      this.tableData = res.data.data.entries;
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
  mounted() {
    this.query();
  },
};
</script>

<style lang="scss" scoped>
</style>
