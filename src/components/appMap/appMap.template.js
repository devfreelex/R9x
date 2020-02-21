import { renderer, html } from '../../core/component'
import '../../libs/uMap/styles/uMap.css'
const appMapTemplate = (state) => {
	
	const template = () => html`
	<div class="app-map-wrapper">
		<div id="uMapArea" class="app-map-area">
			<svg class="umap-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg>
		</div>
	</div>
	`
	renderer(template)
}

export { appMapTemplate }