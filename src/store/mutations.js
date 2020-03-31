import { logState } from '../core/store'

const TOGGLE_MENU = (state, payload) => {
	state.menu.isVisible = !payload.menu.isVisible
}

const TOGGLE_SIDEBAR = (state, payload) => {
	state.sidebar.isVisible = payload.isVisible
	state.sidebar.nodeKey = payload.nodeKey
}

const SAVE_NODES_STATE = (state, payload) => {
	state.nodes = payload.nodes
	state.arrows = payload.arrows
}

const mutations = {
	TOGGLE_MENU,
	TOGGLE_SIDEBAR,
	SAVE_NODES_STATE
}

export { mutations }