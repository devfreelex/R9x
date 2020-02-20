import 'whatwg-fetch'
import '@babel/polyfill'

import './assets/styles/main.css'

import { appFactory } from './core/app'
import { store } from './store/store'
import { appMainRegister } from './components/main/main.component'
import { appCreatorRegister } from './components/appCreator/appCreator.component'
import { appMenuComponent } from './components/appMenu/appMenu.component'


store.init()

const appMain = appMainRegister()
appMain.init()

const appCreator = appCreatorRegister()
appCreator.init()	


const appMenu = appMenuComponent()
appMenu.init()