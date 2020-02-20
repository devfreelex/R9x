import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { mainTemplate } from './main.template'
import { mainStyle } from './main.style'

const appMainRegister = () => {
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


	const name = () => ['app-main']	

	const template = () => {
		mainTemplate(getState())
		mainStyle(name())
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		// onClickChangeTitle
	]
	
	const methods = () => [
		...mapActions(),
		otherMethod,
		afterRender
	]

	const beforeOnRender = () => []
	const afterOnRender = () => []

	const onClickChangeTitle = ({elm, on, query}, {updateTitle}) => { 
		// const h1 = query('h1', elm)
		// const title = 'Novo título....'
		// on('click', h1, () => updateTitle({title}))
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

export { appMainRegister }