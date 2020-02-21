import { initConversation } from './components/initConversation'

const uMap = () => {
	
	const components = {
		initConversation: initConversation()
	}

	const getComponent = (state, componentName) => {
		return initConversation(state)
	}


	return {
		getComponent
	}
}

export { uMap }