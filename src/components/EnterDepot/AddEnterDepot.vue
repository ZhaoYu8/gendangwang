<template>
  <div>
    <!-- 第一个表格 -->
    <el-button type="warning" class="f-r mb-10" @click="visible = true">选择入库产品</el-button>
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="600" ref="table" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="入库日期" align="center" prop="entried_at" header-align="center">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row['entried_at']" type="date" placeholder="date"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="销售" align="center" prop="saler_name" header-align="center"></el-table-column>
        <el-table-column label="负责人" align="center" prop="member_name" header-align="center"> </el-table-column>
        <el-table-column label="分类" align="center" prop="product_group" header-align="center"> </el-table-column>
        <el-table-column label="客户名称" align="center" prop="customer_name" header-align="center" ></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center" > </el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center" > </el-table-column>
        <el-table-column label="产品编码" align="center" prop="product_serial" header-align="center" > </el-table-column>
        <el-table-column label="当前库存" align="center" prop="ccccc" header-align="center" > </el-table-column>
        <el-table-column label="入库数量" align="center" prop="entry_number" header-align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row['entry_number']" placeholder="" @change="numberChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库位" align="center" prop="location_id" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row['location_id']" placeholder="" filterable>
              <el-option v-for="item in location_options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="是否结束" align="center" prop="note" header-align="center">
          <template slot-scope="scope"> <el-input v-model="scope.row['note']" placeholder=""></el-input> </template
        ></el-table-column>
        <el-table-column label="操作" width="50" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="danger" @click="del(scope.$index)">删除</el-link>
          </div>
        </el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
    </div>
    <div class="d-f-e pt-10">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <AddDialogs :visible="visible" @save="addDialogData" @cancel="visible = false" />
  </div>
</template>

<script>
import AddDialogs from '@/components/EnterDepot/AddDialog';
export default {
  name: 'AddDialog',
  props: {},
  data: () => {
    return {
      model: '',
      options: [],
      tableData: [],
      visible: false,
      location_options: [],
      date: moment().format('YYYY-MM-DD'),
    };
  },
  components: { AddDialogs },
  watch: {},
  methods: {
    addDialogData(data, location_options) {
      this.location_options = location_options;
      this.tableData = this.tableData.concat(data);
      this.visible = false;
    },
    del(val) {
      this.tableData.splice(val, 1);
    },
    async save() {
      if (!this.tableData.length) {
        this.$notify({
          title: '警告',
          message: '数据为空,不能保存。请增加数据!',
          type: 'warning',
        });
        return;
      }
      let data = {};
      this.tableData.map((r, n) => {
        r.entried_at = moment(r.entried_at).format('YYYY-MM-DD');
        data[n] = r;
      });
      let res = await this.$post('yuanyi_entries/for_create', { products: data });
      this.cancel(true);
    },
    cancel(type = false) {
      this.tableData = [];
      this.$emit('cancel', type);
    },
    numberChange(val) {
      val.entry_number = Number(val.entry_number) || 0;
    },
  },
  beforeDestroy() {
    this.$bus.$off('AddOutDepot');
  },
  mounted() {
    this.$bus.$on('AddOutDepot', (val) => {
      console.log(val);
    });
  },
};
</script>

<style lang="scss" scoped></style>
