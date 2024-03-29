// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueInputAutowidth from 'vue-input-autowidth'
import VueDebounce from 'vue-debounce'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(VueInputAutowidth)
Vue.use(VueDebounce)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
