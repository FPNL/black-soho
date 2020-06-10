import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { UserInterface } from './state'

const getters: GetterTree<UserInterface, StoreInterface> = {
  isLogin (/* context */ state) {
    return state.isLogin
  }
}

export default getters
