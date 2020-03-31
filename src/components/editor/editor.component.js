import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { editorTemplate as HTML } from './editor.template'
import { editorStyle as CSS } from './editor.style'

import { editorService } from '../../services/editor.service'

const appEditorFactory = () => {

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])


	const name = () => 'app-editor'

	const template = () => {
		return { HTML, CSS}
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => []

	const methods = () => [
		...mapActions(),
	]

	const beforeOnRender = () => []
	const afterOnRender = () => [afterRender]


	const afterRender = () => {

		const state = getState()
		editorService.setContext('#editor')
		editorService.createNodesFromJSON(state)


		editorService.on('on-remove', ({ nodeKey }) => {
			editorService.removeNode(nodeKey)
		})
	}

	return createComponent()
}

export { appEditorFactory }