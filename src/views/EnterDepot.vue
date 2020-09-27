<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="12" class="d-f-e">
        <el-button type="primary" plain @click="query">查询</el-button>
        <el-button type="primary" @click="panelChange">新增入库单</el-button>
        <!-- <el-button type="warning" @click="visibleBatch = true">批量导入</el-button> -->
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
        <el-table-column label="入库数量" align="center" prop="storage_number" header-align="center"> </el-table-column>
        <el-table-column label="库位" align="center" prop="location_name" header-align="center"> </el-table-column>
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
    <el-dialog title="新建入库单" :visible="visible" width="95%" top="5vh" class="dialog" @close="visible = false" :close-on-click-modal="false">
      <AddEnterDepot @cancel="cancel" />
    </el-dialog>
    <el-dialog title="批量导入" :visible="visibleBatch" width="40%" top="5vh" class="dialog" @close="visibleBatch = false">
      默认模板：
      <div>xsjxsjixs.xlsx</div>
      <el-upload class=" t-c" accept=".xlsx,.xls" drag action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx,xls文件</div>
      </el-upload>
      <div class="d-f-e pt-10">
        <el-button @click="visibleBatch = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
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
      visibleBatch: false,
      arr: [
        { label: '仓位', model: '', placeholder: '', type: 'page', data: [], id: 'location_id' },
        { label: '客户', model: '', placeholder: '', type: 'page', data: [], id: 'customer_id' },
        { label: '销售', model: '', placeholder: '', type: 'select', data: [], id: 'location_id' },
        { label: '负责人', model: '', placeholder: '', type: 'select', data: [], id: 'member_id' },
        { label: '部门', model: '', placeholder: '', type: 'select', data: [], id: 'product_group' },
        { label: '入库时间', model: '', placeholder: '', type: 'daterange', span: 6, id: 'delivery_date_min' },
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
        obj.created_at_max = moment(obj.delivery_date_min[1]).format('YYYY-MM-DD');
        obj.created_at_min = moment(obj.delivery_date_min[0]).format('YYYY-MM-DD');
      }
      if (obj.customer_id) {
        obj.customer_id = this.$vuexData.x.customer.filter((r) => r.id === obj.customer_id)[0].name;
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
    init() {
      this.arr[0].data = this.$vuexData.x.location;
      this.arr[1].data = this.$vuexData.x.customer;
      this.arr[2].data = this.$vuexData.x.member_options;
      this.arr[3].data = this.$vuexData.x.member_options;
      this.arr[4].data = this.$vuexData.x.group_options;
    },
    cancel(type) {
      this.visible = false;
      if (type) this.query();
    },
  },
  mounted() {
    this.query();
    this.init();
    this.$bus.$on('user', () => {
      this.init();
      // this.arr[3].data = this.$vuexData.x.customer;
    });
  },
};
</script>

<style lang="scss" scoped></style>
