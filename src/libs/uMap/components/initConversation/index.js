import { html } from '../../../../core/component'
import { controllerFactory } from '../../utils/controller.factory'

const initConversation = (rootNode, state) => {
	
	const controller = controllerFactory()
	
	const template = (state) => html`
		<init-conversation key="${controller.getKey()}" class="umap template">
			<div class="container">
				<div class="title">Event Inicial</div>
			</div>	
			<div class="arrow-wrapper">
				<div class="arrow arrow-left"></div>
				<div class="arrow arrow-top"></div>
				<div class="arrow arrow-right"></div>
				<div class="arrow arrow-bottom"></div>
			</div>	
		</init-conversation>
	`

	const render = (state, context) => {
		context.forEach( rootElement => {
			rootElement.insertAdjacentHTML('beforeend', template(state))
		})
		setListeners()
	}

	const query = (selector, nodeElement) => {
		return Array.from(nodeElement.querySelectorAll(selector))
	}

	const isArrow = (e) => {
		return e.target && e.target.classList.contains('arrow')
	}

	const onMouseMove = (root) => {
		controller.on('onmousemove', [document.body], (e) => { 
			// console.log(e)
			controller.setAxes({ x: e.clientX, y: e.clientY })
			controller.moveElement()
			controller.moveActivedArrow({ x: e.clientX, y: e.clientY })
			controller.moveArrowsBinded({ x: e.clientX, y: e.clientY })
		})
	}

	const onMouseDown = (root) => {
		controller.on('onmousedown', [root], (e) => {
			if(isArrow(e)) return
			controller.setActiveNode(root)
		})
	}

	const onMouseUp = (root) => {
		controller.on('onmouseup', [document.body], (e) => {
			controller.unsetActivedNode()

		})
	}

	const onClick = (root) => {
		controller.on('onclick', [root], (e) => {
			if (!isArrow(e)) return
			if (!controller.hasActivedArrow()) {
				const axes = controller.getArrowPosition(root)
				const key = root.getAttribute('key')
				controller.createArrow(key, axes, rootNode)
			} else {
				controller.setFinalArrowPosition(e.target)
			}

		})
	}

	const setListeners = () => {
		const roots = Array.from(document.querySelectorAll('init-conversation'))
		roots.forEach( root => {
			onMouseMove(root)
			onMouseDown(root)
			onMouseUp(root)		
			onClick(root)	
		})
	}


	return { render }
}

export { initConversation }