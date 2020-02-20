import { setStyle, css } from '../../core/component'

const taskRegisterStyle = () => {
	const style = css`
		h1 {
			display:block;
			float:left;
			padding:15px;
			border:1px red solid;
			color:#f00;
		}

		.title p {
			color:blue;
			font-size:32px;
		}
		.div { border-color:'blue'}
	`

	setStyle(style)
}

export { taskRegisterStyle }