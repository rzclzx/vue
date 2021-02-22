<template>
  <div class="app-container">
    main
  </div>
</template>

<script>
import { index } from '@/api/test'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  created() {
    index().then(res => {
      console.log(res)
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
