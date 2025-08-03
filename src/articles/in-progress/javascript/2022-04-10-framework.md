---
layout: post
title: framework
description: ''
date: '2022-04-10'
categories: javascript
note:
mathjax:
mermaid:
p5:
---

## Introduction

Compare reactJS and vanillaJS.

## Why?

I wasted some time to consider whether to use a framework, so I want to reorganize my thoughts.

## How?

### why react born

1. state management and render states to DOM
2. single page application
3. maintain components
4. only frontend
5. feature: JSX, virtual DOM, One-way data binding, Components

### evaluation

Given the reasons, if

1. there are going to be lots of states
2. rewrite the data without reload the webpage
3. there are going to be lots of components
4. this app is going to change backend framework
5. You like the features

Then you should use react.

## What?

For my new project, I am going to create a world rendered on github pages. Then,

1. The world will be full of randomly created states
2. The states will be updated automatically
3. The world will be lots of components
4. If I am going to let someone join the world, I need a backend and datbase hosting
5. I want to try virtual DOM

so I should use react.

## Reference

[React (JavaScript library)](https://en.wikipedia.org/wiki/React_(JavaScript_library))

[React vs. Plain JavaScript](https://www.framer.com/blog/posts/react-vs-vanilla-js/)

[Why did we build React?](https://reactjs.org/blog/2013/06/05/why-react.html)

[why react born](https://www.google.com/search?q=why+react+born&rlz=1C5CHFA_enTW940TW940&biw=1440&bih=730&sxsrf=APq-WBsZuF_-VNNYiok1pWPqu2_CHEWbQQ%3A1649578159818&ei=r5BSYrnUMc6hoATz0bCQCg&ved=0ahUKEwj55_rBhYn3AhXOEIgKHfMoDKIQ4dUDCA4&uact=5&oq=why+react+born&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECc6BwgjELADECc6BwgAEEcQsAM6BwgjEOoCECc6BAgAEEM6BQguEIAEOgsILhCABBDHARDRAzoFCAAQgAQ6BQgAEJECOgUIABDLAToKCAAQgAQQhwIQFDoGCAAQFhAeSgQIQRgASgQIRhgAUJYDWJAWYNUXaAJwAXgAgAF5iAGgB5IBBDEzLjGYAQCgAQGwAQrIAQnAAQE&sclient=gws-wiz)
