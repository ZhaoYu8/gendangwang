<template>
  <div class="add-outdepot">
    <div class="d-f-c-s-b f-s">
      <span class="f-20"> 新建送货计划单</span>
      <el-button type="text" @click="back"> {{ "&lt; 返回出库管理" }}</el-button>
    </div>
    <Panel :arr="arr" :special="'w-20'" @change="custChange" />
    <!-- 第一个表格 -->
    <div class="d-f-s-b p-t-10">
      <el-button type="primary" size="large" @click="changeDialog">选择出库产品</el-button>
      <div>
        <el-button size="large">取消</el-button>
        <el-button type="primary" size="large" @click="save">保存</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border ref="dialog1Table">
        <el-table-column label="序号" align="center" prop="product_name" header-align="center" type="index"></el-table-column>
        <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"></el-table-column>
        <el-table-column label="产品名称" align="center" prop="product_name" header-align="center"></el-table-column>
        <el-table-column label="仓库选择" align="center" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row['inbound_warehouse_id']" placeholder="">
              <el-option v-for="item in $vuexData.x.warehouse" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="仓位选择" align="center" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row['warehouse_location_id']" placeholder="">
              <el-option v-for="item in $vuexData.x.location" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="当前库存" align="center" prop="storage_quantity" header-align="center" width="100"></el-table-column>
        <el-table-column label="出库数量" align="center" header-align="center" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row['product_number']" placeholder="" @change="tableChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备次" align="center" prop="sparetime" header-align="center" width="100"> </el-table-column>
        <el-table-column label="备次率(%)" align="center" header-align="center" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row['sparetime_percent']" placeholder="" @change="tableChange(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" align="center" header-align="center" prop="price" width="100"> </el-table-column>
        <el-table-column label="备注" align="center" header-align="center">
          <template slot-scope="scope"> <el-input v-model="scope.row['note']" placeholder=""></el-input> </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="del(scope.$index)" class="m-r-3"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddDialog :dialogVisibl="dialogShow" @cancel="cancel" @save="dialogSave" />
  </div>
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
        { label: "配货员", model: "", placeholder: "", id: "delivery_member_id", type: "select", data: [] },
        { label: "检验员", model: "", placeholder: "", id: "check_member_id", type: "select", data: [] },
        { label: "跟单员", model: "", placeholder: "", id: "tracking_member_id", type: "select", data: [] },
        { label: "业务员", model: "", placeholder: "", id: "saler_id", type: "select", data: [] },
        { label: "发货日期", model: moment().format("YYYY-MM-DD"), placeholder: "", id: "delivery_date", type: "date", data: [] },
        { label: "放单方式", model: "", placeholder: "", id: "fangdanfangshi", type: "select", data: [] },
        { label: "付费方式", model: "", placeholder: "", id: "fufeifangshi", type: "select", data: [] },
        { label: "货运方式", model: "", placeholder: "", id: "huoyunfangshi", type: "select", data: [] },
        { label: "特殊要求", model: "", placeholder: "", id: "spec_note" },
        { label: "收货单位", model: "", placeholder: "", id: "contact_company" },
        { label: "收货人", model: "", placeholder: "", id: "contact_name" },
        { label: "联系方式", model: "", placeholder: "收货人联系方式", id: "contact_way" },
        { label: "收货地址", model: "", placeholder: "", id: "delivery_address", class: "w-40" },
        { label: "发货单位", model: "", placeholder: "", id: "delivery_company" },
        { label: "发货人", model: "", placeholder: "", id: "signment_member_id" },
        { label: "联系方式", model: "", placeholder: "发货人联系方式", id: "delivery_contact_way" },
        { label: "发货地址", model: "源艺自由贸易展示区", placeholder: "", id: "delivery_from", class: "w-40" },
        { label: "备注说明", model: "", placeholder: "", id: "desc_note", class: "w-60" },
        { label: "发货单号", model: "", placeholder: "", id: "outbound_task_serial" },
        { label: "运单号码", model: "", placeholder: "", id: "delivery_serial" },
        // siji : 司机
      ],
    };
  },
  methods: {
    back() {
      this.$emit("cancel");
    },
    cancel() {
      this.dialogShow = false;
    },
    changeDialog() {
      this.dialogShow = true;
      this.$bus.$emit("AddOutDepot", this.arr[0].model);
    },
    // 选择出库产品得出的数据
    dialogSave(val) {
      this.tableData = this.tableData.concat(val);
    },
    tableChange(val) {
      val.product_number = Number(val.product_number) || 0;
      val.sparetime_percent = Number(val.sparetime_percent) || 0;
      val.sparetime = Math.ceil((val.product_number * val.sparetime_percent) / 100) || 0;
    },
    del(val) {
      this.tableData.splice(val, 1);
    },
    async custChange(val) {
      if (val.id !== "customer_id") return;
      let res = await this.$post("outbound_tasks/switch_customer", { customer_id: val.model });
      let data = res.data.data;
      this.arr[3].model = data.tracking_member_id; // 跟单员
      this.arr[4].model = data.saler_member_id; // 业务员
      this.arr[14].model = data.delivery_company; // 发货单位
      this.arr[15].model = data.signment_member_id; // 发货人
      this.arr[16].model = data.delivery_contact_way; // 联系方式
    },
    async save() {
      let outbound_task = {};
      this.arr.map((r) => {
        outbound_task[r.id] = r.model;
      });
      // 日期单独处理一下
      outbound_task.delivery_date = moment(outbound_task.delivery_date).format("YYYY-MM-DD");
      let arr = this.tableData.map((r) => {
        return {
          ...{
            inbound_warehouse_id: null,
            warehouse_location_id: null,
            storage_quantity: null,
            product_number: null,
            sparetime: null,
            sparetime_percent: null,
            note: null,
          },
          ...r,
        };
      });
      let obj = {};
      arr.map((r, i) => {
        obj[i] = r;
      });
      let res = await this.$post("outbound_tasks/for_create", {
        outbound_task,
        products: obj,
      });
    },
  },
  mounted() {
    this.$bus.$on("user", () => {
      let x = this.$vuexData.x;
      this.arr[0].data = x.customer;
      this.arr[0].model = x.customer[0].id;
      this.arr[6].data = x.fangdanfangshi;
      this.arr[7].data = x.fufeifangshi;
      this.arr[8].data = x.huoyunfangshi;
      [1, 2, 3, 4].map((r) => {
        this.arr[r].data = x.member;
      });
      this.custChange({ model: x.customer[0].id, id: "customer_id" });
    });
  },
};
</script>

<style lang="scss" scoped>
.add-outdepot {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table {
    flex-grow: 1;
    height: 0;
    padding-top: 10px;
    ::v-deep .el-table {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      .el-table__body-wrapper {
        flex: 1;
        overflow-y: scroll;
      }
    }
  }
}
</style>
