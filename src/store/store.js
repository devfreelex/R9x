import { setStore } from '../core/store.js'
import { state } from './state.js'
import { actions } from './actions.js'
import { mutations } from './mutations.js'

const initStore = () => {
	setStore({
		state, actions, mutations
	})
}

export { initStore }