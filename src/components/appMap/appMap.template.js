import { renderer, html } from '../../core/component'
import '../../libs/uMap/styles/uMap.css'
const appMapTemplate = (state) => {
	
	const template = () => html`
	<div class="app-map-wrapper">
		<div id="uMapArea" class="app-map-area"></div>
	</div>
	`
	renderer(template)
}

export { appMapTemplate }