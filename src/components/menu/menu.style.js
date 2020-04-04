import { setStyle, css } from '../../core/component'

const menuStyle = (ctx) => {

	return css`
		.app-menu {
			display:block;
			float:left;
			width:250px;
			height:0;
			background:#f9f8f8;
			border:1px #ebebeb solid;
			box-shadow: 3px 3px 3px #ececec;
			position:fixed;
			left:50%;
			top:75px;
			transform:translateX(-50%);
			z-index:1001;
			overflow:hidden;
		}

		.app-menu.is-visible {
			height:auto
		}

		.menu-list,
		.menu-item {
			display:block;
			float:left;
			width:100%;
		}

		.menu-item {
			border-bottom:1px #ebebeb dotted;
			padding:15px;
			transition:.5s ease-in-out;
			cursor:pointer;
		}

		.menu-item:hover {
			background:#ffff
		}
	`

	setStyle(style)
}

export { menuStyle }