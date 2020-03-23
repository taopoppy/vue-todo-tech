import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

let isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + getters.textPlusPlus + rootState.count
    //       },
    //       textPlusPlus (state) {
    //         return state.text + 1
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         commit('update_A_Text', rootState.count)
    //       },
    //       addCount ({state, commit, rootState}) {
    //         commit('updateCount', 59666, {root: true})
    //       }
    //     },
    //     mutations: {
    //       update_A_Text (state, text) {
    //         console.log('a.text', state)
    //         state.text = text
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     },
    //     mutations: {
    //       update_B_Text (state, text) {
    //         state.text = text
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
