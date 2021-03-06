import Vue from 'vue'
import Vuex from 'vuex'

import data from './modules/data'
import auth from './modules/auth'

import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    data,
    auth
  }
})
