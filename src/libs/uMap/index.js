import { initConversation } from './templates/initConversation'

const uMap = () => {
	const templates = {
		init_conversation:initConversation
	}

	const render = (state, templateName, context) => {
		const mapArea = context.querySelector('#uMapArea')
		const templateHtml = templates[templateName](state)
		mapArea.insertAdjacentHTML('beforeend', templateHtml)
	}

	return {
		render
	}
}

export { uMap }