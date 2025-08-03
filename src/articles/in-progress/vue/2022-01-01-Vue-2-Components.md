---
layout: post
title: (Vue 2) Components
description: ''
date: '2022-01-01'
categories: vue
note: 
---

## Introduction

skip

## Why?

With the concpet of components, we can build a larger and maintainable App with the concept of not duplicate components.

## How?

### basic example of login form

#### template of login form

We are going to build an App with two inputs sections using the same component and one component for logic form. The basic concept of Vue:

1. create app with `app=Vue.createApp`
2. create components for app with `app.component`
3. put the components in `<div id="app">` and use data and methods to manipulate it
4. and of course, use style to change the layout

as follow

```html
<style>
    ...
    input {
        margin: 10px;
        display: block;
    }
</style>
...
<div id="app" v-cloak>
    <login-form />
</div>
...
<script>
    ...
    app.component('login-form', {
        template:`
            <h1> {{title}} </h1>
            <div>
                <input type='email' />
                <input type='password' />
            </div>
        `,
        data() {
            return {
                title: 'Login'
            }
        }
    })
    ...
</script>
```

#### function to post email and password

1. turn `<div>` into `<form>`
2. add `<button>` in `<form>`
3. add function to eventlistener, `@submit` in `<form>`
4. add method, `<handleSubmit>` for `<@submit>`
5. prevent the original behavior of `<button>` to avoid page refreshing
6. add `v-model` and parameters in the `return` of `data()` to catch the inputs

then the script would be like

```javascript
<script>
    ...
    app.component('login-form', {
        template:`
            <h1> {{title}} </h1>
            <form @submit.prevent="handleSubmit">
                <input type='email' v-model="email" />
                <input type='password' v-model="password" />
                <button> login </button>
            </form>
        `,
        data() {
            return {
                title: 'Login',
                email: '',
                password: ''
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.email, this.password)
            }
        }
    })
    ...
</script>
```

## What?

give an example

## Reference
