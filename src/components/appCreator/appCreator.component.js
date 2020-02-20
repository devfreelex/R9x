import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { appCreatorTemplate } from './appCreator.template'
import { appCreatorStyle } from './appCreator.style'
const appCreatorRegister = () => {

	watch(['CHANGE_MENU'], () => [
		 alerterState
	])

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
		otherMethod,
		afterRender
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onClickButton = ({elm, on, query}, {changeMenu}) => { 
		const button = query('button', elm)
		const menuStatus = {menu: {isVisible:true}}
		on('click', button, () => changeMenu(menuStatus))
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

export { appCreatorRegister }