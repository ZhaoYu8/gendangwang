<template>
  <div class="p-10 ">
    <div class="d-f-c-s-b mb-10">
      <el-radio-group v-model="model" @change="change">
        <el-radio label="0">明细表</el-radio>
        <el-radio label="1">汇总表</el-radio>
      </el-radio-group>
      <div slot="footer">
        <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSize--">A-</el-link>
        <el-link :underline="false" type="primary" style="margin-right: 20px" @click="fontSize++">A+</el-link>
        <el-button type="primary" ref="daochu" @click="exports">导出</el-button>
        <el-button type="primary" v-print="'#printMe'" ref="printButton">打印</el-button>
      </div>
    </div>
    <!-- 头部查询条件 -->
    <div id="printMe" ref="printMe" :style="{ fontSize: fontSize + 'px' }">
      <table border="1" cellspacing="0" class="table">
        <tr style="background-color: #5491ff ">
          <td :style="{ width: item.width }" v-for="item in headerArr" :key="item.label">{{ item.label }}</td>
        </tr>
        <template v-for="(item, index) in tableData">
          <tr v-if="index > 0 && tableData[index - 1].receiving_unit !== tableData[index].receiving_unit" :key="item.product_name + index" style="height: 10px;"></tr>
          <tr :key="item.receiving_unit + index">
            <td v-for="n in headerArr" :key="n.id">{{ n.id !== 'index' ? item[n.id] : index + 1 }}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog5',
  props: {},
  computed: {},
  data: () => {
    return {
      model: '0',
      fontSize: 14,
      dialogVisible: false,
      tableData: [],
      headerData: {},
      headerArr: [],
      arr: [
        { label: '序号', width: '30px', id: 'index' },
        { label: '销售', id: 'saler_name' },
        { label: '跟单员', id: 'member_name' },
        { label: '分类', id: 'product_group' },
        { label: '客户名称', id: 'customer_name' },
        { label: '产品名称', id: 'product_name' },
        { label: '单价', id: 'product_price' },
        { label: '数量', id: 'storage_number' },
        { label: '金额', id: 'money' },
        { label: '入库日期', id: 'updated_at' },
        { label: '仓储库位', id: 'location_name' },
      ],
    };
  },
  watch: {},
  mounted() {
    this.headerArr = this.arr;
    this.query();
  },
  methods: {
    async change() {
      if (this.model === '0') {
        this.query();
        this.headerArr = this.arr;
      } else {
        await this.query1();
      }
    },
    async query() {
      let res = await this.$post('yuanyi_storages/list', {});
      this.tableData = res.data.data.entries.map((r) => {
        return { ...r, ...{ money: r.product_price * r.storage_number } };
      });
    },
    async query1() {
      let res = await this.$post('yuanyi_storages/saler_inventory', {});
      this.headerArr = res.data.data.headers.map((r) => {
        return { label: r.name, id: r.id };
      });
      this.tableData = res.data.data.items;
    },
    exports() {
      //表格标题
      let dataTitle = '用户统计2020-01-10-2020-01-12';
      // 配置文件类型
      const wopts = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary',
        cellStyles: true,
      };
      let data = JSON.parse(JSON.stringify(this.tableData));
      let arr = [];
      data.map((r, i) => {
        arr[i] = {};
        this.headerArr.map((n) => {
          arr[i][n.label] = n.id === 'index' ? i + 1 : r[n.id];
        });
      });
      this.downloadExl(arr, wopts, dataTitle);
    },
    // 下载功能
    saveAs(obj, fileName) {
      let tmpa = document.createElement('a');
      tmpa.download = fileName || '未命名';
      // 兼容ie
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(obj, '下载的文件名' + '.xlsx');
      } else {
        tmpa.href = URL.createObjectURL(obj);
      }
      tmpa.click();
      setTimeout(function() {
        URL.revokeObjectURL(obj);
      }, 100);
    },

    downloadExl(json, type, dataTitle) {
      let tmpdata = json[0];
      json.unshift({});
      let keyMap = []; //获取keys
      for (let k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
      }
      tmpdata = []; //用来保存转换好的json
      let arr = json.map((v, i) => {
        let data = keyMap.map((k, j) => {
          return Object.assign(
            {},
            {
              v: v[k],
              position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
            }
          );
        });
        return data;
      });
      let data = this.headerData;
      arr
        .reduce((prev, next) => prev.concat(next))
        .forEach(
          (v, i) =>
            (tmpdata[v.position] = {
              v: v.v,
            })
        );
      let outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
      // tmpdata["A1"] = { v: 1 };
      // outputPos = ["A1"].concat(outputPos);
      let _arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      _arr = this.model === '0' ? _arr : _arr.slice(0, this.headerArr.length);
      _arr.map((r) => {
        tmpdata[`${r}1`].s = {
          font: { sz: 14, bold: true, vertAlign: true },
          alignment: { vertical: 'center', horizontal: 'center' },
          fill: { bgColor: { rgb: '5491ff' }, fgColor: { rgb: '5491ff' } },
        };
      });

      tmpdata['!cols'] = [{ wpx: 50 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 100 }, { wpx: 130 }]; //<====设置一列宽度

      let tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, //内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], //设置填充区域
            }
          ),
        },
      };
      let tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type == undefined ? 'xlsx' : type.bookType,
                bookSST: false,
                type: 'binary',
              } //这里的数据是用来定义导出的格式类型
            )
          ),
        ],
        {
          type: '',
        }
      );
      this.saveAs(tmpDown, `${new Date()}` + '.' + (type.bookType == 'biff2' ? 'xls' : type.bookType));
    },
    // 获取26个英文字母用来表示excel的列
    getCharCol(n) {
      let temCol = '',
        s = '',
        m = 0;
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        let buf = new Array(s.length);
        for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#printMe {
  @media print {
    .table {
      tr:first-child {
        background: #5491ff !important;
        -webkit-print-color-adjust: exact;
      }
    }
  }
  color: #000;
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
    border: 1px solid #ddd;
    width: 100%;
    border-collapse: collapse;
    tr {
      th,
      td {
        padding: 8px;
        border: 1px solid #ddd;
      }
      &:first-child {
        td {
          white-space: nowrap;
        }
      }
    }
    tr:first-child {
      font-weight: bold;
      background-color: #5491ff;
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
  .header-table {
    width: 100%;
    tr {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
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
