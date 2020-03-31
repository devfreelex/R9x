import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { creatorTemplate as HTML } from './creator.template'
import { creatorStyle as CSS } from './creator.style'

const appCreatorFactory = () => {

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])


	const name = () => 'app-creator'

	const template = () => {
		return { HTML, CSS }
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onShowMenu
	]

	const methods = () => [
		...mapActions(),
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onShowMenu = ({ elm, on, query }) => {
		// console.log(toggleMenu)
		const button = query('.btn-create', elm)
		on('click', button, ({target}) => { 
			const [toggleMenu] = mapActions()
			const { menu } = getState()
			toggleMenu({ menu })	
		})
	}

	return createComponent()
}

export { appCreatorFactory }