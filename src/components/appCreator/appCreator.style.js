import { setStyle, css } from '../../core/component'

const appCreatorStyle = (ctx) => { 

	const style = css`
		.app-main-wrapper {
			display:block;
			float:left;
			width:100%;
			height:100vh;
			background-size: 40px 40px;
			background-image: radial-gradient(circle, #e34a3b 1px, rgba(0, 0, 0, 0) 1px);
		}

		.app-btn-creator{
			padding:0;
			text-align:center;
			position:relative;
			overflow:hidden;			
		}

		.app-creator-icon {
			opacity:0;			
			transition: ease-in-out .5s;
			position:absolute;
		}

		.icon-menu {
			top:-100px;
			left:-100px;			
		}
		.icon-close {
			top:100px;
			left:100px;			
		}

		.icon-menu.show-icon {
			font-size:1.5em;			
			opacity:1;
			top:50%;
			left:50%;
			transform:translate(-50%, -50%)
		}

		.icon-close.show-icon {
			font-size:1em;			
			opacity:1;
			top:50%;
			left:50%;
			transform:translate(-50%, -50%)
		}
	`

	setStyle(style)
}

export { appCreatorStyle }