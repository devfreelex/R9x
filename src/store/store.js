import { setStore } from '../core/store.js'
import { state } from './state.js'
import { actions } from './actions.js'
import { mutations } from './mutations.js'

const storeFactory = () => {

	const init = () => {
		setStore({
			state, actions, mutations
		})
	}

	return {
		init
	}
}

const store = storeFactory()

export { store }