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
    <el-divider></el-divider>
    <div class="flex-start-center">
      <i class="el-icon-refresh link" style="font-size: 30px" @click="refresh"></i>
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
        prop="d"
        label="买入金额">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click.native="sell(scope.row.b, scope.$index)">止盈</el-button>
          <el-button v-if="scope.row.c" type="text" @click.native="sell(scope.row.c, scope.$index)">止损</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>总结余：{{ value }}</div>
    <div>总收益：{{ valuelen }}</div>
  </div>
</template>
<script>
import getData from './data'
export default {
  data() {
    return {
      // 总资金
      total: undefined,
      // 买入点
      buyLimit: undefined,
      // 第二笔买入点
      buyLimit2: undefined,
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
      data: getData()
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
      this.data = getData()
      this.total = undefined
      this.buyLimit = undefined
      this.sellLimit = undefined
      this.buyLimit2 = undefined
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
        c: '',
        d: this.trans(this.total * 0.5)
      }
      this.buyLimit2 = this.trans(this.buyLimit * this.scaledown)
      let item1 = {
        a: this.buyLimit2,
        b: this.trans(this.buyLimit2 * this.scale),
        c: this.trans(this.buyLimit2 * this.scaledown),
        d: this.trans(this.total * 0.5)
      }
      this.data = [item, item1]
    },
    /**
     * 卖出
     */
    sell(value, index) {
      this.value = 0
      this.valuelen = 0
      this.sellLimit = value
      if (!this.total) {
        alert('请输入总金额')
        return
      }
      if (!this.buyLimit) {
        alert('请先买入')
        return
      }
      for (let i = 0; i < this.data.length; i++) {
        if (i > index) {
          this.value += this.total / 2
          break
        }
        let len = this.sellLimit - this.data[i].a
        // len的绝对值
        let lenabs = Math.abs(len)
        let scale = lenabs / this.data[i].a
        let scalefinal = len > 0 ? (1 + scale) : (1 - scale)
        this.value += this.data[i].d * scalefinal
      }
      this.valuelen = this.value - this.total
      this.value = this.trans(this.value)
      this.valuelen = this.trans(this.valuelen)
    }
  }
}
</script>
