import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { menuTemplate as HTML } from './menu.template'
import { menuStyle as CSS } from './menu.style'
import { editorService } from '../../services/editor.service'

const appMenuFactory = () => {

	watch(['TOGGLE_MENU'], () => [
		renderMenu
	])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])


	const name = () => 'app-menu'

	const template = () => {
		return { HTML, CSS }
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
	onClickItemMenu
	]

	const methods = () => [
		...mapActions(),
		createNodeType
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onClickItemMenu = ({ elm, on, query }, { createNodeType}) => {

	
		const menuItems = query('.menu-item', elm)

		on('click', menuItems, ({ target }) => {
			createNodeType(target.getAttribute('node-type'))
			const [toggleMenu] = mapActions()
			const { menu } = getState()
			toggleMenu({ menu })			
		})
		
	}

	const createNodeType = (nodeType) => {
		editorService.createNode(nodeType, {title:'Default Node', description:'Default Node Description'})
	}

	const renderMenu = () => {
		render('app-menu', getState())
	}

	return createComponent()
}

export { appMenuFactory }