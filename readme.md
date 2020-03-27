# Introdução

Durante este tutorial, você aprenderá a configurar um projeto de criação de mapas mentais ou organogramas utilizando R9x (Reactive 9x) e uMap.

## Observações importantes

Respondendo: O que são de fato as bibliotecas R9x e uMap?

*Reactive 9x* é uma biblioteca reativa de minha autoria que pode ser utilizada para criação de aplicações front end. Essa biblioteca assemelha-se aos frameworks angular, react e vue. Porém, é muito mais simples que os três anteriormente citados.

*uMap* é uma biblioteca que pode ser utilizada para criação de mapas mentais ou organogramas. Essa biblioteca também é de minha autoria.

Agora que você já entendeu o que as libs citadas anteriormente são e para que servem, você já pode vislumbrar como construiremos juntos esse app, para que você domine reactive 9x e uMap.

Se você pensou "eu não vou utilizar reactive9x".. Fique a vontade. Porém, leia antes todo o tutorial para compreender os hooks e quando você deve registrar uMap dentro do ciclo de vida do framework que você deseja utilizar.





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

Chegou a hora de instalar todas as dependências do projeto. 

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

Agora vamos juntos entendendo o que é cada uma das 5 partes que envolvem todo esse código.

* #### Parte 1
```json
  "name": "Mind Map",
  "version": "1.0.0",
  "description": "Mind map manager",
  "main": "index.html",
```

> Aque defini o nome do projeto *"name": "Mind Map"*, a versão *"version": "1.0.0"*, epecifiquei o que o projeto faz *"description": "Mind map manager"* e informei o arquivo  *index.html* assim ---> *"main": "index.html"*, para deixar claro que é o arquivo principal do projeto.


* #### Parte 2

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

 No trecho acima, epefiquei a linha de comando que deve ser seguida para gerar um build do projeto para 3 cenários: 
 
 1. Desenvolvimento
> ```json 
> "dev": "parcel index.html -p 3000", 
> ```
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

* #### Parte 3

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
Aqui configurei o *babel*, transpilador fora da caixa, para trabalhar junto com o *parcel* e gerar builds ES5 compatível com a maioria dos navegadores atuais e antigos.

* #### Parte 4

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
No bloco acima, temos as configurações de instalação das dependências que precisaremos para rodar o projeto durante o desenvolvimento do mesmo.

Todos os items listados nesse trecho serão instalados o executar o comando abaixo no momento adequado.

> npm install

* #### Parte 5

```json
  "dependencies": {}
```
Finalmente temos a configuração das dependências de terceiros que serão necessárias para a aplicação enquanto ela estiver sendo executada.

> "A aplicação não dependerá de recursos desenvolvidos de terceiros."


Para instalar todas as dependências, você deve no diretório do projeto, através do terminal de comandos executar o trecho de código abaixo:

```javascript
	npm install
```


