import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import utils from '@/utils/utils'
import { checkPermission } from '@/store/modules/user'
import { bus } from '@/utils/bus'
import config from '@/assets/config/config'
import columnsInit from '@/assets/config/columns'
import ImgIcon from '@/components/ImgIcon'
import SvgIcon from '@/components/SvgIcon/index.vue'
import svgInit from '@/components/SvgIcon/index.js'
import VueVirtualScroller from 'vue-virtual-scroller'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import '@/styles/reset.less'
import 'element-ui/lib/theme-chalk/index.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '@/styles/public.less'
import '@/styles/element.less'

columnsInit();

document.title = config.title

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VXETable)

Vue.use(VueVirtualScroller)

Vue.component('SvgIcon', SvgIcon)
svgInit()

Vue.component('ImgIcon', ImgIcon)

Vue.prototype.$utils = utils;

Vue.prototype.$checkPermission = checkPermission;

Vue.prototype.$bus = bus;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
