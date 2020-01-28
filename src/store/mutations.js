import { logState } from '../core/store.js'

const CHANGE_TITLE = (state, payload) => {
	state.title = payload.title
}

const mutations = {
	CHANGE_TITLE
}

export { mutations }