<template>
  <el-dialog title="出入库产品选择" :visible.sync="dialogVisible" width="85%" top="5vh" class="dialog" @close="cancel(false)" append-to-body>
    <!-- 头部查询条件 -->
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col span="7">
            <el-form-item label="客户名称：" class="form-item">
              <Page v-model="cust" :clearable="true" placeholder="请选择客户名称" :data="$vuexData.x.customer" @change="custChange"></Page>
            </el-form-item>
          </el-col>
          <el-col span="5">
            <el-form-item label="" class="form-item">
              <el-input v-model="inputModel" placeholder="订单编号/产品名称/产品编号" @keyup.enter.native="query"></el-input>
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
    <div class="pt-10">
      <el-table :data="tableData" style="width: 100%" border height="600" ref="table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="入库日期" align="center" prop="entried_at" header-align="center">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row['entried_at']" type="date" placeholder="date"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="销售" align="center" prop="saler_name" header-align="center"></el-table-column>
        <el-table-column label="负责人" align="center" prop="member_name" header-align="center"> </el-table-column>
        <el-table-column label="分类" align="center" prop="product_group" header-align="center"> </el-table-column>
        <el-table-column label="客户名称" align="center" prop="customer_name" header-align="center"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"> </el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center"> </el-table-column>
        <el-table-column label="产品编码" align="center" prop="product_serial" header-align="center"> </el-table-column>

        <el-table-column label="订单数量" align="center" prop="order_quantity" header-align="center"> </el-table-column>

        <el-table-column label="当前库存" align="center" prop="ccccc" header-align="center"> </el-table-column>
        <el-table-column label="入库数量" align="center" prop="entry_number" header-align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row['entry_number']"
              placeholder=""
              @change="numberChange(scope.row)"
              v-focuss="{
                index: scope.$index,
                name: 'entry_number'
              }"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库位" align="center" prop="location_id" header-align="center">
          <template slot-scope="scope">
            <Page v-model="scope.row['location_id']" :clearable="true" placeholder="" :data="location_options"></Page>
          </template>
        </el-table-column>
        <el-table-column label="是否结束" align="center" prop="note" header-align="center">
          <template slot-scope="scope"> <el-input v-model="scope.row['note']" placeholder=""></el-input> </template
        ></el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="total_count"
        background
        :page-size="20"
        class="pt-10 d-f-e"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data: () => {
    return {
      multipleSelection: [],
      inputModel: '',
      cust: null,
      custData: [], // 客户数据
      dialogVisible: false,
      tableData: [],
      location_options: [],
      total_count: 1,
      currentPage: 1
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.dialogVisible = true;
        this.multipleSelection = [];
        this.query();
      }
    }
  },
  methods: {
    custChange() {
      this.inputModel = '';
      this.query();
    },
    numberChange(val) {
      val.entry_number = parseInt(val.entry_number) || 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cancel(type = false) {
      this.$emit('cancel', type);
      this.dialogVisible = false;
    },
    async query() {
      let obj = {
        page: this.currentPage,
        query_key: this.inputModel,
        customer_id: this.cust
      };
      let res = await this.$post('yuanyi_entries/choose_products', obj);
      res = res.data.data;
      let arr = this.multipleSelection;
      let data = res.products.filter((r) => !this.multipleSelection.map((n) => n.id).includes(r.id));
      data.map((r, n) => {
        r.location_id = res.location_options.length ? res.location_options[0].id : null;
        r.entried_at = moment().format('YYYY-MM-DD');
      });
      this.tableData = this.multipleSelection.concat(data);
      this.$nextTick(() => {
        arr.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      });
      this.total_count = res.paginate_meta.total_count;
      this.location_options = res.location_options;
    },
    save() {
      if (!this.multipleSelection.length) {
        this.$notify({
          title: '警告',
          message: '你未选中任何一条数据，请检查！',
          type: 'warning'
        });
        return;
      }
      this.$emit('save', this.multipleSelection, this.location_options);
      this.cancel();
    },
    currentChange() {
      this.query();
    }
  },
  beforeDestroy() {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
