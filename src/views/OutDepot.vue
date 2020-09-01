<template>
  <div class="h-100">
    <transition :name="!panelShow ? '' : 'el-zoom-in-bottom'">
      <div v-show="panelShow" class="h-100">
        <Panel :arr="arr">
          <el-col :span="4" class="d-f-e">
            <el-button type="primary">查询</el-button>
            <el-button type="warning" @click="panelShow = false">新增</el-button>
          </el-col>
        </Panel>

        <!-- 表格 -->
        <div class="p-t-10">
          <el-table :data="tableData" style="width: 100%;" border ref="firstTable" stripe>
            <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
              <template slot-scope="scope">
                <el-date-picker :clearable="false" v-model="scope.row[item.id]" type="date" :placeholder="item.placeholder || '请选择'" style="width: 100%;" v-if="item.type === 'date'" @change="tableChange(scope.row, item)"></el-date-picker>
                <el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" v-focus />
                <div v-else>{{ scope.row[item.id] }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </transition>
    <transition :name="panelShow ? '' : 'el-zoom-in-top'">
      <div v-show="!panelShow" class="h-100" style=" box-sizing: border-box;overflow: hidden;">
        <Add @cancel="cancel" />
      </div>
    </transition>
  </div>
</template>

<script>
import Add from "../components/OutDepot/Add";
export default {
  name: "outDepot",
  data() {
    return {
      panelShow: true,
      arr: [
        { label: "仓库", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "仓位", model: "", placeholder: "", type: "select", data: [], id: "receiving_unit" },
        { label: "客户", model: "", placeholder: "", type: "select", data: [], id: "product_name" },
        { label: "销售", model: "", placeholder: "", type: "select", data: [], id: "product_name" },
        { label: "负责人", model: "", placeholder: "", type: "select", data: [], id: "product_name" },
        { label: "发货时间", model: "", placeholder: "", type: "daterange", span: 8, id: "product_name" },
        { label: "关键字", model: "", placeholder: "", id: "product_name" },
      ],
      tableData: [],
      tableHeader: [
        // 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
        { label: "序号", id: "delivery_date", width: 70 },
        { label: "发货时间", id: "delivery_shifts" },
        { label: "出库时间", id: "delivery_route" },
        { label: "客户", id: "customer_name" },
        { label: "出库单号", id: "receiving_unit" },
        { label: "发货总数", id: "product_name" },
        { label: "当前状态", id: "delivery_number" },
        { label: "更新时间", id: "sparetime" },
        { label: "最后操作人", id: "sparetime_percent", disabled: true },
      ],
    };
  },
  components: {
    Add,
  },
  methods: {
    cancel() {
      this.panelShow = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
