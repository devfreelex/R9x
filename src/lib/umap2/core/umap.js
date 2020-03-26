import templates from './templates/templates'
import { eventDrive } from './events/eventDrive'

const uMap = () => {
	let _context = null
	let _arrowState = []
	let _selectedArrow = null
	let $node = null
	let _nodes = []
	const _templates = templates
	const eventEmitter = eventDrive()

	const _getTemplate = (nodeName) => {
		return _templates[nodeName]
	}

	const _getKey = () => {
		const min = 1
		const max = 999999
		const key = (Math.random() * (max - min) + min).toString();
		return Math.floor(key)
	}

	const _getArrowKeys = (curves) => {
		return curves.map(curve => {
			return {
				baseKey: +curve.getAttribute('base-key') || null,
				apexKey: +curve.getAttribute('apex-key') || null
			}
		})
	}

	const _getArrows = () => {
		return Array.from(_context.querySelectorAll('.curve'))
	}

	const _getArrowKeyByAttr = (arrow, attrKey) => {
		return +arrow.getAttribute(`${attrKey}`) || null
	}
	const _getArrowAxes = (positions) => {
		const axesPoints = positions.map((item, index) => {
			const items = item.split(',')
			return { [`p${index + 1}`]: { x: +items[0], y: +items[1] } }
		})

		const axes = {}
		axesPoints.forEach(axe => Object.assign(axes, axe))
		return axes
	}

	const _getArrowPoints = (arrowElement) => {
		const pointsStr = arrowElement.getAttribute('d')
		return pointsStr.replace('M', '').split(' ')
	}

	const _getArrowApex = (arrowElement) => {
		return arrowElement.getAttribute('d').replace('M', '').split(' ').pop()
	}

	const _getArrowBase = (arrowElement) => {
		return arrowElement.getAttribute('d').replace('M', '').split(' ').shift()
	}

	const _createElement = (nodeName, key) => {
		const element = document.createElement(nodeName.replace(/_/g, '-'))
		element.classList.add('node')
		element.setAttribute('draggable', 'true')
		element.setAttribute('node-key', key)
		return element
	}

	const _setDragStyle = (target) => {
		target.classList.add('on-drag')
	}

	const _removeDragStyle = (target) => {
		target.classList.remove('on-drag')
	}

	const _filterArrowsByKey = (arrows, key) => {

		return arrows.filter(arrow => {
			const arrowBaseKey = _getArrowKeyByAttr(arrow, 'base-key')
			const arrowApexKey = _getArrowKeyByAttr(arrow, 'apex-key')
			if (+key === arrowBaseKey || +key === arrowApexKey) return arrow
		})

	}


	const _getNotEmptyArray= (listItems) => {
		if(!listItems || !listItems.length) return
		return listItems
	}

	const _hasBaseAndApexKeys = (arrowInfo) => {
		return 'baseKey' in arrowInfo && 'apexKey' in arrowInfo
	}

	const _isNotEquals = (key, otherKey) => {
		return key !== otherKey
	}
	const _updateArrowContext = (arrowInfo) => {
		if(!arrowInfo) return
		let arrows = Array.from(_context.querySelectorAll('.curve'))
		const arrowState = {
			arrows:[]
		}

		arrowState.arrows = arrows.map( arrowElement => { 
			const groupId = arrowElement.closest('.group').getAttribute('id')
			const arrowClone = arrowElement.cloneNode(true)
			const arrowKey = arrowClone.getAttribute('arrow-key')
			const apexKey = arrowClone.getAttribute('apex-key')
			const baseKey = arrowClone.getAttribute('base-key')
			const button =  _context.querySelector(`[rel-key="${arrowKey}"]`)?.outerHTML
			const position = arrowClone.getAttribute('d')
			const template = arrowClone.outerHTML
	
			return {
				arrowInfo:{ groupId, arrowKey, apexKey, baseKey, position, button, template }
			}
		})
		
		_arrowState = arrowState.arrows

	}

	const _updateArrowPositionOnNodeMove = (nodeKey, mouseAxes, offsetArray) => {
		const node = _getNodeByKey(nodeKey)
		const nodeAxes = _getAxes(node.element)
		const arrows = _filterArrowsByKey(_getArrows(), nodeKey)
		let arrowBaseKey, arrowApexKey = null

		arrows.forEach(arrow => {
			arrowBaseKey = arrow.getAttribute('apex-key')
			arrowApexKey = arrow.getAttribute('base-key')
			if (nodeKey === arrowBaseKey || nodeKey === arrowApexKey) _setArrowApex(arrow, nodeAxes, mouseAxes, offsetArray)
		})

	}

	const _setArrowApex = (arrowElement, nodeAxes, mouseAxes, offsetArray) => {


		let position = null
		const arrowBase = _getArrowBase(arrowElement)
		const arrowKey = arrowElement.getAttribute('arrow-key')
		const arrowBaseKey = arrowElement.getAttribute('base-key')
		const arrowApexKey = arrowElement.getAttribute('apex-key')
		const arrowPoints = _getArrowAxes(_getArrowPoints(arrowElement))
		
		const nodeOrigin = _getNodeByKey(arrowBaseKey)
		const nodeTarget = _getNodeByKey(arrowApexKey)
		const arrowBaseX = +arrowBase.split(',').shift()
		const arrowBaseY = +arrowBase.split(',').pop()
		const nodeOriginInfo = _getNodeInfo(nodeOrigin.element)
		const nodeTargetInfo = _getNodeInfo(nodeTarget.element)

		const nodeOriginOffset = _getOffset(nodeOrigin.element)
		const nodeTargetOffset = _getOffset(nodeTarget.element)

		const button = _context.querySelector(`[rel-key="${arrowKey}"]`)?.outerHTML
		const template =  arrowElement.outerHTML

		if(nodeTargetInfo.top > nodeOriginInfo.top) {
			const baseOrigin = `${nodeOriginInfo.left + nodeOriginOffset.left},${nodeOriginInfo.top + nodeOriginInfo.height}`
			const apexTarget = `${nodeTargetInfo.left + nodeTargetOffset.left},${nodeTargetInfo.top - 45}`
			const points = {
				p1: {x:nodeOriginInfo.left + nodeOriginOffset.left, y: nodeTargetInfo.top - 65},
				p2:{x: nodeTargetInfo.left + nodeTargetOffset.left , y: nodeTargetInfo.top - 65},
			}

			_updateArrowButton(arrowKey, apexTarget)
			_updateArrowContext({ baseKey: arrowBaseKey, apexKey: arrowApexKey, position, button, template, arrowKey })	
			position = `M${baseOrigin} ${points.p1.x},${points.p1.y} ${points.p2.x},${points.p2.y} ${apexTarget}`
			arrowElement.setAttribute('d', position)
			return
		}

		const baseOrigin = `${nodeOriginInfo.left + nodeOriginOffset.left},${nodeOriginInfo.top + nodeOriginInfo.height}`
		const apexTarget = `${nodeTargetInfo.left + nodeTargetOffset.left},${nodeTargetInfo.top - 45}`
		const points = {
			p1: {x:parseInt(baseOrigin.split(',')[0]), y: parseInt(baseOrigin.split(',')[1]) + 45},
			p2:{x: nodeOriginInfo.left - 45, y: parseInt(baseOrigin.split(',')[1]) + 45},
			p3:{x: nodeOriginInfo.left - 45, y:parseInt(nodeOriginInfo.top) - 45},
			p4:{x: nodeOriginInfo.left + 45, y: parseInt(nodeOriginInfo.top) - 45},
			p5:{x: nodeOriginInfo.left - 45, y: parseInt(nodeOriginInfo.top) - 45},
			p6:{x:parseInt(nodeTargetInfo.left) - 45, y: parseInt(apexTarget.split(',')[1]) - 20},
			p7:{x:parseInt(apexTarget.split(',')[0]), y: parseInt(apexTarget.split(',')[1]) - 20},
		}

		_updateArrowButton(arrowKey, apexTarget)
		_updateArrowContext({ baseKey: arrowBaseKey, apexKey: arrowApexKey, position, button, template, arrowKey })	
		position = `M${baseOrigin} ${points.p1.x},${points.p1.y} ${points.p2.x},${points.p2.y} ${points.p3.x},${points.p3.y} ${points.p4.x},${points.p4.y} ${points.p4.x},${points.p5.y} ${points.p4.x},${points.p7.y} ${points.p7.x},${points.p7.y} ${apexTarget}`
		arrowElement.setAttribute('d', position)
	}

	const _updateSelectedArrowOnMouseMove = (mouseAxes) => {
		const arrowKey = _selectedArrow.arrowInfo.arrowKey
		const arrowElement = _context.querySelector(`[arrow-key="${arrowKey}"]`)
		const arrowBase = _getArrowBase(arrowElement)
		const arrowPoints = _getArrowAxes(_getArrowPoints(arrowElement))
		let position = null

		const arrowBaseKey = arrowElement.getAttribute('base-key')
		const arrowApexKey = arrowElement.getAttribute('apex-key')
		const node = _getNodeByKey(arrowBaseKey)
		const arrowBaseX = +arrowBase.split(',').shift()
		const arrowBaseY = +arrowBase.split(',').pop()
		const nodeInfo = _getNodeInfo(node.element)
		const offset = _getOffset(node.element)

		if (arrowBaseY > mouseAxes.y) {
			position = `M${arrowBase} ${arrowPoints.p1.x},${arrowBaseY + 20} ${arrowBaseX - (offset.left + 20)},${arrowBaseY + 20} ${arrowBaseX - (offset.left + 20)},${mouseAxes.y - 50} ${mouseAxes.x},${mouseAxes.y - 50} ${mouseAxes.x},${mouseAxes.y - 25}`
			arrowElement.setAttribute('d', position)
			return
		}

		position = `M${arrowBase} ${arrowPoints.p1.x},${mouseAxes.y - 50} ${mouseAxes.x},${mouseAxes.y - 50} ${mouseAxes.x},${mouseAxes.y - 25}`
		arrowElement.setAttribute('d', position)
	}

	const _updateNodePosition = (nodeElement, axes) => {
		const nodeName = nodeElement.nodeName.toLowerCase()
		const nodeKey = nodeElement.getAttribute('node-key')
		const offsetArray = [68, 68, 43, 68]
		const node =  _getNodeByKey(nodeKey)
		
		const style = `top:${axes.y}px; left:${axes.x}px`
		const nodeInfo = _getNodeInfo(nodeElement)
		const offset = _getOffset(nodeElement)
		nodeElement.setAttribute('style', style)
		node.state.position = `top:${axes.y + 55}px; left:${nodeInfo.width + axes.x}px;`		

		_updateArrowPositionOnNodeMove(nodeKey, axes, offsetArray)
	}

	const _nodeContains = (state, key) => {
		if (!state.arrows || !state.arrows.length) return
		return state.arrows.some(arrow => {
			return arrow.arrowInfo.arrowKey === key
		})
	}

	const _getArrowByKey = (key) => {
		let result = null
		_nodes.forEach(node => {
			if (!_nodeContains(node.state, parseInt(key))) return null

			result = node.state.arrows.find(arrow => {
				if (arrow.arrowInfo.arrowKey === parseInt(key)) return arrow
			})
		})
		return result
	}

	const _getArrowElementByKey = (key) => {
		return _context.querySelector(`[arrow-key="${key}"]`)
	}

	const _bindGlobalEvents = () => {
		let arrow = null
		let arrowKey = null
		window.onmousemove = (e) => {
			if (!_selectedArrow) return
			_updateSelectedArrowOnMouseMove({ x: e.clientX, y: e.clientY })
		}
	}

	const _bindNodeEvents = (target) => {

		target.drag = (e) => {
			// 
		}

		target.ondragstart = (e) => {
			_setDragStyle(e.target)
		}

		target.ondragend = (e) => {
			_removeDragStyle(e.target)
			_updateNodePosition(e.target, { x: e.clientX, y: e.clientY })
		}

		target.onclick = (e) => {
			if(e.target.classList.contains('btn-edite')) {
				const nodeKey = target.getAttribute('node-key')
				eventEmitter.fire('on-update', {nodeKey})
				return
			}
			if(e.target.classList.contains('btn-remove')) {
				const nodeKey = target.getAttribute('node-key')
				eventEmitter.fire('on-remove', { nodeKey })
				return
			}
			if (!e.target.classList.contains('connection-handle')) return
			_createArrow(target)
		}

	}

	const _getSvg = () => {
		return _context.querySelector('#svg')
	}

	const _getNodeInfo = (target) => {
		return target.getBoundingClientRect()
	}

	const _getOffset = (target) => {
		const targetInfo = _getNodeInfo(target)
		const offsetTop = targetInfo.height / 2
		const offsetLeft = targetInfo.width / 2
		return { top: offsetTop, left: offsetLeft }
	}

	const _getAxes = (target) => {
		const nodeInfo = _getNodeInfo(target)
		const position = { x: +nodeInfo.x, y: +nodeInfo.y }
		const offset = _getOffset(target)

		return {
			base: { x: position.x + offset.left, y: position.y + (offset.top * 2) },
			apex: { x: position.x + offset.left, y: position.y + 100 + (offset.top * 2) }
		}
	}

	const _getNodeByKey = (key) => {
		return _nodes.find(node => {
			if (node.state.nodeKey === +key) return node
		})
	}

	const _setArrowButtonTemplate = (axes, arrowKey) => {
		return `<div class="arrow-button" style="left:${axes.x}px; top:${axes.y}px;" rel-key="${arrowKey}">x</div>`		
	}

	const _updateArrowButton = (relKey, axes) => {
		const button = _context.querySelector(`[rel-key="${relKey}"]`)
		
		if(!relKey || !button || !axes) return
		const position = {
			x: Math.floor(axes.split(',').shift()) - 11,
			y: Math.floor(axes.split(',').pop()) - 30
		}
		const style = `left:${position.x}px; top:${position.y}px;`

		button.setAttribute('style', style)
		
	}

	const _removeChildNode = (childKey, parentNode) => {
		const nodes = parentNode.state.nodes.filter( parentNode => {
			if(+parentNode.state.nodeKey !== +childKey) return parentNode
		})
		parentNode.state.nodes = nodes
	}

	const _removeArrowButton = (relKey, button) => {
		const arrowElement = _getArrowElementByKey(relKey)
		const parentNode = _getNodeByKey(arrowElement.getAttribute('base-key'))
		const childNodeKey = arrowElement.getAttribute('apex-key')
		const group = arrowElement.closest('.group')
		_removeChildNode(childNodeKey, parentNode)
		group.remove()
		button.remove()		
	}

	const _bindArrowButtonEvent = (relKey) => {
		const button = _context.querySelector(`[rel-key="${relKey}"]`)
		button.onclick = () => _removeArrowButton(relKey, button)

	}

	const _renderArrowButton = (arrowKey) => {
		const arrowElement = _getArrowElementByKey(arrowKey)
		const position = arrowElement.getAttribute('d')
		const apexPosition = position.split(' ').pop()
		const axes = { 
			x: Math.floor(apexPosition.split(',').shift()) - 11, 
			y: Math.floor(apexPosition.split(',').pop() - 32)
		}
		const template = _setArrowButtonTemplate(axes, arrowKey)
		_context.insertAdjacentHTML('beforeend', template)
		_bindArrowButtonEvent(arrowKey)
	}

	const _renderArrow = (context, state) => {
		const arrowElement = _createGroupElement()
		state.arrows.forEach(arrow => {
			arrowElement.innerHTML = _templates.arrow(arrow.arrowInfo)
			context.append(arrowElement)
		})
	}

	const _createGroupElement = (groupId) => {
		const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		let groupIdValue = null
		groupId ? groupIdValue = groupId : groupIdValue = _getKey()
		group.setAttribute('id', groupIdValue)
		group.classList.add('group')
		return group
	}

	const _updateState = (state, callback) => {
		callback(state)
	}

	const _selectLastArrow = (state) => {
		let lastIndex = null
		const arrowsLength = state.arrows.length

		arrowsLength
			? lastIndex = arrowsLength - 1
			: lastIndex = null

		if (lastIndex === null) return
		_selectedArrow = state.arrows[lastIndex]
	}

	const _unselectLastArrow = () => {
		_selectedArrow = null
	}

	const _setUpexKey = (nodeElement) => {
		if (!_selectedArrow) return
		const nodeKey = nodeElement.getAttribute('node-key')
		const arrowKey = _selectedArrow.arrowInfo.arrowKey
		const arrowElement = _getArrowElementByKey(arrowKey)
		arrowElement.setAttribute('apex-key', nodeKey)
		return arrowKey
	}

	const setCustomNode = (nodeType, template) => {
		if (!typeof nodeType === 'string') throw new Error('nodeType (param in setCustomNode) is not string type and must be.')
		if (!typeof template === 'function') throw new Error('template (param in setCustomNode) is not function type and must be.')

		_templates[nodeType] = template
	}

	const logNodes = () => {
		console.log(_templates)
	}

	const _addArrowInNodeState = (nodeKey, arrowKey) => {
		const node = _getNodeByKey(nodeKey)
		const nodeElement = _context.querySelector(`[node-key="${nodeKey}"]`)
		const offset = _getOffset(nodeElement)
		const nodeAxes = _getAxes(nodeElement)

		_updateState(node.state, (state) => {
			let payload = { arrows: [{ arrowInfo: { arrowKey, nodeKey, offset, nodeAxes } }] }

			if (!Array.isArray(state.arrows) || !state.arrows.length) {
				Object.assign(state, payload)
				return
			}

			state.arrows.push(payload.arrows.shift())
		})

	}

	const _isNotChild = (childKey, parentNode) => {
		if(!parentNode.state.hasOwnProperty('nodes') || !parentNode.state.nodes.length) return true
		return parentNode.state.nodes.every( node => {
			return +node.state.nodeKey !== +childKey
		})
	}

	const _addChildNode = (childNodeKey, parentNodeKey) => {
		const childNode = _getNodeByKey(childNodeKey)
		const parentNode = _getNodeByKey(parentNodeKey)

		if(_isNotChild(childNodeKey, parentNode)) {
			if(!parentNode.state.hasOwnProperty('nodes')) parentNode.state.nodes = []
			parentNode.state.nodes.push(childNode)
		}
		// console.log(parentNode.state.nodes)
	}

	const _connectArrow = (nodeElement) => {
		if (!!nodeElement === false) return
		const connector = nodeElement.querySelector('.connector')
		const nodeKey = nodeElement.getAttribute('node-key')
		let nodeAxes, arrowKey, baseKey, arrowElement = null

		connector.onclick = (e) => {
			nodeAxes = _getAxes(nodeElement)
			arrowKey = _setUpexKey(nodeElement)
			arrowElement = _context.querySelector(`[arrow-key="${arrowKey}"]`)
			baseKey = arrowElement.getAttribute('base-key')
			const targetInfo = e.target.getBoundingClientRect()
			const axes = { x: targetInfo.x + (targetInfo.width / 2), y: targetInfo.y + (targetInfo.height / 2) }
			const offsetArray = [50, 50, 25, 50]
			_addArrowInNodeState(nodeKey, arrowKey)
			_addChildNode(baseKey, nodeKey)
			_renderArrowButton(arrowKey)
			_setArrowApex(arrowElement, nodeAxes, axes, offsetArray)
			_unselectLastArrow()
		}

	}

	const _createArrow = (target) => {
		const svg = _getSvg()
		const nodeKey = target.getAttribute('node-key')
		const arrowKey = _getKey()
		const node = _getNodeByKey(nodeKey)
		const offset = _getOffset(target)
		const nodeAxes = _getAxes(target)
		const baseKey = nodeKey
		const apexKey = null

		_updateState(node.state, (state) => {
			let payload = { arrows: [{ arrowInfo: { arrowKey, nodeKey, offset, nodeAxes, baseKey, apexKey } }] }

			if (!Array.isArray(state.arrows) || !state.arrows.length) {
				Object.assign(state, payload)
				return
			}

			state.arrows.push(payload.arrows.shift())
		})
		_renderArrow(svg, node.state)
		_selectLastArrow(node.state)

	}

	const _renderSvg = (element) => {
		_context.insertAdjacentElement('beforeend', element)
	}

	const _createSvg = () => {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
		svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
		svg.setAttribute('id', 'svg')
		svg.classList.add('umap-svg')
		return svg
	}

	const setContext = (context) => { 
		_context = document.querySelector(`${context}`)
		_context.classList.add('umap')
		_renderSvg(_createSvg())
		_bindGlobalEvents()
	}

	const $render = () => {
		$node.element.innerHTML = $node.template($node.state)
		_context.insertAdjacentElement('beforeend', $node.element)
		_bindNodeEvents($node.element)
		_connectArrow($node.element)
	}

	const createArrowsFromJSON = (arrows) => { 
		arrows.forEach(arrow => {
			const arrowElement = _createGroupElement(arrow.arrowInfo.arrowKey)
			const svg = _getSvg()
			arrowElement.innerHTML = _templates.arrow(arrow.arrowInfo)
			svg.innerHTML = arrowElement.outerHTML
			_renderArrowButton(arrow.arrowInfo.arrowKey)
		})		
	}

	const _setNodePosition = (nodeElement, state) => {
		const style =  state.position || `top:120px; left:50%;`
		nodeElement.setAttribute('style', style)
	}

	const createNodesFromJSON = (payload) => {
		if(!payload) return methods

		const nodes = payload.nodes ?? []
		const arrows = payload.arrows ?? []

		nodes.forEach( node => {
			createNode(node.state.nodeType, node.state)
		})

		createArrowsFromJSON(arrows)
		return methods
	}

	const isRepeated = (nodeKey) => {
		return _nodes.some(node => {
			return node.state.nodeKey === nodeKey
		})
	}
	const createNode = (nodeName, nodeState) => {
		$node = {}
		$node.state = Object.assign({nodeType: nodeName}, nodeState, { nodeKey: nodeState.nodeKey ?? _getKey() })
		$node.element = _createElement(nodeName, $node.state.nodeKey)
		$node.template = _getTemplate(nodeName)
		_setNodePosition($node.element, $node.state)
		if(isRepeated($node.state.nodeKey)) return methods
		_nodes.push($node)

		return methods
	}

	const render = () => {
		_nodes.forEach(node => {
			$node = node
			$render.apply(null, $node)
		})
	}

	const _getArrowsInfo = () => {

		const groups = Array.from(document.querySelectorAll('g'))
		let arrow, arrowKey = null

		return groups.map( group => {
			arrow = group.querySelector('#curve')
			arrowKey = arrow.getAttribute('arrow-key')
			return         {
				"arrowInfo": {
					"groupId": group.getAttribute('id'),
					"apexKey": arrow.getAttribute('apex-key'),
					"baseKey": arrow.getAttribute('base-key'),
					"arrowKey": arrowKey,
					"position": arrow.getAttribute('d'),
					"template": arrow.outerHTML,
					// "button":  _context.querySelector(`[rel-key="${arrowKey}"]`)?.outerHTML
				}
			}
		})
	} 

	const getState = () => { 
		return  Object.assign({nodes: _nodes, arrows: _getArrowsInfo()})
	}

	const updateNode = (nodeKey, payload) => {
		if(!nodeKey || !payload) return
		const node = _getNodeByKey(nodeKey)
		Object.assign(node.state, payload)
		$node = node
		$render()

	}

	const removeNode = (nodeKey) => {
		
		const nodeList = _nodes.filter( node => {
			if(node.state.nodeKey !== +nodeKey) return node
		})

		const node = _getNodeByKey(nodeKey)
		node.element.remove()
		
		_nodes = nodeList
	}

	const getEventEmitter = () => {
		return eventEmitter
	}


	const methods = {
		createNode,
		createNodesFromJSON,
		createArrowsFromJSON,
		render,
		setContext, 
		getState,
		setCustomNode,
		logNodes,
		updateNode,
		getEventEmitter,
		removeNode
	}

	return methods
}

export { uMap }