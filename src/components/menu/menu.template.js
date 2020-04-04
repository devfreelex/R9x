import { renderer, html } from '../../core/component'

const menuTemplate = (state) => {

	const conditionalRender = () => {
		if (state.menu.isVisible) return template()
		return ''
	}	

	const template = () => html`
	<div class="app-menu is-visible">
		<ul class="menu-list">
			<li class="menu-item" node-type="default"> Início </li>
			<li class="menu-item" node-type="spetchToText"> Escuta </li>
			<li class="menu-item" node-type="textToSpetch"> Fala </li>
			<li class="menu-item" node-type="end"> Fim </li>
		</ul>
	</div>
	`

	return conditionalRender
}

export { menuTemplate }