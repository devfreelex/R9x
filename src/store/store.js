import { setStore } from '../core/store'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'

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