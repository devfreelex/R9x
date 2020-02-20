import { dispatch } from './../core/store'


const changeMenu = (payload) => {
	dispatch('CHANGE_MENU', payload)
}

const changeOther = (payload) => { console.log('other')}

const actions = {
	changeMenu
}

export { actions }