import { html } from '../../../core/component'
const controllerFactory = () => {
	const context = {
		activedNode: {element:null},
		activedArrow: {element:null},
		axes:{ x:0, y: 0}
	}

	const exception = () => {
		throw new Error('Active node is not defined and must be.')
	}

	const isValid = (element) => {
		return !!element
	}	

	const hasArrow = (container) => {
		const key = container.getAttribute('key') || null
		if(!key) return false
		return !!document.querySelector(`[key-initial="${key}"]`)
	}

	const isActiveArrow = (element) => {
		const initialKey = element.getAttribute('key-initial')
		const finalKey = element.getAttribute('key-final')
		return element && initialKey && !finalKey
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
		setActivedArrow(key)
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

	const getBasePosition = () => {
		const arrowElement = context.activedArrow.element
		return arrowElement.getAttribute('d').replace('m', '').split(' ')
	}

	const getBaseX = () => {
		return getBasePosition().shift().split(',').shift()
	}

	const getBaseY = () => {
		return getBasePosition().shift().split(',').pop()		
	}

	const setActiveNode = (element) => {
		setDragStyle(element)
		context.activedNode.element = element
	}

	const setActivedArrow = (key) => {
		context.activedArrow.element = document.querySelector(`[key-initial="${key}"]`)
	}

	const setFinalKey = (key) => {
		context.activedArrow.element.setAttribute('key-final', key)
	}

	const setFinalArrowPosition = (target, mouse) => {
		const arrowElement = context.activedArrow.element
		const targetAxes = target.getBoundingClientRect()
		const axes = { x: targetAxes.left - getBaseX(), y: targetAxes.top - (parseInt(getBaseY()) + 85) }
		const basePosition = getBasePosition().shift()
		const newPosition = `m${basePosition} ${axes.x},${axes.y}`
		const keyFinal = target.closest('.umap').getAttribute('key')
		arrowElement.setAttribute('key-final', keyFinal)
		arrowElement.setAttribute('d', newPosition)	
		unsetActivedArrow()
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

	const hasActivedArrow = () => {
		return !!context.activedArrow.element
	}

	const unsetActivedArrow = () => {
		if(!context.activedArrow.element) return
		context.activedArrow = {element: null}
	}

	const setAxes = (axes) => {
		if (!isValid(context.activedNode.element)) return
			Object.assign(context.axes, axes)
	}

	const moveArrow = () => {
		if (!hasArrow(context.activedNode.element)) return
		const container = context.activedNode.element
		const key = container.getAttribute('key')
		const arrows = document.querySelectorAll(`[key-initial="${key}"]`)
		let arrowPosition, axes, offsetTop, basePosition, newPosition
		arrows.forEach( arrow => {
			arrowPosition = arrow.getAttribute('d')
			axes = getArrowPosition(container)
			offsetTop = getTargetHeight(container) / 2
			basePosition = `m${axes.x},${axes.y - offsetTop - 38}`
			newPosition = `${basePosition} ${arrowPosition.split(' ').slice(1)}`

			arrow.setAttribute('d', newPosition)			
		})
	}

	const moveElement = () => { 
		if (!isValid(context.activedNode.element)) return

		const style = `top:${context.axes.y}px; left:${context.axes.x}px;`
		context.activedNode.element.setAttribute('style', style)
		moveArrow()
 	}

	const moveActivedArrow = (mouse) => {
		const arrowElement = context.activedArrow.element || null
		if (!arrowElement) return
		
		const basePosition = arrowElement.getAttribute('d').replace('m','')
		const baseX = basePosition.split(' ').shift().split(',').shift()
		const baseY = basePosition.split(' ').shift().split(',').pop()
		
		arrowElement.setAttribute('d', `m${baseX},${baseY} ${mouse.x - baseX},${mouse.y - (parseInt(baseY) + 75)}`)
		// console.log(`m${baseX},${baseY} ${baseX},100`)
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
		unsetActivedArrow,
		createArrow, 
		moveElement, 
		logger,
		moveActivedArrow,
		hasActivedArrow,
		setFinalArrowPosition
	}
}

export { controllerFactory }