<template>
  <el-menu
    class="column-scroll"
    :collapse="!menuExpand"
    :default-active="$route.path"
    :show-timeout="200"
    :unique-opened="true"
    mode="vertical"
    background-color="#1F335C"
    text-color="#fff"
    active-text-color="#fff"
  >
    <MenuItem 
      v-for="menu in menus"
      :key="menu.path"
      :menu="menu"
    />
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      
    }
  },
  computed: {
    menus () {
      return this.$store.state.user.menus.filter(item => {
        if (item.children) {
          item.children = item.children.filter(child => !child.hidden);
        }
        return !item.hidden;
      }) || [];
    },
    menuExpand() {
      return this.$store.state.app.menuExpand;
    }
  },
  created() {
    
  },
}
</script>

<style lang="less" scoped>
  @import '~@/styles/public';
  .column-scroll::-webkit-scrollbar {
    width: 0px!important;
  }
  .column-scroll::-webkit-scrollbar-thumb {
    background: @menubackactive!important;
  }
  .column-scroll {
    max-height: calc(100vh - 40px);
  }
</style>
