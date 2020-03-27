import { setStyle, css } from '../../core/component'

const sidebarStyle = (ctx) => {

	return css`
		.app-sidebar {
			display:block;
			float:left;
			width:100%;
			max-width:350px;
			height:100%;
			padding:15px;
			background:#fff;
			border-left:1px #ebebeb solid;
			transition:.5s ease-in-out;
			box-shadow:5px 5px 15px #ab9c97;
			position:fixed;
			top:0;
			right:0;
			bottom:0;
			z-index:9999
		}


		.full-block-width {
			display:block;
			float:left;
			width:100%;
		}

		.bolder {
			padding:5px 15px;
			border-radius:100px;
			font-weight:bold;
			background:#000;
			color:#fff;
		}

		.title {
			font-size:1.2em;
			text-transform:uppercase;
			padding:25px 0 15px 0
		}

		.form {
			border-top:1px #ebebeb solid;
			border-bottom:1px #ebebeb solid;
			padding:15px 0 30px 0;
			margin:15px 0
		}

		.form-label { margin-top:30px; }

		.form-title {
			padding-bottom:5px;
			text-transform:uppercase;
			font-size:.875em
		}

		.form-input,
		.form-textarea {
			padding:15px;
			border:1px #ebebeb solid;
			border-radius:4px;
			font-size:1em;
			text-transform:uppercase;
			color:#666;
			outline:0
		}

		.form-textarea {
			font-size:1.5em
		}

		.form-btn {
			float:right;
			margin-top:30px;
			cursor:pointer;
			transition:.3s ease-in-out;
		}

		.form-btn:hover {
			background:#fe695a;
			color:#fff;
		}

	`

}

export { sidebarStyle }