import { html } from '../../../core/component'
const controllerFactory = () => {
	const context = {
		activedNode: {element:null},
		axes:{ x:0, y: 0}
	}

	const exception = () => {
		throw new Error('Active node is not defined and must be.')
	}

	const isValid = (element) => {
		return !!element
	}	

	const on = (eventName, nodes, callback) => {
		nodes.forEach( node =>  node[eventName] = callback)
	}

	const createArrow = (axes, editorContext) => {
		console.log(`M${ axes.x }, ${ axes.y }`)
		const svg = editorContext.querySelector('svg')
		const arrowTemplate = html`
				<g id="main">
					<circle id="curveController" cx="175" cy="100" r="5"/>
					<path id="curve" d="m${axes.x},${axes.y - 75} 0,100"/>
				</g>		
		`
		svg.insertAdjacentHTML('beforeend', arrowTemplate)
	}

	const getScrollLeft = () => {
		return window.pageXOffset || document.documentElement.scrollLeft
	}
	const getScrollTop = () => {
		return window.pageYOffset || document.documentElement.scrollTop
	}
	const getTargetWidth = (target) => {
		return target.offsetWidth		
	}
	const getTargetHeight = (target) => {
		return target.offsetHeight		
	}

	const getArrowPosition = (root) => {
		const pos = getPosition(root)
		const height = getTargetHeight(root)
		const offsetLeft = getTargetWidth(root) / 2
		return { x: (pos.left + offsetLeft), y: (pos.top + height) }		
	}

	const getPosition = (target) => {
		const element = target.getBoundingClientRect()

		return { 
			top: element.top + getScrollTop(), 
			left: element.left + getScrollLeft() 
		}
		
	}

	const setActiveNode = (element) => {
		setDragStyle(element)
		context.activedNode.element = element
	}

	const setDragStyle = (element) => {
		if(!isValid(element)) return
		element.classList.add('on-drag')
	}

	const unsetDragStyle = (element) => {
		if(!isValid(element)) return
		element.classList.remove('on-drag')
	}

	const unsetActivedNode = () => {
		unsetDragStyle(context.activedNode.element)
		context.activedNode = {element: null}
		context.axes = {x:0, y:0}
	}

	const setAxes = (axes) => {
		if (!isValid(context.activedNode.element)) return
			Object.assign(context.axes, axes)
	}

	const moveElement = () => { 
		if (!isValid(context.activedNode.element)) return

		const style = `top:${context.axes.y}px; left:${context.axes.x}px;`
		context.activedNode.element.setAttribute('style', style)
	}

	const logger = () => {
		console.log(context)
	}

	return { 
		on, 
		getPosition, 
		getTargetWidth,
		getTargetHeight,
		getArrowPosition,
		setAxes, 
		setActiveNode, 
		unsetActivedNode, 
		createArrow, 
		moveElement, 
		logger 
	}
}

export { controllerFactory }