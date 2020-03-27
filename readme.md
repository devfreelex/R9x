# Introdução

Durante este tutorial, você aprenderá a configurar um projeto de criação de mapas mentais ou organogramas utilizando R9x (Reactive 9x) e uMap.

## Observações importantes

Respondendo: O que são de fato as bibliotecas R9x e uMap?

*Reactive 9x* é uma biblioteca reativa de minha autoria que pode ser utilizada para criação de aplicações front end. Essa biblioteca assemelha-se aos frameworks angular, react e vue. Porém, é muito mais simples que os três anteriormente citados.

*uMap* é uma biblioteca que pode ser utilizada para criação de mapas mentais ou organogramas. Essa biblioteca também é de minha autoria.

Agora que você já entendeu o que as libs citadas anteriormente são e para que servem, você já pode vislumbrar como construiremos juntos esse app, para que você domine reactive 9x e uMap.

Se você pensou "eu não vou utilizar reactive9x".. Fique a vontade. Porém, leia antes todo o tutorial para compreender os hooks e quando você deve registrar uMap dentro do ciclo de vida do framework que você deseja utilizar.





### Estrutura do projeto

A estrutura do projeto é composta pelos seguintes arquivos e diretórios:

```
App
|
|--> src
|		 |----> assets..........(estilização genérica de componentes reativos (R9x))
|		 |----> components......(componenentes reativos do projeto)
|		 |----> core............(o coração da lib (reactive 9x))
|		 |----> editor..........(templates customizados para a lib (uMap))
|		 |----> lib.............(diretório/core base da lib uMap)
|		 |----> services........(serviços usados nos componentes da lib (R9x) p/ operar o editor (uMap))
|		 |----> store...........(gerenciador de estado reativo baseado no padrão (flux))
|		 |----> main.js......(arquivo principal)
|--> index.html
|--> .gitignore
|--> package.json
|--> readme.md												
```

