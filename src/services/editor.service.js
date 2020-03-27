import { uMap } from '../lib/umap2/core/umap'

import {	templatesModule } from '../editor/customTemplates.module'

const editorFactory = () => {
	const editor = uMap()
	const eventEmitter = editor.getEventEmitter()

	editor.setCustomNode('textToSpetch', templatesModule.textToSpetch)
	editor.setCustomNode('spetchToText', templatesModule.spetchToText)
	
	const logNodes = () => {
		return editor.logNodes()
	}

	const getState = () => {
		return editor.getState()
	}

	const setContext = (selector) => {
		editor.setContext(selector)
	}

	const createNode = (nodeType, data) => {
		editor
			.createNode(nodeType, data)
			.render()
	}

	const createNodesFromJSON = (data) => {
		editor
			.createNodesFromJSON(data)
			.render()
	}

	const getEditor = () => editor

	const updateNode = (nodeKey, payload) => {
		editor.updateNode(nodeKey, payload)
	}
	
	const removeNode = (nodeKey) => {
		editor.removeNode(nodeKey)
	}

	const on = (eventName, callback) => {
		eventEmitter.on(eventName, callback)
	}

	return {
		setContext, 
		createNode,
		createNodesFromJSON,
		getEditor,
		updateNode,
		removeNode,
		getState,
		logNodes,
		on
	}
}

const editorService = editorFactory()

export { editorService }