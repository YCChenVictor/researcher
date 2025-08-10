---
layout: post
title:
description: ''
date: '2023-04-06'
categories: javascript
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Import and export statements are used in JavaScript to organize code into reusable modules, making it easier to manage, maintain, and collaborate on larger applications.

## Why?

* Encapsulation: Modules allow you to keep the implementation details of a module hidden from other parts of the application. This helps to reduce the complexity of the code and prevent naming collisions.
* Reusability: Modules can be reused across different parts of the application, making it easier to develop and maintain the code.
* Better performance: By importing only the specific modules that are needed, you can reduce the amount of code that needs to be loaded, which can improve the performance of your application.
* Collaboration: When working on a project with other developers, modules allow you to work on separate parts of the application independently and then integrate them together.

## How?

### Source

* Part of the ECMAScript 2015 (ES6) specification, which was released in June 2015.
* Prior to ES6, JavaScript did not have a native module system, so developers had to use third-party libraries or workarounds to manage dependencies and module loading. The introduction of import and export in ES6 made it easier for developers to organize and reuse code across multiple files.
* Since the release of ES6, import and export have become a widely used feature in modern JavaScript development, and many tools and frameworks have been built around the module system, such as Node.js, Webpack, and Babel.

### ECMAScript modules

Add `"type": "module"` to your `package.json` file.

This tells Node.js to treat all .js files in your project as ESM modules by default. Here's an example of what your package.json might look like:

```JSON
{
  "type": "module",
  "dependencies": {
    "module-name": "^1.0.0"
  }
}
```

After adding this line, you can use import and export statements in your JavaScript files without seeing the warning.

Then transform old block from

```javascript
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
  ]
}
```

to

```javascript
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export const plugins = [
  postcssImport(),
  tailwindcss('./tailwind.config.js'),
  autoprefixer(),
];
```

### Export

There are two way:

* export

```javascript
// export a function
export function addNumbers(a, b) {
  return a + b;
}

// export an object
export const person = {
  name: 'John',
  age: 30
};
```

* export at once

```javascript
// export multiple functions/objects
export default { addNumbers, person };
```

### import

```javascript
// main.js file
import { addNumbers, person } from './math.js';

console.log(addNumbers(2, 3)); // Output: 5

console.log(person.name); // Output: John
```

### default

A default export is a way to export a single function, object, or value as the default export from a module.

```javascript
// utils.js file
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

export default { add, subtract, multiply };
```

In this example, we're exporting an object that contains multiple functions as the default export. When importing this module, you can destructure the object and access its properties like this:

```javascript
// main.js file
import utils from './utils.js'; // you can name the imported object as anything you want

console.log(utils.add(1, 2)); // Output: 3
console.log(utils.subtract(3, 2)); // Output: 1
console.log(utils.multiply(2, 3)); // Output: 6
```

## What?

give real world example

## Reference

Why: asking for the reason or purpose behind something.
How: asking for the method or process of doing something.
What: asking for information about a specific thing or object.
