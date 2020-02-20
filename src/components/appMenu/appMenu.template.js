import { renderer, html } from '../../core/component'

const appMenuTemplate = (state) => {

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

		<div class="app-menu-resource">
			<div class="app-menu-options-title">
			<i class="lni-ruler-pencil app-menu-icon"></i> Iterações
			</div>			
			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-microphone app-box-icon"></i> 
					<span class="app-box-text">Iníciar</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-soundcloud app-box-icon"></i> 
					<span class="app-box-text">Avaliar fala</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-text-size app-box-icon"></i> 
					<span class="app-box-text">Avaliar texto</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-page-break app-box-icon"></i> 
					<span class="app-box-text">Encerrar</span>
				</li>
			</ul>

			<div class="app-menu-options-title">
				<i class="lni-fireworks app-menu-icon"></i>	Outros Recursos
			</div>

			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
			</ul>		
			
<div class="app-menu-options-title">
				<i class="lni-fireworks app-menu-icon"></i>	Mais Recursos
			</div>

			<ul class="app-menu-list">
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>
				<li class="app-menu-item">
					<i class="lni-shortcode app-box-icon"></i> 
					<span class="app-box-text">Outro ...</span>
				</li>				
			</ul>				
		</div>
		
	</div>
	`
	renderer(template)
}

export { appMenuTemplate }