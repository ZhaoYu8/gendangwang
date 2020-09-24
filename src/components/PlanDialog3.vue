<template>
  <el-dialog title="新增特殊计划" :visible.sync="dialogVisible" width="96%" top="5vh" class="dialog" @close="cancel(false)">
    <!-- 头部查询条件 -->
    <Panel :arr="arr"> </Panel>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onOk" round>提交计划</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog3",
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
      arr: [
        { label: "日期", model: moment().format("YYYY-MM-DD"), placeholder: "", id: "delivery_date", type: "date", data: [] },
        { label: "班次", model: "", placeholder: "", id: "delivery_shifts", type: "select", data: [] },
        { label: "下单客户", model: "", placeholder: "", id: "customer_id", type: "page", data: [] },
        { label: "收货单位", model: "", placeholder: "", id: "receiving_unit" },
        { label: "路线", model: "", placeholder: "请输入路线", id: "delivery_route" },
        { label: "产品名称", model: "", placeholder: "请输入产品名称", id: "product_name", noHttp: true },
        { label: "产品所属", model: "", placeholder: "", id: "abc", type: "page", data: [], noHttp: true },
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
    };
  },
  watch: {
    dialogVisibl(val) {
      if (val) {
        this.dialogVisible = true;
        this.arr[6].data = this.arr[2].data = this.$vuexData.x.customer;
        this.arr[2].model = this.$vuexData.x.customer[0].id;
        this.arr[1].data = [
          { name: "", id: "" },
          { name: "早班", id: "早班" },
          { name: "中班", id: "中班" },
        ];
      }
    },
  },
  methods: {
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
    },
    // 点击确定
    onOk() {
      let obj = {};
      this.arr.map((r) => {
        if (!r.model || r.noHttp) return;
        obj[r.id] = r.model;
      });
      obj.product_ids = [];
      obj.delivery_date = this.$common.format(obj.delivery_date);
      this.$post("/delivery_plans/batch_create", obj).then((res) => {
        this.$notify({
          title: "提示",
          message: "新增特殊计划成功!",
          type: "success",
        });
        this.cancel(true);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
