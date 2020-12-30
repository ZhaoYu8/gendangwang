<template>
  <div class="detail">
    <el-row :gutter="10" type="flex" align="middle" justify="end">
      <el-col :span="24" class="d-f-e d-f-c">
        <template v-if="!receiptShow">
          <span class="mr-10">{{ fontSize }}</span>
          <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSize--">A-</el-link>
          <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSize++">A+</el-link>
        </template>
        <template v-else>
          <span class="mr-10">{{ fontSizes }}</span>
          <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSizes--">A-</el-link>
          <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSizes++">A+</el-link>
        </template>
        <el-popover placement="top" width="160" v-model="visible">
          <p>确定{{ outbound_task.status ? '红冲' : '审核出库' }}吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="audit">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" size="small" class="mr-10">{{ outbound_task.status ? '红冲' : '审核出库' }}</el-button>
        </el-popover>

        <el-button type="primary" size="small" v-print="'#receipt'" v-show="!receiptShow" @click="printReceipt" icon="el-icon-printer">打印单据</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" v-show="!receiptShow" v-print="'#receipt'" @click="print">打印单据(无金额)</el-button>

        <el-button type="primary" size="small" @click="printReceipt" v-show="receiptShow" icon="el-icon-printer">打印单据</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" v-show="receiptShow" @click="print">打印单据(无金额)</el-button>

        <el-button type="primary" size="small" icon="el-icon-printer" v-show="!receiptShow" @click="flowPrint">打印流程单</el-button>
        <el-button type="primary" size="small" icon="el-icon-printer" v-show="receiptShow" v-print="'#detailOutDepot'" @click="flowPrint">打印流程单</el-button>
        <el-button type="warning" size="small" @click="updateDetail(0)">复制</el-button>
        <el-button type="primary" size="small" @click="updateDetail(editID)">修改</el-button>
        <el-popover placement="top" width="160" v-model="visibleSelf">
          <p>确定作废吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleSelf = false">取消</el-button>
            <el-button type="primary" size="mini" @click="invalidSelf">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" size="small" class="ml-10">作废</el-button>
        </el-popover>
      </el-col>
    </el-row>
    <div class="pt-10" id="detailOutDepot" ref="detailOutDepot" v-show="receiptShow">
      <div class="header">{{ outbound_task.contact_company }} 发货流程单</div>
      <ul class="d-f-s-b">
        <li>发货单号 : {{ outbound_task.outbound_task_serial }}</li>
        <li>配货员 : {{ outbound_task.delivery_member_name }}</li>
        <li>检验员 : {{ outbound_task.check_member_name }}</li>
        <li>运单号码 : {{ outbound_task.delivery_serial }}</li>
        <li></li>
      </ul>

      <table border="1" cellspacing="0" class="table">
        <tr v-for="item in arr.length" :key="`s` + item">
          <td v-for="n in arr[item - 1]" :key="n.label + item">
            <div class="d-f-c">
              <div class="W-80 t-j w-s-n">{{ n.label }}：</div>
              <div>{{ outbound_task[n.id] || '' }}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div>备注：{{ outbound_task.desc_note }}</div>
          </td>
        </tr>
      </table>

      <table border="1" cellspacing="0" class="table" :class="{ 'always-table': n }" :style="{ fontSize: fontSizes + 'px' }" v-for="(n, i) in headerArr" :key="n">
        <tr
          style="font-weight: bold;"
          class="header-tr"
          @dblclick="
            () => {
              headerArr.splice(
                headerArr.findIndex((r) => r === n),
                1
              );
            }
          "
        >
          <td style="width: 3%;">编号</td>
          <td style="width: 25%;">商品全名</td>
          <td style="width: 8%;">代码</td>
          <td style="width: 8%;">跟单员</td>
          <td style="width: 8%;">代码2</td>
          <td style="width: 10%;">数量</td>
          <td style="width: 10%;">备次</td>
          <td style="width: 14%;">订单编号</td>
          <td style="width: 14%;">备注</td>
        </tr>
        <template v-for="(item, index) in tableData.slice(n, headerArr.length === 1 ? tableData.length : headerArr[i + 1])">
          <tr :key="'nvb' + index" @dblclick="always(index + n)">
            <td class="t-c">{{ index + n + 1 }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_code }}</td>
            <td>{{ item.tracking_member_name }}</td>
            <td>{{ item.product_code2 }}</td>
            <td>{{ item.product_number }}</td>
            <td>{{ item.sparetime }}</td>
            <td>{{ item.order_serial }}</td>
            <td style="width: 100px;">{{ item.note }}</td>
          </tr>
        </template>
      </table>

      <div class="d-f-e mt-10 f-20">打印日期 : {{ date }}</div>
    </div>
    <div id="receipt" v-show="!receiptShow">
      <div v-for="ge in Math.ceil(tableData.length / 8)" :key="'ss' + ge" class="box">
        <div class="header">江苏源艺包装送货单</div>
        <ul class="d-f-s-b mb-5 mt-5">
          <li>公司地址：江苏省常熟市尚湖镇练塘颜巷工业区</li>
          <li>电话：18261793098</li>
          <li>传真：52746532</li>
        </ul>
        <div class="mb-5 mt-5">发货日期：{{ outbound_task.delivery_date }}</div>
        <ul class="d-f-s-b mb-5 mt-5">
          <li>购买单位：{{ outbound_task.contact_company }}</li>
          <li>收件人：{{ outbound_task.contact_name }}</li>
          <li>电话：{{ outbound_task.contact_way }}</li>
          <li>地址：{{ outbound_task.delivery_address }}</li>
        </ul>
        <table border="1" cellspacing="0" class="table" :style="{ fontSize: fontSize + 'px' }">
          <tr :style="{ fontWeight: 'bold' }">
            <td>商品编号</td>
            <td style="width: 34%;">商品全名</td>
            <td class="w-s-n">单位</td>
            <td>数量</td>
            <td>单价</td>
            <td>金额</td>
            <td style="width: 20%;">备注</td>
          </tr>
          <template v-for="(item, index) in tableData.slice((ge - 1) * 8, ge * 8)">
            <tr :key="'nvb' + index">
              <td>{{ (ge - 1) * 8 + index + 1 }}</td>
              <td>{{ item.product_name }}</td>
              <td class="w-s-n">{{ item.product_serial }}</td>
              <td>{{ item.product_number }}</td>
              <td>{{ noShow ? '' : item.price }}</td>
              <td>{{ noShow ? '' : (item.product_number * item.price).toFixed(2) }}</td>
              <td>{{ item.note }}</td>
            </tr>
          </template>
          <tr>
            <td>合计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {{
                noShow
                  ? ''
                  : tableData
                      .slice((ge - 1) * 8, ge * 8)
                      .map((r) => (r.product_number || 0) * (r.price || 0))
                      .reduce((prev, cur) => prev + cur)
                      .toFixed(2)
              }}
            </td>
            <td></td>
          </tr>
        </table>

        <ul class="note">
          <li>注：1. 需方在签收货物前对货物数量、规格、包装进行核对检验，核对无异后签收，签收后视为数量、规格、包装无异议；</li>
          <li>2. 质量异议期：如有异议，需方自签收之日起三日内向供方提出书面异议并需妥善保管货物不得使用货物；逾期未提异议或已使用货物的视为货物质量合格；</li>
          <li>3. 油质，染料，化学剂，高温烫气及其他造成色纱，退色或污染，均非本公司产品瑕疵，需方使用前，请自行彻底测试。</li>
          <li>4. 货物交付履行地：常熟。</li>
        </ul>
        <el-row class="d-f-s-b mb-5 mt-5">
          <el-col :span="8">制单人：{{ outbound_task.maker }}</el-col>
          <el-col :span="8">销售：{{ outbound_task.saler }}</el-col>
          <el-col :span="8">收货单位及经手人（签字）：</el-col>
        </el-row>
        <el-row class="d-f-s-b mb-5 mt-5">
          <el-col :span="8">送货人（签字）：{{ outbound_task.siji }}</el-col>
          <el-col :span="8">负责人：{{ outbound_task.tracking_member }}</el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailOutDepot',
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
      visibleSelf: false,
      date: '',
      fontSize: 14,
      fontSizes: 16,
      receiptShow: false, // 确定是流程图，还是单据
      visible: false,
      noShow: false,
      outbound_task: {},
      tableData: [],
      editID: 0,
      arr: [
        [
          { label: '跟单员', width: '25', id: 'tracking_member_name' },
          { label: '业务员', width: '50', id: 'saler_name' },
          { label: '发货日期', width: '25', id: 'delivery_date' },
        ],
        [
          { label: '收货单位', id: 'contact_company' },
          { label: '发货单位', id: 'delivery_company' },
          { label: '货运方式', id: 'huoyunfangshi' },
        ],
        [
          { label: '收货人', id: 'contact_name' },
          { label: '发货人', id: 'signment_member_name' },
          { label: '放单方式', id: 'fangdanfangshi' },
        ],
        [
          { label: '联系方式', id: 'contact_way' },
          { label: '联系方式', id: 'delivery_contact_way' },
          { label: '付费方式', id: 'fufeifangshi' },
        ],
        [
          { label: '收货地址', id: 'delivery_address' },
          { label: '发货地址', id: 'delivery_from' },
          { label: '特殊要求', id: 'spec_note' },
        ],
      ],
      headerArr: [0],
    };
  },
  methods: {
    always(index) {
      if (!this.headerArr.filter((r) => r === index).length) this.headerArr.push(index);
      this.headerArr = this.headerArr.sort((a, b) => {
        return a - b;
      });
    },
    async init(val) {
      let res = await this.$post('outbound_tasks/for_show', {
        id: val.id,
      });
      this.tableData = res.data.data.products;
      this.outbound_task = res.data.data.outbound_task;
      this.editID = val.id;
      this.date = moment().format('YYYY-MM-DD HH:mm:ss');
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
      this.date = moment().format('YYYY-MM-DD HH:mm:ss');
    },
    // 审核出库
    async audit() {
      this.visible = false;
      let res = await this.$post(this.outbound_task.status ? 'outbound_tasks/red_dashed' : 'outbound_tasks/pass_audit', {
        id: this.editID,
      });
      this.$notify({
        title: '提示',
        type: 'success',
        message: `${this.outbound_task.status ? '红冲' : '审核出库'}成功！`,
      });
      this.$emit('cancel');
    },
    async invalidSelf() {
      this.visibleSelf = false;
      let res = await this.$post('outbound_tasks/invalid_self', {
        id: this.editID,
      });
      this.$notify({
        title: '提示',
        type: 'success',
        message: '作废成功！',
      });
      this.$emit('cancel');
    },
    updateDetail(id = 0) {
      this.$emit('update', {
        outbound_task: this.outbound_task,
        tableData: this.tableData,
        id: id,
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off('detailShow');
  },
  mounted() {
    this.$bus.$on('detailShow', (res) => {
      this.init(res);
    });
  },
};
</script>

<style lang="scss" scoped>
.detail {
  color: #000;
}
// 打印单据
#receipt {
  @media print {
    .table {
      tr:first-child {
        background: #909399 !important;
        color: #fff;
        -webkit-print-color-adjust: exact;
      }
    }
  }
  font-size: 12px;
  .box {
    page-break-before: always;
    .header {
      color: #000;
      text-align: center;
      font-size: 26px;
      line-height: 26px;
      font-family: '楷体';
      margin-bottom: 5px;
      margin-top: 35px;
    }
    &:first-child {
      .header {
        margin-top: 0;
      }
    }
    .table {
      border: 1px solid #000;
      width: 100%;
      border-collapse: collapse;
      tr {
        height: 24px;
        line-height: 24px;
        th,
        td {
          padding: 0 8px;
          border: 1px solid #000;
        }
      }
      tr:first-child {
        background-color: #909399;
        color: #fff;
        td {
          white-space: nowrap;
        }
      }
      ::v-deep th {
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
      }
      ::v-deep td {
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
      }
    }
    .note {
      font-size: 10px;
      li {
        margin-bottom: 5px;
        &:first-child {
          margin-top: 5px;
        }
      }
    }
  }
}
#detailOutDepot {
  font-size: 16px;
  @media print {
    .table {
      tr:first-child {
        background: #909399 !important;
        color: #fff;
        -webkit-print-color-adjust: exact;
      }
    }
  }
  .always-table {
    page-break-before: always;
  }
  .header {
    color: #000;
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    font-family: '楷体';
    margin-bottom: 10px;
  }
  .table {
    margin-top: 10px;
    border: 1px solid #000;
    width: 100%;
    border-collapse: collapse;
    tr {
      height: 34px;
      th,
      td {
        padding: 4px;
        border: 1px solid #000;
      }
    }
    tr:first-child {
      background-color: #909399;
      color: #fff;
      td {
        white-space: nowrap;
      }
    }
    ::v-deep th {
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }
    ::v-deep td {
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
}
</style>
