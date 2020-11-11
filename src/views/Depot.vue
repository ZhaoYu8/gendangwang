<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="18" class="d-f-e">
        <div>
          <el-button type="primary" @click="query">查询</el-button>
        </div>
      </el-col>
    </Panel>
    <div class="pt-10 table">
      <el-table :show-summary="true" :summary-method="getSummaries" :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
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
        { label: '客户', model: '', placeholder: '', type: 'page', data: [], id: 'customer_id' },
        { label: '销售', model: '', placeholder: '', type: 'select', data: [], id: 'saler_id' },
        { label: '跟单', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '分类', model: '', placeholder: '', type: 'select', data: [], id: 'confirm_type' },
        { label: '产品名称', model: '', placeholder: '', id: 'product_name' },
        { label: '入库时间', model: '', placeholder: '', span: 6, type: 'daterange', id: 'delivery_date_min' },
        { label: '收货人', model: '', placeholder: '', type: 'page', data: [], id: 'contact_name' },
        { label: '收货单位', model: '', placeholder: '', type: 'page', data: [], id: 'contact_company' },
        {
          label: '筛选内容',
          model: 0,
          placeholder: '',
          type: 'filter',
          span: 6,
          id: 'confirm_status',
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
        { label: '出库时间', id: 'created_at' },
        { label: '出库类型', id: 'confirm_type' },

        { label: '销售', id: 'saler_name' },
        { label: '负责人', id: 'member_name' },
        { label: '客户名称', id: 'customer_name', width: '240' },

        { label: '收货人', id: 'contact_name' },
        { label: '收货单位', id: 'contact_company' },

        { label: '订单编号', id: 'order_serial' },

        { label: '产品名称', id: 'product_name', width: '240' },
        { label: '产品编码', id: 'product_serial' },

        { label: '出库数量', id: 'delivery_number' },

        { label: '单价', id: 'product_price' },
        { label: '库位', id: 'location_name' },
      ],
      currentPage: 1,
      total: 1,
    };
  },
  computed: {
    num() {
      return this.tableData
        .map((r) => r.delivery_number)
        .reduce((prev, curr) => {
          return prev + curr;
        });
    },
    money() {
      return this.tableData
        .map((r) => r.delivery_number * r.product_price)
        .reduce((prev, curr) => {
          return prev + curr;
        })
        .toFixed(2);
    },
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      if (this.tableData.length) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计:';
            return;
          }
          if (column.label === '出库数量') {
            sums[index] = this.num;
          } else if (column.label === '单价') {
            sums[index] = this.money;
          } else {
            sums[index] = '';
          }
        });
      }
      return sums;
    },
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      if (obj.delivery_date_min) {
        obj.created_at_max = moment(obj.delivery_date_min[1]).format('YYYY-MM-DD');
        obj.created_at_min = moment(obj.delivery_date_min[0]).format('YYYY-MM-DD');
      }
      if (obj.customer_id) {
        obj.customer_id = this.$vuexData.x.customer.filter((r) => r.id === obj.customer_id)[0].name;
      }
      if (obj.confirm_status === 0) delete obj.confirm_status;
      let res = await this.$post('yuanyi_deliveries/list', obj);
      this.tableData = res.data.data.items.map((r) => {
        return { ...r, ...{ money: (r.product_price * r.storage_number).toFixed(2) } };
      });
      this.total = res.data.data.paginate_meta.total_count;
    },
    currentChange(index) {
      this.currentPage = index;
      this.query();
    },
    async change(item) {
      this.$confirm('是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let res = await this.$post(`yuanyi_deliveries/confirm`, {
            id: item.id,
          });
          this.$common.notify();
          this.query();
        })
        .catch(() => {});
      return;
    },
    init() {
      this.arr[0].data = this.$vuexData.x.customer;
      this.arr[1].data = this.$vuexData.x.member_options;
      this.arr[2].data = this.$vuexData.x.member_options;
      this.arr[3].data = [
        { id: 0, name: '发货单' },
        { id: 1, name: '送货单' },
      ];
      this.arr[6].data = this.$vuexData.x.contact_name_options;
      this.arr[7].data = this.$vuexData.x.contact_company_options;
    },
  },
  mounted() {
    this.query();
    this.init();
    this.$bus.$on('user', () => {
      this.init();
    });
  },
};
</script>

<style lang="" scoped></style>
