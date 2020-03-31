import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { sidebarTemplate as HTML } from './sidebar.template'
import { sidebarStyle as CSS } from './sidebar.style'
import { editorService } from '../../services/editor.service'

const appSidebarFactory = () => {

	const activeNode = {}

	watch(['TOGGLE_SIDEBAR'], () => [ renderSidebar ])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])


	const name = () => 'app-sidebar'

	const template = () => {
		return { HTML, CSS }
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onTypeTitle, onTypeDescription, onSave
	]

	const methods = () => [
		...mapActions(),
		saveNodesAndLog
	]

	const beforeOnRender = () => []
	const afterOnRender = () => [listenNodeChanges]

	const onTypeTitle = ({ elm, on, query }) => {

		const inputTitle = query('#title', elm)
		on('keyup', inputTitle, ({target}) => { 
			editorService.updateNode(activeNode.nodeKey, {
				title: target.value.toUpperCase() || 'TÍTULO PADRÃO...'
			})
		})

	}

	const onTypeDescription = ({ elm, on, query }) => {

		const inputDescription = query('#description', elm)
		on('keyup', inputDescription, ({ target }) => { 
			editorService.updateNode(activeNode.nodeKey, {
				description: target.value.toUpperCase() || 'DESCRIÇÃO PADRÃO...'
			})
		})

	}

	const onSave = ({ elm, on, query }, {saveNodesAndLog}) => {
		const btnSave = query('#btn-save', elm)
		on('click', btnSave, saveNodesAndLog)
	}

	const saveNodesAndLog = () => {
			const [, toggleSidebar, saveNodesState] = mapActions()
			const nodesState = editorService.getState()
			saveNodesState(nodesState)
			toggleSidebar({isVisible: false})
			logNodesState()
			logAppState()
	}

	const logNodesState = () => {
		console.group()
		console.info('NODES STATE::::::::::::::::::::::::::::')
		console.log(editorService.getState())
		console.groupEnd()
	}

	const logAppState = () => {
		console.group()
		console.info('APP STATE::::::::::::::::::::::::::::::')
		console.log(getState())
		console.groupEnd()
	}

	const listenNodeChanges = () => {

		editorService.on('on-update', ({ nodeKey }) => {
			setActiveNodeKey(nodeKey)
			const [,toggleSidebar] = mapActions()
			const isVisible = true
			toggleSidebar({ isVisible, nodeKey })
		})

	}

	const setActiveNodeKey = (nodeKey) => {
		activeNode['nodeKey'] = nodeKey
	}

	const renderSidebar = () => {
		render('app-sidebar', getState())
	}

	return createComponent()
}

export { appSidebarFactory }