---
layout: post
title: (Vue 1) Events & Methods
description: ''
date: '2022-01-01'
categories: vue
note: 
---

## Introduction

Users can interact with webpages with following events: click, scroll, hover, ...etc. In this article, I am going to explain how Vue handles these events.

## Why?

skip

## How?

Given following template,

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 Basic</title>
    <style>
        .box {
            background-color: purple;
            height: 200px;
            width: 200px;
        }
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
    <div id="app" v-cloak>
        {{ greeting }}
        <input v-model = "greeting" />

        <hr>
        <button>show</button>
        <div v-if="isVisible" class="box"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: false
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

Now, the box is invisible and we can add eventlistener on the `<button>show</button>` with `v-on`.

### v-on (serves as eventlistener in Vanilla JS)

Given the template above, to toggle the button, change button into

```html
...
<button v-on:click= "isVisible = !isVisible">toggle box</button>
...
```

To simplify it, we can write the button as

```html
...
<button @click= "isVisible = !isVisible">toggle box</button>
...
```

### methods

Given the setting above, if we want to have more complex logics when the toggle button being clicked, we may need to write the function explicitly. Change the logic of `@click` from

```html
...
<button @click= "isVisible = !isVisible">toggle box</button>
...
```

to

```html
...
<button @click= "toggleBox">toggle box</button>
...
```

and add method `toggleBox` in methods section of `let app = Vue.createApp`

```javascript
...
let app = Vue.createApp({
    ...
    methods: {
        toggleBox() {
            this.isVisible = !this.isVisible
        }
    }
    ...
})
...
```

More eventlistener: @keyup, ... etc

## What?

The full script:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 Basic</title>
    <style>
        .box {
            background-color: purple;
            height: 200px;
            width: 200px;
        }
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
    <div id="app" v-cloak>
        {{ greeting }}
        <input v-model = "greeting" />

        <hr>
        <button @click="toggleBox">toggle box</button>
        <div v-if="isVisible" class="box"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: false
                }
            },
            methods: {
                toggleBox() {
                    this.isVisible = !this.isVisible
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

## Reference
[Vue.js Course for Beginners [2021 Tutorial]](https://www.youtube.com/watch?v=FXpIoQ_rT_c&t=0s)
