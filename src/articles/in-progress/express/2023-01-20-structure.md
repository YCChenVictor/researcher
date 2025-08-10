---
layout: post
title:
description: ''
date: '2023-01-20'
categories: node
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

TODO:

* add structure tree after project is done
* solve absolute path

```bash
.
├── __test__
├── api
├── app.js
├── database
├── node_modules
├── package-lock.json
└── package.json
```

#### import and export

[import & export]({{site.baseurl}}/blog/javascript/2022/12/12/overview.html#import-and-export)

#### absolute path (TBC)

install required package with `npm install --save-dev babel-plugin-module-resolver` ([babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver))

and in `./.babel.config.js`, add

```bash
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@src': './src',
          '@components': './src/components',
        }
      }
    ]
  ]
};
```

then we can import with

```javascript
import Button from 'src/components/Button';
```

## What?

give an example

<img src="{{site.baseurl}}/assets/img/xxx.png" alt="">

## Reference
