import { Module } from 'vuex'
import { StoreInterface } from '../index'
import state, { UserInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const module: Module<UserInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default module
