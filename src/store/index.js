import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// vuex-persistedstate--->持久化state
Vue.use(Vuex)
// 配置项
// key: 默认值是vuex
// storage: 存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数,return一个对象，对象就作为存储的value
// 参数state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, myChannels, history }) {
        return { tokenObj, myChannels, history }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    history: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    Set_Token(state, token) {
      state.tokenObj = token
    },

    /**
     *删除或添加后的最新的channels
     * @param {Array} channels
     */

    Set_Channels(state, channels) {
      state.myChannels = channels
    },
    Set_history(state, history) {
      state.history = history
    }
  },
  actions: {},
  modules: {}
})
