import { setStyle, css } from '../../core/component'

const mainStyle = (ctx) => { 

	const style = css`
		.app-main-wrapper {
			display:block;
			float:left;
			width:100%;
			height:100vh;
			background-size: 40px 40px;
			background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
		}
	`

	setStyle(style)
}

export { mainStyle }