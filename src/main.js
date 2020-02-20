import 'whatwg-fetch'
import '@babel/polyfill'

import './assets/styles/main.css'

import { appFactory } from './core/app'
import { store } from './store/store'
import { appMainComponent } from './components/main/main.component'
import { appCreatorComponent } from './components/appCreator/appCreator.component'
import { appMenuComponent } from './components/appMenu/appMenu.component'
import { appMapComponent } from './components/appMap/appMap.component'


store.init()

const appMain = appMainComponent()
appMain.init()

const appCreator = appCreatorComponent()
appCreator.init()	

const appMap = appMapComponent()
appMap.init()

const appMenu = appMenuComponent()
appMenu.init()

