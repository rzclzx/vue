<template>
  <div>
    <recycle-scroller
      style="height: 400px"
      :item-size="30"
      :items="datas"
      v-slot="{ item }"
    >
      <div :key="item.id">
        {{ item.id }}
      </div>
    </recycle-scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    }
  },
  computed: {
    
  },
  created() {
    for (let i = 0; i < 100000; i++) {
      this.datas.push({
        id: '' + i
      })
    }
  },
  methods: {

  }
}
</script>
