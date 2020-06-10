import { MutationTree } from 'vuex'
import { UserInterface } from './state'

const mutation: MutationTree<UserInterface> = {
  checkLogin (/* state: ExampleStateInterface */ state: UserInterface, payload: boolean) {
    state.isLogin = payload
  }
}

export default mutation
