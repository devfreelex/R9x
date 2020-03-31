import { uMap } from './core/umap'
const editor = uMap()

	const xState = {
		title:'Um títulod de exemplo',
		description:'Uma descrição de exemplo'
	}
			
	editor.setContext('#editor')
	const payload = {
		"nodes": [
			{
				"state": {
					"nodeType": "default",
					"title": "Um título qualquer",
					"description": "Uma descrição qualer bem grande para testar o tamanho do elemento que a comporta",
					"curves": [],
					"nodes": [],
					"nodeKey": 733118,
					"arrows": [
						{
							"arrowInfo": {
								"arrowKey": 866928,
								"nodeKey": "733118",
								"offset": {
									"top": 61.11328125,
									"left": 125
								},
								"nodeAxes": {
									"base": {
										"x": 853.75,
										"y": 242.2265625
									},
									"apex": {
										"x": 853.75,
										"y": 342.2265625
									}
								},
								"baseKey": "733118",
								"apexKey": null
							}
						}
					]
				},
				"element": {}
			},
			{
				"state": {
					"nodeType": "default",
					"title": "Um título qualquer",
					"description": "Uma descrição qualer bem grande para testar o tamanho do elemento que a comporta",
					"curves": [],
					"nodes": [],
					"nodeKey": 820526,
					"arrows": [
						{
							"arrowInfo": {
								"arrowKey": 866928,
								"nodeKey": "820526",
								"offset": {
									"top": 61.11328125,
									"left": 125
								},
								"nodeAxes": {
									"base": {
										"x": 800.99609375,
										"y": 598.22265625
									},
									"apex": {
										"x": 800.99609375,
										"y": 698.22265625
									}
								}
							}
						}
					],
					"position": "top:687px; left:650px;"
				},
				"element": {}
			}
		],
		"arrows": []
	}

	editor
	.createNodesFromJSON(payload)
	// .createNode('default', xState)
	// .createNode('default', xState)
	// .createNode('default', xState)
	// .createNode('default', xState)
	.render()
	

	const save = () => {

		console.log(editor.getState())
		// const currentState = editor.getState()
		// const svg = document.querySelector('#svg')
		// const groups = Array.from(svg.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'g'))
		// const nodes = Array.from(document.querySelectorAll('.node'))
		// const arrowButtons = Array.from(document.querySelectorAll('.arrow-button'))

		// groups.forEach( group => svg.removeChild(group))
		// nodes.forEach( node => node.remove())
		// arrowButtons.forEach( button => button.remove() )


		// editor
		// .createNodesFromJSON(currentState)
		// .render()
		
	}

	document.querySelector('.save')
		.onclick = (e) => {
			e.preventDefault()
			save()
		}
