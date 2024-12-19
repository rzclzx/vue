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
      <div class="flex-start-center" style="margin-left: 300px">
        <span style="width: 100px">阶段高点：</span>
        <el-input-number :controls="false" v-model="max" style="width: 180px" size="mini"></el-input-number>
      </div>
      <div class="flex-start-center" style="margin-left: 10px">
        <span style="width: 100px">买点值：</span>
        <span>{{ ratebackval }}</span>
      </div>
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
          <el-button type="text" @click="sell(scope)">止盈</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-start-center" style="margin-top: 10px">
      <span style="width: 100px">当前档位：</span>
      <span>{{ current }}</span>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">止盈点：</span>
      <el-input-number :controls="false" v-model="sellLimit" style="width: 180px" size="mini"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <el-button type="primary" size="mini" @click="sell()">固定价止盈</el-button>
    </div>
    <el-divider></el-divider>
    <div>总结余：{{ value }}</div>
    <div>总收益：{{ valuelen }}</div>
    <div>收益率：{{ rate }}%</div>
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
      // 止盈点
      sellLimit: undefined,
      // 总结余
      value: 0,
      // 总收益
      valuelen: 0,
      // 止盈倍数
      scale: undefined,
      // 总收益率
      rate: 0,
      // 数据
      data: getData(),
      // 追入率
      ratein: undefined,
      // 首次买入率
      firstRate: 0.4,
      // 后续买入率
      lastRate: 0.06,
      // 止盈步长
      step: undefined,
      // 最高点
      max: undefined,
      // 回跌率
      rateback: 0.8,
      // 回跌值
      ratebackval: undefined
    }
  },
  watch: {
    max(val) {
      if (!val) {
        this.ratebackval = undefined
      } else {
        this.ratebackval = this.trans(val * this.rateback)
      }
    }
  },
  created() {
    this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
    this.ratein = localStorage.getItem('ratein')*1 || this.$store.state.app.ratein
    this.step = localStorage.getItem('step')*1 || this.$store.state.app.step
  },
  methods: {
    currentChange(item) {
      this.current = item ? item.ind : this.current
    },
    /**
     * 重置所有数据
     */
    refresh() {
      this.buyLimit = undefined
      this.current = 0
      this.total = undefined
      this.sellLimit = undefined
      this.value = 0
      this.valuelen = 0
      this.data = getData()
      this.rate = 0
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
      this.data[0].c = total * this.firstRate
      for (let i = 1; i < this.data.length; i++) {
        this.data[i].a = this.trans(this.data[0].a * Math.pow(this.ratein, i))
        this.data[i].b = this.trans(this.data[i].a * (this.scale + this.step*i))
        this.data[i].c = total * this.lastRate
      }
    },
    sell(scope) {
      this.sellLimit = scope ? scope.row.b : this.sellLimit
      this.current = scope ? scope.$index : this.current
      if (!this.total || !this.buyLimit || !this.sellLimit) {
        return
      }
      this.valuelen = 0
      for (let i = 0; i < this.data.length; i++) {
        let m = i === 0 ? this.total * this.firstRate : this.total * this.lastRate
        this.valuelen += this.trans(((this.sellLimit - this.data[i].a) / this.data[i].a) * m)
        if (this.current == i) {
          this.value = this.total + this.valuelen
          this.value = this.trans(this.value)
          this.valuelen = this.trans(this.valuelen)
          this.rate = this.trans(Math.round(this.valuelen / this.total * 10000) / 100)
          return
        }
      }
    }
  }
}
</script>
