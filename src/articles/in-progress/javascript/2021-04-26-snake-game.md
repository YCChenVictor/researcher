---
layout: post
title: overview
description:
date: '2021-04-26T09:55:52.243Z'
categories: javascript
note: javascript
publish:
---

## Introduction

1. multi-paradigm: supporting imperative, procedural, OOP, and functional programming
2. dynamic language: add or change object while the program is running
3. types: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
4. operators: `+`, `-`, `*`, `/` ,`%` , `+=` ,`-=` , `<`, `>`, `<=` ,`>=` ,`===`
```
123 == '123'; // true (type can be different)
123 === '123'; // false (type must be the same)
```
5. built-in objects: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
6. based on the Java and C languages
7. based on prototypal inheritance but also with class inheritance

## Why to learn it

1. Interactive Behavior to Web Pages
2. Creating Web and Mobile Apps
3. Build Web Server
4. Game Development

## How

I am going to build a snake game. The steps as follow:

1. Initialize The Picture
2. Let Frame Appear
3. Add snake
4. Let The Snake Move
5. Let user control the snake
6. food appears and snake eats food one time

### Initialize The Picture

#### Initialize `canvas` and javascript

create `snakegame.html` and input the tag in the `<body>`

```javascript
<canvas id="gameCanvas" width="400" height="400"><canvas>
```

id lets us to identify this `<canvas>` object and `width` and `height` will be the props of this id and a function to start the game

#### The full html file
```
<!DOCTYPE html>  
<html>  
  <head>  
    <title>Snake Game</title>  
  </head>  
  <body>  
    <canvas id="snakeboard" width="400" height="400"></canvas>
  </body>  
  <script>  
    function main() {  
    }  
  </script>  
</html>
```
### Let Frame Appear

add the `script` as follow
```
<script>
...  
// Get the canvas element  
const snakeboard = document.getElementById("snakeboard");

// Return a two dimensional drawing context  
const snakeboard_ctx = snakeboard.getContext("2d");  
...
</script>
```
`snakeboard` lets javascript to get the object with id, `"snakeboard"` and `getContext` tells javascript what the environment to be rendered, which is 2D in this example. And add function to let canvas appears:
```
function main() {
  clearCanvas();
}
```
`clearCanvas()`:
```
// draw canvas  
function clearCanvas() {  
  // Draw a "border" around the entire canvas  
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
```
The method of [strokeRect](https://www.w3schools.com/tags/canvas_strokerect.asp)
### Add snake

#### Initialize position of snake
```
<script>
  ...
  let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200},
  ];
  ...
</script>
```
The initial location of snake will be (200,200) ~ (160, 200) the length will be four 10 x 10

#### function to draw snake
```
// Draw the snake on the canvas  
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}
```
#### function to draw snake parts
```
// Draw one snake part  
function drawSnakePart(snakePart) {  
  // Draw a border around the snake part  
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);  
}
```

#### Add snake function into main
The main function is going to run `clearCanvas` and then `drawSnake`
```
function main() {
  clearCanvas();
  drawSnake();
}
```
### The full html file now
```
<!DOCTYPE html>
<html>
  <head>
    <title>Snake Game</title>
  </head>
  <body>
    <canvas id="snakeboard" width="400" height="400"></canvas>
  </body>
  <script>
    // Get the canvas element
    const snakeboard = document.getElementById("snakeboard");
    // Return a two dimensional drawing context
    const snakeboard_ctx = snakeboard.getContext("2d");
    // init snake
    let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]

    // Start game  
    main();
      
    // main function called repeatedly to keep the game running
    function main() {
      clearCanvas();
      drawSnake();
    }

    // draw canvas
    function clearCanvas() {
      // Draw a "border" around the entire canvas
      snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    // Draw the snake on the canvas  
    function drawSnake() {  
      // Draw each part  
      snake.forEach(drawSnakePart)  
    }

    // Draw one snake part
    function drawSnakePart(snakePart) {
      // Draw a border around the snake part
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

  </script>  
</html>
```
### Let The Snake Move

#### Add the move function

```
function moveSnake() {
  const head = {x: snake[0].x, y: snake[0].y};
  snake.unshift(head);
  snake.pop();
}
```
This function adds head to the beginning of the the array and remove the last element of the array.

And put the function into the `main()`
```
function main() {  
  clearCanvas();  
  moveSnake();  
  drawSnake();  
}
```

Then the plot will transform from
<img src="/assets/img/1__nh__P3DD__DpINTv4ca2G0og.png" alt="" width=500>

to

<img src="/assets/img/1__ROMYx8TcO56Tw0VxpOknXA.png" alt="" width=500>

,meaning the functions in main has been run **one time**. However, we want it to move multiple times; as a result, we can add `setTimeout` which is going to run functions in it after a period of time, 0.1 second in this example and because there is `main()` in this `main()`, the whole process will be run iteratively.
```
function main() {  
  setTimeout(function onTick() {  
    moveSnake();
    drawSnake();
    main();  
  }, 100)
}
```
However, the plot is going to be

<img src="/assets/img/1__avPjt94uUgnQFi00cHvyug.png" alt="" width=500>

This is because the old picture did not be cleared, so we add to the function clearCanvas()
```
function clearCanvas() {  
  //  Select the colour to fill the drawing  
  snakeboard_ctx.fillStyle = "white";  
  // Draw a "filled" rectangle to cover the entire canvas  
  // snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);  
  ...  
}
```
and the `main()`:
```
function main() {  
  setTimeout(function onTick() {
    clearCanvas();
    moveSnake();
    drawSnake();
    main();
  }, 100)
}
```
### Let user control the snake

#### Add the function to change the direction

```
function changeDirection(event) {
  const leftKEY = 37;
  const rightKEY = 39;
  const upKEY = 38;
  const downKEY = 40; 
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;  
  }
  
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }   
  
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}
```

This function means that if a user presses keyboard, the keyboard is left and it is not going right, add a square to the left and other direction works similarly.

#### Let user change the direction of snake

Add the following
```
// let program get the user's pressing key  
document.addEventListener("keydown", change_direction);

and modify the function `moveSnake` by adding `dx` and `dy`

function moveSnake() {  
  // Create the new Snake's head  
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};  
  // Add the new head to the beginning of snake body  
  snake.unshift(head);  
  snake.pop();  
}
```
Then if the user press key, it will change `dx` and `dy` accordingly. Specify the default dx and dy value outside the function with
```
...  
dx = 0  
dy = 0  
...
```
### Food Appears and Snake Eats Food one time

The following function returns random number between min and max values

```
function randomFood(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
```
, giving the x and y position of food randomly:
```
foodX = 0
foodY = 0
function generateFood() {
  foodX = randomFood(0, snakeboard.width - 10);  
  foodY = randomFood(0, snakeboard.height - 10);  
  ...
}
```

and draw the food

```
function drawFood(){
  snakeboardCTX.fillStyle = 'lightgreen';
  snakeboardCTX.fillRect(foodX, foodY, 10, 10);}
```

and put the drawFood() to main function

function main() {  
  setTimeout(function onTick() {  
    clearCanvas();  
    **drawFood();**
    move_snake();  
    drawSnake();  
    main();  
  }, 100)  
}

Then there would be food on the left and top corner
<img src="/assets/img/1_umv4uGYYRZjw9lFWtrb7eg.png" alt="" width=500>

Then after snake touch the food, the snake should add length and food should disappear.
### snake add length

In the `move_snake()`

```
function move_snake() {
  const head = {x: snake[0].x + dx, y: snake[0].y};
  snake.unshift(head);
```

change `snake.pop()` into `hasEatenFood`

```
const hasEatenFood = (snake[0].x === food_x && snake[0].y === food_y);
  if (has_eaten_food) {
    // Generate new food location    
    gen_food();  
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
```

At the moment snake touching food, it will skip the `.pop()` and generate a new food.

## What
The full code:
```
<!DOCTYPE html>
<html>
  <head>
  	<title>Snake Game</title>
  </head>
  <body>
    <canvas id="snakeboard" width="400" height="400"></canvas>
  </body>
  <script>
    // Get the canvas element
    const snakeboard = document.getElementById("snakeboard");
    // Return a two dimensional drawing context
    const snakeboardCTX = snakeboard.getContext("2d");
    // init snake
    let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]
    // Start game
    main();
    
    // let program get the user's pressing key
    document.addEventListener("keydown", changeDirection);

    // main function called repeatedly to keep the game running
    function main() {
      setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
      }, 100)
    }

    // draw canvas
    function clearCanvas() {
      //  Select the colour to fill the drawing
      snakeboardCTX.fillStyle = "white";
      // Draw a "filled" rectangle to cover the entire canvas
      snakeboardCTX.fillRect(0, 0, snakeboard.width, snakeboard.height);
      // Draw a "border" around the entire canvas
      snakeboardCTX.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    // Draw the snake on the canvas
    function drawSnake() {
      // Draw each part
      snake.forEach(drawSnakePart)
      console.log(snake)
    }

    // Draw one snake part
    function drawSnakePart(snakePart) {
      // Draw a border around the snake part
      snakeboardCTX.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    
    // let the snake move dx horizontally and dy vertically
    dx = 0
    dy = 0
    function moveSnake() {
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head to the beginning of snake body
      snake.unshift(head);
      const hasEatenFood = (snake[0].x === foodX && snake[0].y === foodY);
      if (hasEatenFood) {
        // Generate new food location
        generateFood();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
    }
  
    function changeDirection(event) {  
    
      const leftKEY = 37;
      const rightKEY = 39;
      const upKEY = 38;
      const downKEY = 40;
     
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;  
      const goingLeft = dx === -10;
   
      if (keyPressed === leftKEY && !goingRight) {    
        dx = -10;
        dy = 0;  
      }
     
      if (keyPressed === upKEY && !goingDown) {    
        dx = 0;
        dy = -10;
      }
     
      if (keyPressed === rightKEY && !goingLeft) {    
        dx = 10;
        dy = 0;
      }
     
      if (keyPressed === downKEY && !goingUp) {    
        dx = 0;
        dy = 10;
      }
    }

    // function for mechanism for food
    function randomFood(min, max) {  
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    foodX = 0
    foodY = 0
    function generateFood() {  
      foodX = randomFood(0, snakeboard.width - 10);
      foodY = randomFood(0, snakeboard.height - 10);
    }

    function drawFood() {
      snakeboardCTX.fillStyle = 'lightgreen';
      snakeboardCTX.fillRect(foodX, foodY, 10, 10);
    }

    function hasSnakeEatenFood(part) {
      const hasEaten = part.x == foodX && part.y == foodY;
    }

  </script>
</html>
```

## Reference

[**A re-introduction to JavaScript (JS tutorial)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

[**JavaScript Snake Game Tutorial: build a simple, interactive game**](https://www.educative.io/blog/javascript-snake-game-tutorial)