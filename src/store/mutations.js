import { logState } from '../core/store'

const CHANGE_MENU = (state, payload) => {
	state.menu.isVisible = !payload.menu.isVisible
}

const mutations = {
	CHANGE_MENU
}

export { mutations }