let obj = {
	tableHeader: [
		// 类型、跟单编号、产品名称、提交人、跟单员   这些不可改
		{ label: '日期', id: 'delivery_date', type: 'date', width: 130 },
		{ label: '班次', id: 'delivery_shifts', type: 'input', width: 70 },
		{ label: '路线', id: 'delivery_route', type: 'input', width: 70 },
		{ label: '下单客户', id: 'customer_name', disabled: true },
		{ label: '收货单位', id: 'receiving_unit', type: 'input', width: 140 },
		{ label: '产品名称', id: 'product_name', disabled: true },
		{ label: '数量', id: 'delivery_number', type: 'input', width: 80 },
		{ label: '备次', id: 'sparetime', width: 70 },
		{ label: '备次率(%)', id: 'sparetime_percent', disabled: true, type: 'input', width: 90 },
		{ label: '跟单员', id: 'tracking_member', disabled: true, width: 70 },
		{ label: '订单编号', id: 'order_serial', disabled: true },
		{ label: '库位', id: 'warehouse_name', type: 'input', width: 130 },
		{ label: '备注', id: 'note', type: 'input', width: 180 }
	],
	format(date) {
		date = new Date(date);
		let month = date.getMonth() + 1;
		let strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = '0' + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = '0' + strDate;
		}
		return date.getFullYear() + '-' + month + '-' + strDate;
	},
	async del(val) {
		try {
			let data = await this.$confirm('确定删除么?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			});
			if (data === 'confirm') {
				this.$post('/delivery_plans/delete_plan', { delivery_product_id: val.row.delivery_product_id || 0 }).then(() => {
					// 删除之后查询，并且提示删除成功!
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				});
			}
			return true;
		} catch (error) {}
	},
	async tableChange(val, item) {
		try {
			let _val = val[item.id];
			if (item.type === 'date') {
				// 日期
				_val = this.$common.format(_val);
			}
			let obj = { delivery_product: {}, delivery_product_id: val.delivery_product_id };
			obj.delivery_product[item.id] = _val;
			let count = await this.$post('/delivery_plans/update_plan', obj).then(() => {
				this.$notify({
					title: '提示',
					message: '更新成功!',
					type: 'success'
				});
			});
			let arr = [ 'delivery_number', 'sparetime_percent' ];
			if (arr.includes(item.id)) {
				val.sparetime = Math.ceil(Number(val.delivery_number) * Number(val.sparetime_percent) / 100);
			}
			return count;
		} catch (error) {}
	},
	querySql(arr) {
		let _arr = arr.map((r) => (r.model ? { id: r.id, model: r.model } : '')).filter((r) => r);
		let obj = {};
		if (_arr.length) {
			_arr.map((r) => {
				obj[r.id] = r.model;
			});
		}
		if (obj.delivery_date) {
			obj.delivery_date = this.$common.format(obj.delivery_date);
		}
		return obj;
	},
	getSelection(val) {
		// 二维数组转一维
		let arr = [];
		val.map((r) => {
			r.map((n) => {
				arr.push(n);
			});
		});
		return arr;
	},
	deduplication(arr) {
		// 去重
		let obj = {};
		arr.reduce((cur, next) => {
			obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
			return cur;
		}, []);
	}
};
export default obj;
