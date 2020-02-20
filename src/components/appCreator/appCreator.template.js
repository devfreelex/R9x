import { renderer, html } from '../../core/component'

const appCreatorTemplate = (state) => {
	
	const template = () => `
	<div class="app-creator-wrapper">
		<button class="btn btn-round btn-align-center app-btn-creator">
			<i class="lni-menu app-creator-icon icon-menu show-icon"></i>
			<i class="lni-close app-creator-icon icon-close"></i>
		</button>
		<app-menu></app-menu>
	</div>
	`
	renderer(template)
}

export { appCreatorTemplate }