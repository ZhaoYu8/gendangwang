(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["depotDetail"],{"199b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"p-10 box"},[a("Panel",{attrs:{arr:e.arr}},[a("el-col",{staticClass:"d-f-e",attrs:{span:6}},[a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)])],1),a("div",{staticClass:"pt-10 table"},[a("el-table",{ref:"firstTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},e._l(e.tableHeader,(function(t,r){return a("el-table-column",{key:t.label+r,attrs:{"header-align":"center",align:t.align||"left",label:t.label,width:t.width},scopedSlots:e._u([{key:"default",fn:function(r){return["input"===t.type?a("el-input",{directives:[{name:"focus",rawName:"v-focus"}],model:{value:r.row[t.id],callback:function(a){e.$set(r.row,t.id,a)},expression:"scope.row[item.id]"}}):"serial"===t.type?a("div",{staticClass:"t-c"},[e._v(" "+e._s(r.$index+1)+" ")]):a("div",[e._v(e._s(r.row[t.id]))])]}}],null,!0)})})),1)],1),a("el-pagination",{staticClass:"pagination mr-10",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:e.total,"page-size":20,"current-page":e.currentPage},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.currentChange}})],1)},i=[],l=(a("4de4"),a("d81d"),a("b0c0"),a("b680"),a("d3b7"),a("ddb0"),a("5530")),n=(a("96cf"),a("1da1")),d={name:"depotDetail",data:function(){return{arr:[{label:"客户",model:"",placeholder:"",type:"page",data:[],id:"customer_id"},{label:"销售",model:"",placeholder:"",type:"select",data:[],id:"saler_id"},{label:"跟单",model:"",placeholder:"",type:"select",data:[],id:"member_id"},{label:"分类",model:"",placeholder:"",type:"select",data:[],id:"product_group",multiple:!0},{label:"关键字搜索",model:"",placeholder:"产品名称、收货单位、收货人",id:"product_name"},{label:"入库时间",model:"",placeholder:"",type:"daterange",span:6,id:"delivery_date_min"},{label:"出入库类型",model:"",placeholder:"",type:"select",data:[{name:"入库操作",id:"0"},{name:"出库操作",id:"1"},{name:"库存调整",id:"2"},{name:"库存分配",id:"3"},{name:"库存导入",id:"4"}],id:"history_source"}],tableData:[],tableHeader:[{label:"出入库类型",id:"history_source",width:90,align:"center"},{label:"销售",id:"saler_name"},{label:"跟单员",id:"member_name"},{label:"分类",id:"product_group"},{label:"客户名称",id:"customer_name"},{label:"产品名称",id:"product_name"},{label:"单价",id:"product_price",align:"right"},{label:"数量",id:"number_switch",align:"right"},{label:"金额",id:"money",align:"right"},{label:"更新时间/入库时间",id:"updated_at"},{label:"仓储库位",id:"location_name"}],currentPage:1,total:1}},methods:{query:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(l["a"])(Object(l["a"])({},e.$common.querySql.call(e,e.arr)),{page:e.currentPage}),a.delivery_date_min&&(a.created_at_max=moment(a.delivery_date_min[1]).format("YYYY-MM-DD"),a.created_at_min=moment(a.delivery_date_min[0]).format("YYYY-MM-DD")),a.customer_id&&(a.customer_id=e.$vuexData.x.customer.filter((function(e){return e.id===a.customer_id}))[0].name),t.next=5,e.$post("yuanyi_storage_histories/list",a);case 5:r=t.sent,e.tableData=r.data.data.entries.map((function(e){return Object(l["a"])(Object(l["a"])({},e),{money:(e.product_price*e.number_switch).toFixed(2)})})),e.total=r.data.data.paginate_meta.total_count;case 8:case"end":return t.stop()}}),t)})))()},currentChange:function(e){this.currentPage=e,this.query()}},mounted:function(){var e=this;this.query(),this.arr[0].data=this.$vuexData.x.customer,this.arr[3].data=this.$vuexData.x.group_options,this.arr[1].data=this.$vuexData.x.member_options,this.arr[2].data=this.$vuexData.x.member_options,this.$bus.$on("user",(function(){e.arr[0].data=e.$vuexData.x.customer,e.arr[3].data=e.$vuexData.x.group_options,e.arr[1].data=e.$vuexData.x.member_options,e.arr[2].data=e.$vuexData.x.member_options}))}},o=d,c=a("0c7c"),s=Object(c["a"])(o,r,i,!1,null,"7909a9e0",null);t["default"]=s.exports}}]);