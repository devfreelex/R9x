import { setStyle, css } from '../../core/component'

const appMenuStyle = (ctx) => {

	const style = css`
		.app-menu-wrapper {
			display:block;
			opacity:0;
			float:left;
			width:100%;
			max-width:800px;
			height:auto;
			padding:0;
			background:rgba(255, 255, 255, .8);
			border: 1px rgb(227, 74, 59) solid;
			border-radius:4px;
			color:rgb(227, 74, 59);
			box-shadow:0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
			position:fixed;
			top:100px;
			left:50%;
			z-index:100;
			transform: translateX(-50%);
			transition: .5s ease-in
		}

		.app-menu-wrapper::before {
			content:'';
			display: block;
			width: 0; 
			height: 0; 
			border-left: 22px solid transparent;
			border-right: 22px solid transparent;
  		border-bottom: 22px solid rgb(227, 74, 59);
			position:absolute;
			top:-22px;
			left:50%;
			transform: translateX(-50%)
		}		

		.app-menu-header {
			display:block;
			float:left;
			width:100%;
			height:75px;
			padding:15px;
			background:#df5345;
			border:1px rgb(227, 74, 59) solid;
			text-transform: uppercase;
			color:#fff;
			font-size:.875em;
			font-weight:600;
			line-height:45px
		}

		.app-menu-icon {
			font-size:1.4em;
			margin:0 5px 0 0;
			position:relative;
			top:3px;
		}

		.app-box-icon {
			display: block;
			float:left;
			width:32px;
			height:32px;
			border-radius:3px;
			background:#f4f1f1;
			text-align:center;
			line-height:32px;
			font-size:1.5em;
			transition: .3s ease-in-out
		}

		.app-box-text {
			display: block;
			width:100%;
			height:32px;
			padding-left:45px;
			line-height:32px;
			text-align:left;
			font-size:.875em
		}

		.app-menu-search-wrapper {
			display:block;
			float:left;
			width:100%;
			padding:30px 15px;
			background:rgba(244, 244, 244, .5);
		}

		.app-menu-label {
			display: block;
			float:left;
			width:100%;
			position:relative;
		}

		.app-menu-span {
			display: block;
			float:left;
			width:100%;
			position:absolute;
			top:15px;
			left:15px
		}

		.app-menu-search {
			display: block;
			float:left;
			width:100%;
			padding:15px;
			border-radius:4px;
			border:0;
			border-bottom:2px #ebebeb solid;
			outline:0;
			background:#fff;
			font-size:.875em;
		}

		.app-menu-options {
			display: block;
			float:left;
			width:100%;
			background:#f4f1f18f;
		}

		.app-menu-resource {
			display: block;
			float:left;
			width:100%;
			padding:0;
			background:#f9f9f9c7;
			max-height: 500px;
    	overflow-y: scroll;
    	overflow-x: hidden;			
		}

		.app-menu-options-title {
			display: block;
			float:left;
			width:100%;
			padding:30px;	
			margin-bottom:0;
			font-weight:500;
			font-size:1em;
			border-top:1px #ebebeb solid;
			border-bottom:1px #ebebeb dashed;
		}		

		.app-menu-list {
			display: block;
			float:left;
			width:100%;
			padding:15px 15px 0 15px;
			margin-bottom:15px
		}

		.app-menu-list,
		.app-menu-item {
			display: block;
			float:left;
		}

		.app-menu-item {
			width:calc(25% - 15px);
			padding:10px;
			margin-bottom:0;
			border:1px #ebebeb dashed;
			border-radius:3px;
			margin:15px 15px 15px 3px;
			transition:.5s all
		}

		.app-menu-item:nth-of-type(4n) {
			margin-right:0
		}

		.app-menu-item:hover {
			cursor:pointer;
			border-color:rgb(227, 74, 59);
		}

		.app-menu-item:hover > .app-box-icon {
			background:rgb(227, 74, 59);
			color:#fff;
		}		
	

		.app-menu-visible {
			opacity:1
		}
	`

	setStyle(style)
}

export { appMenuStyle }