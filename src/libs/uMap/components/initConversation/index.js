import { html } from '../../../../core/component'
import { listenerFactory } from '../../utils/listener.factory'

const initConversation = () => {

	const listener = listenerFactory()

	const template = (state) => html`
		<init-conversation class="umap template">
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

	const onMouseMove = (root) => {
		listener.on('onmousemove', [document.body], (e) => {
			listener.setAxes({ x: e.clientX, y: e.clientY })
			listener.moveElement()
		})
	}

	const onMouseDown = (root) => {
		listener.on('onmousedown', [root], (e) => {
			listener.setActiveNode(root)
		})
	}

	const onMouseUp = (root) => {
		listener.on('onmouseup', [document.body], (e) => {
			listener.unsetActivedNode()
		})
	}

	const setListeners = () => {
		const roots = Array.from(document.querySelectorAll('init-conversation'))
		roots.forEach( root => {
			onMouseMove(root)
			onMouseDown(root)
			onMouseUp(root)			
		})
	}



	return { render }
}

export { initConversation }