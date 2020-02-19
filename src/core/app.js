import { routerFactory } from '../store/router.js'

const appFactory = () => {
	let _components = {}
	let _store = null
	let _router = routerFactory()

	const _setStore = (store) => {
		_store = store
	}

	const _setRoutes = (routes) => {
		_router.use(routes)
	}

	const _setComponents = (components) =>{
		_components = components
	}

	const _initStore = () => {
		_store()
	}

	const _initComponents = () => {
		for (let component of _components) {
			component().init()
		}		
	}

	const _initRouter = () => {
		// if(!_router || !_router.init) return
		// _router.init()
	}

	const use = (type, value) => {
		switch (type) {
			case 'store': 
				_setStore(value)
				break;

			case 'routes':
				_setRoutes(value)
				break;

			case 'components':
				_setComponents(value)
				break;

			default:
				throw new Error(`The ${type} property is not supported`)
		}
		
		return {use}
	}

	const init = () => {
		_initStore()
		_initComponents()
		_initRouter()
	}

	return {
		use, init
	}
}

export { appFactory }