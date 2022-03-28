<template>
  <div>
    {{ aaa.a }}
  </div>
</template>

<script>
export default {
  props: {
    aaa: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  created() {
    setTimeout(() => {
      this.$emit('update:aaa', {a: [1,2,3]})
    }, 2000)
  },
  methods: {

  }
}
</script>
