import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { taskRegisterTemplate } from './taskRegister.template'
import { taskRegisterStyle } from './taskRegister.style'
const appNotFound = () => {

	watch(['CHANGE_TITLE'], () => [
		 alerterState, render
	])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])
 
	const name = () => ['app-not-found']

	const template = () => {
		taskRegisterTemplate(getState())
		taskRegisterStyle()
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onClickChangeTitle
	]
	
	const methods = () => [
		...mapActions(),
		otherMethod,
		afterRender
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onClickChangeTitle = ({elm, on, query}, {updateTitle}) => { 
		const h1 = query('h1', elm)
		const title = 'Novo título....'
		on('click', h1, () => updateTitle({title}))
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

export { appNotFound }