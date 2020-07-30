<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html {
	height: 100%;
}
body {
	height: 100%;
	margin: 0;
}
li {
	list-style-type: none;
}
#app {
	width: 100%;
	height: 100%;
}
.el-table {
	.el-input-number {
		.el-input__inner {
			border: 0px;
			border-radius: 0;
		}
	}
}
.el-table .el-input__inner {
	border: 0px;
	border-bottom: 1px solid #dcdfe6;
	border-radius: 0;
}
.el-form--inline .el-form-item__label {
	text-align-last: justify;
	min-width: 7vw;
}
.el-form {
	.el-form-item {
		margin-bottom: 10px;
	}
	.el-card__body {
		padding: 10px 20px !important;
	}
}
.el-form-item__content {
	width: 100%;
}
.el-table__empty-block {
	width: 100% !important;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: rgb(214, 214, 214);
}
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background-color: #fff;
	border-radius: 10px;
}
.el-input--suffix .el-input__inner{
	padding-right: 0 !important;
}
.el-table__row .el-input__inner {
	padding-right: 0 !important;
}
.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
	padding-left: 6px;
}
.el-table .cell {
	padding-right: 6px;
}
</style>
