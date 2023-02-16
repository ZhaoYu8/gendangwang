<!--
 * @Author: 赵宇
 * @Description: 
 * @Date: 2022-07-25 16:22:40
 * @LastEditTime: 2023-02-16 10:50:10
 * @LastEditors: zhao 13370229059@163.com
 * @FilePath: \yuanyibaozhuang\src\views\DeliverGoods.vue
-->
<template>
  <div class="second p-10 box">
    <!-- 头部查询条件 -->
    <el-card>
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label + '：'" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
              <el-select
                v-model="item.model"
                filterable
                :placeholder="item.placeholder || '请选择'"
                v-if="item.type === 'select'"
                style="width: 100%;"
                :multiple="item.multiple"
                clearable
                @change="headerChange(item)"
              >
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
              <el-date-picker
                v-model="item.model"
                type="date"
                :placeholder="item.placeholder || '请选择'"
                v-if="item.type === 'date'"
                style="width: 100%;"
                @change="headerChange(item)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="f-r">
              <el-button type="primary" @click="query">查询</el-button>
              <el-button type="warning" @click="onAdd">新增</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第一个表格 -->
    <div class="pt-10 f-5 table">
      <el-table :data="tableData1" style="width: 100%;" border @selection-change="handleSelectionChange" ref="secondTable">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column label="操作" width="50" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="danger" @click="del(scope)">删除</el-link>
          </div>
        </el-table-column>
        <el-table-column :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index" header-align="center">
          <template slot-scope="scope">
            <el-date-picker
              :clearable="false"
              v-model="scope.row[item.id]"
              type="date"
              :placeholder="item.placeholder || '请选择'"
              style="width: 100%;"
              v-if="item.type === 'date'"
              @change="tableChange(scope.row, item)"
            ></el-date-picker>
            <el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" v-focus />
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 第二个 表格 -->
    <div class="pt-10 f-2 table">
      <el-table :data="tableData2" style="width: 100%;" border ref="multipleTable_b">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column label="操作" width="200" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="danger" @click="delTwo(scope)">删除</el-link>
            <el-link :underline="false" type="primary" @click="edit(scope)">修改</el-link>
            <el-link :underline="false" :type="scope.row.status === 1 ? 'success' : 'primary'" @click="batch(scope)" :disabled="scope.row.status === 1"> {{ scope.row.status === 1 ? '已审核' : '审核' }}</el-link>
            <el-link :underline="false" type="primary" @click="go(scope)">详情</el-link>
            <el-link :underline="false" type="primary" @click="print(scope)">打印</el-link>
          </div>
        </el-table-column>
        <el-table-column label="最后操作人" prop="member_name" header-align="center" />
        <el-table-column label="配货员" prop="allocate_member" header-align="center" />
        <el-table-column label="跟车员" prop="with_member" header-align="center" />
        <el-table-column label="派货员" prop="delivery_member" header-align="center" />
        <el-table-column label="车号" prop="delivery_train" header-align="center" />
        <el-table-column label="派货单数据ID" prop="delivery_good_id" header-align="center" />
        <el-table-column label="更新时间" prop="updated_at" header-align="center" />
        <el-table-column label="备注" prop="note" header-align="center" />
      </el-table>
    </div>
    <!-- 第二个表格分页 -->
    <div style="position:relative" class="mr-10">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="paginate_meta2.total_count"
        class="pagination"
        :current-page.sync="currentPage2"
        @current-change="currentChange2"
      ></el-pagination>
      <i class="el-icon-refresh refresh" @click="queryTwo"></i>
    </div>
    <Dialog :centerDialogVisible="centerDialogVisible" :checkArrOk="checkArrOk" @cancel="cancel" :editData="editData" />
    <Detail ref="printMe" :print="isPrint" :centerDialogVisible="centerDialogVisible1" @cancel="cancel" :detailData="detailData" />
  </div>
</template>

<script>
import Dialog from '../components/DeliverGoodsDialog4';
import Detail from '../components/Detail';

export default {
  name: 'DeliverGoods',
  props: {},
  components: {
    Dialog,
    Detail
  },
  data: () => {
    return {
      editData: {},
      detailData: {},
      centerDialogVisible: false, // 第一个dialog
      centerDialogVisible1: false,
      paginate_meta2: {},
      arr: [
        { label: '日期', model: '', placeholder: '', id: 'delivery_date', type: 'date', data: [] },
        { label: '班次', model: '', placeholder: '', id: 'delivery_shifts', type: 'select', data: [] },
        { label: '路线', model: '', placeholder: '请输入路线', id: 'delivery_route', type: 'select', data: [], multiple: true }
        // { label: "下单客户", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        // { label: "产品名称", model: "", placeholder: "请输入产品名称", id: "product_name" },
      ],
      tableData1: [],
      tableData2: [],
      currentPage2: 1, // 第一个表格分页
      checkArr: [],
      checkArrOk: [],
      isPrint: false
    };
  },
  watch: {},
  computed: {},
  computed: {
    tableHeader() {
      return this.$common.tableHeader;
    }
  },
  methods: {
    // 查询条件change事件
    async headerChange(val) {
      if (val.id === 'delivery_route') return;
      if (this.arr[0].model) {
        this.arr[0].model = this.$common.format(this.arr[0].model);
      }
      if (this.arr[0].model && this.arr[1].model) {
        let res = await this.$post('/delivery_plans/get_routes', {
          delivery_date: this.arr[0].model,
          delivery_shifts: this.arr[1].model
        });
        this.arr[2].data = res.data.data.delivery_route_options;
        this.arr[2].model = '';
      }
    },
    // 选中数据
    handleSelectionChange(val) {
      this.checkArr = val;
    },
    // 点击修改触发
    async edit(val) {
      this.$post('/delivery_plans/detail', {
        delivery_good_id: val.row.delivery_good_id
      }).then(res => {
        this.checkArrOk = res.data.data.delivery_products;
        this.editData = { id: val.row.delivery_good_id, data: res.data.data.delivery_schedule, tableData: this.tableData1 };
        this.centerDialogVisible = true;
      });
    },
    async del(val) {
      let obj = await this.$common.del.call(this, val);
      let _this = this;
      if (obj)
        setTimeout(() => {
          _this.query();
          _this.Update();
        }, 300);
    },
    async delTwo(val) {
      let data = await this.$confirm('确定删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/delivery_plans/delete_schedule', {
          delivery_good_id: val.row.delivery_good_id || 0
        }).then(() => {
          // 删除之后查询，并且提示删除成功!
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          let _this = this;
          setTimeout(() => {
            _this.queryTwo();
          }, 300);
        });
      });
    },
    // 表格里修改
    async tableChange(val, item) {
      await this.$common.tableChange.call(this, val, item);
      // 如果是修改班次。或者路线。需要重新更新一下这二个data
      if (!['delivery_shifts', 'delivery_route'].includes(item.id)) return;
      this.Update();
    },
    onAdd() {
      let arr = this.checkArr;
      if (arr.length) {
        this.centerDialogVisible = true;
        this.checkArrOk = JSON.parse(JSON.stringify(arr));
      } else {
        this.$notify({
          title: '警告',
          message: '最少选择一条产品数据!',
          type: 'warning'
        });
      }
    },
    cancel(type) {
      this.centerDialogVisible = false;
      this.centerDialogVisible1 = false;
      this.isPrint = false;
      if (type) {
        this.checkArr = [];
        this.checkArrOk = [];
        this.currentPage2 = 1;
        this.query();
        this.queryTwo();
        this.Update();
      }
    },
    currentChange2(val) {
      this.currentPage2 = val;
      this.queryTwo();
    },
    // 查询第一个表格数据
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ not_paginate: 1 }
      };
      await this.$post('/delivery_plans/list_plan', obj).then(res => {
        let data = res.data.data;
        data.map(r => {
          if (!parseInt(r.delivery_number) && !Number(r.sparetime_percent)) {
            r.sparetime = 0;
          } else {
            r.sparetime = Math.ceil((parseInt(r.delivery_number) * Number(r.sparetime_percent)) / 100);
          }
        });
        this.tableData1 = [];
        this.$nextTick(() => {
          this.tableData1 = data;
        });
      });
    },
    queryTwo() {
      let obj = { page: this.currentPage2 };
      this.$post('/delivery_plans/list_schedule', obj).then(res => {
        let data = res.data.data;
        this.tableData2 = data;
        this.paginate_meta2 = res.data.paginate_meta;
      });
    },
    go(val) {
      this.$post('/delivery_plans/detail', {
        delivery_good_id: val.row.delivery_good_id
      }).then(res => {
        this.detailData = res.data;
        this.centerDialogVisible1 = true;
      });
      // window.open(`https://gendanwang.com/v1/delivery_goods/${val.row.delivery_good_id}`);
    },
    print(val) {
      this.$post('/delivery_plans/detail', {
        delivery_good_id: val.row.delivery_good_id
      }).then(res => {
        this.detailData = res.data;
        this.centerDialogVisible1 = true;
        this.isPrint = true;
      });
    },
    Update() {
      // 取user数据
      this.headerChange(this.arr[0]);
    },
    init() {
      this.arr[1].data = this.$vuexData.x.delivery_shift;
      this.arr[2].data = this.$vuexData.x.delivery_route;
    },
    async batch(val) {
      await this.$confirm('确定审核出库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/delivery_plans/batch_confirm', {
          delivery_good_id: val.row.delivery_good_id || 0
        }).then(() => {
          // 删除之后查询，并且提示删除成功!
          this.$message({
            type: 'success',
            message: '审核出库成功!'
          });
          let _this = this;
          setTimeout(() => {
            _this.queryTwo();
          }, 300);
        });
      });
    }
  },
  mounted() {
    // 取user数据
    this.init();
    this.$bus.$on('user', () => {
      this.init();
      // this.arr[3].data = this.$vuexData.x.customer;
    });
    this.currentPage2 = 1;
    this.query();
    this.queryTwo();
  }
};
</script>

<style lang="scss" scoped>
.refresh {
  cursor: pointer;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
}
</style>
