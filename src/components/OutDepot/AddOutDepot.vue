<!--
 * @Author: 赵宇
 * @Description: 
 * @Date: 2022-07-25 16:22:40
 * @LastEditTime: 2023-03-06 10:22:41
 * @LastEditors: zhao 13370229059@163.com
 * @FilePath: \yuanyibaozhuang\src\components\OutDepot\AddOutDepot.vue
-->
<template>
  <div class="add-outdepot">
    <Panel :arr="arr" @change="custChange" v-if="panelType" />
    <!-- 第一个表格 -->
    <div :class="{ 'd-f-e': finance }" class="d-f-s-b pt-10 pb-10">
      <el-button type="primary" size="large" @click="changeDialog" v-if="!finance">选择出库产品</el-button>
      <div>
        <el-button size="large" @click="cancel(1)">取消</el-button>
        <el-button type="primary" size="large" @click="save">保存</el-button>
      </div>
    </div>
    <el-table :data="tableData" border ref="dialog1Table" height="310">
      <el-table-column label="序号" align="center" header-align="center" type="index"></el-table-column>
      <el-table-column label="订单编号" align="center" prop="order_serial" header-align="center"></el-table-column>
      <el-table-column label="产品名称" align="center" prop="product_name" header-align="center"></el-table-column>
      <el-table-column label="产品编号" align="center" prop="product_serial" header-align="center"></el-table-column>
      <el-table-column label="仓库选择" align="center" header-align="center">
        <template slot-scope="scope">
          <el-select filterable v-model="scope.row['inbound_warehouse_id']" placeholder="">
            <el-option v-for="item in $vuexData.x.warehouse" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="仓位选择" align="center" header-align="center">
        <template slot-scope="scope">
          <Page v-model="scope.row['warehouse_location_id']" :clearable="true" :data="$vuexData.x.location"></Page>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center" prop="order_quantity" header-align="center"> </el-table-column>
      <el-table-column label="当前库存" align="center" prop="storage_quantity" header-align="center" width="100"></el-table-column>
      <el-table-column label="出库数量" align="center" header-align="center" width="100">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row['product_number']"
            placeholder=""
            @change="numberChange(scope.row)"
            v-focuss="{
              index: scope.$index,
              name: 'product_number',
              arr: focussArr
            }"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备次" align="center" prop="sparetime" header-align="center" width="100"> </el-table-column>
      <el-table-column label="备次率(%)" align="center" header-align="center" width="100">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row['sparetime_percent']"
            placeholder=""
            @change="percentChange(scope.row)"
            v-focuss="{
              index: scope.$index,
              name: 'sparetime_percent',
              arr: focussArr
            }"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="产品单价" align="center" header-align="center" prop="price" width="100">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row['price']"
            placeholder=""
            @change="numChange(scope.row, 'price')"
            v-focuss="{
              index: scope.$index,
              name: 'price',
              arr: focussArr
            }"
          ></el-input
        ></template>
      </el-table-column>
      <el-table-column label="备注" align="center" header-align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row['note']"
            placeholder=""
            v-focuss="{
              index: scope.$index,
              name: 'note',
              arr: focussArr
            }"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="80" v-if="!finance">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="del(scope.$index)" class="mr-3"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddDialog :dialogVisibl="dialogShow" @cancel="dialogShow = false" @save="dialogSave" />
  </div>
</template>

<script>
import AddDialog from '@/components/OutDepot/AddDialog';
export default {
  name: 'add',
  props: {},
  components: {
    AddDialog
  },
  data: () => {
    return {
      focussArr: ['product_number', 'sparetime_percent', 'price', 'note'],
      panelType: false,
      finance: 0, // 是否是财务审核
      dialogShow: false,
      tableData: [],
      editId: 0,
      arr: [
        //  { label: "下单客户", model: "", placeholder: "", id: "customer_id", type: "select", data: [] },
        // { label: "配货员", model: "", placeholder: "", id: "delivery_member_id", type: "select", data: [] },
        // { label: "检验员", model: "", placeholder: "", id: "check_member_id", type: "select", data: [] },
        // { label: "跟单员", model: "", placeholder: "", id: "tracking_member_id", type: "select", data: [] },
        // { label: "业务员", model: "", placeholder: "", id: "saler_id", type: "select", data: [] },
        // { label: "发货日期", model: moment().format("YYYY-MM-DD"), placeholder: "", id: "delivery_date", type: "date", data: [] },
        // { label: "放单方式", model: "", placeholder: "", id: "fangdanfangshi", type: "select", data: [] },
        // { label: "付费方式", model: "", placeholder: "", id: "fufeifangshi", type: "select", data: [] },
        // { label: "货运方式", model: "", placeholder: "", id: "huoyunfangshi", type: "select", data: [] },
        // { label: "特殊要求", model: "", placeholder: "", id: "spec_note" },
        // { label: "收货单位", model: "", placeholder: "", id: "contact_company" },
        // { label: "收货人", model: "", placeholder: "", id: "contact_name" },
        // { label: "联系方式", model: "", placeholder: "收货人联系方式", id: "contact_way" },
        // { label: "收货地址", model: "", placeholder: "", id: "delivery_address", class: "w-40" },
        // { label: "发货单位", model: "", placeholder: "", id: "delivery_company" },
        // { label: "发货人", model: "", placeholder: "", id: "signment_member_id", type: "select", data: [] },
        // { label: "联系方式", model: "", placeholder: "发货人联系方式", id: "delivery_contact_way" },
        // { label: "发货地址", model: "源艺自由贸易展示区", placeholder: "", id: "delivery_from", class: "w-40" },
        // { label: "备注说明", model: "", placeholder: "", id: "desc_note", class: "w-60" },
        // { label: "发货单号", model: "", placeholder: "", id: "outbound_task_serial" },
        // { label: "运单号码", model: "", placeholder: "", id: "delivery_serial" },
        // siji : 司机
        { label: '下单客户', model: '', placeholder: '', id: 'customer_id', type: 'page', data: [], clearable: false },
        { label: '发货日期', model: '', placeholder: '', id: 'delivery_date', type: 'date', data: [] },
        { label: '发货单号', model: '', placeholder: '', id: 'outbound_task_serial' },
        { label: '运单号码', model: '', placeholder: '', id: 'delivery_serial' },

        { label: '收货单位', model: '', placeholder: '', id: 'contact_company' },
        { label: '发货单位', model: '', placeholder: '', id: 'delivery_company' },
        { label: '货运方式', model: '', placeholder: '', id: 'huoyunfangshi', type: 'select', data: [] },
        { label: '检验员', model: '', placeholder: '', id: 'check_member_id', type: 'select', data: [] }, // 7

        { label: '收货人', model: '', placeholder: '', id: 'contact_name' },
        { label: '发货人', model: '', placeholder: '', id: 'signment_member_id', type: 'select', data: [] }, // 9
        { label: '放单方式', model: '', placeholder: '', id: 'fangdanfangshi', type: 'select', data: [] },
        { label: '业务员', model: '', placeholder: '', id: 'saler_id', type: 'select', data: [] }, // 11

        { label: '联系方式', model: '', placeholder: '收货人联系方式', id: 'contact_way' },
        { label: '联系方式', model: '', placeholder: '发货人联系方式', id: 'delivery_contact_way' },
        { label: '付费方式', model: '', placeholder: '', id: 'fufeifangshi', type: 'select', data: [] },
        { label: '跟单员', model: '', placeholder: '', id: 'tracking_member_id', type: 'select', data: [] }, // 15

        { label: '收货地址', model: '', placeholder: '', id: 'delivery_address' },
        { label: '发货地址', model: '', placeholder: '', id: 'delivery_from' },
        { label: '特殊要求', model: '', placeholder: '', id: 'spec_note' },
        { label: '配货员', model: '', placeholder: '', id: 'delivery_member_id', type: 'select', data: [] }, // 19

        { label: '备注说明', model: '', placeholder: '', id: 'desc_note', class: 'w-100' }
      ]
    };
  },
  methods: {
    async init() {
      this.arr.map(r => {
        r.model = '';
      });
      let x = this.$vuexData.x;
      this.arr[0].data = x.customer;
      this.arr[0].model = x.customer[0].id;

      this.arr[10].data = x.fangdanfangshi;
      this.arr[14].data = x.fufeifangshi;
      this.arr[6].data = x.huoyunfangshi;
      [19, 7, 15, 11, 9].map(r => {
        this.arr[r].data = x.member;
      });
      await this.custChange({ model: x.customer[0].id, id: 'customer_id' });
      this.arr[1].model = moment().format('YYYY-MM-DD');
      this.tableData = [];
      this.arr[17].model = '常熟市尚湖镇练塘颜巷工业园';
    },
    changeDialog() {
      this.dialogShow = true;
      this.$bus.$emit('AddOutDepot', this.arr[0].model);
    },
    // 选择出库产品得出的数据
    dialogSave(val) {
      this.tableData = this.tableData.concat(val);
    },
    numberChange(val) {
      val.product_number = parseInt(val.product_number) || 0;
      val.sparetime = Math.ceil((val.product_number * val.sparetime_percent) / 100) || 0;
    },
    percentChange(val) {
      val.sparetime_percent = Number(val.sparetime_percent) || 0;
      val.sparetime = Math.ceil((val.product_number * val.sparetime_percent) / 100) || 0;
    },
    numChange(val, type) {
      val[type] = Number(Number(val[type]).toFixed(3) || 0);
    },
    del(val) {
      this.tableData.splice(val, 1);
    },
    async custChange(val) {
      if (val.id !== 'customer_id') return;
      this.arr[4].model = this.$vuexData.x.customer.filter(r => r.id === val.model)[0].name;
      let res = await this.$post('outbound_tasks/switch_customer', {
        customer_id: val.model
      });
      let data = res.data.data;
      this.arr[15].model = data.tracking_member_id; // 跟单员
      this.arr[11].model = data.saler_member_id; // 业务员
      this.arr[5].model = data.delivery_company || '源艺包装'; // 发货单位
      this.arr[9].model = data.signment_member_id; // 发货人
      this.arr[13].model = data.delivery_contact_way; // 联系方式
    },
    async save() {
      let outbound_task = {};
      this.arr.map(r => {
        outbound_task[r.id] = r.model;
      });
      // 日期单独处理一下
      outbound_task.delivery_date = moment(outbound_task.delivery_date).format('YYYY-MM-DD');
      let arr = this.tableData.map(r => {
        return {
          ...{
            inbound_warehouse_id: null,
            warehouse_location_id: null,
            storage_quantity: null,
            product_number: null,
            sparetime: null,
            sparetime_percent: null,
            note: null
          },
          ...r
        };
      });
      let obj = {};
      arr.map((r, i) => {
        r.id = this.editId ? r.id : '';
        obj[i] = r;
      });
      let params = {
        outbound_task,
        products: obj
      };
      if (this.editId) params.id = this.editId;
      if (this.finance) {
        params.status = 2;
        let update = await this.$post(`outbound_tasks/${this.editId ? 'for_update' : 'for_create'}`, params);
        let res = await this.$post(`outbound_tasks/finacal_audit`, { id: this.editId });
        this.$notify({
          title: '提示',
          type: 'success',
          message: `财务审核成功！`
        });
        this.cancel();
        return;
      }
      let res = await this.$post(`outbound_tasks/${this.editId ? 'for_update' : 'for_create'}`, params);
      this.$notify({
        title: '提示',
        type: 'success',
        message: `${this.editId ? '修改' : '创建'}成功！`
      });
      if (this.editId) {
        this.$emit('detail', { id: this.editId });
        return;
      }
      this.cancel();
    },
    cancel(type) {
      this.$emit('cancel', type);
    },
    async getSerial() {
      let res = await this.$post(`outbound_tasks/for_new`);
      this.arr[2].model = res.data.data.outbound_task.outbound_task_serial;
    }
  },
  beforeDestroy() {
    this.$bus.$off('panelShow');
  },
  mounted() {
    this.$bus.$on('panelShow', async res => {
      await this.init();
      if (res) {
        this.tableData = res.tableData;
        this.arr.map(r => {
          r.model = res.outbound_task[r.id];
        });
        this.editId = res.id;
        this.finance = res.type;
        this.panelType = true;
        if (!res.id) {
          this.getSerial();
          this.arr[1].model = moment().format('YYYY-MM-DD');
        }
      } else {
        this.panelType = true;
        this.getSerial();
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
