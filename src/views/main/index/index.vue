<template>
  <div class="app-container">
    <div class="flex-start-center">
      <span style="width: 100px">总资金：</span>
      <el-input-number :controls="false" v-model="total" style="width: 180px" size="mini" @change="change(buyLimit)"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">买入点：</span>
      <el-input-number :controls="false" v-model="buyLimit" style="width: 180px" size="mini" @change="change"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center" style="margin-bottom: 10px">
      <i class="el-icon-refresh link" style="font-size: 30px" @click="refresh"></i>
    </div>
    <el-table
      :data="data"
      border
      size="mini"
      highlight-current-row
      style="width: 100%"
      @current-change="currentChange">
      <el-table-column
        width="50"
        prop="ind"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="a"
        label="买入点">
      </el-table-column>
      <el-table-column
        prop="b"
        label="止盈点">
      </el-table-column>
      <el-table-column
        prop="c"
        label="买入金额">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="ok(scope)">止盈</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-start-center" style="margin-top: 10px">
      <span style="width: 100px">当前档位：</span>
      <span>{{ current }}</span>
    </div>
    <el-divider></el-divider>
    <!-- <div class="flex-start-center">
      <span style="width: 100px">止盈点：</span>
      <el-input-number :controls="false" v-model="mylimit" style="width: 180px" size="mini"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <el-button type="primary" size="mini" @click="todo">固定价止盈</el-button>
    </div>
    <el-divider></el-divider> -->
    <div>总结余：{{ value }}</div>
    <div>总收益：{{ valuelen }}</div>
  </div>
</template>
<script>
import getData from './data'
import './index.css'
export default {
  data() {
    return {
      // 买入点
      buyLimit: undefined,
      // 当前档位
      current: 0,
      // 总资金
      total: undefined,
      // 止损点
      limit: 0,
      // 止损总亏
      limitm: 0,
      // 止盈点
      mylimit: undefined,
      // 总结余
      value: 0,
      // 止盈倍数
      scale: undefined,
      // 总收益
      valuelen: 0,
      // 数据
      data: getData()
    }
  },
  created() {
    this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
  },
  methods: {
    currentChange(val) {
      this.current = val ? val.ind : this.current
    },
    /**
     * 重置所有数据
     */
    refresh() {
      this.buyLimit = undefined
      this.current = 0
      this.total = undefined
      this.limit = 0
      this.limitm = 0
      this.mylimit = undefined
      this.value = 0
      this.valuelen = 0
      this.data = getData()
    },
    trans(value) {
      let a = value * 100000000
      let b = Math.round(a)
      return b / 100000000
    },
    change(val) {
      if (!val) {
        return
      }
      let total = this.total || 0
      this.data[0].a = val
      this.data[0].b = this.trans(this.data[0].a * this.scale)
      this.data[0].c = total * 0.5
      for (let i = 1; i < this.data.length; i++) {
        this.data[i].a = this.trans(this.data[0].a * Math.pow(0.9, i))
        this.data[i].b = this.trans(this.data[i].a * (this.scale + 0.1*i))
        this.data[i].c = total * 0.1
      }
      this.limit = this.trans(this.data[0].a * Math.pow(0.9, 6))
      this.limitm = this.trans(total * 0.3657205)
    },
    todo() {
      if (this.current === undefined || this.mylimit === undefined) {
        return
      }
      this.ok({}, this.current, this.mylimit)
    },
    ok(scope, index, mylimit) {
      if (!this.total || !this.data[0].a) {
        return
      }
      this.current = index === undefined ? scope.$index : index
      this.mylimit = mylimit === undefined ? scope.row.b : mylimit
      this.valuelen = 0
      let value = this.mylimit
      for (let i = 0; i < this.data.length; i++) {
        let m = i === 0 ? this.total * 0.5 : this.total * 0.1
        this.valuelen += this.trans(((value - this.data[i].a) / this.data[i].a) * m)
        if (this.current == i) {
          this.value = this.total + this.valuelen
          return
        }
      }
    }
  }
}
</script>
