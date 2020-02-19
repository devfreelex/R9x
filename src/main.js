import { appFactory } from './core/app.js'
import { store } from './store/store.js'
import { appTaskRegister } from './components/taskRegister/taskRegister.component.js'
import { logComponent } from './core/component.js'
import { setStore } from './core/store.js'

store.init()

const appTask = appTaskRegister()
appTask.init()

// const app = appFactory()

// app
// 	.use('store', store)
// 	.use('components', [])
// 	// .use('routes', [
// 	// 	// {
// 	// 	// 	title:'Primeira', 
// 	// 	// 	hash:'#/',      
// 	// 	// 	component: appTaskRegister },
// 	// 	// {
// 	// 	// 	title:'Outras',   component: appTaskRegister,
// 	// 	// 	hash:'#/contact',
// 	// 	// 	params:{ id: /\d{1,9}/ }
// 	// 	// },
// 	// 	// {
// 	// 	// 	title:'Padrão',   
// 	// 	// 	hash:'#/404',   
// 	// 	// 	component: appTaskRegister }
// 	// ])

// app.init()