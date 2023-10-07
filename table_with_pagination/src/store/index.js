import { createStore } from 'vuex'
import { ClientsModule } from './modules/ClientsModule'



const state = {
  // orderModal: false,
}
const actions = {

}
const mutations = {
  showOrderModal(state, flag) {
    state.orderModal = flag
  }
}
const getters = {

}
export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    ClientsModule,
  }
})