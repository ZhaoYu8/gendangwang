<template>
	<el-dialog title="新增工作计划" :visible.sync="dialogVisible" width="85%" top="5vh" class="dialog" @close="cancel(false)">
		<!-- 头部查询条件 -->
		<el-card class="mb-10">
			<el-row :gutter="20">
				<el-form label-position="left" :inline="true">
					<el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index">
						<el-form-item :label="item.label + '：'" class="form-item">
							<el-input v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type"></el-input>
							<el-select
								:disabled="item.disabled"
								v-model="item.model"
								:placeholder="item.placeholder || '请选择'"
								v-if="item.type === 'select'"
								style="width: 100%;"
								filterable
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
			<el-table :data="tableData" style="width: 100%;" border height="500">
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
						>
						</el-date-picker>
						<el-input v-model="scope.row[item.id]" v-else-if="item.type === 'input'" />
						<div v-else>{{ scope.row[item.id] }}</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 第一个表格分页 -->
			<!-- <el-pagination background layout="total, prev, pager, next, jumper" :total="total" class="pagination" :current-page.sync="currentPage1">
			</el-pagination> -->
		</div>
		<span slot="footer">
			<el-button type="primary" @click="ok">保存</el-button>
			<el-button @click="cancel(false)">取消</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'Dialog4',
	props: {
		centerDialogVisible: {
			type: Boolean,
			default: () => {
				return false;
			},
		},
		user: {
			type: Object,
			default: () => {
				return {};
			},
		},
		checkArrOk: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	computed: {
		tableHeader() {
			return this.$common.tableHeader;
		},
	},
	data: () => {
		return {
			dialogVisible: false,
			currentPage1: 1,
			total: 1,
			tableData: [],
			arr: [
				{ label: '送货单号', model: '', placeholder: '', id: 'delivery_shifts', type: 'select', disabled: true, data: [] },
				{ label: '送货车号', model: '', placeholder: '', id: 'delivery_train', type: 'select', data: [] },
				{ label: '送货员', model: '', placeholder: '', id: 'delivery_member_id', type: 'select', data: [] },
				{ label: '跟车员', model: '', placeholder: '', id: 'with_member_id', type: 'select', data: [] },
				{ label: '配货员', model: '', placeholder: '', id: 'allocate_member_id', type: 'select', data: [] },
				{ label: '备注说明', model: '', placeholder: '', id: 'note', span: 18 },
			],
			selectChangeData: [],
		};
	},
	watch: {
		centerDialogVisible(val) {
			if (val) {
				this.dialogVisible = true;
			}
		},
		user: {
			handler(val) {
				if (!Object.keys(val).length) return;
				this.arr[1].data = val.delivery_train_options;
				this.arr[2].data = val.delivery_member_options;
				this.arr[3].data = val.with_member_options;
				this.arr[4].data = val.allocate_member_options;
			},
			immediate: true,
		},
		checkArrOk: {
			handler(val) {
				this.tableData = [];
				val.map((r, i) => {
					this.$set(this.tableData, i, r);
				});
			},
			immediate: true,
		},
	},
	methods: {
		del(val) {
			let index = 0;
			this.tableData.map((r, i) => {
				if (r.delivery_product_id === val.row.delivery_product_id) {
					index = i;
				}
			});
			this.tableData.splice(index, 1);
		},
		cancel(type = false) {
			this.$emit('cancel', type);
			this.dialogVisible = false;
		},
		ok() {
			let obj = {};
			this.arr.map((r) => {
				if (!r.model || r.noHttp) return;
				obj[r.id] = r.model;
			});
			obj.delivery_products = this.tableData;
			this.$post('/delivery_plans/batch_create_schedule', obj).then((res) => {
				this.$notify({
					title: '提示',
					message: '新增工作计划成功!',
					type: 'success',
				});
				this.cancel(true);
			});
		},
		handleSelectionChange(val) {
			this.selectChangeData = val;
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
</style>
