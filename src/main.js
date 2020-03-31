import 'whatwg-fetch'
import '@babel/polyfill'

import './assets/styles/main.css'
import './lib/umap2/core/styles/umap.css'

import { appFactory } from './core/app'

import { appMainComponent } from './components/main/main.component'
import { appEditorFactory } from './components/editor/editor.component'
import { appCreatorFactory } from './components/creator/creator.component'
import { appMenuFactory } from './components/menu/menu.component'
import { appSidebarFactory } from './components/sidebar/sidebar.component'

import { store } from './store/store'

const app = appFactory()
const mainComponent = appMainComponent()
const creatorComponent = appCreatorFactory()
const editorComponent = appEditorFactory()
const menuComponent = appMenuFactory()
const sidebarComponent = appSidebarFactory()

app.use('components', {
	mainComponent,
	creatorComponent,
	editorComponent,
	menuComponent,
	sidebarComponent
})

app.use('store', store)
app.init()

		




