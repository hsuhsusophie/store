// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'

//1.導入組件
import Goods from "./components/Goods/Goods"
import Ratings from "./components/Ratings/Ratings"
import Seller from "./components/Seller/Seller"
Vue.config.productionTip = false

//安裝vue-router插件
Vue.use(VueRouter);
//如果在其他組件中使用axiosu命令，需要改寫vue原型屬性
Vue.prototype.$axios = Axios;

//2.定義路由
const routes = [
  {
    path:'/',
    //重定向
    redirect:'/goods'

  },
  {
    path:'/goods',
    component: Goods
  },
  {
    path:'/ratings',
    component: Ratings
  },
  {
    path:'/seller',
    component: Seller
  }
]

//創建router實例 
const router = new VueRouter({
  routes,
  //選中後的類名
  linkActiveClass:'active'
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
    //創建和掛載根實例
    router
})
