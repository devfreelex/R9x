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

	const createArrow = (key, axes, editorContext) => {

		const svg = editorContext.querySelector('svg')

		const arrowTemplate = html`
				<g id="main">	
					<defs>
							<marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
									<circle class="circle" cx="5" cy="5" r="3"/>
							</marker>

							<marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
										orient="auto">
									<path class="line-arrow" d="M2,2 L2,11 L10,6 L2,2" />
							</marker>
					</defs>									
					<circle id="curveController" cx="175" cy="100" r="5"/>
					<path id="curve" key-initial="${key}" key-final="" d="m${axes.x},${axes.y - 75} 0,100"/>
				</g>		
		`
		svg.insertAdjacentHTML('beforeend', arrowTemplate)
	}

	const getKey = () => {
		const min = 1
		const max = 999999
		const key = (Math.random() * (max - min) + min).toString();
		return Math.floor(key)
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
		getKey,
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