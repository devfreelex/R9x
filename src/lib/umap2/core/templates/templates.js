const svg = () => {
	return `
		<svg id="svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg>
	`
}

const defaultTemplate = (state) => `

	<div class="umap template-default">
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
const endTemplate = () => `

	<div class="umap template-end">
		<div class="connector"></div>
		<div class="grab-handle grababble"></div>
		<div class="template-title">Fim</div>
	</div>
	
`

const arrowTemplate = (state) => {
	const getBasePosition = () => {
		return `M${state?.nodeAxes?.base?.x},${state?.nodeAxes?.base.y}`
	}

	const getApexPosition = () => {
		return `${state?.nodeAxes?.apex?.x},${state?.nodeAxes?.apex?.y}`
	}

	const getPositon = () => {
		return `${getBasePosition()} ${getApexPosition()}`
	}

	const getCx = () => {
		return state?.nodeAxes?.base?.x
	}

	const getCy = () => {
		return state?.nodeAxes?.apex?.y - (state?.offset?.top - 20)
	}

	return `
		<defs>
				<marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
						<circle class="circle" cx="5" cy="5" r="3"/>
				</marker>

				<marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
							orient="90deg">
						<path class="line-arrow" d="M2,2 L2,11 L10,6 L2,2" />
				</marker>
		</defs>									
		<path 
			id="curve" 
			class="curve"
			arrow-key="${state?.arrowKey}"
			base-key="${state?.nodeKey || state.baseKey || ''}" 
			apex-key="${state?.apexKey}" d="${state.position || getPositon()}"
		/>
	`	
}
export default {
	default: defaultTemplate,
	end: endTemplate,
	arrow: arrowTemplate,
	svg: svg
}