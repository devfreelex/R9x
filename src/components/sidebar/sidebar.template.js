import { renderer, html } from '../../core/component'

const sidebarTemplate = (state) => { 
	const conditionalRender = () => {
		if (state.sidebar.isVisible) return template()
		return ''
	}	

	const template = () => html`
	<div class="app-sidebar is-visible">
		<h1 class="title full-block-width">Edição do nodo: <span class="bolder">#${state.sidebar.nodeKey}</span></h1>
		<div class="form full-block-width">
			<label class="form-label full-block-width">
				<span class="form-title full-block-width">Título:</span>
				<input id="title" type="text" class="form-input full-block-width">
			</label>
			<label class="form-label full-block-width">
				<span class="form-title full-block-width">Descrição:</span>
				<textarea id="description" type="text" class="form-textarea full-block-width"></textarea>
			</label>
			<div class="form-label">
				<button id="btn-save" class="form-input form-btn"> Salvar </button>
			</div>
		</div>
	</div>
	`
	return conditionalRender
}

export { sidebarTemplate }