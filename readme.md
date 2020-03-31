### Introdução

Ao fim desse tutorial você terá desenvolvido uma aplicação que gera mapas mentais interativamente e dominado os ciclos de vida da biblioteca reactive 9x. Não obstante, também terá dominado a biblioteca uMap responsável por gerenciar os nodos do mapa, criados através da interação do usuário com a biblioteca *Reactive 9x*. 

Embora esteja utilizando reactive 9x aqui você pode substituí-la por angular, react ou vue.

#### O que são Reactive 9x e Umpa?

*Reactive 9x* é uma biblioteca reativa de minha autoria que pode ser utilizada para criação de aplicações front end (spa). Essa biblioteca assemelha-se aos frameworks angular, react e vue. Porém, é muito mais simples que os três anteriormente citados.

*uMap* é uma biblioteca que pode ser utilizada para criação de mapas mentais ou organogramas. Essa biblioteca também é de minha autoria.

Agora que você já entendeu o que as libs citadas anteriormente são e para que servem, você já pode vislumbrar como construiremos juntos esse app, para que você domine reactive 9x e uMap.

### Estrutura do projeto

A estrutura base do projeto é composta pelos seguintes arquivos e diretórios:

```
App
|
|--> src
|		 |--> assets..........(estilização genérica de componentes reativos (R9x))
|		 |--> components......(componenentes reativos do projeto)
|		 |--> core............(o coração da lib (reactive 9x))
|		 |--> editor..........(templates customizados para a lib (uMap))
|		 |--> lib.............(diretório/core base da lib uMap)
|		 |--> services........(serviços usados nos componentes da lib (R9x) p/ operar o editor (uMap))
|		 |--> store...........(gerenciador de estado reativo baseado no padrão (flux))
|		 |--> main.js......(arquivo principal)
|--> index.html
|--> .gitignore
|--> package.json
|--> readme.md												
```


### Dependências

Logo abaixo, você pode entender quais serão as dependências do projeto. 

Copie o código abaixo e cole dentro do arquivo *package.json* localizado na raiz da árvore de diretórios do projeto (na raíz do projeto). 

```json
{
  "name": "Mind Map",
  "version": "1.0.0",
  "description": "",
  "main": "main",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "parcel index.html -p 3000",
    "prebuil-h": "shx rm -rf dist/**/*",
    "build-h": "cross-env NODE_ENV=homolog parcel build index.html --public-url ./",
    "prebuil-p": "shx rm -rf dist/**/*",
    "build-p": "cross-env NODE_ENV=production parcel build index.html --public-url ./"
  },
  "browserslist": [
    "IE 10",
    "last 3 versions",
    "not IE < 9"
  ],
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage"
        }
      ]
    ]
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "autoprefixer": "^9.7.2",
    "babel-preset-es2015-ie": "^6.7.0",
    "cross-env": "^6.0.3",
    "less": "^3.10.3",
    "parcel-bundler": "^1.12.4",
		"shx": "^0.3.2",
    "@babel/cli": "^7.7.4",
    "@babel/polyfill": "^7.7.0",
    "babel-polyfill": "^6.26.0",
    "whatwg-fetch": "^3.0.0"	
  },
  "dependencies": {}
}

```

Agora vamos juntos entendendo o que é cada uma das 6 partes que envolvem todo o esse trecho de código.

* ##### Parte 1

```json
  "name": "Mind Map",
  "version": "1.0.0",
  "description": "Mind map manager",
  "main": "index.html",
```

> Aqui está definido o nome do projeto *"name": "Mind Map"*, a versão *"version": "1.0.0"*, o objetivo do projeto *"description": "Mind map manager"* e o arquivo  *index.html* assim ---> *"main": "index.html"*, para deixar claro que é o arquivo principal do projeto.


* ##### Parte 2

``` json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "parcel index.html -p 3000",
    "prebuil-h": "shx rm -rf dist/**/*",
    "build-h": "cross-env NODE_ENV=homolog parcel build index.html --public-url ./",
    "prebuil-p": "shx rm -rf dist/**/*",
    "build-p": "cross-env NODE_ENV=production parcel build index.html --public-url ./"
  },
```

 No trecho acima, temos a linha de comando que deve ser seguida para gerar um build do projeto para 3 cenários: 
 
 1. Desenvolvimento
```json
	 "dev": "parcel index.html -p 3000", 
```
2. Homologação
```json
    "prebuil-h": "shx rm -rf dist/**/*",
    "build-h": "cross-env NODE_ENV=homolog parcel build index.html --public-url ./",
```
3. Produção
```json
    "prebuil-p": "shx rm -rf dist/**/*",
    "build-p": "cross-env NODE_ENV=production parcel build index.html --public-url ./"
```

> Obeserve que em cada um dos 3 cenários está presente a palavra *parcel* que especifica o *MODULE BUNDLER* utilizado para transpilar *ES6* para *ES5* compatível com os navegadores atuais e mais antigos.

* ##### Parte 3

```json
 "browserslist": [
    "IE 10",
    "last 3 versions",
    "not IE < 9"
  ]
```
Observe que acima temos a configuração de compatibilidade para browsers legados e as últimas três versões de cada navegador.

* ##### Parte 4

```json
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage"
        }
      ]
    ]
  },
```
Aqui está presente a configuração do *babel*, transpilador fora da caixa, que trabalhará junto com o *parcel* e gerará builds ES5 compatível com a maioria dos navegadores atuais e antigos.

* ##### Parte 5

```json
  "devDependencies": {
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "autoprefixer": "^9.7.2",
    "babel-preset-es2015-ie": "^6.7.0",
    "cross-env": "^6.0.3",
    "less": "^3.10.3",
    "parcel-bundler": "^1.12.4",
		"shx": "^0.3.2",
    "@babel/cli": "^7.7.4",
    "@babel/polyfill": "^7.7.0",
    "babel-polyfill": "^6.26.0",
    "whatwg-fetch": "^3.0.0"		
  },
```
No bloco acima, temos as configurações de instalação das dependências que o projeto precisa para rodar durante o desenvolvimento do mesmo.

Todos os items listados nesse trecho serão instalados ao executar o comando abaixo no momento adequado.

> npm install

* ##### Parte 6

```json
  "dependencies": {}
```
Finalmente temos a configuração das dependências de terceiros que serão necessárias para a aplicação enquanto ela estiver sendo executada.

> "A aplicação não dependerá de recursos desenvolvidos por terceiros."

#### Instalando as dependências

Para instalar todas as dependências, acesse o diretório raiz do projeto através do terminal e execute o código abaixo:

```javascript
	npm install
```
### Ponto de partida

Agora que temos instaladas todas as dependências, precisamos configurar o ponto de start da aplicação. 

Dentro do diretórioc */src* está localizado o arquivo *main.js* responsável pelo start do app. 

Copie o código abaixo e cole dentro do arquivo main.js

```js
import 'whatwg-fetch'
import '@babel/polyfill'
```

Os dois itens acima, são dependências de compatibilidade que o *parcel* executará no momento necessário para gerar código viável para os mais diversos navegadores.

Ainda precisamos configurar o start da aplicação. Veja o código abaixo:

```js
import { appFactory } from './core/app'

const app = appFactory()

app.use('components', {
	mainComponent,
	creatorComponent,
	editorComponent,
	menuComponent,
	sidebarComponent
})

app.use('store', store)

app.init()

```

O trecho seguinte importa uma *Factory Function* responsável por todos os recursos da aplicação, bem como, por controlar o que será executado e quando:

```js
import { appFactory } from './core/app'

const app = appFactory()

```

Devemos fornecer os componentes que serão executados na aplicação da seguinte forma:

```js
import { appFactory } from './core/app'

import { appMainComponent } from './components/main/main.component'
import { appEditorFactory } from './components/editor/editor.component'
import { appCreatorFactory } from './components/creator/creator.component'
import { appMenuFactory } from './components/menu/menu.component'
import { appSidebarFactory } from './components/sidebar/sidebar.component'

const app = appFactory()

app.use('components', {
	mainComponent,
	creatorComponent,
	editorComponent,
	menuComponent,
	sidebarComponent
})

app.use('store', store)

app.init()

```

Observe a penúltima linha:

```js 
app.use('store', store)
```

Esse trecho é reponsável por fornecer o state da aplicação aos componentes.

O código completo do arquivo *main.js* fica assim:

```js 
import 'whatwg-fetch'
import '@babel/polyfill'

import './assets/styles/main.css'
import './lib/umap2/core/styles/umap.css'

import { appFactory } from './core/app'
import { appMainComponent } from './components/main/main.component'
import { appEditorFactory } from './components/editor/editor.component'
import { appCreatorFactory } from './components/creator/creator.component'
import { appMenuFactory } from './components/menu/menu.component'
import { appSidebarFactory } from './components/sidebar/sidebar.component'

import { store } from './store/store'

const app = appFactory()
const mainComponent = appMainComponent()
const creatorComponent = appCreatorFactory()
const editorComponent = appEditorFactory()
const menuComponent = appMenuFactory()
const sidebarComponent = appSidebarFactory()

app.use('components', {
	mainComponent,
	creatorComponent,
	editorComponent,
	menuComponent,
	sidebarComponent
})

app.use('store', store)

app.init()
```

Observe que a terceira e quarta linhas de código estão importanto os arquivos css dos quais a aplicação depende.

### Componentes R9x (érnainéx) 

#### Dependências

Abaixo temos a estrutura completa de um componente R9x:

```js
import { getState, watch, mapActions } from '../../core/store'
import { setScope, createComponent, render } from '../../core/component'
import { taskRegisterTemplate } from './taskRegister.template'
import { taskRegisterStyle } from './taskRegister.style'

const appNotFound = () => {

	watch(['CHANGE_TITLE'], () => [
		 logState, render
	])

	setScope(() => [
		name,
		template,
		hooks,
		listeners,
		methods
	])
 
	const name = () => ['app-not-found']

	const template = () => {
		taskRegisterTemplate(getState())
		taskRegisterStyle()
	}

	const hooks = () => [
		beforeOnRender,
		afterOnRender
	]

	const listeners = () => [
		onClickChangeTitle
	]
	
	const methods = () => [
		...mapActions(),
		afterOnRender
	]

	const beforeOnRender = () => [execOnBeforeRender]
	const afterOnRender = () => [execOnAfterRender]

	const onClickChangeTitle = ({elm, on, query}, {updateTitle}) => { 
		const h1 = query('h1', elm)
		const title = 'Novo título....'
		on('click', h1, () => updateTitle({title}))
	}

	const execOnAfterRender = () => {
		console.log('afterRender: ', {title:'xxx'})
	}

	const execOnBeforeRender = (state) => {
		console.log('beforeRender:--->', {title: 'yyy'})
	}

	const logState = (state) => {
		console.log('alerterState:--->', state)
	}
		
	return createComponent()
}

export { appNotFound }
```

Exclarecendo a estrutura;

> No trecho abaixo estão sendo importadas algumas dependências do componente provinientes do gerenciador de estado fornecido anteriormente no aquivo *main.js*.

```js
app.use('store', store)
```

O trecho importado do gerenciador de estado *(store)* é:

```js
import { getState, watch, mapActions } from '../../core/store'
```

Logo depois temos:
```js
import { setScope, createComponent, render } from '../../core/component'
```

Esse trecho é reponsável por importar *setScope*, o gerenciador de escopo do administrador de componentes. Ele é quem define que componente está sendo atualizado durante cada interação dinâmica com o usuário.

Também temos *createComponent* responsável por criar a estrutura do componente.

Por fim, temos o renderizador de componentes *render*.

A diante, perceba o trecho em destaque:

```js
import { taskRegisterTemplate } from './taskRegister.template'
import { taskRegisterStyle } from './taskRegister.style'
```
Esse trecho é reponsável por importar o *template (literal template (html))* e os *estilos css* do componente.


#### Corpo do componente

```js
  const appNotFound = () => {
    //... código omitido
  }
```

O trecho acima, marca o corpo do compoenente.

A função *appNotFound* será executada em main.js para criar o escopo do componente assim que *app.init()* for executado.

#### Observando mudanças no state

Logo abaixo você vai notar dentro do componente a presença de *watch* que é utilizado para observar o disparo de eventos que alteram o state da aplicação. Esses eventos são chamados de *mutations* e são disparados através de *actions* que por sua vez, são funções que recebem os novos dados e os repassam para as mutations fazerem alterações no state do app.
```js
//...código omitido

import { render } from '../core/component'
import { getState } from '../core/store'

const appNotFound = () => {

	watch(['CHANGE_TITLE'], () => [
		 logState, render
  ])
  

  const logState = () => console.log(getState())

	//...código omitido...
}
```
Veja que *watch* é capaz de observar diversos mutations ao mesmo tempo. Por isso, os identificadores de mutação são fornecidos entre *[ ]*. Sempre que um dos mutations forem disparados, as funções dentro do array retornada pela função anônima serão executadas. Veja abaixo:

```js
  watch(['CHANGE_TITLE'], () => [
    logState, render
  ])
```

#### Definindo o escopo do componente

Abaixo você encontra o código responsável por definir o escopo do componente e injetar os recursos necessário para o correto funcionamento do componente.

```js
//... código omitido ...
const appNotFound = () => {
  //... código omitido ...
  setScope(() => [
    name,
    template,
    hooks,
    listeners,
    methods
  ])
 //... código omitido ...
}
```

No trecho acima *setScope* define o escopo do componente e forncece as seguintes propriedades e recursos:

1.  name

A propriedade *name* define o seletor do componente. É através dela que o escopo se liga a representação html do componente e aplica todos os outros recursos ao mesmo, inclusive a estilização css.

```js
//...código omitido...

const appNotFound = () => {

  //...código omitido...

  setScope(() => [
    name
  ])
 
  const name = () => [
    //...código omitido...
  ]
  //...código omitido...
}

```


2. Template

```js
//...código omitido...

const appNotFound = () => {

//...código omitido...

  setScope(() => [
    template,
  ])

  const template = () => {
    //...código omitido...
  }

//...código omitido...

}

```

Através da propriedade template as funções que definem o estilo css e renderizam os dados no template são definidas.

3. Hooks
```js
//...código omitido...

const appNotFound = () => {

//...código omitido...

  setScope(() => [
    hooks
  ])

  const hooks = () => [
    //...código omitido...
  ]

//...código omitido...
}

```
Até o momento, R9X tem apenas 2 hooks, *beforeOnRender* e *afterOnRender*.

> *beforeOnRender* é responsável por permitir a execução de funções antes mesmo da renderização do componente.

> *afterOnRender* é responsável por garantir que funções sejam executadas apenas depois da renderização do componente.

4. Listeners
```js
//...código omitido...

const appNotFound = () => {

//...código omitido...

  setScope(() => [
    listeners,
  ])

  const listeners = () => [
  //...código omitido...
  ]

//...código omitido...

}

```
Como o próprio nome indica, *listeners* é responsável por realizar o bind de eventos do *DOM* previamente definidos nos componentes.

5. Methods

```js
//...código omitido...

const appNotFound = () => {

  //...código omitido...

  setScope(() => [
    methods
  ])

  const methods = () => [
    ...mapActions(),
    logState
  //...código omitido...
  ]

//...código omitido...

}

```

A propriedade *methods* é reponsável por definir e compartilhar as funções (métodos) do componente com outros recursos do mesmo. Além disso, podemos transformar *actions* do gerenciador de estado em métodos do componente ao utilizar *mapActions*.

#### Integrando uMap ao projeto

Agora que você já entendeu como R9x funciona, partiremos para a inclusão de uMap ao projeto. Veja o trecho de código abaixo:
