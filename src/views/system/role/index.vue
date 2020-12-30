<template>
  <div class="app-container">
    <Form ref="form" :isAdd="isAdd" />
    <div class="flex-start-start">
      <div style="width: 70%;margin-right: 10px">
        <div class="head-container">
          <div class="flex-wrap-center">
            <div class="header-item">
              <el-input 
                v-model="query.blurry" 
                size="mini" 
                placeholder="名称"
                @keyup.enter.native="toQuery"
              ></el-input>
            </div>
            <div class="header-item">
              <el-button 
                size="mini" 
                type="primary" 
                icon="el-icon-search"
                @click="toQuery"
              >搜索</el-button>
              <el-button 
                style="margin-left:5px"
                size="mini" 
                icon="el-icon-refresh-left" 
                type="info" 
                @click="reset()"
              >重置</el-button>
            </div>
          </div>
        </div>
        <div class="table-header flex-between-center">
          <h3 class="table-title">角色列表</h3>
          <div class="flex-end-center">
            <el-button 
              @click="add" 
              icon="el-icon-plus" 
              size="mini" 
              type="primary" 
              style="margin-right:10px"
            >新增</el-button>
            <TableSet :name="prop" @tableRefresh="tableRefresh" />
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="data" 
          border 
          size="mini"
          highlight-current-row
          :cell-style="cellStyle"
          :header-cell-style="headerCellStyle"
          @header-dragend="headerDrag"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50"
            :resizable="false"
          ></el-table-column>
          <template  v-for="(item, key) in columns[prop]">
            <el-table-column
              v-if="item.show"
              :key="key"
              :width="item.width"
              :label="item.label"
              :prop="key"
              :align="item.align"
              :show-overflow-tooltip="item.tooltip"
            >
              <template slot-scope="scope">
                <TableTrans :scope="scope" :item="item" :prop="key" />
              </template>
            </el-table-column>
          </template>
          <el-table-column
            width="100"
            label="操作"
            align="center"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click.stop="edit(scope.row)"
              >修改</el-button>
              <el-popover
                :ref="scope.row.id"
                placement="top"
                width="100"
              >
                <el-button 
                  @click.stop
                  slot="reference" 
                  type="text" 
                  size="mini"
                >删除</el-button>
                <div style="text-align:center;margin:10px">确定删除吗?</div>
                <div class="flex-center-center">
                  <div>
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs[scope.row.id].doClose()"
                    >取消</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="subDelete(scope.row.id)"
                    >确定</el-button>
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex-end-center">
          <el-pagination 
            :page-size="size"
            background
            :total="total"
            :current-page="page + 1"
            style="margin-top: 8px;"
            layout="prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"
          />
        </div>
      </div>
      <div style="flex-grow: 1;margin-top: 38px">
        <div class="table-header flex-between-center">
          <h3 class="table-title">菜单分配</h3>
          <div class="flex-end-center">
            <el-button 
              @click="save" 
              size="mini" 
              type="primary" 
              style="margin-right:10px"
            >保存</el-button>
          </div>
        </div>
        <div class="border" style="padding: 20px">
          <el-tree
            ref="tree"
            :data="menus"
            :props="{
              label: 'label',
              children: 'children'
            }"
            :check-strictly="strictly"
            show-checkbox
            :node-key="'id'"
          >
          </el-tree>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import TableSet from "@/components/Table/TableSet"
import TableTrans from '@/components/Table/TableTrans'
import Form from './form'
import { del, saveMenu } from '@/api/role'
import { getMenusTree } from '@/api/menu'
export default {
  name: 'Role',
  components: {
    Form, 
    TableSet, 
    TableTrans
  },
  mixins: [initData],
  data() {
    return {
      prop: 'role',
      selfVals: [],
      currentId: '',
      menus: [],
      strictly: false
    }
  },
  created() {
    this.init();
    getMenusTree().then(res => {
      this.menus = res || [];
    })
  },
  methods: {
    handleCurrentChange(row) {
      this.strictly = true;
      setTimeout(() =>{
        row = row || {};
        this.currentId = row.id;
        let menus = this.$utils.clone(row.menus) || [];
        this.selfVals = menus.map(item => item.id);
        this.$refs.tree.setCheckedKeys(this.selfVals);
        this.strictly = false;
      }, 1);
    },
    save() {
      this.selfVals = this.$refs.tree.getCheckedKeys();
      this.selfVals = this.selfVals.concat(this.$refs.tree.getHalfCheckedKeys());
      let menus = this.selfVals.map(item => {
        return {id: item};
      })
      saveMenu({
        id: this.currentId,
        menus: menus
      }).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.init();
      })
    },
    beforeInit() {
      this.url = 'api/roles';
      const sort = 'level,asc';
      this.params = Object.assign({ page: this.page, size: this.size, sort: sort }, this.query);
      return true;
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.$refs.form.form = this.$utils.clone(row);
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    subDelete(id) {
      del(id).then(res => {
        this.$refs[id].doClose();
        this.dleChangePage();
        this.init();
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        });
      }).catch(err => {
        this.$refs[id].doClose();
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
