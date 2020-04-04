import { setStyle, css } from '../../core/component'

const editorStyle = (ctx) => {

	return css`
		.app-editor {
			display:block;
			float:left;
			width:100vw;
			height:100vh;
			position: relative;
			overflow-x:hidden;
			overflow-y:visible
		}

		#editor {
			display:block;
			float:left;
			width: 100%;
			height:10000px;
			background-size: 40px 40px;
			background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
			position: absolute;
			top:0;
			left:0;
			bottom:0;
			right:0;
		}
	`

	setStyle(style)
}

export { editorStyle }