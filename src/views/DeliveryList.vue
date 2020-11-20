<template>
  <div class="second box p-10">
    <!-- 头部查询条件 -->
    <el-card>
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
              <el-select filterable v-model="item.model" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" clearable style="width: 100%;">
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="f-r">
              <el-button
                type="primary"
                @click="
                  () => {
                    this.currentPage = 1;
                    this.query();
                  }
                "
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第二个 表格 -->
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%;" border ref="multipleTable_b">
        <el-table-column label="操作" width="170" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="primary" @click="edit(scope)">修改状态</el-link>
            <el-link :underline="false" type="primary" @click="go(scope)">详情</el-link>
          </div>
        </el-table-column>
        <el-table-column label="配货员" prop="allocate_member" header-align="center" />
        <el-table-column label="跟车员" prop="with_member" header-align="center" />
        <el-table-column label="派货员" prop="delivery_member" header-align="center" />
        <el-table-column label="车号" prop="delivery_train" header-align="center" />
        <el-table-column label="派货单数据ID" prop="delivery_good_id" header-align="center" />
        <el-table-column label="状态" prop="status_name" header-align="center" />
        <el-table-column label="更新时间" prop="updated_at" header-align="center" />
        <el-table-column label="备注" prop="note" header-align="center" />
      </el-table>
    </div>
    <!-- 第二个表格分页 -->
    <el-pagination background layout="total, prev, pager, next, jumper" :total="paginate_meta.total_count" class="pagination" :current-page.sync="currentPage" @current-change="currentChange">
    </el-pagination>
    <Detail :centerDialogVisible="centerDialogVisible" @cancel="cancel" :detailData="detailData" />
  </div>
</template>

<script>
import Detail from '../components/Detail';
export default {
  name: 'DeliveryList',
  props: {
    activeName: {
      type: String,
      default: 'third',
    },
    user: {
      type: Array,
      default: () => [],
    },
  },
  components: { Detail },
  data: () => {
    return {
      arr: [
        // 头部查询条件
        { label: '下单客户：', model: '', placeholder: '', type: 'select', data: [], id: 'customer_id' },
        { label: '收货单位：', model: '', placeholder: '', data: [], id: 'receiving_unit' },
        { label: '产品名称：', model: '', placeholder: '', id: 'product_name' },
      ],
      detailData: {},
      centerDialogVisible: false, // 第一个dialog
      paginate_meta: {},
      tableData: [],
      currentPage: 1,
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.arr[0].data = this.$vuexData.x.customer;
    this.$bus.$on('user', () => {
      this.arr[0].data = this.$vuexData.x.customer;
    });
    this.query();
  },
  methods: {
    cancel(type) {
      this.centerDialogVisible = false;
      if (type) {
        this.currentPage = 1;
        this.query();
      }
    },
    async edit(val) {
      await this.$confirm('确定修改状态么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$post('/delivery_plans/switch_status', { delivery_good_id: val.row.delivery_good_id || 0 }).then(() => {
          this.$message({
            type: 'success',
            message: '更改状态成功!',
          });
          let _this = this;
          setTimeout(() => {
            _this.query();
          }, 300);
        });
      });
    },
    currentChange(val) {
      this.currentPage = val;
      this.query();
    },
    query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      this.$post('/delivery_plans/list_schedule', obj).then((res) => {
        let data = res.data.data;
        this.tableData = data;
        this.paginate_meta = res.data.paginate_meta;
      });
    },
    go(val) {
      this.$post('/delivery_plans/detail', { delivery_good_id: val.row.delivery_good_id }).then((res) => {
        this.detailData = res.data;
      });
      this.centerDialogVisible = true;
      // window.open(`https://gendanwang.com/v1/delivery_goods/${val.row.delivery_good_id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
