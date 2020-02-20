import { renderer, html } from '../../core/component'

const appMenuTemplate = (state) => { console.log('--->', state.menu)
	
	const template = () => html`
	<div class="app-menu-wrapper ${state.menu.isVisible ? 'app-menu-visible' : ''}">
		<div class="app-menu-header">
			<i class="lni-pin-alt app-menu-icon"></i> Novo Passo
		</div>
		<div class="app-menu-search-wrapper">
			<label class="app-menu-label">
				<span class="app-menu-span">Procurar recurso...</span>
				<input type="text" class="app-menu-search">
			</label>
		</div>
		<div class="app-menu-options">
			<div class="app-menu-options-title">
			<i class="lni-ruler-pencil app-menu-icon"></i> Iterações
			</div>
		</div>

		<div class="app-menu-resource">
			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
			</ul>

			<div class="app-menu-options-title">
			<i class="lni-ruler-pencil app-menu-icon"></i> Iterações
			</div>

			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
			</ul>			
		</div>


<div class="app-menu-resource">
			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
			</ul>
			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
				<li class="app-menu-item">
					<i class="lni-mashroom"></i> Iniciar Fala
				</li>
			</ul>			
		</div>		
	</div>
	`
	renderer(template)
}

export { appMenuTemplate }