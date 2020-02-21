import { html } from '../../../../core/component'
import { listenerFactory } from '../../utils/listener.factory'

const initConversation = () => {

	const listener = listenerFactory()

	const template = (state) => html`
		<init-conversation class="umap template">
			<div class="container">
				<div class="title">Event Inicial</div>
			</div>		
		</init-conversation>
	`

	const render = (state, context) => {
		context.forEach( rootElement => {
			rootElement.insertAdjacentHTML('beforeend', template(state))
			setListeners(document.querySelector('init-conversation'))
		})
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

	const setListeners = (root) => {
		onMouseMove(root)
		onMouseDown(root)
		onMouseUp(root)
	}



	return { render }
}

export { initConversation }