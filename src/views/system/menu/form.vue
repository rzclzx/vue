<template>
  <el-dialog 
    :visible.sync="dialog" 
    :close-on-click-modal="false" 
    @closed="resetForm" 
    :title="isAdd ? '新增' : '修改'" 
    append-to-body 
    width="800px"
  >
    <el-form 
      ref="form" 
      :model="form" 
      :rules="rules" 
      size="small" 
      label-width="90px"
      style="width: 100%"
      inline
    >
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type" size="mini" style="width:250px" @change="clearValid">
          <el-radio-button label="0">目录</el-radio-button>
          <el-radio-button label="1">菜单</el-radio-button>
          <el-radio-button label="2">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="外链菜单" prop="iframe" v-if="form.type == '1'">
        <el-radio-group v-model="form.iframe" size="mini" style="width:250px">
          <el-radio-button 
            v-for="item in dict.boolean ? dict.boolean.list : []" 
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单缓存" prop="cache" v-if="form.type == '1'">
        <el-radio-group v-model="form.cache" size="mini" style="width:250px">
          <el-radio-button 
            v-for="item in dict.boolean ? dict.boolean.list : []" 
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单隐藏" prop="hidden" v-if="form.type == '0' || form.type == '1'">
        <el-radio-group v-model="form.hidden" size="mini" style="width:250px">
          <el-radio-button 
            v-for="item in dict.boolean ? dict.boolean.list : []" 
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input 
          size="mini" 
          v-model="form.title" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="权限标识" prop="permission" v-if="form.type == '2' || form.type == '1'">
        <el-input 
          size="mini" 
          v-model="form.permission" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="路由地址" prop="path" v-if="form.type == '1' || form.type == '0'">
        <el-input 
          size="mini" 
          v-model="form.path" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="排序" prop="menuSort" v-if="form.type == '0' || form.type == '1'">
        <el-input-number
          style="width:250px"
          :max="10000"
          :min="0"
          :controls="false"
          size="mini" 
          v-model="form.menuSort"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="组件名称" prop="componentName" v-if="form.type == '1'">
        <el-input 
          size="mini" 
          v-model="form.componentName" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="组件路径" prop="component" v-if="form.type == '1'">
        <el-input 
          size="mini" 
          v-model="form.component" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="上级目录" prop="pid">
        <treeselect
          size="mini"
          v-model="form.pid"
          :options="menus"
          style="width: 250px"
          placeholder="顶级目录"
          @select="select"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getMenusTree } from '@/api/menu'
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    Treeselect
  },
  props: ['isAdd'],
  watch: {
    dialog(value) {
      if (value) {
        getMenusTree().then(res => {
          this.menus = res || [];
        })
      }
    }
  },
  data() {
    return {
      dialog: false,
      form: {
        type: '1',
        iframe: false,
        cache: false,
        hidden: false,
        menuSort: 999
      },
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路由地址', trigger: 'blur' }
        ]
      },
      menus: [],
      pid: ''
    }
  },
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  },
  methods: {
    cancel () {
      this.dialog = false;
    },
    select(item) {
      this.pid = item.pid;
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.doAdd();
          } else {
            this.doEdit();
          }
        }
      });
    },
    doAdd() {
      let form = this.$utils.clone(this.form);
      form.pid = form.pid || 0;
      add(form).then(res => {
        this.cancel();
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.refresh([this.form.pid, this.pid]);
      }).catch(err => {
        console.log(err)
      })
    },
    doEdit() {
      let form = this.$utils.clone(this.form);
      form.pid = form.pid || 0;
      edit(form).then(res => {
        this.cancel();
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.refresh([this.form.pid, this.pid]);
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        type: '1',
        iframe: false,
        cache: false,
        hidden: false,
        menuSort: 999
      };
    },
    clearValid() {
      let form = this.$utils.clone(this.form);
      this.$refs.form.resetFields();
      this.form = form;
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
