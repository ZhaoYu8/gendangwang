<template>
  <el-dialog title="新增工作计划" :visible.sync="dialogVisible" width="85%" top="5vh" class="dialog" @close="cancel(false)">
    <!-- 头部查询条件 -->
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label + '：'" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type" @change="onChange(item)"></el-input>
              <el-select v-model="item.model" filterable :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" style="width: 100%;" @change="onChange(item)" clearable>
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
              <el-date-picker v-model="item.model" type="date" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'date'" style="width: 100%;" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第一个表格 -->
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="400" @select="selected" @select-all="selectedAll" ref="dialog1Table">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="产品编号" align="center" prop="product_serial" header-align="center"></el-table-column>
        <el-table-column label="所属客户" align="center" prop="customer_name" header-align="center"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="订单数量" align="center" prop="order_quantity" header-align="center"></el-table-column>
        <el-table-column label="总库存数量" align="center" prop="storage_quantity" header-align="center"></el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
      <el-pagination background layout="total, prev, pager, next, jumper" :total="total" class="pagination" :current-page.sync="currentPage" @current-change="currentChange"></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onOk" round>提交计划</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog1",
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
      dialogVisible: false,
      currentPage: 1,
      total: 1,
      tableData: [],
      arr: [
        { label: "日期", model: moment().format("YYYY-MM-DD"), placeholder: "", id: "delivery_date", type: "date", data: [] },
        { label: "班次", model: "", placeholder: "", id: "delivery_shifts", type: "select", data: [] },
        { label: "下单客户", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "收货单位", model: "", placeholder: "", id: "receiving_unit" },
        { label: "路线", model: "", placeholder: "请输入路线", id: "delivery_route" },
        { label: "产品名称", model: "", placeholder: "请输入产品名称", id: "product_name", noHttp: true },
        { label: "产品所属", model: "", placeholder: "", id: "abc", type: "select", data: [], noHttp: true },
        {
          label: "特殊事宜",
          model: "",
          placeholder: "",
          id: "special_matter",
          type: "select",
          data: [
            { name: "是", id: "是" },
            { name: "否", id: "否" },
          ],
        },
        { label: "交代说明", model: "", placeholder: "输入备注说明或需要交代的事项", id: "note", span: 24 },
      ],
      checkArr: [],
    };
  },
  watch: {
    dialogVisibl(val) {
      if (val) {
        this.dialogVisible = true;
        this.arr[6].data = this.arr[2].data = this.$vuexData.x.customer;
        this.arr[2].model = this.$vuexData.x.customer[0].id;
        this.arr[3].model = this.$vuexData.x.customer[0].name;
        this.arr[4].model = this.$vuexData.x.customer[0].address;
        this.arr[1].data = [
          { name: "", id: "" },
          { name: "早班", id: "早班" },
          { name: "中班", id: "中班" },
        ];
        this.onChange(this.arr[2]);
        this.checkArr = [];
      }
    },
  },
  methods: {
    queryProduct(obj = {}) {
      obj.page = this.currentPage;
      this.$post("/delivery_plans/order_products", obj).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.paginate_meta.total_count;
        this.reqeat();
      });
    },
    currentChange(index) {
      // 点击分页
      this.commonQuery(this.arr[2], index);
    },
    onChange(val, index) {
      if (val.id === "customer_id") {
        let data = val.data.filter((r) => r.id === val.model)[0];
        this.arr[3].model = data.name;
        this.arr[4].model = data.address;
      }
      this.commonQuery(val, index);
    },
    commonQuery(val, index) {
      this.currentPage = index ? index : 1;
      let arr = ["customer_id", "abc", "product_name"];
      let obj = {};
      if (!arr.includes(val.id)) return;
      this.arr.map((r) => {
        if (arr.includes(r.id) && r.model !== "") {
          obj[r.id] = r.model;
        }
      });
      // customer_ids: [12, 23], product_name: "name"
      let _obj = {
        arr: [obj.customer_id || 0, obj.abc || 0],
        customer_ids: [],
        product_name: obj.product_name,
      };
      _obj.arr.map((r) => {
        if (r) {
          _obj.customer_ids.push(r);
        }
      });
      this.queryProduct(_obj);
    },
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
    },
    // 点击确定
    onOk() {
      if (this.checkArr.length) {
        let obj = {};
        this.arr.map((r) => {
          if (!r.model || r.noHttp) return;
          obj[r.id] = r.model;
        });
        obj.product_ids = this.checkArr.map((r) => r.id);
        obj.delivery_date = this.$common.format(obj.delivery_date);
        this.$post("/delivery_plans/batch_create", obj).then((res) => {
          this.$notify({
            title: "提示",
            message: "新增工作计划成功!",
            type: "success",
          });
          this.cancel(true);
        });
      } else {
        this.$notify({
          title: "警告",
          message: "最少选择一条产品数据!",
          type: "warning",
        });
      }
    },
    reqeat() {
      this.$nextTick(() => {
        this.tableData.map((r) => {
          if (this.checkArr.map((n) => n.id).includes(r.id)) {
            this.$refs.dialog1Table.toggleRowSelection(r);
          }
        });
      });
    },
    selected(val, row) {
      if (val.filter((r) => r.id === row.id).length) {
        // 证明是选中
        this.checkArr.push({ name: row.product_name, id: row.id });
      } else {
        let index = this.checkArr.findIndex((r) => r.id === row.id);
        this.checkArr.splice(index, 1);
      }
    },
    selectedAll(val) {
      this.tableData.map((row) => {
        let index = this.checkArr.findIndex((r) => r.id === row.id);
        if (index > -1) this.checkArr.splice(index, 1);
      });
      if (val.length) {
        val.map((r) => {
          this.checkArr.push({ name: r.product_name, id: r.id });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
