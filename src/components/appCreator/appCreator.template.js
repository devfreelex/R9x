import { renderer, html } from '../../core/component'

const appCreatorTemplate = (state) => {
	
	const template = () => `
	<div class="app-creator-wrapper">
		<button class="btn btn-round btn-align-center">
			<i class="lni-plus"></i>
		</button>
		<app-menu></app-menu>
	</div>
	`
	renderer(template)
}

export { appCreatorTemplate }