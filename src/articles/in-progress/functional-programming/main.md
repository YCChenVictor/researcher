# Title

## Purpose

The main purpose of using functional programming is to write code that is more modular, maintainable, and scalable by leveraging principles like immutability, pure functions, and higher-order functions. By embracing functional programming, developers can build software that is easier to understand, test, and evolve over time, leading to higher productivity and fewer bugs.

## Concept

* Pure functions: Easy to reason about and test, since they always return the same output given the same input and have no side effects. This can make your code more reliable and easier to maintain
  * [Distinguishing actions, calculations, and data](/blog/software/functional-programming/separating-actions-calculations-data)
* Immutability: Immutability refers to the idea that once a data structure is created, it cannot be modified. Instead, you create a new data structure that is based on the original one. This helps prevent bugs and makes your code more predictable, since you can be sure that the data structure will not change unexpectedly.
  * [immutability-with-mutable-legacy]
* Higher-order functions: A higher-order function is a function that takes another function as an argument, or returns a function as its result. Higher-order functions allow you to write more concise and expressive code, and they can help you avoid repetition and increase code reuse.
  * [codifying-discipline-with-higher-order-functions]
  * higher order function will return a function; for example
    ```javascript
    function baker(degree) {
      return function (food) {
        return food + ' baked in ' + degree;
      }
    }
    
    var baker_100 = baker(100);
    baker_100('banana')
    ```
  * No iteration: Use map, reduce, filter instead. For example, we want to make a sandwich with ingredients, bread, tomato, onion, lettuce and we need to process them before making sandwich.
    * With iteration, we can do
      ```javascript
      var ingredients = ['bread', 'tomato', 'onion', 'lettuce']
      
      for (let i = 0; i < ingredients.length; i++) {
        ingredients[i] = ingredients[i] + '_processed';
      }
      
      console.log(ingredients)
      ```
    * which the `ingredients` changed, causing side effect. Or we can achieve it with
      ```javascript
      var ingredients = ['bread', 'tomato', 'onion', 'lettuce']
      
      ingredientsProcessed = []
      for (let i = 0; i < ingredients.length; i++) {
        ingredientsProcessed[i] = ingredients[i] + '_processed'
      }
      
      console.log(ingredientsProcessed)
      console.log(ingredients)
      ```
    * tedious, and we can use map
      ```javascript
      const ingredients = ['bread', 'tomato', 'onion', 'lettuce']
      ingredientsProcessed = ingredients.map(x => x + '_processed')
      ```
* Improved code quality: By emphasizing pure functions and immutable data structures, functional programming can lead to code that is easier to read, test, and maintain. With fewer side effects to worry about, it can be easier to reason about the behavior of a program and to ensure that it is working correctly.
* Concurrency and parallelism: Take advantage of multiple processing cores or distributed systems. Since pure functions have no side effects, they can be safely executed in parallel without worrying about race conditions or other synchronization issues.
  * [Isolating Timelines](/blog/software/functional-programming/isolating-timelines.html)
* Better abstraction and modularity: Abstractions such as higher-order functions, which can make it easier to write reusable code that can be composed and combined in flexible ways. This can help reduce code duplication and make it easier to reason about the behavior of a program.
* Declarative programming: Functional programming emphasizes what a program should do rather than how it should do it. This can make code easier to read and understand, especially for complex tasks that involve many transformations on data.
* Strong type systems: Many functional programming languages have strong type systems that can catch errors at compile time rather than at runtime. This can help catch bugs earlier in the development process and reduce the likelihood of runtime errors.

## Example

I got the give a real world example, I think I should try to make my frontend projects fits functional programming

## Reference

[Learning Functional Programming with JavaScript - Anjana Vakil - JSUnconf](https://www.youtube.com/watch?v=e-5obm1G_FY&t=142s)

grokking the simplicity
