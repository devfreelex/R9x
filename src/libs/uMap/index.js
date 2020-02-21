import { initConversation } from './components/initConversation'

const uMap = () => {
	const rootNode = document.querySelector('#uMapArea')
	
	const components = {
		initConversation
	}

	const getComponent = (state, componentName) => {
		if(typeof components[componentName] !== 'function') return
		return components[componentName](rootNode, state)
	}

	return {
		getComponent
	}
}

export { uMap }