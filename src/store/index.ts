import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state: any) {
      state.count++
    },
    jian (state: any) {
      state.count--
    }
  },
  actions: {
    add ({ commit }) {
      commit('add')
    },
    jian ({ commit }) {
      commit('jian')
    }
  },
  modules: {}
})
