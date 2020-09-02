<template>
  <el-card class="h-100">
    <div class="d-f-c-s-b">
      <span class="f-20"> 新建送货计划单</span>
      <el-button type="text" @click="cancel"> {{ "&lt; 返回出库管理" }}</el-button>
    </div>
    <Panel :arr="arr" :special="'w-20'" />
    <!-- 第一个表格 -->
    <div class="d-f-s-b p-t-10">
      <el-button type="primary" size="large" @click="changeDialog">选择出库产品</el-button>
      <div>
        <el-button size="large">取消</el-button>
        <el-button type="primary" size="large">保存</el-button>
      </div>
    </div>
    <div class="p-t-10">
      <el-table :data="tableData" style="width: 100%;" border height="400" ref="dialog1Table">
        <el-table-column label="序号" align="center" prop="product_name" header-align="center"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="product_serial" header-align="center"></el-table-column>
        <el-table-column label="产品名称" align="center" prop="customer_name" header-align="center"></el-table-column>
        <el-table-column label="仓库选择" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="仓位选择" align="center" prop="order_quantity" header-align="center"></el-table-column>
        <el-table-column label="当前库存" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="出库数量" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="备次" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="备次率" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="产品单价" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="备注" align="center" prop="storage_quantity" header-align="center"></el-table-column>
        <el-table-column label="操作" align="center" header-align="center"></el-table-column>
      </el-table>
    </div>
    <AddDialog :dialogVisibl="dialogShow" @cancel="cancel" />
  </el-card>
</template>

<script>
import AddDialog from "@/components/OutDepot/AddDialog";
export default {
  name: "add",
  props: {},
  components: {
    AddDialog,
  },
  data: () => {
    return {
      dialogShow: false,
      tableData: [],
      arr: [
        { label: "下单客户", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "配货员", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "检验员", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "跟单员", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "业务员", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "发货日期", model: new Date(), placeholder: "", id: "delivery_date", type: "date", data: [] },
        { label: "放单方式", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "付费方式", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "货运方式", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "特殊要求", model: "", placeholder: "", id: "customer_id" },
        { label: "收货单位", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "收货人", model: "", placeholder: "", id: "customer_id" },
        { label: "联系方式", model: "", placeholder: "收货人联系方式", id: "customer_id" },
        { label: "收货地址", model: "", placeholder: "", id: "customer_id", class: "w-40" },
        { label: "发货单位", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        { label: "发货人", model: "", placeholder: "", id: "customer_id" },
        { label: "联系方式", model: "", placeholder: "发货人联系方式", id: "customer_id" },
        { label: "发货地址", model: "源艺自由贸易展示区", placeholder: "", id: "customer_id", class: "w-40" },
        { label: "备注说明", model: "", placeholder: "", id: "customer_id", class: "w-60" },
        { label: "发货单号", model: "", placeholder: "", id: "customer_id" },
        { label: "运单号码", model: "", placeholder: "", id: "customer_id" },
      ],
    };
  },
  methods: {
    cancel() {
      this.dialogShow = false;
    },
    changeDialog() {
      this.dialogShow = true;
      this.$bus.$emit("AddOutDepot", this.arr[0].model);
    },
  },
  mounted() {
    this.arr[0].data = this.$vuexData.x.customer;
    this.arr[0].model = this.$vuexData.x.customer.length && this.$vuexData.x.customer[0].id;
    this.$bus.$on("user", () => {
      this.arr[0].data = this.$vuexData.x.customer;
      this.arr[0].model = this.$vuexData.x.customer[0].id;
    });
  },
};
</script>

<style lang="scss" scoped></style>
