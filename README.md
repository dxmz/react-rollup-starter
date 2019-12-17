![NPM](https://img.shields.io/npm/l/react-rollup-starter.svg?style=popout) ![npm](https://img.shields.io/npm/v/react-rollup-starter.svg?style=flat-square)
## react-rollup-starter

A quick-start project template which uses React 16.x + Rollup 1.x for bundling


# Setup  
1、Clone  
`git clone https://github.com/dxmz/react-rollup-starter`  
2、install dependencies  
`npm install`  
3、Run dev server  
`npm start`  
4、Visit  
`http://localhost:8080`

# CLI
## npm start
Launch the server;

## npm run build
Build production bundles, which save in `example/dist`. Style file put in `example/css/style.css`  

Finally, `umd`, `es`, `cjs` file and `umd` xx.min.js file are generated in `lib`.  

## npm run publish-demo  
Build your project and publish your demo in github.io  

## npm publish  
Publish your npm package to `https://www.npmjs.com/` and your first npm package is done.

# Directory Dtructure  
```
│  .babelrc
│  .browserslistrc
│  .gitignore
│  .npmignore
│  LICENSE
│  package-lock.json
│  package.json
│  README.md
│  
├─example
│  ├─dist
│  │  │  index.html
│  │  │  react-rollup-starter.cjs.js
│  │  │  react-rollup-starter.js
│  │  │  react-rollup-starter.js.map
│  │  │  
│  │  └─css
│  │          style.css
│  │          
│  └─src
│          app.js
│          index.html
│          
├─lib
│  │  react-rollup-starter.cjs.js
│  │  react-rollup-starter.esm.js
│  │  react-rollup-starter.js
│  │  react-rollup-starter.js.map
│  │  react-rollup-starter.min.js
│  │  
│  └─css
│          style.css
│          
├─scripts
│      rollup.config.base.js
│      rollup.config.dev.js
│      rollup.config.prod.js
│      
└─src
        index.js
        style.scss
```