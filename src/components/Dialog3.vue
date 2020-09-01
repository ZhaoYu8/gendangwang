<template>
  <el-dialog title="新增特殊计划" :visible.sync="dialogVisible" width="96%" top="5vh" class="dialog" @close="cancel(false)">
    <!-- 头部查询条件 -->
    <el-card class="mb-10">
      <el-row :gutter="20">
        <el-form label-position="left" :inline="true">
          <el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index">
            <el-form-item :label="item.label + '：'" class="form-item">
              <el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
              <el-select v-model="item.model" filterable :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" style="width: 100%;">
                <el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"></el-option>
              </el-select>
              <el-date-picker v-model="item.model" type="date" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'date'" style="width: 100%;" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
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
        {
          label: "日期",
          model: new Date(),
          placeholder: "",
          id: "delivery_date",
          type: "date",
          data: [],
        },
        {
          label: "班次",
          model: "",
          placeholder: "",
          id: "delivery_shifts",
          type: "select",
          data: [],
        },
        {
          label: "下单客户",
          model: "",
          placeholder: "",
          id: "customer_id",
          type: "select",
          data: [],
        },
        { label: "收货单位", model: "", placeholder: "", id: "receiving_unit" },
        {
          label: "路线",
          model: "",
          placeholder: "请输入路线",
          id: "delivery_route",
        },
        {
          label: "产品名称",
          model: "",
          placeholder: "请输入产品名称",
          id: "product_name",
          noHttp: true,
        },
        {
          label: "产品所属",
          model: "",
          placeholder: "",
          id: "abc",
          type: "select",
          data: [],
          noHttp: true,
        },
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
        {
          label: "交代说明",
          model: "",
          placeholder: "输入备注说明或需要交代的事项",
          id: "note",
          span: 24,
        },
      ],
    };
  },
  watch: {
    dialogVisibl(val) {
      if (val) {
        this.dialogVisible = true;
        this.arr[6].data = this.arr[2].data = this.$vuexData.x.user;
        this.arr[2].model = this.$vuexData.x.user[0].id;
        this.arr[1].data = this.$vuexData.x.delivery;
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

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog__body {
    padding: 10px 20px;
  }
  ::v-deep .el-card__body {
    padding: 10px 20px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .dialog-footer {
    text-align: center;
    display: block;
    width: 200px;
    margin: 0 auto;
    ::v-deep .el-button {
      width: 100%;
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
