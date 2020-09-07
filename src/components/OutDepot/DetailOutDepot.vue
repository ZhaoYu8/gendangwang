<template>
  <div class="detail">
    <el-row :gutter="10" type="flex" align="middle" justify="end">
      <el-col :span="24" class="d-f-e">
        <el-popover placement="top" width="160" v-model="visible">
          <p>确定审核出库吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="audit">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" size="small" class="mr-10">审核出库</el-button>
        </el-popover>

        <el-button type="primary" size="small" v-print="'#receipt'" @click="printReceipt" icon="el-icon-printer">打印单据</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" @click="print">打印单据(无金额)</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" v-print="'#detailOutDepot'" @click="flowPrint">打印流程单</el-button>
        <el-button type="warning" size="small" @click="updateDetail">复制</el-button>
        <el-button type="primary" size="small" @click="updateDetail(editID)">修改</el-button>
      </el-col>
    </el-row>
    <div class="pt-10 " id="detailOutDepot" ref="detailOutDepot" v-show="receiptShow">
      <div class="header">发货流程单</div>
      <ul class="d-f-s-b">
        <li>发货单号 : {{ outbound_task.outbound_task_serial }}</li>
        <li>配货员 : {{ outbound_task.delivery_member_name }}</li>
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
            <div class="W-80 t-j">备注:{{ outbound_task.desc_note }}</div>
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
            <td>{{ item.inbound_warehouse }}</td>
            <td>{{ item.warehouse_location }}</td>
            <td>{{ item.note }}</td>
          </tr>
        </template>
      </table>
    </div>
    <div id="receipt" v-show="!receiptShow">
      <div class="header">江苏源艺包装送货单</div>
      <ul class="d-f-s-b mb-10 mt-10">
        <li>公司地址：江苏省常熟市尚湖镇练塘颜巷工业区</li>
        <li>电话：18261793098</li>
        <li>传真：52746532</li>
      </ul>
      <div class="mb-10 mt-10">发货日期：2020-09-07</div>
      <div class="mb-10 mt-10">购买单位：2020-09-07</div>
      <table border="1" cellspacing="0" class="table">
        <tr style="height: 32px;background-color: #E9EDF5;font-weight: bold;">
          <td style="width: 6%;">商品编号</td>
          <td style="width: 44%;">商品全名</td>
          <td style="width: 8%;">单位</td>
          <td style="width: 8%;">数量</td>
          <td style="width: 8%;">单价</td>
          <td style="width: 8%;">金额</td>
          <td style="width: 18%;">备注</td>
        </tr>
        <template v-for="(item, index) in tableData">
          <tr :key="'nvb' + index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_serial }}</td>
            <td>{{ item.product_number }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.note }}</td>
          </tr>
        </template>
        <tr>
          <td>合计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <ul>
        <li class="mt-10 mb-10">
          注：1. 需方在签收货物前对货物数量、规格、包装进行核对检验，核对无异后签收，签收后视为数量、规格、包装无异议；
        </li>
        <li class="mb-10">
          2. 质量异议期：如有异议，需方自签收之日起三日内向供方提出书面异议并需妥善保管货物不得使用货物；逾期未提异议或已使用货物的视为货物质量合格；
        </li>
        <li class="mb-10">3. 油质，染料，化学剂，高温烫气及其他造成色纱，退色或污染，均非本公司产品瑕疵，需方使用前，请自行彻底测试。</li>
        <li class="mb-10">4. 货物交付履行地：常熟。</li>
      </ul>
      <el-row class="d-f-s-b mb-10 mt-10">
        <el-col :span="8">制单人：赵宇</el-col>
        <el-col :span="8">销售：阿吧</el-col>
        <el-col :span="8">收货单位及经手人（签字）：</el-col>
      </el-row>
      <el-row class="d-f-s-b mb-10 mt-10">
        <el-col :span="8">送货人（签字）：主仓库</el-col>
        <el-col :span="8">负责人： 张少文</el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailOutDepot",
  props: {},
  components: {},
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => {
    return {
      receiptShow: false, // 确定是流程图，还是单据
      visible: false,
      noShow: false,
      outbound_task: {},
      tableData: [],
      editID: 0,
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
      this.editID = val.id;
    },
    printReceipt() {
      // 打印单据前
      this.receiptShow = false;
    },
    print() {
      this.noShow = true;
      // 特别备注 因为setTimeout 是宏任务 看了打印源码 用了 $nextTack 微任务, 暂时取代回调函数
      setTimeout(() => {
        this.noShow = false;
      });
    },
    flowPrint() {
      this.receiptShow = true;
    },
    // 审核出库
    async audit() {
      this.visible = false;
      let res = await this.$post("outbound_tasks/pass_audit", {
        id: this.editID,
      });
      this.$notify({
        title: "提示",
        type: "success",
        message: "审核出库成功！",
      });
      this.$emit("cancel");
    },
    updateDetail(id = 0) {
      this.$emit("update", {
        outbound_task: this.outbound_task,
        tableData: this.tableData,
        id: id,
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("detailShow");
  },
  mounted() {
    if (this.detailData.id) this.init(this.detailData);
    this.$bus.$on("detailShow", (res) => {
      this.init(res);
    });
  },
};
</script>

<style lang="scss" scoped>
.detail {
  font-size: 15px;
}
#receipt {
  .header {
    text-align: center;
    font-size: 44px;
    font-family: "楷体";
    margin-bottom: 20px;
  }
  .table {
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
#detailOutDepot {
  .header {
    text-align: center;
    font-size: 44px;
    font-family: "楷体";
    margin-bottom: 20px;
  }
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
