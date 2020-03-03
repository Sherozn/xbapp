// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store.js'
import './assets/style/border.css'
import './assets/style/reset.css'
// import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {


  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");
  let getUser = localStorage.getItem("user-xbapp");
	console.log("getFlag",getFlag)

  //如果登录标志存在且为isLogin，即用户已登录

  if(getFlag === "isLogin" && getUser){

    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()
  
  //如果登录标志不存在，即未登录
  }else{
    //用户想进入需要登录的页面，则定向回登录界面
    console.log("to",to.path)
  	if(to.meta.isLogin){
      next({
        path: '/login',
      })
    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }
  }
});

router.afterEach(route => {
  window.scroll(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
