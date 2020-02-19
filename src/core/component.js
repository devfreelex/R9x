import { eventDrive } from './eventDrive.js'

const _component = {}
let _scope = null

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

	scope.forEach( key => {
		if(key.name !== 'methods' && key.name !== 'template') {
			_component[key.name] = key()
		}

		if(key.name === 'template') {
			_component[key.name] = key
		}

		if(key.name === 'methods') {
			_component[key.name] = _arrayToObject(key())
		}
	})

	_component.init = (parentNode) => {
		_listenHooks()
		_bindTemplate()
		render()
		_emitEvent(_component.name, 'beforeOnRender')
		_bindStyles()
		_initListeners()
	}

	return Object.assign({}, _component)
}

const render = (parentNode) => {
	const { elements, template } = _component
	if(!elements || !elements.length) {
		console.log(parentNode)
	}
	elements.forEach( element => {
		element.innerHTML = template()
	})
}

const _emitEvent = (componentName, eventName) => {
	eventDrive.fire(componentName, eventName)
}

const _getHandlers = (hook) => {
	return hook()
}

const _execHandlers = (hookName, handlers) => {
	if(!handlers || !handlers.length) return
	handlers.forEach(handler => { 
		eventDrive.on(_component.name, hookName, handler)
	})
}

const _initHook = (hookName, hooks, methods) => {
	const hook = hooks.find( hook => {
		if(hook.name === hookName) return hook
	})
	const handlers = _getHandlers(hook)
	_execHandlers(hook.name, handlers)
}

const _listenHooks = () => {
	const { hooks, methods } = _component	
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
	return context.flatMap( target => {
		return Array.from(target.querySelectorAll(selector))
	})
}

const _initListeners = () => {
	const { listeners, methods } = _component
	const elm = Array.from(document.querySelectorAll(_component.name))

	listeners.forEach(listener => {
		listener({ elm, on, query }, methods)
	})
	_emitEvent(_component.name, 'afterOnRender')
}

const logComponent = () => console.log(_component)

const setStyle = (style) => {
	if(!style) return
	_component['style'] = style.trim()
	.replace(/.+{/g, `${_component.name} $&`)
	.replace(/\s{2,}/g, '')
	.replace(/\s*\}/g, '} ')
	.replace(/\n/g, '')
}

const _isEmptyStyle = () => {
	return !!_component.style === false
}

const _styleExists = () => {
	const styleId = _component.name
	const styleElement = document.querySelector(`style#${styleId}`)
	return !!styleElement	=== true
}

const _insertStyle = () => {
	const styleElement = document.createElement('style')
	styleElement.setAttribute('id', _component.name)
	styleElement.textContent = _component.style
	document.body.insertAdjacentElement('beforeend', styleElement)
}

const _bindStyles = () => {
	if (_isEmptyStyle() || _styleExists()) return
	_insertStyle()
}
const renderer = (template) => {
	
	const elements = Array.from(document.querySelectorAll(_component.name))
	_component.elements = elements
	_component.template = template
}

const html = (tags, ...values) => {
	return tags.map( (tag, index) => {
		return `${tag}${values[index] || ''}`
	}).join('')
}

export { 
	setScope, 
	createComponent , 
	_initListeners, 
	logComponent, 
	renderer, 
	render,
	setStyle,
	html,
	html as css
}