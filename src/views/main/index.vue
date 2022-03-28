<template>
  <div class="app-container">
    <span>{{ aaa.a }}</span>
    <SyncPropTest :aaa.sync="aaa" />
  </div>
</template>

<script>
import SyncPropTest from './test/SyncPropTest'
export default {
  components: {
    SyncPropTest
  },
  data() {
    return {
      aaa: {
        a: 1
      }
    }
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
