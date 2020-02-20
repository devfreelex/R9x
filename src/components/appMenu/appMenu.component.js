import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render, setStyle } from '../../core/component'
import { appMenuTemplate } from './appMenu.template'
import { appMenuStyle } from './appMenu.style'
const appMenuComponent = () => {

	watch(['CHANGE_MENU'], () => [
		 render, 
	])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])
 

	const name = () => ['app-menu']	

	const template = () => {
		appMenuTemplate(getState())
		appMenuStyle()
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onClickMenu
	]
	
	const methods = () => [
		...mapActions(),
		createNode,
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	//hooks

	//listeners
	const onClickMenu = ({ elm, on, query}, { createNode, changeMenu }) => {
		const menuItems = query('.app-menu-item', elm)

		on('click', menuItems, ({target}) => {
			const menuStatus = { 
				menu: { isVisible: getState().menu.isVisible } 
			}
			createNode()
			changeMenu(menuStatus)
		})

	}	

	// METHODS
	const createNode = () => {
		console.log('criando node....')
	}
		
	return createComponent()
}

export { appMenuComponent }