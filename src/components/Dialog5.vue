<template>
  <el-dialog
    title
    :visible.sync="dialogVisible"
    width="90%"
    top="10vh"
    class="dialog"
    @close="cancel(false)"
  >
    <!-- 头部查询条件 -->
    <div id="printMe" ref="printMe">
      <ul class="top">
        <li>送货日期 : {{ headerData.delivery_date }}</li>
        <li>车号 : {{ headerData.delivery_train }}</li>
        <li>司机 : {{ headerData.delivery_member }}</li>
        <li>跟车 : {{ headerData.with_member }}</li>
        <li>配货员 : {{ headerData.allocate_member }}</li>
        <li>送货单号 : {{ headerData.delivery_serial }}</li>
      </ul>
      <!-- <div class="border">
				<el-row>
					<el-col :span="24" class="t-c">送货派送单</el-col>
				</el-row>
				<el-row type="flex">
					<el-col :span="3">送货日期</el-col>
					<el-col :span="3">20201020</el-col>
					<el-col :span="3">送货班次</el-col>
					<el-col :span="3">G34213</el-col>
					<el-col :span="3">送货路线</el-col>
					<el-col :span="9">华东山北校区</el-col>
				</el-row>
				<el-row type="flex">
					<el-col :span="3">下单客户</el-col>
					<el-col :span="9">上海金蝉科技有限公司</el-col>
					<el-col :span="3">收货单位</el-col>
					<el-col :span="9">安徽奇瑞科技有限公司</el-col>
				</el-row>
				<el-row type="flex">
					<el-col :span="3">车号</el-col>
					<el-col :span="3">小飞虎3391</el-col>
					<el-col :span="3">送货员</el-col>
					<el-col :span="3">唐甫</el-col>
					<el-col :span="3">跟车员</el-col>
					<el-col :span="3">李毛永</el-col>
					<el-col :span="3">配货员</el-col>
					<el-col :span="3">李锐华</el-col>
				</el-row>
      </div>-->
      <table border="1" cellspacing="0">
        <tr>
          <td style="width: 50px">行号</td>
          <td>路线</td>
          <td>班次</td>
          <td>收货单位</td>
          <td style="width:20%">商品全名</td>
          <td>代码</td>
          <td>跟单员</td>
          <td>数量</td>
          <td>备次</td>
          <td>订单编号</td>
          <td>库位</td>
          <td style="width:10%">备注</td>
        </tr>
        <template v-for="(item, index) in tableData">
          <tr
            v-if="index > 0 && tableData[index - 1].receiving_unit !== tableData[index].receiving_unit"
            :key="item.product_name + index"
            style="height: 10px;"
          ></tr>
          <tr :key="item.receiving_unit + index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.delivery_route }}</td>
            <td>{{ item.delivery_shifts }}</td>
            <td>{{ item.receiving_unit }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_price }}</td>
            <td>{{ item.order_member }}</td>
            <td>{{ item.delivery_number }}</td>
            <td>{{ item.sparetime }}</td>
            <td>{{ item.order_serial }}</td>
            <td>{{ item.warehouse_name }}</td>
            <td>{{ item.note }}</td>
          </tr>
        </template>
      </table>

      <ul class="bottom">
        <li :span="6" :offset="12" class="t-r">更新日期 : {{ headerData.updated_at }}</li>
        <li :span="6" class="t-r">打印日期 : {{ headerData.printed_at }}</li>
      </ul>
    </div>
    <span slot="footer">
      <el-button type="primary" v-print="'#printMe'" ref="printButton">打印</el-button>
      <el-button @click="cancel(false)">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog5",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    detailData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    print: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data: () => {
    return {
      dialogVisible: false,
      tableData: [],
      headerData: {}
    };
  },
  watch: {
    centerDialogVisible(val) {
      if (val) {
        this.dialogVisible = true;
      }
    },
    detailData(val) {
      if (val) {
        this.headerData = this.detailData.delivery_schedule;
        this.tableData = this.detailData.delivery_products;
      }
    },
    print(val) {
      if (val) {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.printButton.$el.click();
        });
      }
    }
  },
  methods: {
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
    }
  }
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
  .pagination {
    padding: 10px 0 0 0;
    text-align: center;
  }
}
#printMe {
  font-size: 14px;
  color: #5d5d5d;
  .border {
    .el-row {
      .el-col:last-child {
        border-right: 1px solid #ddd;
      }
      .el-col:nth-child(odd) {
        font-weight: bold;
      }
      .el-col {
        padding: 8px;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
        border-left: 1px solid #ddd;
      }
    }
    .el-row:first-child {
      border-top: 1px solid #ddd;
      font-size: 24px;
    }
  }
  .table {
    margin-top: 15px;
    border: 1px solid #ddd;
    ::v-deep th {
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    ::v-deep td {
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }

  table {
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
    tr {
      th,
      td {
        padding: 8px;
        border: 1px solid #ddd;
      }
    }
    tr:first-child {
      font-weight: bold;
      background-color: #5491ff;
      color: #000;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  .bottom {
    font-size: 18px;
    display: flex;
    justify-content: flex-end;
    height: 50px;
    line-height: 50px;
    li:last-child {
      margin-left: 20px;
    }
  }
}
.t-c {
  text-align: center;
}
.t-r {
  text-align: right;
}
</style>
