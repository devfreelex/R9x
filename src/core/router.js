const routerFactory = () => {
	let _routes = []
	let _routerElement = null
	let _component = null
	const _selector = 'router-view'


	const use = (value) => {
		_routes = [..._routes, ...value]
	}

	const _setRouteTitle = (route) => {
		const title = document.querySelector('head > title')
		title.innerHTML = route.title
	}

	const _setElement = () => {
		_routerElement = document.createElement(_selector)
	}

	const _goToHash = (route) => {
		window.location.hash = route.hash
	}

	const _getFirstRoute = () => {
		const routes =  [..._routes]
		return routes.shift()
	}

	const _getHash = () => {
		return window.location.hash
	}

	const _getRouteByHash	 = (hash) => {
		return _routes.find( route => {
			if(route.hash === hash) return route
		})
	}

	const _getRouteDefault = () => {
		const routes = [..._routes]
		return routes.pop()
	}

	const _renderComponent = ({component}) => {
		console.log(_routerElement)
	}

	const _initOnLoad = () => {
		window.addEventListener('DOMContentLoaded', () => {
			const route = _getFirstRoute()
			_goToHash(route)
			_setRouteTitle(route)
			_renderComponent(route)
		})

		// document.onreadystatechange = function () {
		// 	if (document.readyState === 'complete') {
		// 		const route = _getFirstRoute()
		// 		_goToHash(route)
		// 		_renderComponent(route)
		// 		_setRouteTitle(route)
		// 	}
		// }
	}

	const _updateOnChange = () => {
		window.addEventListener('hashchange', (e) => {
			const hash = _getHash()
			const route = _getRouteByHash(hash)
			const routeDefault = _getRouteDefault()

			if (route) {
				_renderComponent(route)
				_setRouteTitle(route)
				return
			}

			_renderComponent(routeDefault)
			_setRouteTitle(routeDefault)
			console.log(hash)
		})
	}

	const init = () => {
		_initOnLoad()
		_updateOnChange()
	}

	return {
		use, init
	}
}

export { routerFactory }