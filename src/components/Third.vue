<template>
  <div class="second">
    <!-- 头部查询条件 -->
    <div style="overflow: hidden;">
      <el-button type="primary" class="f-r" @click="query">查询</el-button>
    </div>
    <!-- 第二个 表格 -->
    <div class="p-t-10">
      <el-table :data="tableData" style="width: 100%;" border ref="multipleTable_b">
        <el-table-column label="操作" width="170" align="center" header-align="center">
          <div slot-scope="scope" style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="primary" @click="edit(scope)">修改状态</el-link>
            <el-link :underline="false" type="primary" @click="go(scope)">详情</el-link>
          </div>
        </el-table-column>
        <el-table-column label="配货员" prop="allocate_member" header-align="center"/>
        <el-table-column label="跟车员" prop="with_member" header-align="center"/>
        <el-table-column label="派货员" prop="delivery_member" header-align="center"/>
        <el-table-column label="车号" prop="delivery_train" header-align="center"/>
        <el-table-column label="派货单数据ID" prop="delivery_good_id" header-align="center"/>
        <el-table-column label="状态" prop="status_name" header-align="center"/>
        <el-table-column label="更新时间" prop="updated_at" header-align="center"/>
        <el-table-column label="备注" prop="note" header-align="center"/>
      </el-table>
    </div>
    <!-- 第二个表格分页 -->
    <el-pagination background layout="total, prev, pager, next, jumper" :total="paginate_meta.total_count" class="pagination" :current-page.sync="currentPage" @current-change="currentChange"> </el-pagination>
    <Dialog :centerDialogVisible="centerDialogVisible" @cancel="cancel" :detailData="detailData" />
  </div>
</template>

<script>
import Dialog from "./Dialog5.vue";
export default {
  name: "third",
  props: {
    activeName: {
      type: String,
      default: "third",
    },
  },
  components: { Dialog },
  data: () => {
    return {
      detailData: {},
      centerDialogVisible: false, // 第一个dialog
      user: [],
      paginate_meta: {},
      tableData: [],
      currentPage: 1,
    };
  },
  watch: {
    activeName: {
      handler(val) {
        if (val === "third") {
          this.currentPage = 1;
          this.query();
        }
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    cancel(type) {
      this.centerDialogVisible = false;
      if (type) {
        this.currentPage = 1;
        this.query();
      }
    },
    async edit(val) {
      await this.$confirm("确定修改状态么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$post("/delivery_plans/switch_status", { delivery_good_id: val.row.delivery_good_id || 0 }).then(() => {
          this.$message({
            type: "success",
            message: "更改状态成功!",
          });
          let _this = this;
          setTimeout(() => {
            _this.query();
          }, 300);
        });
      });
    },
    currentChange() {
      this.currentPage = val;
      this.query();
    },
    query() {
      let obj = { page: this.currentPage };
      this.$post("/delivery_plans/list_schedule", obj).then((res) => {
        let data = res.data.data;
        this.tableData = data;
        this.paginate_meta = res.data.paginate_meta;
      });
    },

    go(val) {
      this.$post("/delivery_plans/detail", { delivery_good_id: val.row.delivery_good_id }).then((res) => {
        this.detailData = res.data;
      });
      this.centerDialogVisible = true;
      // window.open(`https://gendanwang.com/v1/delivery_goods/${val.row.delivery_good_id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.f-r {
  float: right;
}
.p-t-10 {
  padding-top: 10px;
}
.pagination {
  padding: 10px 0;
  text-align: right;
}
</style>
<style lang="scss">
.form-item {
  width: 100%;
  display: inline-flex !important;
}
</style>
