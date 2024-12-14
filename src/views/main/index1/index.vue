<template>
  <div class="app-container">
    <div class="flex-start-center">
      <span style="width: 100px">总资金：</span>
      <el-input-number :controls="false" v-model="total" style="width: 180px" size="mini"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">买入点：</span>
      <el-input-number :controls="false" v-model="buyLimit" style="width: 180px" size="mini" @change="change"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">卖出点：</span>
      <el-input-number :controls="false" v-model="sellLimit" style="width: 180px" size="mini"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <el-button type="primary" size="mini" @click.native="sell()">卖出</el-button>
      <i class="el-icon-refresh link" style="margin-left: 50px; font-size: 30px" @click="refresh"></i>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="data"
      border
      size="mini"
      highlight-current-row
      style="width: 100%">
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
        label="止损点">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click.native="sell(scope.row.b)">止盈</el-button>
          <el-button type="text" @click.native="sell(scope.row.c)">止损</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>总结余：{{ value }}</div>
    <div>总收益：{{ valuelen }}</div>
  </div>
</template>
<script>
import getData from '../index/data'
export default {
  data() {
    return {
      // 总资金
      total: undefined,
      // 买入点
      buyLimit: undefined,
      // 止盈止损点
      sellLimit: undefined,
      // 止盈倍数
      scale: undefined,
      // 止损倍数
      scaledown: undefined,
      // 总结余
      value: 0,
      // 总收益
      valuelen: 0,
      // 数据
      data: []
    }
  },
  created() {
    this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
    this.scaledown = localStorage.getItem('scaledown')*1 || this.$store.state.app.scaledown
  },
  methods: {
    /**
     * 重置所有数据
     */
    refresh() {
      this.data = []
      this.total = undefined
      this.buyLimit = undefined
      this.sellLimit = undefined
      this.value = 0
      this.valuelen = 0
    },
    trans(value) {
      let a = value * 100000000
      let b = Math.round(a)
      return b / 100000000
    },
    change() {
      if (!this.buyLimit) {
        return
      }
      let item = {
        a: this.buyLimit,
        b: this.trans(this.buyLimit * this.scale),
        c: this.trans(this.buyLimit * this.scaledown)
      }
      this.data = [item]
    },
    /**
     * 卖出
     */
    sell(value) {
      this.sellLimit = value || this.sellLimit
      if (!this.total) {
        alert('请输入总金额')
        return
      }
      if (!this.sellLimit) {
        alert('请输入当前止盈止损点')
        return
      }
      if (this.data.length === 0) {
        alert('请先买入')
        return
      }
      let len = this.sellLimit - this.buyLimit
      // len的绝对值
      let lenabs = Math.abs(len)
      let scale = lenabs / this.buyLimit
      let scalefinal = len > 0 ? (1 + scale) : (1 - scale)
      this.value = this.total * scalefinal
      this.valuelen = this.value - this.total
    }
  }
}
</script>
