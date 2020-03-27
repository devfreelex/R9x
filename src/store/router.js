const routerFactory = () => {
	let _routes = []

	const use = (value) => {
		_routes = [..._routes, ...value]
	}

	const _setRouteTitle = (route) => {
		const title = document.querySelector('head > title')
		title.innerHTML = route.title
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

	const _loadRoute = (route) => {
		const { component:componentFactory } = route
		const component = componentFactory()
		component.init()
		
	}

	const _initOnLoad = () => {
		window.addEventListener('DOMContentLoaded', () => {
			const route = _getFirstRoute()
			_goToHash(route)
			_loadRoute(route)
			_setRouteTitle(route)
		})

		// document.onreadystatechange = function () {
		// 	if (document.readyState === 'complete') {
		// 		const route = _getFirstRoute()
		// 		_goToHash(route)
		// 		_loadRoute(route)
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
				_loadRoute(route)
				_setRouteTitle(route)
				console.log(hash)
				return
			}

			_loadRoute(routeDefault)
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