import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loop: true,
  },
  mutations: {
    TOGGLE_LOOP(state) {
      state.loop = !state.loop
    },
  },
})
