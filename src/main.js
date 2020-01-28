import { initStore } from './store/store.js'
import { appTaskRegister } from './components/taskRegister/taskRegister.component.js'
import { logComponent } from './core/component.js'

	initStore()

	const appTaskRegisterC = appTaskRegister()
	appTaskRegisterC.init()

	// logComponent()
