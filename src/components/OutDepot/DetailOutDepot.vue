<template>
  <div class="detail">
    <el-row :gutter="10" type="flex" align="middle" justify="end" class="test">
      <el-col :span="4" :xl="8" class="d-f-c-c f-20">送货计划单</el-col>
      <el-col :span="8" :xs="12" :sm="10" :md="10" :lg="10" :xl="8" class="d-f-e">
        <el-button type="primary" size="small">审核出库</el-button>
        <el-button type="primary" size="small" v-print="'#detailOutDepot'" icon="el-icon-printer">打印单据</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" v-print="'#detailOutDepot'" @click="print">打印单据(无金额)</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer">打印流程单</el-button>
        <el-button type="warning" size="small">复制</el-button>
        <el-button
          type="success"
          size="small"
          icon="el-icon-caret-left"
          circle
          @click="
            () => {
              $emit('cancel');
            }
          "
        ></el-button>
      </el-col>
    </el-row>
    <div class="p-t-10" id="detailOutDepot" ref="detailOutDepot">
      <ul class="d-f-s-b">
        <li>发货单号 : {{ outbound_task.outbound_task_serial }}</li>
        <li>配货员 : {{ outbound_task.delivery_member_Name }}</li>
        <li>检验员 : {{ outbound_task.check_member_name }}</li>
        <li>运单号码 : {{ outbound_task.delivery_serial }}</li>
        <li></li>
      </ul>

      <table border="1" cellspacing="0" class="table">
        <tr v-for="item in arr.length" :key="`s` + item">
          <td class="dsadsadsadasd" v-for="n in arr[item - 1]" :key="n.label + item">
            <div class="d-f-c">
              <div class="W-80 t-j">{{ n.label }}</div>
              <div class="ml-10">{{ ": " + (outbound_task[n.id] || "") }}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div class="W-80 t-j">备注:</div>
          </td>
        </tr>
      </table>

      <table border="1" cellspacing="0" class="table">
        <tr style="height: 32px;background-color: #E9EDF5;font-weight: bold;">
          <td style="width: 30px;">序号</td>
          <td>订单编号</td>
          <td>产品名称</td>
          <td>产品编号</td>
          <td width="80px">出库数量</td>
          <td width="80px">备次</td>
          <td width="80px">备次率</td>
          <td width="80px">产品单价</td>
          <td>仓库选择</td>
          <td>仓位选择</td>
          <td style="width: 15%">备注</td>
        </tr>
        <template v-for="(item, index) in tableData">
          <tr :key="'nvb' + index">
            <td class="t-c">{{ index + 1 }}</td>
            <td>{{ item.order_serial }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_serial }}</td>
            <td>{{ item.product_number }}</td>
            <td>{{ item.sparetime }}</td>
            <td>{{ item.sparetime_percent }}</td>
            <td>{{ noShow ? "" : item.price }}</td>
            <td>{{ item.outbound_warehouse }}</td>
            <td>{{ item.warehouse_location }}</td>
            <td>{{ item.node }}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailOutDepot",
  props: {},
  components: {},
  data: () => {
    return {
      noShow: false,
      outbound_task: {},
      tableData: [],
      arr: [
        [
          { label: "跟单员", width: "25", id: "tracking_member_name" },
          { label: "业务员", width: "50", id: "saler_name" },
          { label: "发货日期", width: "25", id: "delivery_date" },
        ],
        [
          { label: "收货单位", id: "contact_company" },
          { label: "发货单位", id: "delivery_company" },
          { label: "货运方式", id: "huoyunfangshi" },
        ],
        [
          { label: "收货人", id: "contact_name" },
          { label: "发货人", id: "signment_member_name" },
          { label: "放单方式", id: "fangdanfangshi" },
        ],
        [
          { label: "联系方式", id: "contact_way" },
          { label: "联系方式", id: "delivery_contact_way" },
          { label: "付费方式", id: "fufeifangshi" },
        ],
        [
          { label: "收货地址", id: "delivery_address" },
          { label: "发货地址", id: "delivery_from" },
          { label: "特殊要求", id: "spec_note" },
        ],
      ],
    };
  },
  methods: {
    async init(val) {
      let res = await this.$post("outbound_tasks/for_show", {
        id: val.id,
      });
      this.tableData = res.data.data.products;
      this.outbound_task = res.data.data.outbound_task;
    },
    print() {
      this.noShow = true;
      // 特别备注 因为setTimeout 是宏任务 看了打印源码 用了 $nextTack 微任务, 暂时取代回调函数
      setTimeout(() => {
        this.noShow = false;
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("detailShow");
  },
  mounted() {
    this.$bus.$on("detailShow", (res) => {
      console.log("你进来了小伙子", res);
      this.init(res);
    });
  },
};
</script>

<style lang="scss" scoped>
.detail {
  font-size: 14px;
}
#detailOutDepot {
  .table {
    margin-top: 10px;
    border: 1px solid #ddd;
    width: 100%;
    border-collapse: collapse;
    white-space: nowrap;
    tr {
      height: 48px;
      th,
      td {
        padding: 8px;
        border: 1px solid #ddd;
        white-space: nowrap;
      }
    }
    tr:first-child {
      background-color: #e3e9f6;
      color: #000;
    }
    ::v-deep th {
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    ::v-deep td {
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
}
</style>
