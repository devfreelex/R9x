import { dispatch } from './../core/store'


const toggleMenu = (payload) => {
	dispatch('TOGGLE_MENU', payload)
}
const toggleSidebar = (payload) => { 
	dispatch('TOGGLE_SIDEBAR', payload)
}
const saveNodesState = (payload) => { 
	dispatch('SAVE_NODES_STATE', payload)
}

const actions = {
	toggleMenu,
	toggleSidebar,
	saveNodesState
}

export { actions }