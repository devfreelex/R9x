import { dispatch } from './../core/store.js'


const updateTitle = (payload) => {
	dispatch('CHANGE_TITLE', payload)
}

const changeOther = (payload) => { console.log('other')}

const actions = {
	updateTitle
}

export { actions }