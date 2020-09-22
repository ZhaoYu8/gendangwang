<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="5" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </Panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
        <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            <div v-if="item.id === 'update'" class="d-f-s-a">
              <el-link :underline="false" type="primary" @click="change(scope.row)">确认</el-link>
            </div>
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
        {
          label: '筛选内容',
          model: 0,
          placeholder: '',
          type: 'filter',
          span: 5,
          id: 'delivery_date_min',
          data: [
            { name: '全部', id: 0 },
            { name: '待确认', id: 1 },
            { name: '已确认', id: 2 },
          ],
        },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: '操作', id: 'update', width: 50 },
        { label: '出库时间', id: 'saler_name' },
        { label: '出库类型', id: 'member_name' },
        { label: '销售', id: 'saler_name' },
        { label: '负责人', id: 'member_name' },
        { label: '客户名称', id: 'customer_name' },
        { label: '订单编号', id: 'customer_name' },
        { label: '产品名称', id: 'product_name' },
        { label: '产品编码', id: 'product_name' },
        { label: '出库数量', id: 'storage_number' },
        { label: '单价', id: 'product_price' },
        { label: '库位', id: 'money' },
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
      let res = await this.$post('yuanyi_storages/list', obj);
      this.tableData = res.data.data.entries.map((r) => {
        return { ...r, ...{ money: r.product_price * r.storage_number } };
      });
      this.total = res.data.data.paginate_meta.total_count;
    },
    currentChange(index) {
      this.currentPage = index;
      this.query();
    },
    async change() {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          return;
          let res = await this.$post(`yuanyi_storages/${this.visibleType === 1 ? 'switch_location' : 'change_storage'}`);
          this.$common.notify();
          this.query();
        })
        .catch(() => {});
      return;
    },
  },
  mounted() {
    this.query();
    if (this.$vuexData.x.location.length) this.locationModel = this.$vuexData.x.location[0].id;
    this.$bus.$on('user', () => {
      this.locationModel = this.$vuexData.x.location[0].id;
    });
  },
};
</script>

<style lang="" scoped></style>
