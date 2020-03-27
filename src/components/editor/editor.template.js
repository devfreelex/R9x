import { renderer, html } from '../../core/component'

const editorTemplate = (state) => {

	return  () => html`
	<div class="app-editor">
		<div id="editor"></div>
	</div>
	`
}

export { editorTemplate }