(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["report"],{1148:function(e,t,r){"use strict";var a=r("a691"),n=r("1d80");e.exports="".repeat||function(e){var t=String(n(this)),r="",i=a(e);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(r+=t);return r}},"408a":function(e,t,r){var a=r("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=a(e))throw TypeError("Incorrect invocation");return+e}},"762c":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"p-10"},[r("div",{staticClass:"w-100 mb-10"},[r("el-card",[r("div",{staticClass:"d-f-c-s-b"},[r("el-radio-group",{on:{change:e.change},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[r("el-radio",{attrs:{label:"0"}},[e._v("明细表")]),r("el-radio",{attrs:{label:"1"}},[e._v("汇总表")])],1),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-link",{staticStyle:{"margin-right":"20px"},attrs:{underline:!1,type:"primary"},on:{click:function(t){e.fontSize--}}},[e._v("A-")]),r("el-link",{staticStyle:{"margin-right":"20px"},attrs:{underline:!1,type:"primary"},on:{click:function(t){e.fontSize++}}},[e._v("A+")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:"0"===e.model,expression:"model === '0'"}],staticClass:"ml-10",attrs:{type:"primary",plain:""},on:{click:e.query}},[e._v("查询")]),r("el-button",{ref:"daochu",attrs:{type:"primary"},on:{click:e.exports}},[e._v("导出")]),r("el-button",{directives:[{name:"print",rawName:"v-print",value:"#printMe",expression:"'#printMe'"}],ref:"printButton",attrs:{type:"primary"},on:{click:e.print}},[e._v("打印")])],1)],1),r("el-form",{staticClass:"d-f f-w mt-10",attrs:{"label-position":"left",inline:!0}},[r("el-row",{directives:[{name:"show",rawName:"v-show",value:"0"===e.model,expression:"model === '0'"}],staticClass:"w-100",attrs:{gutter:20}},[r("el-col",{attrs:{span:4}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"销售："}},[r("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.userData},model:{value:e.saler_id,callback:function(t){e.saler_id=t},expression:"saler_id"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"客户名称："}},[r("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.custData},model:{value:e.cust,callback:function(t){e.cust=t},expression:"cust"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"跟单员："}},[r("Page",{attrs:{placeholder:"请选择",clearable:!0,data:e.userData},model:{value:e.member_id,callback:function(t){e.member_id=t},expression:"member_id"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"产品名称："}},[r("el-input",{attrs:{placeholder:"请输入产品名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.query(t)}},model:{value:e.product_name,callback:function(t){e.product_name=t},expression:"product_name"}})],1)],1),r("el-col",{staticClass:"d-f-c",attrs:{span:6}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"分类："}},[r("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择",clearable:"",multiple:""},model:{value:e.product_group,callback:function(t){e.product_group=t},expression:"product_group"}},e._l(e.productGroupData,(function(e,t){return r("el-option",{key:e+t,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1)],1)],1)],1),r("div",{ref:"printMe",style:{fontSize:e.fontSize+"px"},attrs:{id:"printMe"}},[e.toggleType?e._e():e._l(Math.ceil(e.tableData.length/16),(function(t){return r("div",{key:"ss"+t,staticClass:"box"},[r("div",{staticClass:"header"},[e._v(" "+e._s("0"===e.model?"业务/车间月度库存表——明细":"业务/车间库存表"+e.date)+" ")]),r("table",{staticClass:"table",attrs:{border:"1",cellspacing:"0"}},[r("tr",{staticStyle:{"background-color":"#5491ff"}},e._l(e.headerArr,(function(t){return r("td",{key:t.label,style:{width:t.width}},[e._v(" "+e._s(t.label)+" ")])})),0),e._l(e.tableData.slice(16*(t-1),16*t),(function(a,n){return[n>0&&e.tableData[n-1].receiving_unit!==e.tableData[n].receiving_unit?r("tr",{key:a.product_name+n,staticStyle:{height:"10px"}}):e._e(),r("tr",{key:a.receiving_unit+n},e._l(e.headerArr,(function(i){return r("td",{key:i.id},[e._v(" "+e._s("index"!==i.id?a[i.id]:16*(t-1)+n+1)+" ")])})),0)]}))],2)])})),e.toggleType?[r("table",{staticClass:"table table1",attrs:{border:"1",cellspacing:"0"}},[r("tr",{staticStyle:{"background-color":"#5491ff"}},e._l(e.headerArr,(function(t){return r("td",{key:t.label,style:{width:t.width}},[e._v(" "+e._s(t.label)+" ")])})),0),e._l(e.tableData,(function(t,a){return[a>0&&e.tableData[a-1].receiving_unit!==e.tableData[a].receiving_unit?r("tr",{key:t.product_name+a,staticStyle:{height:"10px"}}):e._e(),r("tr",{key:t.receiving_unit+a},e._l(e.headerArr,(function(n){return r("td",{key:n.id},[e._v(" "+e._s("index"!==n.id?t[n.id]:a+1)+" ")])})),0)]}))],2)]:e._e()],2)])},n=[],i=(r("99af"),r("4de4"),r("4160"),r("d81d"),r("13d5"),r("fb6a"),r("c19f"),r("b0c0"),r("b680"),r("b64b"),r("d3b7"),r("3ca3"),r("5cc6"),r("9a8c"),r("a975"),r("735e"),r("c1ac"),r("d139"),r("3a7b"),r("d5d6"),r("82f8"),r("e91f"),r("60bd"),r("5f96"),r("3280"),r("3fcc"),r("ca91"),r("25a1"),r("cd26"),r("3c5d"),r("2954"),r("649e"),r("219c"),r("170b"),r("b39a"),r("72f7"),r("159b"),r("ddb0"),r("2b3d"),r("5530")),o=(r("96cf"),r("1da1")),l={name:"Dialog5",props:{},computed:{},data:function(){return{date:"",toggleType:!0,model:"0",saler_id:null,userData:[],cust:null,product_name:"",custData:[],fontSize:14,dialogVisible:!1,tableData:[],headerData:{},headerArr:[],productGroupData:[],product_group:null,member_id:null,arr:[{label:"序号",id:"index",width:"30px"},{label:"销售",id:"saler_name"},{label:"跟单员",id:"member_name"},{label:"分类",id:"product_group"},{label:"客户名称",id:"customer_name"},{label:"产品名称",id:"product_name"},{label:"单价",id:"product_price"},{label:"数量",id:"storage_number"},{label:"金额",id:"money"},{label:"入库日期",id:"updated_at"},{label:"仓储库位",id:"location_name"}]}},watch:{},mounted:function(){var e=this;this.headerArr=this.arr,this.custData=this.$vuexData.x.customer,this.userData=this.$vuexData.x.member_options,this.productGroupData=this.$vuexData.x.group_options,this.$bus.$on("user",(function(){e.custData=e.$vuexData.x.customer,e.productGroupData=e.$vuexData.x.group_options,e.userData=e.$vuexData.x.member_options})),this.query()},methods:{print:function(){var e=this;this.date=moment().format(" YYYY-MM-DD HH:mm:ss"),this.toggleType=!1,setTimeout((function(){e.toggleType=!0}))},change:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("0"!==e.model){t.next=5;break}e.query(),e.headerArr=e.arr,t.next=7;break;case 5:return t.next=7,e.query1();case 7:case"end":return t.stop()}}),t)})))()},query:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={is_report:1},e.cust&&(r.customer_id=e.$vuexData.x.customer.filter((function(t){return t.id===e.cust}))[0].name),a=["saler_id","product_group","member_id","product_name"],a.map((function(t){e[t]&&(r[t]=e[t])})),t.next=6,e.$post("yuanyi_storages/list",r);case 6:n=t.sent,e.tableData=n.data.data.entries.map((function(e){return Object(i["a"])(Object(i["a"])({},e),{money:(e.product_price*e.storage_number).toFixed(2),updated_at:moment(e.updated_at).format("YYYY-MM-DD")})}));case 8:case"end":return t.stop()}}),t)})))()},query1:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$post("yuanyi_storages/saler_inventory",{is_report:1});case 2:r=t.sent,e.headerArr=r.data.data.headers.map((function(e){return{label:e.name,id:e.id}})),e.tableData=r.data.data.items.map((function(t){var r={};return e.headerArr.map((function(e){r[e.id]="number"===typeof t[e.id]?t[e.id].toFixed(3):t[e.id]})),r}));case 5:case"end":return t.stop()}}),t)})))()},exports:function(){var e=this,t="用户统计2020-01-10-2020-01-12",r={bookType:"xlsx",bookSST:!0,type:"binary",cellStyles:!0},a=JSON.parse(JSON.stringify(this.tableData)),n=[];a.map((function(t,r){n[r]={},e.headerArr.map((function(e){n[r][e.label]="index"===e.id?r+1:t[e.id]}))})),this.downloadExl(n,r,t)},saveAs:function(e,t){var r=document.createElement("a");r.download=t||"未命名","msSaveOrOpenBlob"in navigator?window.navigator.msSaveOrOpenBlob(e,"下载的文件名.xlsx"):r.href=URL.createObjectURL(e),r.click(),setTimeout((function(){URL.revokeObjectURL(e)}),100)},downloadExl:function(e,t,r){var a=this,n=e[0];e.unshift({});var i=[];for(var o in n)i.push(o),e[0][o]=o;n=[];var l=e.map((function(e,t){var r=i.map((function(r,n){return Object.assign({},{v:e[r],position:(n>25?a.getCharCol(n):String.fromCharCode(65+n))+(t+1)})}));return r}));this.headerData;l.reduce((function(e,t){return e.concat(t)})).forEach((function(e,t){return n[e.position]={v:e.v}}));var s=Object.keys(n),c=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];c=c.slice(0,this.headerArr.length),c.map((function(e){n["".concat(e,"1")].s={font:{sz:14,bold:!0,vertAlign:!0},alignment:{vertical:"center",horizontal:"center"},fill:{bgColor:{rgb:"5491ff"},fgColor:{rgb:"5491ff"}}}})),n["!cols"]=[{wpx:50},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:130},{wpx:100},{wpx:130}];var u={SheetNames:["mySheet"],Sheets:{mySheet:Object.assign({},n,{"!ref":s[0]+":"+s[s.length-1]})}},d=new Blob([this.s2ab(XLSX.write(u,{bookType:void 0==t?"xlsx":t.bookType,bookSST:!1,type:"binary"}))],{type:""});this.saveAs(d,"".concat(new Date)+"."+("biff2"==t.bookType?"xls":t.bookType))},getCharCol:function(e){var t="",r=0;while(e>0)r=e%26+1,t=String.fromCharCode(r+64)+t,e=(e-r)/26;return t},s2ab:function(e){if("undefined"!==typeof ArrayBuffer){for(var t=new ArrayBuffer(e.length),r=new Uint8Array(t),a=0;a!=e.length;++a)r[a]=255&e.charCodeAt(a);return t}for(var n=new Array(e.length),i=0;i!=e.length;++i)n[i]=255&e.charCodeAt(i);return n}}},s=l,c=(r("a8bd"),r("0c7c")),u=Object(c["a"])(s,a,n,!1,null,"0b8a70ba",null);t["default"]=u.exports},a8bd:function(e,t,r){"use strict";var a=r("c960"),n=r.n(a);n.a},b680:function(e,t,r){"use strict";var a=r("23e7"),n=r("a691"),i=r("408a"),o=r("1148"),l=r("d039"),s=1..toFixed,c=Math.floor,u=function(e,t,r){return 0===t?r:t%2===1?u(e,t-1,r*e):u(e*e,t/2,r)},d=function(e){var t=0,r=e;while(r>=4096)t+=12,r/=4096;while(r>=2)t+=1,r/=2;return t},p=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){s.call({})}));a({target:"Number",proto:!0,forced:p},{toFixed:function(e){var t,r,a,l,s=i(this),p=n(e),f=[0,0,0,0,0,0],m="",b="0",h=function(e,t){var r=-1,a=t;while(++r<6)a+=e*f[r],f[r]=a%1e7,a=c(a/1e7)},v=function(e){var t=6,r=0;while(--t>=0)r+=f[t],f[t]=c(r/e),r=r%e*1e7},g=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==f[e]){var r=String(f[e]);t=""===t?r:t+o.call("0",7-r.length)+r}return t};if(p<0||p>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(m="-",s=-s),s>1e-21)if(t=d(s*u(2,69,1))-69,r=t<0?s*u(2,-t,1):s/u(2,t,1),r*=4503599627370496,t=52-t,t>0){h(0,r),a=p;while(a>=7)h(1e7,0),a-=7;h(u(10,a,1),0),a=t-1;while(a>=23)v(1<<23),a-=23;v(1<<a),h(1,1),v(2),b=g()}else h(0,r),h(1<<-t,0),b=g()+o.call("0",p);return p>0?(l=b.length,b=m+(l<=p?"0."+o.call("0",p-l)+b:b.slice(0,l-p)+"."+b.slice(l-p))):b=m+b,b}})},c960:function(e,t,r){}}]);