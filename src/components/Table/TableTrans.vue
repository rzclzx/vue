<template>
  <div>
    <div v-if="item.no">
      {{ scope.row[prop] ? scope.row[prop] : item.no }}
    </div>
    <div v-else-if="item.child">
      {{ scope.row[prop] ? scope.row[prop][item.child] : (item.no ? item.no : '') }}
    </div>
    <div v-else-if="item.unit">
      {{ scope.row[prop] + item.unit }}
    </div>
    <div v-else-if="item.length">
      {{ scope.row[item.length] && scope.row[item.length].length }}
    </div>
    <!-- 公司地址，省|市|县，例：a:{many:['companyaddrProvince','companyaddrCity','companyaddrDistrict']} -->
    <div v-else-if="item.many">
      {{ $utils.manyList(item.many, scope.row) }}
    </div>
    <div v-else-if="item.time">
      {{ $utils.parseTime(scope.row[prop], item.time) }}
    </div>
    <!-- 例如用户属性下，roles对象，将roles对象下的name属性用，连接展示 -->
    <div v-else-if="item.list">
      <span v-for="(val, index) in scope.row[prop]" :key="index">
        {{ index == scope.row[prop].length - 1 ? val[item.list] : `${val[item.list]},` }}
      </span>
    </div>
    <div  v-else>
      {{ item.dict && dict[item.dict] ? dict[item.dict].map[[scope.row[prop]]] : scope.row[prop] }}
    </div>
  </div>
</template>
<script>
export default {
  props: ['scope', 'item', 'prop', 'type'],
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>