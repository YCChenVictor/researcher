# Title

## Purpose

AJAX means Asynchronous JavaScript and XML. It helps us to create more efficient, dynamic, and interactive web applications.

* Enhanced User Experience: AJAX allows web applications to update **specific** parts of a web page without reloading the entire page, resulting in faster response times and a smoother user experience.
* Reduced Server Load: Because AJAX requests only update specific parts of a web page, it can help reduce the amount of data that needs to be transferred between the client and the server. This can help reduce server load, improve application performance, and reduce bandwidth usage.
* Increased Efficiency: AJAX can help make web applications more efficient by enabling them to update data in real-time without requiring a page refresh.

## Concept

### Basic Request and render

Request data from external server -> Parse the data -> Load data without a refresh -> Data can be formats like (XML, JSON, HTML)

* index.html
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
* main.js
  ```javascript
  document.addEventListener('DOMContentLoaded', function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(request => request.json())
      .then(posts => {
        const firstPost = posts[0];
        const postTitleA = document.querySelector('.post-title');
        postTitleA.textContent = firstPost.title
        document.querySelector('.post-title').textContent = firstPost.title
    })
  })
  ```

After the fetch, it will replace the Loading... to the returned data.

### Plain JavaScript

* Create an instance of the XMLHttpRequest object
  ```javascript
  const xhttp = new XMLHttpRequest();
  ```
* Define a function to handle the response when it arrives.
  ```javascript
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // handle the response here
    }
  };
  ```
* Send the request to the server (GET request)
  ```javascript
  xhttp.open("GET", "url_to_server_script", true);
  xhttp.send();
  ```
* Handle the server response: When the server response arrives, the function you defined in step 2 is executed. You can use the responseText property of the XMLHttpRequest object to get the response from the server
  ```javascript
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("result").innerHTML = this.responseText;
    }
  };
  ```

In the above code, the response from the server is added to an HTML element with the id of "result".

## What

For example, thinking of my webpage is the burger store and I serve burgers. The ingredients are simply as follow: sauce, patty, lettuce. The chef(backend) needs time to prepare the ingredients. One second for lettuce cutting, two seconds for patty slicing, and three seconds for sauce cooking. I use `setTimeout()` to simulate the delivery time from backend. The Chef can cut and slice while the sauce is boiled. Then the coding may be as follow:

### index.html

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Burger Store</title>
  <script src="main.js"></script>
</head>
<body></body>
</html>
```

### main.js

```javascript
const ingredients = [
  'buns'
]

serveBurger()
createIngredient({ name: 'sauce', time: 3000 })
createIngredient({ name: 'patty', time: 2000 })
createIngredient({ name: 'lettuce', time: 1000 })

function serveBurger() {
  setTimeout(() => {
    let burger = '';
    ingredients.forEach((ingredient) => {
      burger += `<ul>${ingredient}</ul>`
    });
    document.body.innerHTML = burger;
  }, 4000)
}

function createIngredient(ingredient) {
  setTimeout(() => {
    ingredients.push(ingredient.name)
  }, ingredient.time)
}
```

Then the burger looks like

![burger](assets/img/burger)

However, what if **we do not know how much time** each ingredient takes, meaning the waiter may go to get the meal too early and may serve Semi-finished products if the chef did not notice; for example, taking the 4000 out from the setTimout() in the function, serveBurger.

We need callback function to help us. With callback function, we can tell the waiter back after the burger prepared; for example, we call the waiter back every 0.5 second and check whether ingredients prepared. The code:

### JavaScript

```javascript
const requiredIngredients = ['lettuce', 'patty', 'sauce']
const ingredients = ['buns']

const recipes = [
  { name: 'lettuce', time: 1000 },
  { name: 'patty', time: 2000 },
  { name: 'sauce', time: 3000 }
]

for (let i = 0; i < requiredIngredients.length; i++) {
  createIngredient(recipes[i], () => {
    checkIngredients(() => {
      serveBurger()
    })
  })
}

function checkIngredients(callback) {
  setTimeout(() => {
    if (requiredIngredients.every(result => ingredients.includes(result))) {
      callback()
    } else {
      console.log("still preparing")
    }
  }, 500)
}

function serveBurger() {
  setTimeout(() => {
    let burger = '';
    ingredients.forEach((ingredient) => {
      burger += `<ul>${ingredient}</ul>`
    });
    document.body.innerHTML = burger;
  })
}

function createIngredient(ingredient, callback) {
  setTimeout(() => {
    ingredients.push(ingredient.name);
    callback()
  }, ingredient.time)
}
```

As you can see, there is some callbacks looks like

```javascript
createIngredient(recipes[i], () => {
  checkIngredients(() => {
    serveBurger()
  })
})
```

As you can see, the more steps to wait, the more callbacks would be, making the code looks like boomerang and this is called the **callback hell**. To solve this kind of issue, we can use **promise**

### Promise

I am going to solve the callback part in the callback hell. With promise, we can eliminate callback from the function first. For example, the checkIngredient(), changing from

```javascript
function createIngredient(ingredient, callback) {
  setTimeout(() => {
    ingredients.push(ingredient.name);
    callback()
  }, ingredient.time)
}
```

to

```javascript
function createIngredient(ingredient) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ingredients.push(ingredient.name);
      const error = false
      if (!error) {
        resolve();
      } else {
        reject(`Error: Something went wrong while creating ingredient, ${ ingredient.name }`)
      }

    }, ingredient.time)
  })
}
```

and eliminate callback() from checkIngredients with same technique. Then, the callback hell structure, changing from

```javascript
createIngredient(recipes[i], () => {
  checkIngredients(() => {
    serveBurger()
  })
})
```

to

```javascript
createIngredient(recipes[i])
  .then(checkIngredients)
  .then(serveBurger)
  .catch(error => console.log(error))
```

However, there is still a hell like chain structure, so I am going to use async/await.

### Async/Await

With the promise function defined above, we can turn the chain structure into

```javascript
async function step(recipe) {
  await createIngredient(recipe).catch(error)
  await checkIngredients()
  serveBurger()
}
```

and call them with

```javascript
for (let i = 0; i < requiredIngredients.length; i++) {
  step(recipes[i]);
}
```

### Full result

```javascript
// main.js
const requiredIngredients = ['lettuce', 'patty', 'sauce'];
const ingredients = ['buns'];

const recipes = [
  { name: 'lettuce', time: 1000 },
  { name: 'patty', time: 2000 },
  { name: 'sauce', time: 3000 }
];

async function step(recipe) {
  try {
    await createIngredient(recipe);
    await checkIngredients();
    serveBurger();
  } catch (error) {
    console.error(error);
  }
}

for (let i = 0; i < requiredIngredients.length; i++) {
  step(recipes[i]);
}

function checkIngredients() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (requiredIngredients.every(result => ingredients.includes(result))) {
        resolve();
      } else {
        reject("Still preparing ingredients");
      }
    }, 500);
  });
}

function serveBurger() {
  setTimeout(() => {
    let burger = '';
    ingredients.forEach((ingredient) => {
      burger += `<ul>${ingredient}</ul>`;
    });
    document.body.innerHTML = burger;
  }, /* Specify time here */);
}

function createIngredient(ingredient) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ingredients.push(ingredient.name);
      const error = false; // Set to true in case of an error
      if (!error) {
        resolve();
      } else {
        reject(`Error: Something went wrong while creating ingredient, ${ ingredient.name }`);
      }
    }, ingredient.time);
  });
}
```

## Reference

[Using Promise (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[Promise (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Async JS Crash Course - Callbacks, Promises, Async Await](https://www.youtube.com/watch?v=PoRJizFvM7s)
