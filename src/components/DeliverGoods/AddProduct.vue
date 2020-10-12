<template>
  <el-dialog title="选择产品" :visible.sync="dialogVisible" width="85%" class="dialog" :append-to-body="true">
    <div class="second">
      <!-- 头部查询条件 -->
      <el-card>
        <el-row :gutter="20">
          <el-form label-position="left" :inline="true">
            <el-col :span="6" v-for="(item, index) in arr" :key="item.label + index">
              <el-form-item :label="item.label + '：'" class="form-item">
                <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
                <el-select v-model="item.model" filterable :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" style="width: 100%;" :multiple="item.multiple" clearable>
                  <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
                </el-select>
                <el-date-picker v-model="item.model" type="date" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'date'" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="f-r">
                <el-button type="primary" @click="query">查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
      <!-- 第一个表格 -->
      <div class="pt-10 ">
        <el-table :data="tableData" style="width: 100%;" border height="400" @selection-change="handleSelectionChange" ref="secondTable">
          <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
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
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="goBack">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddProduct',
  props: {},
  data: () => {
    return {
      dialogVisible: false,
      arr: [
        { label: '日期', model: '', placeholder: '', id: 'delivery_date', type: 'date', data: [] },
        { label: '班次', model: '', placeholder: '', id: 'delivery_shifts', type: 'select', data: [] },
        { label: '路线', model: '', placeholder: '请输入路线', id: 'delivery_route', type: 'select', data: [], multiple: true },
      ],
      tableData: [],
      checkArr: [],
    };
  },
  watch: {},
  computed: {},
  computed: {
    tableHeader() {
      return this.$common.tableHeader;
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.checkArr = val;
    },
    goBack() {
      this.dialogVisible = false;
      this.$emit('goBack', this.checkArr);
      this.checkArr = [];
    },
    tableChange(val, item) {
      if (item.type === 'date') {
        val[item.id] = this.$common.format(val[item.id]);
      }
      let arr = ['delivery_number', 'sparetime_percent'];
      if (arr.includes(item.id)) {
        if (item.id === 'delivery_number') {
          val[item.id] = parseInt(val[item.id]) || 0;
        } else {
          val[item.id] = Number(val[item.id]) || 0;
        }
        val.sparetime = Math.ceil((parseInt(val.delivery_number) * Number(val.sparetime_percent)) / 100) || 0;
      }
    },
    // 查询第一个表格数据
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ not_paginate: 1 },
      };
      await this.$post('/delivery_plans/list_plan', obj).then((res) => {
        let data = res.data.data;
        data.map((r) => {
          if (!parseInt(r.delivery_number) && !Number(r.sparetime_percent)) {
            r.sparetime = 0;
          } else {
            r.sparetime = Math.ceil((parseInt(r.delivery_number) * Number(r.sparetime_percent)) / 100);
          }
        });
        this.tableData = data;
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off('addProduct');
    this.$bus.$off('user');
  },
  mounted() {
    // 取user数据
    this.arr[1].data = this.$vuexData.x.delivery_shift;
    this.arr[2].data = this.$vuexData.x.delivery_route;
    this.$bus.$on('user', () => {
      this.arr[1].data = this.$vuexData.x.delivery_shift;
      this.arr[2].data = this.$vuexData.x.delivery_route;
      // this.arr[3].data = this.$vuexData.x.customer;
    });
    this.$bus.$on('addProduct', (res) => {
      this.tableData = res.tableData;
      this.dialogVisible = true;
    });
  },
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
