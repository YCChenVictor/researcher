---
layout: post
title: (Javascript_5) Bind
date: '2021-06-22'
state:
categories: javascript
---

## Introduction
Usually, in other programming language, we cannot access variables outside a function, but in javascript, we can. This characteristic called closure.

## Why
The CSS is a kind of closure.

## How
For example, think about the following code
```
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer Variable: ' + outerVariable)
    console.log('Inner Variable: ' + innerVariable)
  }
}

const newFunction = outerFunction('outside')
newFunction('inside')
```

## What

## Reference
[**Learn Closures In 7 Minutes**](https://www.youtube.com/watch?v=3a0I8ICR1Vg)
