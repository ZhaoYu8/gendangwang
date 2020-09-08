<template>
  <el-dialog :title="editData.id ? '修改工作计划' : '新增工作计划'" :visible.sync="dialogVisible" width="96%" top="5vh" class="dialog" @close="cancel(false)">
    <!-- 头部查询条件 -->
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label + '：'" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
              <el-select :disabled="item.disabled" v-model="item.model" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" style="width: 100%;" filterable>
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
              <el-date-picker v-model="item.model" type="date" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'date'" style="width: 100%;" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第一个表格 -->
    <el-button type="primary" v-if="editData.id" class="f-r mb-10" @click="add">追加</el-button>
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="500">
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
              @change="tableChange(scope.row, item)"
              :placeholder="item.placeholder || '请选择'"
              style="width: 100%;"
              v-if="item.type === 'date'"
            ></el-date-picker>
            <el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" />
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
      <!-- <el-pagination background layout="total, prev, pager, next, jumper" :total="total" class="pagination" :current-page.sync="currentPage1">
      </el-pagination>-->
    </div>
    <span slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel(false)">取消</el-button>
    </span>
    <AddProduct @goBack="setTableData" />
  </el-dialog>
</template>

<script>
import AddProduct from "./DeliverGoods/AddProduct";
export default {
  name: "DeliverGoodsDialog4",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    checkArrOk: {
      type: Array,
      default: () => {
        return [];
      },
    },
    editData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    AddProduct,
  },
  computed: {
    tableHeader() {
      return this.$common.tableHeader;
    },
  },
  data: () => {
    return {
      dialogVisible: false,
      currentPage1: 1,
      total: 1,
      tableData: [],
      arr: [
        { label: "单号", model: "", placeholder: "", id: "delivery_shifts", type: "select", disabled: true, data: [] },
        { label: "车号", model: "", placeholder: "", id: "delivery_train", type: "select", data: [] },
        { label: "派货员", model: "", placeholder: "", id: "delivery_member_id", type: "select", data: [] },
        { label: "跟车员", model: "", placeholder: "", id: "with_member_id", type: "select", data: [] },
        { label: "配货员", model: "", placeholder: "", id: "allocate_member_id", type: "select", data: [] },
        { label: "备注说明", model: "", placeholder: "", id: "note", span: 18 },
      ],
      selectChangeData: [],
    };
  },
  watch: {
    centerDialogVisible(val) {
      if (val) {
        this.dialogVisible = true;
        this.arr.map((r, i) => {
          r.model = this.editData.data[r.id];
          if (i === 2) {
            r.model = this.editData.data.delivery_member;
          }
          if (i === 3) {
            r.model = this.editData.data.with_member;
          }
          if (i === 4) {
            r.model = this.editData.data.allocate_member;
          }
        });
      }
    },
    checkArrOk: {
      handler(val) {
        this.tableData = [];
        val.map((r, i) => {
          this.$set(this.tableData, i, r);
        });
      },
      immediate: true,
    },
  },
  mounted() {
    let x = this.$vuexData.x;
    this.arr[1].data = x.delivery_train;
    this.arr[2].data = x.delivery_member;
    this.arr[3].data = x.with_member;
    this.arr[4].data = x.allocate_member;
    this.$bus.$on("user", () => {
      let x = this.$vuexData.x;
      this.arr[1].data = x.delivery_train;
      this.arr[2].data = x.delivery_member;
      this.arr[3].data = x.with_member;
      this.arr[4].data = x.allocate_member;
    });
  },
  methods: {
    setTableData(data) {
      // 追加拿到的数据
      this.tableData.push(...data);
    },
    // 点击追加
    add() {
      this.$bus.$emit("addProduct", {
        tableData: this.editData.tableData,
      });
    },
    tableChange(val, item) {
      if (item.type === "date") {
        // 日期
        val[item.id] = this.$common.format(val[item.id]);
      }
      let arr = ["delivery_number", "sparetime_percent"];
      if (arr.includes(item.id)) {
        val[item.id] = Number(val[item.id] || 0);
        val.sparetime = Math.ceil((Number(val.delivery_number) * Number(val.sparetime_percent)) / 100) || 0;
      }
    },
    del(val) {
      let index = 0;
      this.tableData.map((r, i) => {
        if (r.delivery_product_id === val.row.delivery_product_id) {
          index = i;
        }
      });
      this.tableData.splice(index, 1);
    },
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
    },
    save() {
      let obj = {};
      this.arr.map((r) => {
        if (!r.model || r.noHttp) return;
        obj[r.id] = r.model;
      });
      obj.delivery_good_id = this.editData.id;
      obj.delivery_products = this.tableData;
      this.$post(`/delivery_plans/${this.editData.id ? "for_update" : "batch_create_schedule"}`, obj).then((res) => {
        this.$notify({
          title: "提示",
          message: this.editData.id ? "修改工作计划成功!" : "新增工作计划成功!",
          type: "success",
        });
        this.cancel(true);
      });
    },
    handleSelectionChange(val) {
      this.selectChangeData = val;
    },
  },
};
</script>

<style lang="scss" scoped></style>
