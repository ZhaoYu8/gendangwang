(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["outDepot"],{5288:function(t,e,a){},"75a4":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"outdepot box"},[a("Panel",{attrs:{arr:t.arr}},[a("el-col",{staticClass:"d-f-e",attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("查询")]),a("el-button",{attrs:{type:"warning"},on:{click:t.panelChange}},[t._v("新增")])],1)],1),a("div",{staticClass:"pt-10 table"},[a("el-table",{ref:"firstTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},t._l(t.tableHeader,(function(e,i){return a("el-table-column",{key:e.label+i,attrs:{"header-align":"center",label:e.label,width:e.width},scopedSlots:t._u([{key:"default",fn:function(i){return["outbound_task_serial"===e.id?["outbound_task_serial"===e.id?a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.detailChange(i.row)}}},[t._v(t._s(i.row[e.id]))]):t._e()]:["input"===e.type?a("el-input",{directives:[{name:"focus",rawName:"v-focus"}],model:{value:i.row[e.id],callback:function(a){t.$set(i.row,e.id,a)},expression:"scope.row[item.id]"}}):"serial"===e.type?a("div",{staticClass:"t-c"},[t._v(t._s(i.$index+1))]):a("div",[t._v(t._s(i.row[e.id]))])]]}}],null,!0)})})),1)],1),a("el-pagination",{staticClass:"pagination mr-10",attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total,"page-size":20,"current-page":t.currentPage},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.currentChange}}),a("el-dialog",{staticClass:"dialog",attrs:{title:"",visible:t.dialogVisible,width:"95%",top:"5vh","close-on-click-modal":!1},on:{close:function(e){t.dialogVisible=!1}}},[t.addOrDeatil?a("AddOutDepot",{on:{cancel:t.cancel,detail:t.detail}}):t._e(),t.addOrDeatil?t._e():a("DetailOutDepot",{attrs:{detailData:t.detailData},on:{update:t.update,cancel:t.cancel}})],1)],1)},l=[],n=(a("d81d"),a("5530")),r=(a("96cf"),a("1da1")),d=a("55a1"),o=a("0820"),s={name:"outDepot",data:function(){return{detailData:{},dialogVisible:!1,addOrDeatil:!0,currentPage:1,total:1,arr:[{label:"仓库",model:"",placeholder:"",type:"select",data:[],id:"inbound_warehouse_id"},{label:"仓位",model:"",placeholder:"",type:"page",data:[],id:"warehouse_location_id"},{label:"客户",model:"",placeholder:"",type:"page",data:[],id:"customer_id"},{label:"销售",model:"",placeholder:"",type:"select",data:[],id:"saler_id"},{label:"负责人",model:"",placeholder:"",type:"select",data:[],id:"member_id"},{label:"发货时间",model:"",placeholder:"",type:"daterange",span:8,id:"delivery_date_min"},{label:"关键字",model:"",placeholder:"订单编号/产品名称/收货人/收货单位",id:"query_key"}],tableData:[],tableHeader:[{label:"序号",id:"id",width:70,type:"serial"},{label:"发货时间",id:"delivery_date"},{label:"收货人",id:"contact_name"},{label:"收货单位",id:"contact_company"},{label:"客户",id:"customer_name"},{label:"出库单号",id:"outbound_task_serial"},{label:"发货总数",id:"outbound_number"},{label:"当前状态",id:"status_name"},{label:"更新时间",id:"updated_at"},{label:"最后操作人",id:"updator"}]}},components:{AddOutDepot:d["a"],DetailOutDepot:o["a"]},methods:{detail:function(t){var e=this;this.addOrDeatil=!1,this.$nextTick((function(){e.$bus.$emit("detailShow",t)}))},update:function(t){var e=this;this.addOrDeatil=!0,this.$nextTick((function(){e.$bus.$emit("panelShow",t)}))},cancel:function(t){this.dialogVisible=!1,t||this.query()},detailChange:function(t){var e=this;this.detailData=t,this.dialogVisible=!0,this.addOrDeatil=!1,this.$nextTick((function(){e.$bus.$emit("detailShow",t)}))},panelChange:function(){var t=this;this.addOrDeatil=this.dialogVisible=!0,this.$nextTick((function(){t.$bus.$emit("panelShow")}))},query:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=Object(n["a"])(Object(n["a"])({},t.$common.querySql.call(t,t.arr)),{page:t.currentPage}),a.delivery_date_min&&(a.delivery_date_max=moment(a.delivery_date_min[1]).format("YYYY-MM-DD"),a.delivery_date_min=moment(a.delivery_date_min[0]).format("YYYY-MM-DD")),e.next=4,t.$post("outbound_tasks/list",a);case 4:i=e.sent,t.tableData=i.data.data.items,t.total=i.data.data.paginate_meta.total_count;case 7:case"end":return e.stop()}}),e)})))()},currentChange:function(t){this.currentPage=t,this.query()},init:function(){var t=this,e=this.$vuexData.x;this.arr[0].data=e.warehouse,this.arr[1].data=e.location,this.arr[2].data=e.customer,[3,4].map((function(a){t.arr[a].data=e.member}))}},mounted:function(){var t=this;this.query(),this.init(),this.$bus.$on("user",(function(){t.init()}))}},c=s,u=(a("fb34"),a("0c7c")),p=Object(u["a"])(c,i,l,!1,null,"109e801a",null);e["default"]=p.exports},fb34:function(t,e,a){"use strict";var i=a("5288"),l=a.n(i);l.a}}]);