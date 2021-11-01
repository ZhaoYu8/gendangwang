(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Depot"],{1148:function(e,t,a){"use strict";var r=a("a691"),n=a("1d80");e.exports="".repeat||function(e){var t=String(n(this)),a="",i=r(e);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(a+=t);return a}},"408a":function(e,t,a){var r=a("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=r(e))throw TypeError("Incorrect invocation");return+e}},a3d0:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"p-10 box"},[a("Panel",{attrs:{arr:e.arr},on:{change:e.panelChange}},[a("el-col",{staticClass:"d-f-e",attrs:{span:18}},[a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)])],1),a("div",{staticClass:"pt-10 table"},[a("el-table",{ref:"firstTable",staticStyle:{width:"100%"},attrs:{"show-summary":!0,"summary-method":e.getSummaries,data:e.tableData,border:"",stripe:""}},e._l(e.tableHeader,(function(t,r){return a("el-table-column",{key:t.label+r,attrs:{"header-align":"center",label:t.label,width:t.width},scopedSlots:e._u([{key:"default",fn:function(r){return["update"===t.id&&1!==r.row.status?a("div",{staticClass:"d-f-s-a"},[a("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.change(r.row)}}},[e._v("确认")])],1):["input"===t.type?a("el-input",{directives:[{name:"focus",rawName:"v-focus"}],model:{value:r.row[t.id],callback:function(a){e.$set(r.row,t.id,a)},expression:"scope.row[item.id]"}}):"serial"===t.type?a("div",{staticClass:"t-c"},[e._v(e._s(r.$index+1))]):a("div",{staticClass:"t-c"},[e._v(e._s(r.row[t.id]))])]]}}],null,!0)})})),1)],1),a("el-pagination",{staticClass:"pagination mr-10",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:e.total,"page-size":20,"current-page":e.currentPage},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.currentChange}})],1)},n=[],i=(a("4de4"),a("4160"),a("d81d"),a("13d5"),a("b0c0"),a("b680"),a("159b"),a("5530")),o=(a("96cf"),a("1da1")),c={name:"depot",data:function(){return{arr:[{label:"客户",model:"",placeholder:"",type:"page",data:[],id:"customer_id"},{label:"销售",model:"",placeholder:"",type:"select",data:[],id:"saler_id"},{label:"跟单",model:"",placeholder:"",type:"select",data:[],id:"member_id"},{label:"分类",model:"",placeholder:"",type:"select",data:[],id:"confirm_type"},{label:"产品名称",model:"",placeholder:"",id:"product_name"},{label:"入库时间",model:"",placeholder:"",span:6,type:"daterange",id:"delivery_date_min"},{label:"收货人",model:"",placeholder:"",type:"page",data:[],id:"contact_name"},{label:"收货单位",model:"",placeholder:"",type:"page",data:[],id:"contact_company"},{label:"筛选内容",model:1,placeholder:"",type:"filter",span:6,id:"confirm_status",data:[{name:"全部",id:0},{name:"待确认",id:1},{name:"已确认",id:2}]}],tableData:[],tableHeader:[{label:"操作",id:"update",width:60},{label:"确认状态",id:"status_name",width:80},{label:"出库时间",id:"created_at",width:150},{label:"出库类型",id:"confirm_type"},{label:"销售",id:"saler_name"},{label:"负责人",id:"member_name"},{label:"客户名称",id:"customer_name",width:"240"},{label:"收货人",id:"contact_name"},{label:"收货单位",id:"contact_company"},{label:"订单编号",id:"order_serial"},{label:"产品名称",id:"product_name",width:"240"},{label:"产品编码",id:"product_serial"},{label:"出库数量",id:"delivery_number"},{label:"单价",id:"product_price"},{label:"库位",id:"location_name"}],currentPage:1,total:1}},computed:{num:function(){return this.tableData.map((function(e){return e.delivery_number})).reduce((function(e,t){return e+t}))},money:function(){return this.tableData.map((function(e){return e.delivery_number*e.product_price})).reduce((function(e,t){return e+t})).toFixed(2)}},methods:{panelChange:function(e){"confirm_status"===e.id&&this.query()},getSummaries:function(e){var t=this,a=e.columns,r=(e.data,[]);return this.tableData.length&&a.forEach((function(e,a){0!==a?"出库数量"===e.label?r[a]=t.num:"单价"===e.label?r[a]=t.money:r[a]="":r[a]="合计:"})),r},query:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(i["a"])(Object(i["a"])({},e.$common.querySql.call(e,e.arr)),{page:e.currentPage}),a.delivery_date_min&&(a.created_at_max=moment(a.delivery_date_min[1]).format("YYYY-MM-DD"),a.created_at_min=moment(a.delivery_date_min[0]).format("YYYY-MM-DD")),a.customer_id&&(a.customer_id=e.$vuexData.x.customer.filter((function(e){return e.id===a.customer_id}))[0].name),0===a.confirm_status&&delete a.confirm_status,t.next=6,e.$post("yuanyi_deliveries/list",a);case 6:r=t.sent,e.tableData=r.data.data.items.map((function(e){return Object(i["a"])(Object(i["a"])({},e),{money:(e.product_price*e.storage_number).toFixed(2)})})),e.total=r.data.data.paginate_meta.total_count;case 9:case"end":return t.stop()}}),t)})))()},currentChange:function(e){this.currentPage=e,this.query()},change:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$prompt("是否确认?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",inputValue:e.delivery_number}).then(function(){var a=Object(o["a"])(regeneratorRuntime.mark((function a(r){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=r.value,a.next=3,t.$post("yuanyi_deliveries/confirm",{id:e.id,number:n});case 3:a.sent,t.$common.notify(),t.query();case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(){})),a.abrupt("return");case 2:case"end":return a.stop()}}),a)})))()},init:function(){this.arr[0].data=this.$vuexData.x.customer,this.arr[1].data=this.$vuexData.x.member_options,this.arr[2].data=this.$vuexData.x.member_options,this.arr[3].data=[{id:0,name:"发货单"},{id:1,name:"送货单"}],this.arr[6].data=this.$vuexData.x.contact_name_options,this.arr[7].data=this.$vuexData.x.contact_company_options}},mounted:function(){var e=this;this.query(),this.init(),this.$bus.$on("user",(function(){e.init()}))}},l=c,u=a("0c7c"),d=Object(u["a"])(l,r,n,!1,null,"094c5c1e",null);t["default"]=d.exports},b680:function(e,t,a){"use strict";var r=a("23e7"),n=a("a691"),i=a("408a"),o=a("1148"),c=a("d039"),l=1..toFixed,u=Math.floor,d=function(e,t,a){return 0===t?a:t%2===1?d(e,t-1,a*e):d(e*e,t/2,a)},s=function(e){var t=0,a=e;while(a>=4096)t+=12,a/=4096;while(a>=2)t+=1,a/=2;return t},m=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){l.call({})}));r({target:"Number",proto:!0,forced:m},{toFixed:function(e){var t,a,r,c,l=i(this),m=n(e),p=[0,0,0,0,0,0],f="",h="0",b=function(e,t){var a=-1,r=t;while(++a<6)r+=e*p[a],p[a]=r%1e7,r=u(r/1e7)},_=function(e){var t=6,a=0;while(--t>=0)a+=p[t],p[t]=u(a/e),a=a%e*1e7},v=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==p[e]){var a=String(p[e]);t=""===t?a:t+o.call("0",7-a.length)+a}return t};if(m<0||m>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(f="-",l=-l),l>1e-21)if(t=s(l*d(2,69,1))-69,a=t<0?l*d(2,-t,1):l/d(2,t,1),a*=4503599627370496,t=52-t,t>0){b(0,a),r=m;while(r>=7)b(1e7,0),r-=7;b(d(10,r,1),0),r=t-1;while(r>=23)_(1<<23),r-=23;_(1<<r),b(1,1),_(2),h=v()}else b(0,a),b(1<<-t,0),h=v()+o.call("0",m);return m>0?(c=h.length,h=f+(c<=m?"0."+o.call("0",m-c)+h:h.slice(0,c-m)+"."+h.slice(c-m))):h=f+h,h}})}}]);