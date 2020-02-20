import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'

import { uMap } from '../../libs/uMap'

import { appMapTemplate } from './appMap.template'
import { appMapStyle } from './appMap.style'
const appMapComponent = () => {

	watch([], () => [])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])

	const editor = uMap()
	let context = null
 
	const name = () => ['app-map']	

	const template = () => {
		appMapTemplate(getState())
		appMapStyle()
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [onSetContext]
	
	const methods = () => [
		...mapActions(),
	]

	const beforeOnRender = () => []
	const afterOnRender = () => [setInitNodeMap]

	const setInitNodeMap = () => {
		editor.render(getState(), 'init_conversation', context[0])
	}

	const onSetContext = ({elm, query, on}) => {
		context = elm
	}

	return createComponent()
}

export { appMapComponent }