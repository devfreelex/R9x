import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { mainTemplate as HTML } from './main.template'
import { mainStyle as CSS } from './main.style'

const appMainComponent = () => {
	
	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])


	const name = () => 'app-main'	

	const template = () => {
		return { HTML, CSS }
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => []
	
	const methods = () => [
		...mapActions(),
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []


	return createComponent()
}

export { appMainComponent }