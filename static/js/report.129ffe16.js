(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["report"],{6778:function(e,t,a){},"762c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"p-10"},[a("div",{staticClass:"w-100 mb-10"},[a("el-card",[a("div",{staticClass:"d-f-c-s-b"},[a("el-radio-group",{on:{change:e.change},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[a("el-radio",{attrs:{label:"0"}},[e._v("明细表")]),a("el-radio",{attrs:{label:"1"}},[e._v("汇总表")])],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-link",{staticStyle:{"margin-right":"20px"},attrs:{underline:!1,type:"primary"},on:{click:function(t){e.fontSize--}}},[e._v("A-")]),a("el-link",{staticStyle:{"margin-right":"20px"},attrs:{underline:!1,type:"primary"},on:{click:function(t){e.fontSize++}}},[e._v("A+")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:"0"===e.model,expression:"model === '0'"}],staticClass:"ml-10",attrs:{type:"primary",plain:""},on:{click:e.query}},[e._v("查询")]),a("el-button",{ref:"daochu",attrs:{type:"primary"},on:{click:e.exports}},[e._v("导出")]),a("el-button",{directives:[{name:"print",rawName:"v-print",value:"#printMe",expression:"'#printMe'"}],ref:"printButton",attrs:{type:"primary"},on:{click:e.print}},[e._v("打印")])],1)],1),a("el-form",{staticClass:"d-f f-w mt-10",attrs:{"label-position":"left",inline:!0}},[a("el-row",{directives:[{name:"show",rawName:"v-show",value:"0"===e.model,expression:"model === '0'"}],staticClass:"w-100",attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"销售："}},[a("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.userData},model:{value:e.saler_id,callback:function(t){e.saler_id=t},expression:"saler_id"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"客户名称："}},[a("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.custData},model:{value:e.cust,callback:function(t){e.cust=t},expression:"cust"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"跟单员："}},[a("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.userData},model:{value:e.member_id,callback:function(t){e.member_id=t},expression:"member_id"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"产品名称："}},[a("el-input",{attrs:{placeholder:"请输入产品名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(t)}},model:{value:e.product_name,callback:function(t){e.product_name=t},expression:"product_name"}})],1)],1),a("el-col",{staticClass:"d-f-c",attrs:{span:6}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"分类："}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择",clearable:"",multiple:""},model:{value:e.product_group,callback:function(t){e.product_group=t},expression:"product_group"}},e._l(e.productGroupData,(function(e,t){return a("el-option",{key:e+t,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1)],1)],1)],1),a("div",{ref:"printMe",style:{fontSize:e.fontSize+"px"},attrs:{id:"printMe"}},[e.toggleType?e._e():e._l(Math.ceil(e.tableData.length/16),(function(t){return a("div",{key:"ss"+t,staticClass:"box"},[a("div",{staticClass:"header"},[e._v(" "+e._s("0"===e.model?"业务/车间月度库存表——明细":"业务/车间库存表"+e.date)+" ")]),a("table",{staticClass:"table",attrs:{border:"1",cellspacing:"0"}},[a("tr",{staticStyle:{"background-color":"#5491ff"}},e._l(e.headerArr,(function(t){return a("td",{key:t.label,style:{width:t.width}},[e._v(" "+e._s(t.label)+" ")])})),0),e._l(e.tableData.slice(16*(t-1),16*t),(function(r,n){return[n>0&&e.tableData[n-1].receiving_unit!==e.tableData[n].receiving_unit?a("tr",{key:r.product_name+n,staticStyle:{height:"10px"}}):e._e(),a("tr",{key:r.receiving_unit+n},e._l(e.headerArr,(function(i){return a("td",{key:i.id},[e._v(" "+e._s("index"!==i.id?r[i.id]:16*(t-1)+n+1)+" ")])})),0)]}))],2)])})),e.toggleType?[a("table",{staticClass:"table table1",attrs:{border:"1",cellspacing:"0"}},[a("tr",{staticStyle:{"background-color":"#5491ff"}},e._l(e.headerArr,(function(t){return a("td",{key:t.label,style:{width:t.width}},[e._v(" "+e._s(t.label)+" ")])})),0),e._l(e.tableData,(function(t,r){return[r>0&&e.tableData[r-1].receiving_unit!==e.tableData[r].receiving_unit?a("tr",{key:t.product_name+r,staticStyle:{height:"10px"}}):e._e(),a("tr",{key:t.receiving_unit+r},e._l(e.headerArr,(function(n){return a("td",{key:n.id},[e._v(" "+e._s("index"!==n.id?t[n.id]:r+1)+" ")])})),0)]}))],2)]:e._e()],2)])},n=[],i=(a("99af"),a("4de4"),a("4160"),a("d81d"),a("13d5"),a("fb6a"),a("c19f"),a("b0c0"),a("b680"),a("b64b"),a("d3b7"),a("3ca3"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("159b"),a("ddb0"),a("2b3d"),a("5530")),o=(a("96cf"),a("1da1")),l={name:"Dialog5",props:{},computed:{},data:function(){return{date:"",toggleType:!0,model:"0",saler_id:null,userData:[],cust:null,product_name:"",custData:[],fontSize:14,dialogVisible:!1,tableData:[],headerData:{},headerArr:[],productGroupData:[],product_group:null,member_id:null,arr:[{label:"序号",id:"index",width:"30px"},{label:"销售",id:"saler_name"},{label:"跟单员",id:"member_name"},{label:"分类",id:"product_group"},{label:"客户名称",id:"customer_name"},{label:"产品名称",id:"product_name"},{label:"产品编号",id:"product_serial"},{label:"单价",id:"product_price"},{label:"数量",id:"storage_number"},{label:"金额",id:"money"},{label:"入库日期",id:"updated_at"},{label:"仓储库位",id:"location_name"}]}},watch:{},mounted:function(){var e=this;this.headerArr=this.arr,this.custData=this.$vuexData.x.customer,this.userData=this.$vuexData.x.member_options,this.productGroupData=this.$vuexData.x.group_options,this.$bus.$on("user",(function(){e.custData=e.$vuexData.x.customer,e.productGroupData=e.$vuexData.x.group_options,e.userData=e.$vuexData.x.member_options})),this.query()},methods:{print:function(){var e=this;this.date=moment().format(" YYYY-MM-DD HH:mm:ss"),this.toggleType=!1,setTimeout((function(){e.toggleType=!0}))},change:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("0"!==e.model){t.next=5;break}e.query(),e.headerArr=e.arr,t.next=7;break;case 5:return t.next=7,e.query1();case 7:case"end":return t.stop()}}),t)})))()},query:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={is_report:1},e.cust&&(a.customer_id=e.$vuexData.x.customer.filter((function(t){return t.id===e.cust}))[0].name),r=["saler_id","product_group","member_id","product_name"],r.map((function(t){e[t]&&(a[t]=e[t])})),t.next=6,e.$post("yuanyi_storages/list",a);case 6:n=t.sent,e.tableData=n.data.data.entries.map((function(e){return Object(i["a"])(Object(i["a"])({},e),{money:(e.product_price*e.storage_number).toFixed(2),updated_at:moment(e.updated_at).format("YYYY-MM-DD")})}));case 8:case"end":return t.stop()}}),t)})))()},query1:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$post("yuanyi_storages/saler_inventory",{is_report:1});case 2:a=t.sent,e.headerArr=a.data.data.headers.map((function(e){return{label:e.name,id:e.id}})),e.tableData=a.data.data.items.map((function(t){var a={};return e.headerArr.map((function(e){a[e.id]="number"===typeof t[e.id]?t[e.id].toFixed(3):t[e.id]})),a}));case 5:case"end":return t.stop()}}),t)})))()},exports:function(){var e=this,t="用户统计2020-01-10-2020-01-12",a={bookType:"xlsx",bookSST:!0,type:"binary",cellStyles:!0},r=JSON.parse(JSON.stringify(this.tableData)),n=[];r.map((function(t,a){n[a]={},e.headerArr.map((function(e){n[a][e.label]="index"===e.id?a+1:t[e.id]}))})),this.downloadExl(n,a,t)},saveAs:function(e,t){var a=document.createElement("a");a.download=t||"未命名","msSaveOrOpenBlob"in navigator?window.navigator.msSaveOrOpenBlob(e,"下载的文件名.xlsx"):a.href=URL.createObjectURL(e),a.click(),setTimeout((function(){URL.revokeObjectURL(e)}),100)},downloadExl:function(e,t,a){var r=this,n=e[0];e.unshift({});var i=[];for(var o in n)i.push(o),e[0][o]=o;n=[];var l=e.map((function(e,t){var a=i.map((function(a,n){return Object.assign({},{v:e[a],position:(n>25?r.getCharCol(n):String.fromCharCode(65+n))+(t+1)})}));return a}));this.headerData;l.reduce((function(e,t){return e.concat(t)})).forEach((function(e,t){return n[e.position]={v:e.v}}));var s=Object.keys(n),c=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];c=c.slice(0,this.headerArr.length),c.map((function(e){n["".concat(e,"1")].s={font:{sz:14,bold:!0,vertAlign:!0},alignment:{vertical:"center",horizontal:"center"},fill:{bgColor:{rgb:"5491ff"},fgColor:{rgb:"5491ff"}}}})),n["!cols"]=[{wpx:50},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:100},{wpx:130}];var u={SheetNames:["mySheet"],Sheets:{mySheet:Object.assign({},n,{"!ref":s[0]+":"+s[s.length-1]})}},d=new Blob([this.s2ab(XLSX.write(u,{bookType:void 0==t?"xlsx":t.bookType,bookSST:!1,type:"binary"}))],{type:""});this.saveAs(d,"库存报表 ".concat(moment().format("YYYY-MM-DD"))+"."+("biff2"==t.bookType?"xls":t.bookType))},getCharCol:function(e){var t="",a=0;while(e>0)a=e%26+1,t=String.fromCharCode(a+64)+t,e=(e-a)/26;return t},s2ab:function(e){if("undefined"!==typeof ArrayBuffer){for(var t=new ArrayBuffer(e.length),a=new Uint8Array(t),r=0;r!=e.length;++r)a[r]=255&e.charCodeAt(r);return t}for(var n=new Array(e.length),i=0;i!=e.length;++i)n[i]=255&e.charCodeAt(i);return n}}},s=l,c=(a("ad76"),a("0c7c")),u=Object(c["a"])(s,r,n,!1,null,"30f99f2a",null);t["default"]=u.exports},ad76:function(e,t,a){"use strict";var r=a("6778"),n=a.n(r);n.a}}]);