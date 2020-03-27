import { renderer, html } from '../../core/component'

const mainTemplate = (state) => { 
	
	return () => html`
	<div class="app-main-wrapper">
			<app-creator></app-creator>		
			<app-editor></app-editor>
			<app-menu></app-menu>	
			<app-sidebar></app-sidebar>	
	</div>
	`
}

export { mainTemplate }