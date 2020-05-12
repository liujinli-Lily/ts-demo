import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      count: 0
    }

  },
  mutations: {
    add (state: any) {
      state.form.count++
    },
    jian (state: any) {
      state.form.count--
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
