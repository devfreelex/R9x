const listenerFactory = () => {
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

	return { on, setActiveNode, unsetActivedNode, setAxes, moveElement, logger }
}

export { listenerFactory }