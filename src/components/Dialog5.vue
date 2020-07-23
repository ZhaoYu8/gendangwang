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
      <table class="header-table">
        <tr>
          <td>送货日期:</td>
          <td>{{ headerData.delivery_date }}</td>
          <td>车号:</td>
          <td>{{ headerData.delivery_train }}</td>
          <td>司机:</td>
          <td>{{ headerData.delivery_member }}</td>
          <td>跟车:</td>
          <td>{{ headerData.with_member }}</td>
          <td>配货员:</td>
          <td>{{ headerData.allocate_member }}</td>
          <td>送货单号:</td>
          <td>{{ headerData.delivery_serial }}</td>
        </tr>
      </table>
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
      <table border="1" cellspacing="0" class="table">
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
      <el-button type="primary" ref="daochu" @click="downloadExl(jsono)">导出</el-button>
      <el-button type="primary" v-print="'#printMe'" ref="printButton">打印</el-button>
      <el-button @click="cancel(false)">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import XLSX from "xlsx-style";
export default {
  name: "Dialog5",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    detailData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    print: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data: () => {
    return {
      dialogVisible: false,
      tableData: [],
      headerData: {},
      labels: [],
      invoce_data: {},
      wopts: {
        bookType: "xlsx",
        bookSST: true,
        type: "binary",
        cellStyles: true,
      },
      jsono: [
        {
          "开发票申请单 V2.0": "所属事业部名称:",
          列头2: "合并2",
          列头3: "移动互联事业部",
          列头4: "合并",
          列头5: "部门编号:",
          列头6: 10002,
          列头7: "合并",
          列头8: "客户经理:",
          列头9: "张傲",
          列头10: "备注",
        },
        {
          "开发票申请单 V2.0": "序号",
          列头2: "发票抬头（客户公司）",
          列头3: "开票内容",
          列头4: "发票金额",
          列头5: "对应工作量月份",
          列头6: "预计回款时间",
          列头7: "对应项目名称",
          列头8: "发票类型",
          列头9: "税率",
          列头10: "备注",
        },
        {
          "开发票申请单 V2.0": "1",
          列头2: "上海蔚来汽车有限公司",
          列头3: "技术服务费",
          列头4: "",
          列头5: "",
          列头6: "",
          列头7: "",
          列头8: "",
          列头9: "",
          列头10: "",
        },
        {
          "开发票申请单 V2.0": "",
          列头2: "",
          列头3: "",
          列头4: "",
          列头5: "",
          列头6: "",
          列头7: "",
          列头8: "",
          列头9: "",
          列头10: "",
        },
      ],
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
        this.headerData = this.detailData.data.delivery_schedule;
        this.tableData = this.detailData.data.delivery_products;
        this.labels = this.detailData.labels;
      }
    },
    print(val) {
      if (val) {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.printButton.$el.click();
        });
      }
    },
  },
  methods: {
    // test() {
    //   /* 从表生成工作簿对象 */
    //   let wb = XLSX.utils.table_to_book(document.querySelector("#printMe"));
    //   console.log(wb);
    //   /* 获取二进制字符串作为输出 */
    //   let wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //     width: 150,
    //   });
    //   try {
    //     FileSaver.saveAs(
    //       //Blob 对象表示一个不可变、原始数据的类文件对象。
    //       //Blob 表示的不一定是JavaScript原生格式的数据。
    //       //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    //       //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       //设置导出文件名称
    //       `${new Date()}.xlsx`
    //     );
    //   } catch (e) {
    //     if (typeof console !== "undefined") console.log(e, wbout);
    //   }
    //   return wbout;
    // },
    // test() {
    //   //表格标题
    //   var dataTitle = "用户统计2020-01-10-2020-01-12";
    //   // 配置文件类型
    //   const wopts = {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "binary",
    //     cellStyles: true,
    //   };
    //   let data = JSON.parse(JSON.stringify(this.tableData));
    //   console.log(data);
    //   let arr = [];
    //   data.map((r, i) => {
    //     arr[i] = {};
    //     arr[i]["行号"] = i + 1;
    //     Object.keys(r).map((n) => {
    //       arr[i][this.labels[n]] = r[n];
    //     });
    //   });
    //   console.log(arr);
    //   this.downloadExl(arr, wopts, dataTitle);
    // },
    // // 下载功能
    // saveAs(obj, fileName) {
    //   var tmpa = document.createElement("a");
    //   tmpa.download = fileName || "未命名";
    //   // 兼容ie
    //   if ("msSaveOrOpenBlob" in navigator) {
    //     window.navigator.msSaveOrOpenBlob(obj, "下载的文件名" + ".xlsx");
    //   } else {
    //     tmpa.href = URL.createObjectURL(obj);
    //   }
    //   tmpa.click();
    //   setTimeout(function () {
    //     URL.revokeObjectURL(obj);
    //   }, 100);
    // },

    // downloadExl(json, type, dataTitle) {
    //   var tmpdata = json[0];
    //   json.unshift({});
    //   var keyMap = []; //获取keys
    //   for (var k in tmpdata) {
    //     keyMap.push(k);
    //     json[0][k] = k;
    //   }
    //   var tmpdata = []; //用来保存转换好的json
    //   json
    //     .map((v, i) => {
    //       let data = keyMap.map((k, j) => {
    //         // console.log(k,this.getCharCol(j));
    //         return Object.assign(
    //           {},
    //           {
    //             v: v[k],
    //             position:
    //               (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
    //               (i + 2),
    //           }
    //         );
    //       });
    //       return data;
    //     })
    //     .reduce((prev, next) => prev.concat(next))
    //     .forEach(
    //       (v, i) =>
    //         (tmpdata[v.position] = {
    //           v: v.v,
    //         })
    //     );
    //   var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    //   tmpdata["A1"] = { v: dataTitle };
    //   outputPos = ["A1"].concat(outputPos);
    //   tmpdata["A1"].s = {
    //     font: { sz: 14, bold: true, vertAlign: true },
    //     alignment: { vertical: "center", horizontal: "center" },
    //     fill: { bgColor: { rgb: "E8E8E8" }, fgColor: { rgb: "E8E8E8" } },
    //   }; //<====设置xlsx单元格样式
    //   tmpdata["!merges"] = [
    //     {
    //       s: { c: 0, r: 0 },
    //       e: { c: 3, r: 0 },
    //     },
    //   ]; //<====合并单元格

    //   tmpdata["!cols"] = [
    //     { wpx: 50 },
    //     { wpx: 100 },
    //     { wpx: 100 },
    //     { wpx: 200 },
    //     { wpx: 200 },
    //     { wpx: 80 },
    //     { wpx: 80 },
    //     { wpx: 80 },
    //     { wpx: 150 },
    //     { wpx: 300 },
    //     { wpx: 100 },
    //     { wpx: 200 },
    //   ]; //<====设置一列宽度

    //   var tmpWB = {
    //     SheetNames: ["mySheet"], //保存的表标题
    //     Sheets: {
    //       mySheet: Object.assign(
    //         {},
    //         tmpdata, //内容
    //         {
    //           "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
    //         }
    //       ),
    //     },
    //   };
    //   var tmpDown = new Blob(
    //     [
    //       this.s2ab(
    //         XLSX.write(
    //           tmpWB,
    //           {
    //             bookType: type == undefined ? "xlsx" : type.bookType,
    //             bookSST: false,
    //             type: "binary",
    //           } //这里的数据是用来定义导出的格式类型
    //         )
    //       ),
    //     ],
    //     {
    //       type: "",
    //     }
    //   );
    //   this.saveAs(
    //     tmpDown,
    //     "下载的文件名" +
    //       "." +
    //       (type.bookType == "biff2" ? "xls" : type.bookType)
    //   );
    // },
    // // 获取26个英文字母用来表示excel的列
    // getCharCol(n) {
    //   let temCol = "",
    //     s = "",
    //     m = 0;
    //   while (n > 0) {
    //     m = (n % 26) + 1;
    //     s = String.fromCharCode(m + 64) + s;
    //     n = (n - m) / 26;
    //   }
    //   return s;
    // },
    // s2ab(s) {
    //   if (typeof ArrayBuffer !== "undefined") {
    //     var buf = new ArrayBuffer(s.length);
    //     var view = new Uint8Array(buf);
    //     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    //     return buf;
    //   } else {
    //     var buf = new Array(s.length);
    //     for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    //     return buf;
    //   }
    // },
    saveAs(obj, fileName) {
      var tmpa = document.createElement("a");
      tmpa.download = fileName || "下载";
      tmpa.href = URL.createObjectURL(obj);
      tmpa.click();
      setTimeout(function () {
        URL.revokeObjectURL(obj);
      }, 100);
    },
    downloadExl(json, type) {
      var tmpdata = json[0];
      json.unshift({});
      var keyMap = []; //获取keys
      for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
      }
      var tmpdata = []; //用来保存转换好的json
      json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1),
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(
          (v, i) =>
            (tmpdata[v.position] = {
              v: v.v,
            })
        );
      var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
      tmpdata["!merges"] = [
        {
          s: { c: 0, r: 0 }, //开始 A1
          e: { c: 9, r: 0 }, //结束F1
        },
        {
          s: { c: 0, r: 1 }, //开始 A2
          e: { c: 1, r: 1 }, //结束B2
        },
        {
          s: { c: 2, r: 1 }, //开始 C2
          e: { c: 3, r: 1 }, //结束D2
        },
        {
          s: { c: 5, r: 1 }, //开始 F2
          e: { c: 6, r: 1 },
        },
        {
          s: { c: 8, r: 1 }, //开始 I2
          e: { c: 9, r: 1 },
        },
        {
          s: { c: 0, r: 5 }, //第六行
          e: { c: 1, r: 5 },
        },
        {
          s: { c: 2, r: 5 }, //第六行
          e: { c: 6, r: 5 },
        },
        {
          s: { c: 0, r: 6 }, //第七行
          e: { c: 1, r: 6 },
        },
        {
          s: { c: 2, r: 6 }, //第七行
          e: { c: 6, r: 6 },
        },
        {
          s: { c: 0, r: 7 }, //第八行
          e: { c: 1, r: 7 },
        },
        {
          s: { c: 2, r: 7 }, //第八行
          e: { c: 6, r: 7 },
        },
        {
          s: { c: 0, r: 8 }, //第九行
          e: { c: 1, r: 8 },
        },
        {
          s: { c: 2, r: 8 }, //第九行
          e: { c: 6, r: 8 },
        },
      ]; //合并单元格
      //        边框样式
      let border = {
        bottom: { style: "thin", color: { rgb: "000000" } },
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      };
      //加粗
      let style0 = {
        border: border,
        alignment: { horizontal: "center", wrapText: true, vertical: "center" },
        font: { sz: 18, bold: true, color: { rgb: "000000" }, outline: true },
      };
      let style1 = {
        border: border,
        alignment: { horizontal: "center", wrapText: true, vertical: "center" },
        font: { sz: 12, bold: true, color: { rgb: "000000" }, outline: true },
      };
      //不加粗
      let style2 = {
        border: border,
        alignment: { horizontal: "center", wrapText: true, vertical: "center" },
        font: { sz: 12, color: { rgb: "000000" }, outline: true },
      };
      //蓝底加粗
      let style3 = {
        border: border,
        alignment: { horizontal: "center", wrapText: true, vertical: "center" },
        font: { sz: 12, bold: true, color: { rgb: "000000" }, outline: true },
        fill: { fgColor: { rgb: "00BFFF" } },
      };
      //        第一二行样式
      tmpdata["A1"].s = style0;
      tmpdata["A2"].s = style1;
      tmpdata["B2"].s = style2;
      tmpdata["C2"].s = style2;
      tmpdata["D2"].s = style2;
      tmpdata["E2"].s = style1;
      tmpdata["F2"].s = style2;
      tmpdata["G2"].s = style2;
      tmpdata["H2"].s = style1;
      tmpdata["I2"].s = style2;
      tmpdata["J2"].s = style2;
      //第三行样式
      tmpdata["A3"].s = style3;
      tmpdata["B3"].s = style3;
      tmpdata["C3"].s = style3;
      tmpdata["D3"].s = style3;
      tmpdata["E3"].s = style3;
      tmpdata["F3"].s = style3;
      tmpdata["G3"].s = style3;
      tmpdata["H3"].s = style3;
      tmpdata["I3"].s = style3;
      tmpdata["J3"].s = style3;
      //  第四行样式
      tmpdata["A4"].s = style2;
      tmpdata["B4"].s = style2;
      tmpdata["C4"].s = style2;
      tmpdata["D4"].s = style2;
      tmpdata["E4"].s = style2;
      tmpdata["F4"].s = style2;
      tmpdata["G4"].s = style2;
      tmpdata["H4"].s = style2;
      tmpdata["I4"].s = style2;
      tmpdata["J4"].s = style2;
      //剩余行样式

      tmpdata["!cols"] = [
        //设置列宽度
        { wpx: 50 }, //序号
        { wpx: 180 }, //发票抬头
        { wpx: 100 }, //开票内容
        { wpx: 100 }, //发票金额
        { wpx: 90 }, //对应工作量月份
        { wpx: 100 }, //预计回款时间
        { wpx: 100 }, //对应项目名称
        { wpx: 128 }, //发票类型
        { wpx: 100 }, //税率
        { wpx: 150 }, //备注
      ];
      var tmpWB = {
        SheetNames: ["发票申请单"], //保存的表标题
        Sheets: {
          发票申请单: Object.assign(
            {},
            tmpdata, //内容
            {
              "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
            }
          ),
        },
      };
      var tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type == undefined ? "xlsx" : type,
                bookSST: false,
                type: "binary",
              } //这里的数据是用来定义导出的格式类型
            )
          ),
        ],
        {
          type: "",
        }
      );
      this.saveAs(
        tmpDown,
        this.invoce_data.project_name +
          "." +
          (this.wopts.bookType == "biff2" ? "xls" : this.wopts.bookType)
      );
    },
    getCharCol(n) {
      (s = ""), (m = 0);
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefined") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
    cancel(type = false) {
      this.$emit("cancel", type);
      this.dialogVisible = false;
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
