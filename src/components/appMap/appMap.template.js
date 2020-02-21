import { renderer, html } from '../../core/component'
import '../../libs/uMap/styles/uMap.css'
const appMapTemplate = (state) => {
	
	const template = () => html`
	<div class="app-map-wrapper">
		<style>
			
		</style>
		<div id="uMapArea" class="app-map-area">
			<!-- viewBox="0 0 499 499" preserveAspectRatio="xMidYMid meet" -->
			<svg class="umap-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">

				<!-- <g id="main"> -->
					<!-- <circle id="curveController" cx="250" cy="100" r="3"/> -->
					<!-- <path id="curve" d="M100,250 Q250,100 400,250" style="fill:none; stroke:#e34a3b; stroke-width: 1px;"/> -->
					<!-- <line id="l1" x1="100" y1="250" x2="250" y2="100"/> -->
					<!-- <line id="l2" x1="400" y1="250" x2="250" y2="100"/> -->
					<!-- <circle id="p1" cx="100" cy="250" r="16"/> -->
					<!-- <circle id="p2" cx="400" cy="250" r="16"/> -->
				<!-- </g> -->
			</svg>
		</div>
	</div>
	`
	renderer(template)
}

export { appMapTemplate }