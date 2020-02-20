import { renderer, html } from '../../core/component'

const mainTemplate = (state) => { 
	
	const template = () => `
	<div class="app-main-wrapper">
		<app-creator></app-creator>
	</div>
	`
	renderer(template)
}

export { mainTemplate }