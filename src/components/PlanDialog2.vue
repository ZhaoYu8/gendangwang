<template>
  <el-dialog title="复制新建" :visible.sync="dialogVisible" width="96%" top="5vh" class="dialogthree" @close="cancel(false)">
    <!-- 第一个表格 -->
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="600" ref="dialog2Table" @select="selected">
        <el-table-column type="selection" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index" header-align="center">
          <template slot-scope="scope">
            <el-date-picker :clearable="false" v-model="scope.row[item.id]" type="date" :placeholder="item.placeholder || '请选择'" style="width: 100%;" v-if="item.type === 'date'"></el-date-picker>
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
      <el-pagination background layout="total, prev, pager, next, jumper" :total="total" class="pagination" :current-page.sync="currentPage1" @current-change="currentChange"></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onOk" round>提交计划</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog2",
  props: {
    dialogVisibl: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    selectArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => {
    return {
      dialogVisible: false,
      currentPage1: 1,
      total: 1,
      tableData: [],
      checkArr: [], // 已经勾选了选项合集
    };
  },
  computed: {
    tableHeader() {
      return this.$common.tableHeader;
    },
  },
  watch: {
    dialogVisibl(val) {
      if (val) {
        this.dialogVisible = true; // 先让弹窗显示
        this.currentPage1 = 1; // 重置为第一页
        this.checkArr = JSON.parse(JSON.stringify(this.selectArr));
        // 表格数据赋值，0~10
        this.tableData = this.checkArr.slice((this.currentPage1 - 1) * 10, (this.currentPage1 - 1) * 10 + 10);
        // 总页数
        this.total = this.checkArr.length;
        this.$nextTick(() => {
          //这里肯定是全选,不管传进来的是几条数据
          this.$refs.dialog2Table.toggleAllSelection();
        });
      }
    },
  },
  methods: {
    currentChange(val) {
      // 点击分页
      this.currentPage1 = val;
      let arr = this.selectArr;
      this.tableData = arr.slice((this.currentPage1 - 1) * 10, (this.currentPage1 - 1) * 10 + 10);
      this.reqeat();
    },
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
    },
    // 点击确定
    onOk() {
      if (!this.checkArr.length) {
        this.$notify({
          title: "警告",
          message: "最少选择一条产品数据!",
          type: "warning",
        });
        return;
      }
      let arr = this.checkArr.map((r) => {
        return {
          delivery_product_id: r.delivery_product_id,
          delivery_date: this.$common.format(r.delivery_date),
        };
      });
      this.$post("/delivery_plans/clone_plans", { clone_objects: arr }).then((res) => {
        this.$notify({
          title: "提示",
          message: "新增工作计划成功!",
          type: "success",
        });
        this.cancel(true);
      });
    },
    reqeat() {
      this.$nextTick(() => {
        this.tableData.map((r) => {
          if (this.checkArr.map((n) => n.delivery_product_id).includes(r.delivery_product_id)) {
            this.$refs.dialog2Table.toggleRowSelection(r);
          }
        });
      });
    },
    selected(val, row) {
      if (val.filter((r) => r.delivery_product_id === row.delivery_product_id).length) {
        // 证明是选中
        this.checkArr.push(row);
      } else {
        let index = this.checkArr.findIndex((r) => r.delivery_product_id === row.delivery_product_id);
        this.checkArr.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
