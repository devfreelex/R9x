const eventDrive = () => {
	const listeners = {}

	const on = (eventName, callback) => {
		if ((!`${eventName }` in listeners) === false) {
			listeners[eventName] = [callback]
			return
		}
		
		listeners[eventName].push(callback)
	}

	const fire = (eventName, payload) => {
		listeners[eventName].forEach( listener => {
			listener(payload)
		})
	}

	return { on, fire }
}

export { eventDrive }