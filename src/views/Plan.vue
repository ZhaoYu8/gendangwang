<template>
  <div class="plan">
    <!-- 头部查询条件 -->
    <el-card>
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
              <el-select v-model="item.model" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" clearable style="width: 100%;">
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="f-r">
              <el-button type="primary" @click="moreDel">多选删除</el-button>
              <el-button type="primary" @click="summary">汇总</el-button>
              <el-button type="primary" @click="special">特殊计划单</el-button>
              <el-button type="primary" @click="copyAdd">复制新建</el-button>
              <el-button
                type="primary"
                @click="
                  () => {
                    this.checkArr = [];
                    this.query();
                  }
                "
                >查询</el-button
              >
              <el-button type="warning" @click="dialog1 = true">新增</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <div class="p-t-10">
      <el-table :data="tableData" style="width: 100%;" border ref="firstTable" @select="selected" @select-all="selectedAll">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" width="50" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="danger" @click="del(scope)">删除</el-link>
          </div>
        </el-table-column>
        <el-table-column header-align="center" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            <el-date-picker :clearable="false" v-model="scope.row[item.id]" type="date" :placeholder="item.placeholder || '请选择'" style="width: 100%;" v-if="item.type === 'date'" @change="tableChange(scope.row, item)"></el-date-picker>
            <el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" v-focus />
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表格分页 -->
    <el-pagination background layout="total, prev, pager, next, jumper" :total="paginate_meta.total_count" class="pagination" :current-page.sync="currentPage" @current-change="currentChange"></el-pagination>
    <Dialog1 :dialogVisibl="dialog1" @cancel="cancel" />
    <Dialog2 :dialogVisibl="dialog2" :selectArr="checkArr" @cancel="cancel" />
    <Dialog3 :dialogVisibl="dialog3" @cancel="cancel" />
  </div>
</template>

<script>
import Dialog1 from "../components/PlanDialog1";
import Dialog2 from "../components/PlanDialog2";
import Dialog3 from "../components/PlanDialog3";

export default {
  name: "Plan",
  props: {},
  components: {
    Dialog1,
    Dialog2,
    Dialog3,
  },
  data: () => {
    return {
      dialog1: false, // 第一个dialog
      dialog2: false,
      dialog3: false,
      paginate_meta: {}, // 分页总数数据
      arr: [
        { label: "下单客户：", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "收货单位：", model: "", placeholder: "", data: [], id: "receiving_unit" },
        { label: "产品名称：", model: "", placeholder: "", id: "product_name" },
      ],
      currentPage: 1, // 第一个表格分页
      tableData: [], // 表格数据
      checkArr: [], // 已经勾选了选项合集
    };
  },
  watch: {},
  computed: {
    tableHeader() {
      return this.$common.tableHeader;
    },
  },
  methods: {
    selected(val, row) {
      if (val.filter((r) => r.id === row.id).length) {
        // 证明是选中
        this.checkArr.push(row);
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
          this.checkArr.push(r);
        });
      }
    },
    // 表格切换分页
    async currentChange(val) {
      this.currentPage = val;
      await this.query();
      this.$nextTick(() => {
        this.tableData.map((r) => {
          if (this.checkArr.map((n) => n.delivery_product_id).includes(r.delivery_product_id)) {
            this.$refs.firstTable.toggleRowSelection(r);
          }
        });
      });
    },
    cancel(type) {
      if (type) {
        this.checkArr = [];
        this.currentPage = 1;
        this.query();
      }
      this.dialog3 = this.dialog2 = this.dialog1 = false;
    },
    // 查询
    async query() {
      let obj = {
        ...this.$common.querySql.call(this, this.arr),
        ...{ page: this.currentPage },
      };
      await this.$post("/delivery_plans/list_plan", obj).then((res) => {
        let data = res.data.data;
        data.map((r) => {
          if (!Number(r.delivery_number) && !Number(r.sparetime_percent)) {
            r.sparetime = 0;
          } else {
            r.sparetime = Math.ceil((Number(r.delivery_number) * Number(r.sparetime_percent)) / 100);
          }
        });
        this.tableData = [];
        this.$nextTick(() => {
          this.tableData = data;
        });
        this.paginate_meta = res.data.paginate_meta;
      });
    },
    // 删除
    async del(val) {
      let obj = await this.$common.del.call(this, val);
      let _this = this;
      if (obj) {
        setTimeout(() => {
          _this.query();
        }, 300);
      }
    },
    // 多选删除
    async moreDel() {
      let arr = this.checkArr;
      if (!arr.length) {
        this.$notify({
          title: "警告",
          message: "你必须选择数据，才能进行多选删除!",
          type: "warning",
        });
        return;
      }
      this.$confirm(`确定删除么？本次删除 ${arr.length} 条数据！`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$post("/delivery_plans/batch_delete", {
          delivery_product_ids: arr.map((r) => r.delivery_product_id),
        }).then(() => {
          // 删除之后查询，并且提示删除成功!
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          let _this = this;
          setTimeout(() => {
            _this.query();
          }, 300);
        });
      });
    },
    tableChange(val, item) {
      this.$common.tableChange.call(this, val, item);
    },
    summary() {
      this.$notify({
        title: "警告",
        message: "等接口!",
        type: "warning",
      });
    },
    copyAdd() {
      if (!this.checkArr.length) {
        this.$notify({
          title: "警告",
          message: "最少选择一条数据!",
          type: "warning",
        });
        return;
      }
      this.dialog2 = true;
    },
    special() {
      this.dialog3 = true;
    },
  },
  mounted() {
    this.arr[0].data = this.$vuexData.x.customer;
    this.$bus.$on("user", () => {
      this.arr[0].data = this.$vuexData.x.customer;
    });
    this.query();
  },
};
</script>

<style lang="scss" scoped>
.plan {
}
</style>
