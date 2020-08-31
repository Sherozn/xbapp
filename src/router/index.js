import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
// import Admin from '@/components/admin/admin.vue'
// import Login from '@/components/admin/login.vue'
// import ProductType from '@/components/product-type/productType.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: resolve=>require(['@/components/admin/login.vue'],resolve),
      meta: {
        isLogin: false
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: resolve=>require(['@/components/admin/admin.vue'],resolve),
      meta: {
        isLogin: true
      }
    },
    {
      path: '/types',
      name: 'ProductType',
      component: resolve=>require(['@/components/product-type/productType.vue'],resolve),
      meta: {
        isLogin: true
      }
    },
    {
      path: '/brokers',
      name: 'Brokers',
      component: resolve=>require(['@/components/brokers/brokers.vue'],resolve),
      meta: {
        isLogin: false
      }
    },
    {
      path: '/brokerList',
      name: 'BrokerList',
      component: resolve=>require(['@/components/brokers/brokerList.vue'],resolve),
      meta: {
        isLogin: false
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: resolve=>require(['@/components/brokers/menu.vue'],resolve),
      meta: {
        isLogin: false
      }
    },
    {
      path: '/sendTemplate',
      name: 'SendTemplate',
      component: resolve=>require(['@/components/brokers/sendTemplate.vue'],resolve),
      meta: {
        isLogin: true
      }
    },
    {
      path: '/msg',
      name: 'Msg',
      component: resolve=>require(['@/components/brokers/msg.vue'],resolve),
      meta: {
        isLogin: false
      }
    }

    
  ]
})
