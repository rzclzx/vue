<template>
  <div class="app-container">
    <div class="flex-start-center">
      <span style="width: 100px">止盈倍数：</span>
      <el-input-number :controls="false" v-model="scale" style="width: 180px" size="mini" @change="change"></el-input-number>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scale: undefined
    }
  },
  created() {
    this.scale = localStorage.getItem('scale')*1 || this.$store.state.app.scale
  },
  methods: {
    change(value) {
      localStorage.setItem('scale', value)
    }
  }
}
</script>
