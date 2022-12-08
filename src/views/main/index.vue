<template>
  <div class="app-container">
    <vxe-table
      border
      resizable
      height="600"
      ref="xTree"
      :tree-config="{}"
      :data="data"
    >
      <vxe-column
        v-for="(item, index) in columns"
        :key="item.value"
        :field="item.value"
        :title="item.label"
        :width="index === 0 ? 400 : ''"
        :tree-node="index === 0 ? true : false"
      ></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import data from './bigData'
export default {
  data() {
    return {
      columns: [
        {
          value: "name",
          label: "变量名",
          minWidth: 240,
          align:'left',
          edit: 'input',
          filterable: true,
          filterReplaceKey: 'value',
          remark: '变量ApplicationInfo，不可修改，删除，剪切',
          rules: [
            { required: true, message: '请输入变量名' },
            { pattern: /^([a-z]|[A-Z])/, message: '首位为字母' },
          ]
        },
        {
          value: "describe",
          label: "变量中文名",
          minWidth: 180,
          align:'left',
          filterable: true,
          edit: 'input',
          rules: [
            { required: true, message: '请输入变量名' },
            { max: 50, message: '不能超过50个字符' }
          ]
        },
        {
          value: "type",
          label: "数据类型",
          edit: 'select',
          align:'center',
          default: 'string',
          selectList: [
            {
              label: "string",
              value: "string",
            },
            {
              label: "int",
              value: "int",
            },
            {
              label: "double",
              value: "double",
            },
            {
              label: "date",
              value: "date",
            },
            {
              label: "datetime",
              value: "datetime",
            },
            {
              label: "boolean",
              value: "boolean",
            },
            {
              label: "object",
              value: "object",
            },
          ]
        },
        {
          value: "isArr",
          label: "是否数组",
          edit: 'select',
          default: '0',
          disClearable: true,
          selectList: [
            {
              label: '是',
              value: '1'
            },
            {
              label: '否',
              value: '0'
            },
          ],
          trans: value => {
            if (value === '否') {
              return ''
            } else {
              return value
            }
          }
        },
        {
          value: "isEmpty",
          label: "是否可为空",
          edit: 'select',
          default: '0',
          disClearable: true,
          selectList: [
            {
              label: '是',
              value: '1'
            },
            {
              label: '否',
              value: '0'
            },
          ],
          trans: value => {
            if (value === '否') {
              return ''
            } else {
              return value
            }
          }
        },
        {
          value: "enumName",
          label: "数据字典",
          edit: 'select',
          selectList: [],
          link: 'el-icon-share'
        },
        {
          value: "isUse",
          label: "是否使用",
          default: '0',
          selectList: [
            {
              label: '是',
              value: '1'
            },
            {
              label: '否',
              value: '0'
            },
          ],
          trans: value => {
            if (value === '否') {
              return ''
            } else {
              return value
            }
          },
          link: 'el-icon-share',
          linkAlowEqualsValue: '1',
          remark: '变量被组件使用则表示已使用，已使用的变量不允许修改、剪切、删除'
        },
      ],
      data
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
</style>
