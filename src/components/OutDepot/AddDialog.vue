<template>
  <el-dialog title="出入库产品选择" :visible.sync="dialogVisible" width="85%" top="5vh" class="dialog" @close="cancel(false)" append-to-body>
    <!-- 头部查询条件 -->
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col span="7">
            <el-form-item label="客户名称：" class="form-item">
              <Page v-model="cust" placeholder="请选择客户名称" :data="$vuexData.x.customer" @change="custChange"></Page>
            </el-form-item>
          </el-col>
          <el-col span="5">
            <el-form-item label="" class="form-item">
              <el-input v-model="inputModel" placeholder="订单编号/产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="" class="form-item">
              <el-button type="primary" class="f-r ml-10" @click="save">保存</el-button>
              <el-button type="warning" class="f-r" @click="query">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第一个表格 -->
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="500" ref="dialog1Table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center"></el-table-column>
        <el-table-column label="仓库选择" align="center" header-align="center">
          <template slot-scope="scope">
            <el-select filterable v-model="scope.row['inbound_warehouse_id']" placeholder="">
              <el-option v-for="item in $vuexData.x.warehouse" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="仓位选择" align="center" header-align="center">
          <template slot-scope="scope">
            <Page v-model="scope.row['warehouse_location_id']" :data="$vuexData.x.location"></Page>
          </template>
        </el-table-column>
        <el-table-column label="当前库存" align="center" prop="storage_quantity" header-align="center" width="100"></el-table-column>
        <el-table-column label="出库数量" align="center" header-align="center" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row['product_number']" placeholder="" @change="numberChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备次" align="center" prop="sparetime" header-align="center" width="100"> </el-table-column>
        <el-table-column label="备次率(%)" align="center" header-align="center" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row['sparetime_percent']" placeholder="" @change="percentChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" align="center" header-align="center" prop="price" width="100"> </el-table-column>
        <el-table-column label="备注" align="center" header-align="center">
          <template slot-scope="scope"> <el-input v-model="scope.row['note']" placeholder=""></el-input> </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :current-page.sync="currentPage" :total="total_count" background :page-size="20" class="pt-10 d-f-e" @current-change="currentChange"> </el-pagination>
      <!-- 第一个表格分页 -->
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    dialogVisibl: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data: () => {
    return {
      multipleSelection: [],
      inputModel: '',
      cust: null,
      custData: [], // 客户数据
      dialogVisible: false,
      tableData: [],
      total_count: 1,
      currentPage: 1,
    };
  },
  watch: {
    dialogVisibl(val) {
      if (val) {
        this.dialogVisible = true;
        this.tableData = [];
      }
    },
  },
  methods: {
    custChange() {
      this.inputModel = '';
      this.query();
    },
    numberChange(val) {
      val.product_number = Number(val.product_number) || 0;
      val.sparetime = Math.ceil((val.product_number * val.sparetime_percent) / 100) || 0;
    },
    percentChange(val) {
      val.sparetime_percent = Number(val.sparetime_percent) || 0;
      val.sparetime = Math.ceil((val.product_number * val.sparetime_percent) / 100) || 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cancel(type = false) {
      this.$emit('cancel', type);
      this.dialogVisible = false;
    },
    currentChange() {
      this.query();
    },
    async query() {
      let obj = { page: this.currentPage };
      if (this.inputModel) {
        obj.query_key = this.inputModel;
      } else {
        obj.customer_id = this.cust;
      }
      let res = await this.$post('outbound_tasks/choose_products', obj);
      res = res.data.data;
      let arr = this.multipleSelection;
      let data = res.items.filter((r) => !this.multipleSelection.map((n) => n.product_id).includes(r.product_id));
      data.map((r, n) => {
        r.sparetime = 0;
      });
      this.tableData = this.multipleSelection.concat(data);
      this.$nextTick(() => {
        arr.forEach((row) => {
          this.$refs.dialog1Table.toggleRowSelection(row);
        });
      });
      this.total_count = res.paginate_meta.total_count;
    },
    save() {
      if (!this.multipleSelection.length) {
        this.$notify({
          title: '警告',
          message: '你未选中任何一条数据，请检查！',
          type: 'warning',
        });
        return;
      }
      this.$emit('save', this.multipleSelection);
      this.cancel();
    },
  },
  beforeDestroy() {
    this.$bus.$off('AddOutDepot');
  },
  mounted() {
    this.$bus.$on('AddOutDepot', (val) => {
      this.cust = val;
      this.query();
    });
  },
};
</script>

<style lang="scss" scoped></style>
