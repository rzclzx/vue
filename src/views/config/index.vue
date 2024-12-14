<template>
  <div class="app-container">
    <div class="flex-start-center">
      <el-button type="primary" size="mini" @click="refresh">恢复默认</el-button>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">止盈倍数：</span>
      <el-input-number :controls="false" v-model="scale" style="width: 180px" size="mini" @change="changescale"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">止损倍数：</span>
      <el-input-number :controls="false" v-model="scaledown" style="width: 180px" size="mini" @change="changescaledown"></el-input-number>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scale: undefined,
      scaledown: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
      this.scaledown = localStorage.getItem('scaledown')*1 || this.$store.state.app.scaledown
    },
    changescale(value) {
      localStorage.setItem('scale', value)
    },
    changescaledown(value) {
      localStorage.setItem('scaledown', value)
    },
    refresh() {
      localStorage.clear()
      this.init()
    }
  }
}
</script>
