import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { appCreatorTemplate } from './appCreator.template'
import { appCreatorStyle } from './appCreator.style'

const appCreatorComponent = () => {

	watch(['CHANGE_MENU'], () => [
		changeIcon
	])

	let iconsMenu = null

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])
 
	const name = () => ['app-creator']	

	const template = () => {
		appCreatorTemplate(getState())
		appCreatorStyle()
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onClickButton
	]
	
	const methods = () => [
		...mapActions(),
		changeIcon,
		otherMethod,
		afterRender
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onClickButton = ({elm, on, query}, {changeMenu}) => { 
		const button = query('button', elm)
		iconsMenu = query('.app-creator-icon', elm)
		on('click', button, () => {
			const menuStatus = {menu: {isVisible:getState().menu.isVisible}}
			changeMenu(menuStatus)
			changeIcon()
		})
	}

	const changeIcon = () => { 
		const state = getState()
		
		const iconMenu = iconsMenu.find( icon => {
			if (icon.classList.contains('lni-menu')) return icon
		})
		const iconClose = iconsMenu.find(icon => {
			if (icon.classList.contains('lni-close')) return icon
		})
		
		if(!state.menu.isVisible) {
			iconMenu.classList.add('show-icon')
			iconClose.classList.remove('show-icon')
			return
		}

		iconMenu.classList.remove('show-icon')
		iconClose.classList.add('show-icon')
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

export { appCreatorComponent }