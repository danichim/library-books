import Vuex from 'vuex';
import VuexFire from 'vuexfire';
import Vue from 'vue';
import mutations from './mutations'
import store from './store'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null,
    books: null
  },
  actions,
  mutations,
  getters: {
    items: state => state.items,
    books: state => state.books

  }
})
