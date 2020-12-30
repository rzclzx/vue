<template>
  <el-dialog 
    :visible.sync="dialog" 
    :close-on-click-modal="false" 
    @closed="resetForm" 
    :title="isAdd ? '新增' : '修改'" 
    append-to-body 
    width="400px"
  >
    <el-form 
      ref="form" 
      :model="form" 
      :rules="rules" 
      size="small" 
      label-width="90px"
      style="width: 100%"
    >
      <el-form-item label="名称" prop="name">
        <el-input 
          size="mini" 
          v-model="form.name" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="排序" prop="jobSort">
        <el-input-number
          style="width:250px"
          :max="10000"
          :min="0"
          :controls="false"
          size="mini" 
          v-model="form.jobSort"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio 
            v-for="item in dict.enabled ? dict.enabled.list : []"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/job'
export default {
  props: ['isAdd'],
  data() {
    return {
      dialog: false,
      form: {
        enabled: true,
        jobSort: 999
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        jobSort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
      }
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
      add(this.form).then(res => {
        this.cancel();
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.init()
      }).catch(err => {
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.cancel();
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.init()
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        enabled: true,
        jobSort: 999
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
