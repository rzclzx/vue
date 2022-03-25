export default {
  data() {
    return {
      showGotop: false,
      size: 4,
      step: 4,
      timer: null,
      scrollState: false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler)
  },
  watch: {
    tableScroll: {
      handler() {
        this.$nextTick(() => {
          this.$refs.tableScroll.doLayout()
        })
      },
      deep: true
    }
  },
  methods: {
    reset() {
      this.size = 4
      this.scrollState = false
    },
    getState() {
      if (this[this.dataKey].length === 0) {
        this.scrollState = true
      } else {
        if (this[this.dataKey].length <= this.size) {
          this.scrollState = true
        }
      }
    },
    scrollHandler() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getTop()
        this.scrollLoad()
        this.getState()
      }, 50)
    },
    getTop() {
      this.showGotop = document.documentElement.scrollTop > 0 ? true : false
    },
    scrollLoad() {
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight < 10) {
        this.size += this.step
      }
    },
    goTop() {
      window.scrollTo(0, 0)
    },
  }
}
