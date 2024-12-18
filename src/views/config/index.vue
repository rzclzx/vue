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
      <span style="width: 100px">追入率：</span>
      <el-input-number :controls="false" v-model="ratein" style="width: 180px" size="mini" @change="changeratein"></el-input-number>
    </div>
    <el-divider></el-divider>
    <div class="flex-start-center">
      <span style="width: 100px">止盈步长：</span>
      <el-input-number :controls="false" v-model="step" style="width: 180px" size="mini" @change="changestep"></el-input-number>
    </div>
    <el-divider></el-divider>
    <!-- <div class="flex-start-center">
      <span style="width: 100px">止损倍数：</span>
      <el-input-number :controls="false" v-model="scaledown" style="width: 180px" size="mini" @change="changescaledown"></el-input-number>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      scale: undefined,
      scaledown: undefined,
      ratein: undefined,
      step: undefined
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
      this.scaledown = localStorage.getItem('scaledown')*1 || this.$store.state.app.scaledown
      this.ratein = localStorage.getItem('ratein')*1 || this.$store.state.app.ratein
      this.step = localStorage.getItem('step')*1 || this.$store.state.app.step
    },
    changescale(value) {
      localStorage.setItem('scale', value)
    },
    changescaledown(value) {
      localStorage.setItem('scaledown', value)
    },
    changeratein(value) {
      localStorage.setItem('ratein', value)
    },
    changestep(value) {
      localStorage.setItem('step', value)
    },
    refresh() {
      localStorage.clear()
      this.init()
    }
  }
}
</script>
