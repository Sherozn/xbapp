import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
import Admin from '@/components/admin/admin.vue'
import ProductType from '@/components/product-type/productType.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/types',
      name: 'ProductType',
      component: ProductType
    }
  ]
})
