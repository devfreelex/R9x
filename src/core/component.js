import { eventDrive } from './eventDrive'
let _components = []
let _component = {}
let _scope = null
let elm = null

const setScope = (schema) => { 
	_scope = schema
}

const _arrayToObject = (list) => {
	const methods = {}

	list.forEach( method => {
		methods[method.name] = method
	})
	
	return methods
}

const _bindTemplate = () => {
	_component.template()
}

const createComponent = () => { 
	const scope = _scope()
	const component = {}
	
	scope.forEach( scopeKey => { 
		if (scopeKey.name !== 'methods' && scopeKey.name !== 'template') {
			component[scopeKey.name] = scopeKey()
		}

		if (scopeKey.name === 'methods') {
			component[scopeKey.name] = _arrayToObject(scopeKey())
		}

		if (scopeKey.name === 'template') {
			component[scopeKey.name] = scopeKey
		}




	})

	component.init = (state, context) => {
		_listenHooks(component.name)
		_bindTemplate()
		render(component.name, state, context)
		_emitEvent(component.name, 'beforeOnRender')
	}

	_component = Object.assign({}, component)
	_components.push(Object.assign({}, component))

	return Object.assign({}, component)

}

const render = (componentName, state) => { 
	const component = _components.find( component => {
		if(component.name === componentName) return component
	})

	const elements = Array.from(document.querySelectorAll(component.name))

	elements.forEach( element => {
		const template = component.template()
		const html = template.HTML(state)

		if (typeof html === 'function') {
			element.innerHTML = html()
		}
	})
	
	_bindStyles(component)
	_initListeners(component)	
}

const _emitEvent = (componentName, eventName) => {
	eventDrive.fire(componentName, eventName)
}

const _getHandlers = (hook) => {
	return hook()
}

const _execHandlers = (hookName, handlers) => { 
	if(!handlers || !handlers.length) return
	elm = Array.from(document.querySelectorAll(_component.name))
	handlers.forEach(handler => { 
		const handle = handler.bind(null, {elm, query, on})
		eventDrive.on(_component.name, hookName, handle)
	})
}

const _initHook = (hookName, hooks, methods) => {
	const hook = hooks.find( hook => {
		if(hook.name === hookName) return hook
	})
	const handlers = _getHandlers(hook)
	_execHandlers(hook.name, handlers)
}

const _listenHooks = (componentName) => {
	const component = _components.find(component => {
		if(component.name === componentName) return component
	})
	const { hooks, methods } = component	
	hooks.forEach( hook => {
		_initHook(hook.name, hooks, methods)
	})
}

const on = (eventName, context, callback) => {
	context.forEach( target => { 
		target[`on${eventName}`] = callback
	})
}

const query = (selector, context) => {
	return context.flatMap( parent => {
		return Array.from(parent.querySelectorAll(selector))
	})
}

const _initListeners = (component) => {
	// console.log(component)
	elm = Array.from(document.querySelectorAll(component.name))
	component.listeners.forEach(listener => {
		listener({ elm, on, query }, component.methods)
	})

	_emitEvent(component.name, 'afterOnRender')
}

const logComponent = () => console.log(_component)

const setStyle = (style) => {
	if(!style) return
	_component['style'] = style.trim()
	.replace(/.+{/g, `${_component.name} $&`)
	// .replace(/\s{2,}/g, '')
	// .replace(/\s*\}/g, '} ')
	// .replace(/\n/g, '')
}

const _isEmptyStyle = () => {
	return !!_component.style === false
}

const _styleExists = () => {
	const styleId = _component.name
	const styleElement = document.querySelector(`style#${styleId}`)
	return !!styleElement	=== true
}

const _bindStyles = (component) => { 
	const styleElement = document.createElement('style')
	const css = component.template().CSS().trim().replace(/.+{/g, `${component.name} $&`)
	styleElement.setAttribute('id', component.name)
	styleElement.textContent = css
	document.body.insertAdjacentElement('beforeend', styleElement)
}
const renderer = (componentName, template) => {
	const component = _components.find( component => {
		if(component.name === componentName) return component
	})

	const elements = Array.from(document.querySelectorAll(component.name))
	component.elements = elements
	component.template = template
	console.log('--->', component.template)
}

const html = (tags, ...values) => {
	return tags.map( (tag, index) => {
		return `${tag}${values[index] || ''}`
	}).join('')
}

export { 
	setScope, 
	createComponent , 
	logComponent, 
	renderer, 
	render,
	setStyle,
	html,
	html as css
}