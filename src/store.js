import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    // isLogin: false,
    userinfo:[]
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    userinfo: state => state.userinfo,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    // userStatus(state, flag) {
    //   state.isLogin = flag
    // },
    setUserInfo(state,user){
      state.userinfo = user
    }
  },

  // 应用mutations
  actions: {
    // userLogin({commit}, flag) {
    //   commit("userStatus", flag)
    // },
    userInfo({commit},user){
      commit('setUserInfo',user)
    }
  }
})