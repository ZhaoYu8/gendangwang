<template>
  <div class="plan box p-10">
    <!-- 头部查询条件 -->
    <Panel :arr="arr" @change="change" @dateChange="dateChange"> </Panel>
    <!-- 表格 -->
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="customer_name" label="客户名称" />
        <el-table-column prop="bill_total_price" label="总应收款" />
        <el-table-column prop="date_bill_price" label="到期应收款">
          <template slot-scope="scope">
            <el-link type="warning" :underline="false" @click="showDetail(scope.row)">{{ scope.row.date_bill_price }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="test1" label="总应付款" />
        <el-table-column prop="test2" label="账期应付款" />
      </el-table>
    </div>
    <Detail :centerDialogVisible="visble" :detailData="detailData" @cancel="visble = false" />
  </div>
</template>

<script>
import Detail from '../components/FormTable/Detail';
export default {
  name: 'Plan',
  props: {},
  data: () => {
    return {
      arr: [
        { label: '销售', model: '', placeholder: '', type: 'page', data: [], id: 'saler_id' },
        { label: '客户', model: '', placeholder: '', type: 'page', data: [], id: 'customer_id' },
        {
          label: '发货日期',
          span: '8',
          model: 'all',
          placeholder: '',
          type: 'filter',
          data: [
            { name: '全部', id: 'all' },
            { name: '本月', id: 'month' },
            { name: '本季度', id: 'quarter' },
            { name: '本年', id: 'year' },
            { name: '自定义日期', id: 'custom' },
          ],
          id: 'outbounded_at',
        },
      ],
      tableData: [], // 表格数据
      visble: false,
      detailData: {},
      date: [],
    };
  },
  watch: {},
  computed: {},
  components: { Detail },
  methods: {
    // 查询
    async query(option = null) {
      let obj = {
        saler_id: this.arr[0].model,
        customer_id: this.arr[1].model,
        outbounded_at: this.arr[2].model,
      };
      if (option) {
        obj = { ...obj, ...option };
      }
      let res = await this.$post('/outbound_tasks/outbound_bills', obj);
      let data = res.data.data.outbound_bills;
      this.tableData = [];
      data.map((r) => {
        r.test1 = 0;
        r.test2 = 0;
      });
      this.$nextTick(() => {
        this.tableData = data;
      });
    },
    init() {
      let x = this.$vuexData.x;
      this.arr[0].data = x.member;
      this.arr[1].data = x.customer;
    },
    dateChange(val) {
      this.date = [moment(val[0]).format('YYYY-MM-DD'), moment(val[1]).format('YYYY-MM-DD')];
      this.query({
        date_min: this.date[0],
        date_max: this.date[1],
      });
    },
    change(val) {
      if (val.model === 'custom') return;
      this.query();
    },
    async showDetail(val) {
      let obj = {
        saler_id: this.arr[0].model,
        customer_id: val.customer_id,
        outbounded_at: this.arr[2].model,
      };
      if (this.arr[2].model === 'custom') {
        obj = {
          ...obj,
          ...{
            date_min: this.date[0],
            date_max: this.date[1],
          },
        };
      }
      let res = await this.$post('/outbound_tasks/outbound_bills_detail', obj);
      this.detailData = res.data.data;
      this.visble = true;
    },
  },
  mounted() {
    this.init();
    this.$bus.$on('user', () => {
      this.init();
    });
    this.query();
  },
};
</script>

<style lang="scss" scoped></style>
