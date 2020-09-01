<template>
  <el-card class="no-p-b">
    <el-row :gutter="20">
      <el-form label-position="left" :inline="true">
        <el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index" :class="item.class || special">
          <el-form-item :label="item.label + '：'" class="form-item">
            <el-input size="small " v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type" @change="change"></el-input>
            <el-select size="small" v-model="item.model" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" clearable style="width: 100%;" @change="change">
              <el-option v-for="(list, d) in item.data" :key="list + d" :label="list.name" :value="list.id"></el-option>
            </el-select>
            <el-date-picker size="small" v-if="item.type === 'daterange'" :placeholder="item.placeholder || '请选择'" v-model="item.model" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="change"> </el-date-picker>
            <el-date-picker size="small" v-if="item.type === 'date'" :placeholder="item.placeholder || '请选择'" v-model="item.model" type="date" @change="change"> </el-date-picker>
          </el-form-item>
        </el-col>
        <slot></slot>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "tabs",
  props: {
    arr: {
      type: Array,
      default: [],
    },
    special: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    change(val) {
      this.$emit("input", val);
    },
  },
  mounted() {},
};
</script>

<style lang="" scoped></style>
