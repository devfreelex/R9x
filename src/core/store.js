const _state = {}
const _actions = {}
const _mutations = {}
const _watchers = {}

const assign = (target, payload) => {
	Object.assign(target, payload)
}

const setStore = (storeConfig) => {
	const { state, actions, mutations } = storeConfig
	assign(_state, state)
	assign(_actions, actions)
	assign(_mutations, mutations)
}

const execWatchers = (mutationId) => {
	_watchers[mutationId].forEach( callbackProxy => {
		callbackProxy().forEach(watcher => watcher(_state))
	})
}

const dispatch = async (mutationId, payload) => {
	await _mutations[mutationId](_state, payload)
	execWatchers(mutationId)
}

const watch = (mutationList, callback) => {
	mutationList.forEach( mutation => {
		Array.isArray(_watchers[mutation])
		? _watchers[mutation] = [..._watchers[mutation], callback]
		:	_watchers[mutation] = [callback]
	})
}

const mapActions = (actionId) => {
	if(!actionId) {
		const keys = Object.keys(_actions)
		return keys.map( key => _actions[key])
	}
	return _actions[actionId]
}

const logState = () => {
	console.log('---------------------------------------------')
	console.log('---->',_state)
	console.log('---------------------------------------------')
}

const getState = () => _state

export { getState, setStore, dispatch, watch, mapActions, logState }