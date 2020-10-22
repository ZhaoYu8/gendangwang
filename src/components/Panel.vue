<template>
  <el-card class="no-p-b">
    <el-row :gutter="20">
      <el-form label-position="left" :inline="true">
        <el-col :span="item.span || 6" v-for="(item, index) in arr" :key="item.label + index" :class="item.class || special">
          <el-form-item :label="item.label + '：'" class="form-item">
            <el-input size="small " v-model="item.model" :placeholder="item.placeholder || '请输入'" v-if="!item.type" @change="change(item)"></el-input>
            <el-select size="small" filterable v-model="item.model" :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'" clearable style="width: 100%;" @change="change(item)">
              <el-option v-for="(list, d) in item.data" :key="list + d" :label="list.name" :value="list.id"></el-option>
            </el-select>
            <Page v-model="item.model" :clearable="item.clearable" :placeholder="item.placeholder || '请输入'" :data="item.data" @change="change(item)" v-if="item.type === 'page'"></Page>
            <el-date-picker size="small" v-if="item.type === 'daterange'" :placeholder="item.placeholder || '请选择'" v-model="item.model" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="change(item)"> </el-date-picker>
            <el-date-picker size="small" v-if="item.type === 'date'" :placeholder="item.placeholder || '请选择'" v-model="item.model" type="date" @change="change(item)"> </el-date-picker>

            <div class="radio" v-if="item.type === 'filter'">
              <span
                v-for="now in item.data"
                :key="now.id"
                class="item"
                :class="{ active: now.id === item.model }"
                @click="
                  () => {
                    item.model = now.id;
                    change(item);
                  }
                "
              >
                <template v-if="now.name !== '自定义日期'">
                  {{ now.name }}
                </template>
                <template v-else>
                  <el-popover placement="top" v-model="visible" @after-leave="visible = false">
                    <el-date-picker v-model="datePicker" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                    <span slot="reference">{{ now.name }}</span>
                  </el-popover>
                </template>
              </span>
            </div>
          </el-form-item>
        </el-col>
        <slot></slot>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    arr: {
      type: Array,
      default: [],
    },
    special: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      datePicker: '',
      visible: false,
    };
  },
  methods: {
    change(val) {
      this.$emit('input', val.model);
      this.$nextTick(() => {
        this.$emit('change', val);
      });
    },
    dateChange() {
      this.$emit('dateChange', this.datePicker);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.radio {
  margin-bottom: 10px;
  &-title {
    font-weight: 700;
  }
  .item {
    display: inline-block;
    padding: 4px 12px;
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;
    line-height: 24px;
    &:hover {
      opacity: 0.8;
    }
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
