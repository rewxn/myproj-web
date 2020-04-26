// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

// 全局设置请求统一的地址
axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
    return ((dataStr === undefined || dataStr === '') ? '' : moment(dataStr).format(pattern))
})

import ElementUI from 'element-ui'
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  var logged = window.sessionStorage.getItem("isLogged")
  if(to.path == "/" || to.path == "/login") {
    if(logged) {
      next({path: "/home"})
    } else {
      next()
    }
  } else {
    if(logged) {
      next()
    } else {
      next({path: "/"})
      // if(from.path != "/" && from.path != "/login")
      // Vue.prototype.$message.error(/*'请先登录！'*/from.path);
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
