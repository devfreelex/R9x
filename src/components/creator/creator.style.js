import { setStyle, css } from '../../core/component'

const creatorStyle = (ctx) => {

	return css`
		.app-creator {
			display:block;
			float:left;
			width:100%;
			height:75px;
			padding:15px;
			background:#fff;
			position:absolute;
			z-index:100
		}

		.btn-create {
			display:block;
			float:left;
			width: 45px;
			height:45px;
			line-height:45px;
			text-align:center;
			font-size:2em;
			border: 1px #fe695a solid;
			border-radius:100px;
			color:#fe695a;
			transform: translateX(-50%);
			transition: .5s ease-in-out;
			cursor:pointer;
			outline:none;
			position:absolute;
			left:50%;
			z-index:1000
		}

		.btn-create:hover {
			background: #fe695a;
			color:#fff
		}
	`

	setStyle(style)
}

export { creatorStyle }