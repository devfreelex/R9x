import { html } from '../core/component'
const spetchToText = (state) => html`
	<div class="umap template-spetch-text">
		<div class="btn-box">
				<i class="btn-edite">&#9998</i>
				<i class="btn-remove">&#9447</i>
		</div>	
		<div class="btn-line"></div>
		<div class="connector"></div>
		<div class="content">
			<div class="grab-handle grababble"></div>
			<div class="template-title">${state.title || ''}</div>
			<div class="template-description">${state.description || ''}</div>
			<div class="connection-handle"></div>
		</div>

	</div>
`

export { spetchToText }