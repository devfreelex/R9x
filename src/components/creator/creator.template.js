import { renderer, html } from '../../core/component'

const creatorTemplate = (state) => {

	return () => html`
	<div class="app-creator">
		<button class="btn-create"> + </button>
	</div>
	`
	
}

export { creatorTemplate }