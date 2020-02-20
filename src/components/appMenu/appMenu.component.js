import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { appMenuTemplate } from './appMenu.template'
import { appMenuStyle } from './appMenu.style'
const appMenuComponent = () => {

	watch(['CHANGE_MENU'], () => [
		 render
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
		onClickButton, onClickMenu
	]
	
	const methods = () => [
		...mapActions(),
		otherMethod,
		afterRender,
		createNode
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	//hooks

	//listeners
	const onClickButton = ({elm, on, query}, {changeMenu}) => { 
		const button = query('button', elm)
		const menuStatus = {menu: {isVisible:true}}
		on('click', button, () => changeMenu(menuStatus))
	}

	const onClickMenu = ({ elm, on, query}, { createNode, changeMenu }) => {
		const menuStatus = { menu: { isVisible: false } }
		const menuItems = query('.app-menu-item', elm)
	
		on('click', menuItems, ({target}) => { console.log(target)
			createNode()
			changeMenu(menuStatus)
		})

	}	

	// METHODS
	const createNode = () => {
		console.log('criando node....')
	}

	const afterRender = () => {
		console.log('afterRender: ', {title:'yyy'})
	}

	const beforeRender = (state) => {
		console.log('beforeRender:--->', {title: 'xxx'})
	}

	const logStateOnInit = () => {
		console.log(getState())
	}


	const otherMethod = () => {
		console.log('other')
	}	

	const alerterState = (state) => {
		console.log('alerterState:--->', state)
	}
		
	return createComponent()
}

export { appMenuComponent }