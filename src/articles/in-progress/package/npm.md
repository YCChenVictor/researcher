# Title

## Purpose

This article describes frontend package manager.

## Concept

### npm

* install `nvm` and `nvm install 8.16.2`
* install: [node](https://nodejs.org/en/download/)

### yarn

* install: `sudo npm install --global yarn`
* version: `yarn --version`
* node module: `yarn install`
* zsh: in `.zshrc`, add `export PATH="$PATH:$HOME/.yarn/bin"`

### upload package

* [React](https://www.youtube.com/watch?v=KxnvvkNsSvs)
  * Init project
  * Use rollup to bundle
    ```bash
    # install
    yarn add rollup --dev
    yarn add rollup-plugin-terser --dev
    yarn add @rollup/plugin-html --dev
    ```
  * Add `rollup.config.js`
    ```js
    import { terser } from 'rollup-plugin-terser';
    import html from 'rollup-plugin-html'
    
    const devMode = (process.env.NODE_ENV === 'development')
    
    export default [
      {
        input: 'src/index.js',
        output: {
          file: 'dist/index.js',
          format: 'es',
          plugins: [
            terser({
              ecma: 2020,
              mangle: { toplevel: true },
              compress: {
                module: true,
                toplevel: true,
                unsafe_arrows: true,
                drop_console: !devMode,
                drop_debugger: !devMode
              },
              output: { quote_style: 1 },
            }),
            html()
          ]
        }
      },
      html()
    ]
    ```
  * Change how this project build
    ```JSON
    // package.json
    "type": "module",
    ...
    "scripts": {
      "build:dev": "rollup -c --environment NODE_ENV:development"
    }
    ```
  * Create your code in src

There is a problem in how to do html in rollup

## Example

give an example
<img src="{{site.baseurl}}/assets/img/xxx.png" alt="">

## Reference
