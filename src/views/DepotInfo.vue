<template>
  <div class="p-10 box">
    <Panel :arr="arr">
      <el-col :span="10" class="d-f-e">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </Panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
        <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            <div v-if="item.id === 'update'" class="d-f-s-a">
              <el-link :underline="false" type="primary" @click="change(scope.row, 1)">分配</el-link>
              <el-link :underline="false" type="warning" @click="change(scope.row, 2)">调整</el-link>
            </div>
            <template v-if="item.id === 'storage_number'">
              <el-link v-if="item.id === 'storage_number'" type="primary" @click="detailChange(scope.row)">{{ scope.row[item.id] }}</el-link>
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
    <el-dialog
      :title="visibleType === 3 ? '详情' : visibleType === 1 ? '分配' : '调整'"
      :visible="visible"
      :width="visibleType === 3 ? '70%' : '20%'"
      center
      :top="visibleType === 3 ? '8vh' : '30vh'"
      class="dialog box"
      @close="visible = false"
      :close-on-click-modal="false"
    >
      <div v-if="visibleType === 3" class="table">
        <el-table :data="visibleTable" style="width: 100%;" height="600" border ref="firstTable" stripe>
          <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in visibleHeader" :key="item.label + index">
            <template slot-scope="scope">
              <template>
                <el-input v-model="scope.row[item.id]" v-if="item.type === 'input'" v-focus />
                <div v-else-if="item.type === 'serial'" class="t-c">{{ scope.$index + 1 }}</div>
                <div v-else>{{ scope.row[item.id] }}</div>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template v-else>
        <template v-if="visibleType === 1">
          <el-select v-model="locationModel" placeholder="请选择仓位！" class="w-100">
            <el-option v-for="item in $vuexData.x.location" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </template>
        <el-input ref="input" v-model="visibleModel" placeholder="请输入数量！" @change="visibleModel = Number(visibleModel) || 0" :class="{ 'pt-10': visibleType === 1 }"></el-input>
      </template>
      <div class="d-f-e pt-10">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-if="visibleType !== 3">保存</el-button>
      </div>
    </el-dialog>
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
        { label: '操作', id: 'update', width: 100 },
        { label: '销售', id: 'saler_name' },
        { label: '跟单员', id: 'member_name' },
        { label: '分类', id: 'product_group' },
        { label: '客户名称', id: 'customer_name' },
        { label: '产品名称', id: 'product_name' },
        { label: '单价', id: 'product_price' },
        { label: '数量', id: 'storage_number' },
        { label: '金额', id: 'money' },
        { label: '入库日期', id: 'updated_at' },
        { label: '仓储库位', id: 'location_name' },
      ],
      visibleHeader: [
        { label: '序号', type: 'serial', width: 50 },
        { label: '变更时间', id: 'saler_name' },
        { label: '变更类型', id: 'member_name' },
        { label: '变更数量', id: 'product_group' },
        { label: '单价', id: 'product_price' },
        { label: '操作人', id: 'product_name' },
        { label: '变更后库存', id: 'product_price' },
      ],
      currentPage: 1,
      total: 1,
      visible: false,
      visibleType: 1,
      visibleModel: null,
      visibleData: {},
      locationModel: null,
      visibleTable: [],
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
    async save() {
      if (!this.visibleModel) {
        this.$notify({
          title: '错误',
          message: '数量不能为空！',
          type: 'warning',
        });
        return;
      }
      let obj = {
        storage_id: this.visibleData.id,
        storage_number: this.visibleModel,
      };
      if (this.visibleType === 1) {
        obj.location_id = this.locationModel;
      }
      let res = await this.$post(`yuanyi_storages/${this.visibleType === 1 ? 'switch_location' : 'change_storage'}`, obj);
      this.$common.notify(this.visibleType === 1 ? '分配' : '调整');
      this.query();
      this.visible = false;
      this.visibleModel = null;
    },
    change(val, type) {
      this.visible = true;
      this.visibleType = type;
      this.visibleData = val;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    async detailChange(val) {
      this.visible = true;
      this.visibleType = 3;
      let res = await this.$post('yuanyi_storages/for_show', {
        storage_id: val.id,
      });
      this.visibleTable = res.data.data.entries;
      console.log(res);
    },
  },
  mounted() {
    this.query();
    this.arr[0].data = this.$vuexData.x.customer;
    this.$bus.$on("user", () => {
      this.arr[0].data = this.$vuexData.x.customer;
    });
  },
};
</script>

<style lang="" scoped></style>
