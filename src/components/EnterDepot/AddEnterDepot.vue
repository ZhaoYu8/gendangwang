<template>
  <div>
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col span="7">
            <el-form-item label="入库时间：" class="form-item">
              <el-date-picker v-model="date" type="date" placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="17">
            <el-form-item label="" class="form-item">
              <el-button type="warning" class="f-r ml-10" @click="visible = true">选择入库产品</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!-- 第一个表格 -->
    <div class="pt-10 ">
      <el-table :data="tableData" style="width: 100%;" border height="500" ref="dialog1Table">
        <el-table-column label="序号" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="客户名称" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="产品名称" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="入库数量" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="仓库选择" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="仓位选择" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="备注" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="操作" align="center" prop="order_serial" header-align="center"></el-table-column>
      </el-table>
      <!-- 第一个表格分页 -->
    </div>
    <div class="d-f-e pt-10">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
    <AddDialogs :visible="visible" />
  </div>
</template>

<script>
import AddDialogs from '@/components/EnterDepot/AddDialog';
export default {
  name: 'AddDialog',
  props: {},
  data: () => {
    return {
      model: '',
      options: [],
      tableData: [],
      visible: false,
      date: moment().format("YYYY-MM-DD")
    };
  },
  components: { AddDialogs },
  watch: {},
  methods: {},
  beforeDestroy() {
    this.$bus.$off('AddOutDepot');
  },
  mounted() {
    this.$bus.$on('AddOutDepot', (val) => {
      console.log(val);
    });
  },
};
</script>

<style lang="scss" scoped></style>
