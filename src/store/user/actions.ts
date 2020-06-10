import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { UserInterface } from './state'

const actions: ActionTree<UserInterface, StoreInterface> = {
  login (/* context */ { commit }) {
    commit('checkLogin', true)
    console.log('Now logging')

    // your code
    return 123
  },
  register (/* contxt */) {
    // your code
  }
}

export default actions
