import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css' // 引入页面图标
import Vant from 'vant' // 引入vant组件库
import 'vant/lib/index.css' // 引入vant组件库的样式
import 'amfe-flexible' // 使用rem适配

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
