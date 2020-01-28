import { appFactory } from './core/app.js'
import { initStore as store } from './store/store.js'
import { appTaskRegister } from './components/taskRegister/taskRegister.component.js'
import { logComponent } from './core/component.js'
import { setStore } from './core/store.js'


const app = appFactory()

app
	.use('store', store)
	.use('components', [])
	.use('routes', [
		{
			title:'Primeira', 
			hash:'#/',      
			component: appTaskRegister },
		{
			title:'Outras',   component: appTaskRegister,
			hash:'#/contact',
			params:{ id: /\d{1,9}/ }
		},
		{
			title:'Padrão',   
			hash:'#/404',   
			component: appTaskRegister }
	])

app.init()