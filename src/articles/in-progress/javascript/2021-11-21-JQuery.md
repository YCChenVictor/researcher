---
layout: post
title: (JavaScript ˙) JQuery
date: '2021-11-21'
state:
categories: javascript
note:
---

## Summary & Why

1. JQuery simplifies JavaScript programming.
2. features:
   * HTML/DOM/CSS manipulation
   * HTML event methods
   * Effects and animations
   * AJAX
   * Utilities

## How & What

### HTML/DOM/CSS manipulation

skip

### HTML event methods

skip

### Effects and animations

skip

### AJAX

Take AJAX in [this article](https://ycchenvictor.github.io/javascript/2021/06/29/Javascript-6-Ajax.html) as example, the before setting without JQuery would be as follow:

#### index.html

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <script src="main.js"></script>
  </head>
  <body>
    <div class="post-title">
      <h2> Loading... </h2>
    </div>
  </body>
</html>
```

#### main.js

```javascript
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(request => request.json())
    .then(posts => {
      const firstPost = posts[0];
      const postTitleA = document.querySelector('.post-title');
      postTitleA.textContent = firstPost.title
      document.querySelector('.post-title').textContent =firstPost.title
  })
})
```

Then, import JQuery with CDN in `index.html` as follow:

```html
<script type="module" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
```

and add `type="module"` in `index.html` as follow

```html
...
<script type="module" src="main.js"></script>
...
```

**Notice** We need a localhost to avoid CROS -> I use Sinatra

#### create backend

Just follow the steps in [**Sinatra**](https://github.com/sinatra/sinatra)

Then we have the following file structure:

<img src="/assets/img/JQery_file_structure.png">

Then the main.js file would be as follow

```javascript
$(document).ready(function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        processResults: function (request) {
            return {
                results: request.json()
            };
        },
        success: function(request) {
            console.log(request);
          }
    }).done(function(posts){
        const firstPost = posts[0];
        const postTitleA = document.querySelector('.post-title');
        postTitleA.textContent = firstPost.title
        document.querySelector('.post-title').textContent =firstPost.title
    })
})
```



### Utilities

skip

## Reference

[**JQuery**](https://jquery.com/)
[**Sinatra**](https://github.com/sinatra/sinatra)
