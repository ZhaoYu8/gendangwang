<template>
	<div class="second">
		<!-- 头部查询条件 -->
		<el-card>
			<el-row :gutter="20">
				<el-form label-position="left" :inline="true">
					<el-col :span="6" v-for="(item, index) in arr" :key="item.label + index">
						<el-form-item :label="item.label + '：'" class="form-item">
							<el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
							<el-select
								v-model="item.model"
								filterable
								:placeholder="item.placeholder || '请选择'"
								v-if="item.type === 'select'"
								style="width: 100%;"
							>
								<el-option v-for="(list, d) in item.data" :key="d" :label="list.name" :value="list.id"> </el-option>
							</el-select>
							<el-date-picker
								v-model="item.model"
								type="date"
								:placeholder="item.placeholder || '请选择'"
								v-if="item.type === 'date'"
								style="width: 100%;"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item class="f-r">
							<el-button type="primary" @click="query">查询</el-button>
							<el-button type="warning" @click="onAdd">新增</el-button>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
		</el-card>
		<!-- 第一个表格 -->
		<div class="p-t-10">
			<el-table :data="tableData1" style="width: 100%;" border height="300" @selection-change="handleSelectionChange" ref="secondTable">
				<el-table-column type="selection" width="50" align="center"> </el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<div slot-scope="scope" style="display: flex; justify-content: space-around;">
						<el-link :underline="false" type="danger" @click="del(scope)">删除</el-link>
					</div>
				</el-table-column>
				<el-table-column :label="item.label" :width="item.width || 180" v-for="(item, index) in tableHeader" :key="item.label + index">
					<template slot-scope="scope">
						<el-date-picker
							:clearable="false"
							v-model="scope.row[item.id]"
							type="date"
							:placeholder="item.placeholder || '请选择'"
							style="width: 100%;"
							v-if="item.type === 'date'"
							@change="tableChange(scope.row, item)"
						>
						</el-date-picker>
						<el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" @change="tableChange(scope.row, item)" v-focus />
						<div v-else>{{ scope.row[item.id] }}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--表格分页 -->
		<el-pagination
			background
			layout="total, prev, pager, next, jumper"
			:total="paginate_meta.total_count"
			class="pagination"
			:current-page.sync="currentPage1"
			@current-change="currentChange"
		>
		</el-pagination>
		<!-- 第二个 表格 -->
		<div class="p-t-10">
			<el-table :data="tableData2" style="width: 100%;" border height="300" ref="multipleTable_b">
				<el-table-column label="操作" width="80" align="center">
					<div slot-scope="scope" style="display: flex; justify-content: space-around;">
						<el-link :underline="false" type="danger" @click="delTwo(scope)">删除</el-link>
					</div>
				</el-table-column>
				<el-table-column label="配货员" prop="allocate_member" />
				<el-table-column label="跟车员" prop="with_member" />
				<el-table-column label="派货员" prop="delivery_member" />
				<el-table-column label="车号" prop="delivery_train" />
				<el-table-column label="派货单数据ID" prop="delivery_good_id" />
				<el-table-column label="更新时间" prop="updated_at" />
				<el-table-column label="备注" prop="note" />
			</el-table>
		</div>
		<!-- 第二个表格分页 -->
		<div style="position:relative">
			<el-pagination
				background
				layout="total, prev, pager, next, jumper"
				:total="paginate_meta2.total_count"
				class="pagination"
				:current-page.sync="currentPage2"
				@current-change="currentChange2"
			>
			</el-pagination>
			<i class="el-icon-refresh refresh" @click="queryTwo"></i>
		</div>
		<Dialog :centerDialogVisible="centerDialogVisible" :checkArrOk="checkArrOk" :user="users" @cancel="cancel" />
	</div>
</template>

<script>
import Dialog from './Dialog4.vue';

export default {
	name: 'Second',
	props: {
		activeName: {
			type: String,
			default: 'second',
		},
		user: {
			type: Array,
			default: [],
		},
	},
	components: {
		Dialog,
	},
	data: () => {
		return {
			users: [],
			centerDialogVisible: false, // 第一个dialog
			paginate_meta: {},
			paginate_meta2: {},
			arr: [
				{ label: '送货日期', model: '', placeholder: '', id: 'delivery_date', type: 'date', data: [] },
				{ label: '送货班次', model: '', placeholder: '', id: 'delivery_shifts', type: 'select' },
				{ label: '送货路线', model: '', placeholder: '请输入送货路线', id: 'delivery_route' },
				{ label: '下单客户', model: '', placeholder: '', id: 'customer_id', type: 'select', data: [] },
				{ label: '产品名称', model: '', placeholder: '请输入产品名称', id: '' },
			],
			currentPage1: 1, // 第一个表格分页
			tableData1: [],
			tableData2: [],
			currentPage2: 1, // 第一个表格分页
			checkArr: [],
			checkArrOk: [],
		};
	},
	watch: {
		activeName: {
			handler(val) {
				if (val === 'second') {
					this.currentPage1 = 1;
					this.currentPage2 = 1;
					this.query();
					this.queryTwo();
					this.arr[3].data = this.user;
				}
			},
			immediate: true,
		},
	},
	computed: {},
	computed: {
		tableHeader() {
			return this.$common.tableHeader;
		},
	},
	methods: {
		handleSelectionChange(val) {
			this.$nextTick(() => {
				this.$nextTick(() => {
					this.checkArr[this.currentPage1 - 1] = val;
				});
			});
		},
		async del(val) {
			let obj = await this.$common.del.call(this, val);
			let _this = this;
			if (obj)
				setTimeout(() => {
					_this.query();
				}, 300);
		},
		async delTwo(val) {
			let data = await this.$confirm('确定删除么?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$post('/delivery_plans/delete_schedule', { delivery_good_id: val.row.delivery_good_id || 0 }).then(() => {
					// 删除之后查询，并且提示删除成功!
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
					let _this = this;
					setTimeout(() => {
						_this.queryTwo();
					}, 300);
				});
			});
		},
		// 表格里修改
		tableChange(val, item) {
			this.$common.tableChange.call(this, val, item);
		},
		onAdd() {
			let arr = [];
			this.checkArr.map((r) => {
				r.map((n) => {
					arr.push(n);
				});
			});
			if (arr.length) {
				this.centerDialogVisible = true;
				this.checkArrOk = JSON.parse(JSON.stringify(arr));
			} else {
				this.$notify({
					title: '警告',
					message: '最少选择一条产品数据!',
					type: 'warning',
				});
			}
		},
		cancel(type) {
			this.centerDialogVisible = false;
			if (type) {
				this.checkArr = [];
				this.checkArrOk = [];
				this.currentPage1 = 1;
				this.currentPage2 = 1;
				this.query();
				this.queryTwo();
			}
		},
		// 点击分页
		currentChange(val) {
			this.currentPage1 = val;
			this.query();
		},
		currentChange2() {
			this.currentPage2 = val;
			this.queryTwo();
		},
		// 查询第一个表格数据
		async query() {
			let obj = { ...this.$common.querySql.call(this, this.arr), ...{ page: this.currentPage1 } };
			await this.$post('/delivery_plans/list_plan', obj).then((res) => {
				let data = res.data.data;
				data.map((r) => {
					if (!Number(r.delivery_number) && !Number(r.sparetime_percent)) {
						r.sparetime = 0;
					} else {
						r.sparetime = Math.ceil((Number(r.delivery_number) * Number(r.sparetime_percent)) / 100);
					}
				});
				this.tableData1 = [];
				this.paginate_meta = res.data.paginate_meta;
				this.$nextTick(() => {
					this.tableData1 = data;
					if (!this.checkArr.length) return;
					// 在赋值之后，再给他手动绑定一下。
					this.$nextTick(() => {
						this.tableData1.map((r) => {
							if (
								this.$common
									.getSelection(this.checkArr)
									.map((n) => n.delivery_product_id)
									.includes(r.delivery_product_id)
							) {
								this.$refs.secondTable.toggleRowSelection(r);
							}
						});
					});
				});
			});
		},
		queryTwo() {
			let obj = { page: this.currentPage2 };
			this.$post('/delivery_plans/list_schedule', obj).then((res) => {
				let data = res.data.data;
				this.tableData2 = data;
				this.paginate_meta2 = res.data.paginate_meta;
			});
		},
	},
	mounted() {
		// 取user数据
		this.$post('/delivery_plans/new_schedule', {}).then((res) => {
			let obj = res.data.data;
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					this.$set(this.users, this.users.length, obj[key]);
				}
			}
		});
	},
};
</script>

<style lang="scss" scoped>
.f-r {
	float: right;
}
.p-t-10 {
	padding-top: 10px;
}
.pagination {
	padding: 10px 0;
	text-align: right;
}
.refresh {
	cursor: pointer;
	position: absolute;
	right: 18%;
	top: 50%;
	transform: translateY(-50%);
	font-size: 30px;
}
</style>
<style lang="scss">
.form-item {
	width: 100%;
	display: inline-flex !important;
}
</style>
