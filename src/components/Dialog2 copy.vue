<template>
	<el-dialog title="新增工作计划" :visible.sync="dialogVisible" width="85%" top="5vh" class="dialogthree" @close="cancel">
		<!-- 头部查询条件 -->
		<el-card class="mb-10">
			<el-row :gutter="20">
				<el-form label-position="left" :inline="true">
					<el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index">
						<el-form-item :label="item.label + '：'" class="form-item">
							<el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type" @change="onChange(item)"></el-input>
							<el-select
								v-model="item.model"
								filterable
								:placeholder="item.placeholder || '请选择'"
								v-if="item.type === 'select'"
								style="width: 100%;"
								@change="onChange(item)"
							>
								<el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"> </el-option>
							</el-select>
							<el-date-picker
								v-model="item.model"
								type="date"
								:placeholder="item.placeholder || '请选择'"
								v-if="item.type === 'date'"
								style="width: 100%;"
								:clearable="false"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
		</el-card>
		<!-- 第一个表格 -->
		<div class="p-t-10">
			<el-table :data="tableData" style="width: 100%;" border height="400" ref="dialog2Table" @select="selected">
				<el-table-column type="selection" width="50" align="center"> </el-table-column>
				<el-table-column label="产品名称" align="center" prop="product_name"> </el-table-column>
				<el-table-column label="产品编号" align="center" prop="product_serial"> </el-table-column>
				<el-table-column label="所属客户" align="center" prop="customer_name"> </el-table-column>
				<el-table-column label="订单编号" align="center" prop="order_serial"> </el-table-column>
				<el-table-column label="订单数量" align="center" prop="order_quantity"> </el-table-column>
				<el-table-column label="总库存数量" align="center" prop="storage_quantity"> </el-table-column>
			</el-table>
			<div>已选{{ sum }}</div>
			<!-- 第一个表格分页 -->
			<el-pagination
				background
				layout="total, prev, pager, next, jumper"
				:total="total"
				class="pagination"
				:current-page.sync="currentPage1"
				@current-change="currentChange"
			>
			</el-pagination>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="onOk" round>提交计划</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'Dialog2',
	props: {
		dialogVisibl: {
			type: Boolean,
			default: () => {
				return false;
			},
		},
		user: {
			type: Array,
			default: () => {
				return [];
			},
		},
		selectArr: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data: () => {
		return {
			sum: 0,
			dialogVisible: false,
			currentPage1: 1,
			total: 1,
			tableData: [],
			arr: [
				{ label: '送货日期', model: new Date(), placeholder: '', id: 'delivery_date', type: 'date', data: [] },
				{ label: '送货班次', model: '', placeholder: '', id: 'delivery_shifts' },
				{
					label: '下单客户',
					model: '',
					placeholder: '',
					id: 'customer_id',
					type: 'select',
					data: [],
				},
				{ label: '收货单位', model: '', placeholder: '', id: 'receiving_unit' },
				{ label: '送货路线', model: '', placeholder: '请输入送货路线', id: 'delivery_route' },
				{
					label: '产品名称',
					model: '',
					placeholder: '请输入产品名称',
					id: 'product_name',
					noHttp: true,
				},
				{
					label: '产品所属',
					model: '',
					placeholder: '',
					id: 'abc',
					type: 'select',
					data: [],
					noHttp: true,
				},
				{
					label: '特殊事宜',
					model: '',
					placeholder: '',
					id: 'special_matter',
					type: 'select',
					data: [
						{ name: '是', id: '是' },
						{ name: '否', id: '否' },
					],
				},
				{ label: '交代说明', model: '', placeholder: '输入备注说明或需要交代的事项', id: 'note', span: 24 },
			],
			checkArr: [], // 已经勾选了选项合集
			isToggle: false,
		};
	},
	watch: {
		dialogVisibl(val) {
			if (val) {
				this.dialogVisible = true; // 先让弹窗显示
				this.currentPage1 = 1; // 重置为第一页
				this.isToggle = false; // 告诉页面现在是复制新增操作
				this.checkArr = this.$common.getSelection(this.selectArr);
				this.arr.map((r, i) => {
					// 默认复制操作。取第一条数据为准
					if (!['delivery_date', 'delivery_shifts', 'receiving_unit', 'delivery_route', 'note'].includes(r.id)) return;
					let n = this.checkArr[0][r.id];
					this.$set(this.arr, i, { ...r, ...{ model: n } });
				});
				// 表格数据赋值，0~10
				this.tableData = this.checkArr.slice((this.currentPage1 - 1) * 10, (this.currentPage1 - 1) * 10 + 10);
				// 总页数
				this.total = this.checkArr.length;
				this.$nextTick(() => {
					//这里肯定是全选,不管传进来的是几条数据
					this.$refs.dialog2Table.toggleAllSelection();
				});
			}
		},
		user: {
			handler(val) {
				if (!val.length) return;
				this.arr[2].data = val; // 给下单客户绑定员工数据
				this.arr[6].data = val; // 给产品所属绑定员工数据
			},
			immediate: true,
		},
	},
	computed: {},
	methods: {
		queryProduct(obj = {}) {
			this.$post('/delivery_plans/order_products', obj).then((res) => {
				this.tableData = res.data.data;
				this.total = res.data.paginate_meta.total_count;
				this.reqeat();
			});
		},
		onChange(val) {
			let arr = ['customer_id', 'abc', 'product_name'];
			let obj = {};
			if (!arr.includes(val.id)) return;
			this.arr.map((r) => {
				if (arr.includes(r.id) && r.model !== '') {
					obj[r.id] = r.model;
				}
			});
			// customer_ids: [12, 23], product_name: "name"
			let _obj = {
				arr: [obj.customer_id || 0, obj.abc || 0],
				customer_ids: [],
				product_name: obj.product_name,
			};
			_obj.arr.map((r) => {
				if (r) {
					_obj.customer_ids.push(r);
				}
			});
			this.isToggle = true;
			_obj.page = this.currentPage1;
			this.queryProduct(_obj);
		},
		currentChange(val) {
			// 点击分页
			this.currentPage1 = val;
			if (!this.isToggle) {
				// 二种情况，一种是带过来的数据。没有选客户
				let arr = this.$common.getSelection(this.selectArr);
				this.tableData = arr.slice((this.currentPage1 - 1) * 10, (this.currentPage1 - 1) * 10 + 10);
				this.reqeat();
			} else {
				this.onChange(this.arr[2]);
			}
		},
		cancel(type = false) {
			this.$emit('cancel', type);
			this.dialogVisible = false;
		},
		// 点击确定
		onOk() {
			let arr = this.checkArr;
			if (arr.length) {
				let obj = {};
				this.arr.map((r) => {
					if (!r.model || r.noHttp) return;
					obj[r.id] = r.model;
				});
				obj.product_ids = arr.map((r) => r.id);
				obj.delivery_date = this.$common.format(obj.delivery_date);
				this.$post('/delivery_plans/batch_create', obj).then((res) => {
					this.$notify({
						title: '提示',
						message: '新增工作计划成功!',
						type: 'success',
					});
					this.cancel(true);
				});
			} else {
				this.$notify({
					title: '警告',
					message: '最少选择一条产品数据!',
					type: 'warning',
				});
			}
		},
		requin(arr) {
			let obj = {};
			arr.reduce((cur, next) => {
				obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
				return cur;
			}, []);
		},
		reqeat() {
			this.$nextTick(() => {
				this.tableData.map((r) => {
					console.log(this.checkArr, r);
					if (this.checkArr.map((n) => n.delivery_product_id).includes(r.delivery_product_id)) {
						this.$refs.dialog2Table.toggleRowSelection(r);
					}
				});
			});
		},
		selected(val, row) {
			if (val.filter((r) => r.delivery_product_id === row.delivery_product_id).length) {
				// 证明是选中
				this.checkArr.push(row);
			} else {
				let index = this.checkArr.findIndex((r) => r.delivery_product_id === row.delivery_product_id);
				this.checkArr.splice(index, 1);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.dialogthree {
	::v-deep .el-dialog__body {
		padding: 10px 20px;
	}
	::v-deep .el-card__body {
		padding: 10px 20px;
	}
	.mb-10 {
		margin-bottom: 10px;
	}
	.dialog-footer {
		text-align: center;
		display: block;
		width: 200px;
		margin: 0 auto;
		::v-deep .el-button {
			width: 100%;
		}
	}
	.pagination {
		text-align: right;
		margin-top: 20px;
	}
}
</style>
