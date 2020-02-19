import { renderer, html } from '../../core/component.js'

const taskRegisterTemplate = (state) => { console.log(state)
	
	const template = () => `
	<h1>${state.title}</h1>
	`
	renderer(template)
}

export { taskRegisterTemplate }