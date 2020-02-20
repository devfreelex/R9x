import { setStyle, css } from '../../core/component'

const appMapStyle = (ctx) => { 

	const style = css`
		.app-map-wrapper{
			display: block;
			float:left;
			width:100%;
			height:100%;
			position:fixed;
			top:75px;
			left:0;
			background:#f4f1f19e;
		}
		.u-map-area{
			display: block;
			float:left;
			width:100%;
			height:calc(100% - 75px);
			padding:15px;
			position:relative;
		}
	`

	setStyle(style)
}

export { appMapStyle }