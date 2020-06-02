import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
fastclick.attach(document.body) //页面点击 300毫秒延迟

// 引入axios
import axios from "axios"
// 设置请求的根路径
axios.defaults.baseURL ='http://127.0.0.1:3000/'
// 将axios挂载到原型对象上,这样每个vue的组件都可以通过this访问到$http,从而发起网络数据请求
Vue.prototype.$axios = axios

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入reset.css
import "./assets/style/reset.css" 
import "./assets/style/border.css" 

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
