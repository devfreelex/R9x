const textToSpetch = (state) => `
	<div class="umap template-text-spetch">
		<div class="btn-box">
				<i class="btn-edite">&#9998</i>
				<i class="btn-remove">&#9447</i>
		</div>	
		<div class="connector"></div>
		<div class="grab-handle grababble"></div>
		<div class="template-title">${state.title || ''}</div>
		<div class="template-description">${state.description || ''}</div>
		<div class="connection-handle"></div>
	</div>
`

export { textToSpetch }