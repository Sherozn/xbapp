import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
import Admin from '@/components/admin/admin.vue'
import Login from '@/components/admin/login.vue'
import ProductType from '@/components/product-type/productType.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:id',
      name: 'Home',
      component: Home,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/types',
      name: 'ProductType',
      component: ProductType,
      meta: {
        isLogin: true
      }
    }
  ]
})
