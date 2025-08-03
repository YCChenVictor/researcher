# Title

## Purpose

For web applications with rich user experiences has driven the widespread adoption of JavaScript as a versatile and powerful language.

## Concept

JavaScript is a single-threaded language, which means that it can only execute one task at a time

### OOP

Object-oriented programming (OOP) is a programming paradigm that uses objects, which are instances of **classes**, to organize code. JavaScript supports OOP through its prototype-based inheritance system. ECMAScript 6 (ES6) introduced the class syntax, which provides a more traditional class-based approach to OOP in JavaScript.

A typical Object in javascript:

```javascript
let car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2022,
  start: function() {
    console.log('Engine started')
  }
};
```

#### Object methods

* defineProperty: Object.defineProperty gives you the ability to define properties that may not be achievable using simple property assignment syntax (obj.property = value). For example, you can create read-only properties, define getters and setters for computed properties, or create properties that are not enumerable (i.e., they won't show up during iteration).
  ```javascript
  // Example: defines a non-enumerable property named "value" on the object objA, with an initial value of true.
  Object.defineProperty(objA, "value", { value: true, enumerable: false });
  // Noted that the non-enumerable variable will not be seen with log
  ```

### Constructing Objects

There are two different forms to construct objects, functional forms and class forms.

#### Functional Form

Objects in JavaScript are created using functions and closures, allowing for the definition of object behavior through nested functions within the constructor or by attaching functions to the object's prototype, with the `this` keyword referring to the object instance and enabling encapsulation and private variables through closures.

* Example
  ```javascript
  function createPerson(name, age) {
    // Private variables
    var _name = name;
    var _age = age;
  
    // Private function
    function increaseAge() {
      _age++;
    }
  
    // Public methods
    return {
      getName: function() {
        return _name;
      },
      getAge: function() {
        return _age;
      },
      celebrateBirthday: function() {
        increaseAge();
      }
    };
  }
  
  // Create an instance object
  var person = createPerson("John", 25);
  
  // Access the private variables using public methods
  console.log(person.getName()); // Output: "John"
  console.log(person.getAge()); // Output: 25
  
  // Try to access the private variables directly
  console.log(person._name); // Output: undefined
  console.log(person._age); // Output: undefined
  
  // Use public method to increase age
  person.celebrateBirthday();
  console.log(person.getAge()); // Output: 26
  ```
* Example (with this)
  ```javascript
  function Person(name, age) {
    // Public properties
    this.name = name;
    this.age = age;
  
    // Private function
    function increaseAge() {
      this.age++;
    }
  
    // Public methods
    this.getName = function() {
      return this.name;
    };
  
    this.getAge = function() {
      return this.age;
    };
  
    this.celebrateBirthday = function() {
      increaseAge.call(this);
    };
  }
  
  // Create an instance object
  var person = new Person("John", 25);
  
  // Access the public properties and methods
  console.log(person.getName()); // Output: "John"
  console.log(person.getAge()); // Output: 25
  
  // Try to access the public properties directly
  console.log(person.name); // Output: "John"
  console.log(person.age); // Output: 25
  
  // Use public method to increase age
  person.celebrateBirthday();
  console.log(person.getAge()); // Output: 26
  ```

#### Class Form
  
* The class form was introduced in ECMAScript 2015 (ES6) as a syntactical sugar on top of the functional approach.
* Classes provide a more formal and structured way of defining objects with shared behavior and state.
* Objects are created using the new keyword followed by the class name.
* Object behavior is defined using methods within the class definition.
The `this` keyword also refers to the object instance that the method is called on.
* Inheritance
  ```javascript
  // Parent class
  class ParentClass {
    constructor(name) {
      this.name = name;
    }
  
    greet() {
      console.log('Hello, ' + this.name + '!');
    }
  }
  
  // Child class
  class ChildClass extends ParentClass {
    constructor(name, age) {
      super(name); // You need to call this to construct Parent
      this.age = age;
    }
  
    introduce() {
      console.log('My name is ' + this.name + ' and I am ' + this.age + ' years old.');
    }
  }
  
  // Usage
  const child = new ChildClass('Alice', 25);
  child.greet();      // Output: Hello, Alice!
  child.introduce();  // Output: My name is Alice and I am 25 years old.
  ```
* Protected methods in class
  ```javascript
  class MyClass {
    constructor() {
      this._protectedProperty = 'foo';
    }
    
    _protectedMethod() {
      console.log('This method is protected');
    }
    
    publicMethod() {
      console.log('This is a public method');
      this._protectedMethod(); // call the protected method from within the class
    }
  }

  test = new MyClass()
  test.publicMethod()
  ```

### Functions

#### Structure

* Normal function
  ```javascript
  function add(a, b) {
    return a + b;
  }
  ```
* Arrow function
  ```javascript
  const add = (a, b) => a + b;
  ```

#### Arrow vs Normal

* Arrow functions can be written in a single line without using the `return`
* Binding of `this`:
  ```javascript
  const person = {
    name: "John",
    sayHello: function() {
      console.log("Hello, my name is " + this.name);
    },
    sayHelloArrow: () => {
      console.log("Hello, my name is " + this.name);
    }
  };
  
  person.sayHello(); // output: Hello, my name is John
  person.sayHelloArrow(); // output: Hello, my name is undefined
  ```
  * The value of `this` in the arrow function `sayHelloArrow` refers to the global context, which does not have a `name` property.
  * The value of `this` in the normal function `sayHello` function refers to the object instance on which the function is called.
* Use of "arguments": Normal functions have access to a special variable called "arguments", which contains all the arguments passed to the function. Arrow functions do not have access to "arguments".
  ```javascript
  function sum() {
    let total = 0;
    for(let i = 0; i < arguments.length; i++) { // arguments
      total += arguments[i];
    }
    return total;
  }
  
  const sumArrow = (...args) => args.reduce((total, num) => total + num, 0);
  
  console.log(sum(1, 2, 3, 4)); // output: 10
  console.log(sumArrow(1, 2, 3, 4)); // output: 10
  ```
  * In the above example, the normal function "sum" uses the "arguments" variable to calculate the sum of all the arguments passed to it. The arrow function "sumArrow" uses the spread operator to convert the arguments into an array and then uses the "reduce" method to calculate the sum.

### Asynchronous

* Callbacks: Using functions that are passed as arguments to be executed when an asynchronous task completes. For example,
  ```javascript
  function fetchData(callback) {
    setTimeout(() => callback([1, 2, 3, 4, 5]), 2000);
  }
  
  function processFetchedData(data) {
    console.log("Processing fetched data:", data);
  }
  
  function doSomethingElse() {
    console.log("This can be done while waiting for data.");
  }

  function main() {
    fetchData(processFetchedData);
    doSomethingElse(); // this will show up first
  }

  main()
  ```
* Promises: An object representing the eventual completion or failure of an asynchronous operation.
  ```javascript
  function fetchData() {
    return new Promise((resolve) => { // resolve is a function
      setTimeout(() => { // simulate the asynchronous operation
        const data = [1, 2, 3, 4, 5];
        resolve(data); // It will do the promised resolve after timeout
      }, 2000);
    });
  }
  
  function processFetchedData(data) {
    console.log("Processing fetched data:", data);
  }
  
  function doSomethingElse() {
    console.log("This can be done while waiting for data.");
  }

  function main() {
    fetchData().then(processFetchedData);
    doSomethingElse(); // this will show up first
  }

  main()
  ```
* Generators: Implementing asynchronous operations with generator functions and the use of the yield keyword.
* Web Workers: Running asynchronous tasks in a separate thread using Web Workers, allowing parallel execution without blocking the main thread.

### Managing Asynchronous Operations in JavaScript

* then
  ```javascript
  function main() {
    fetchData()
      .then(processFetchedData) // when resolve, do processFetchedData
      .then(doSomethingElse) // Show up after processFetchedData
      .catch((error) => console.error("Error:", error));
  }
  
  main()
  ```

* Async/await: Using the async/await syntax introduced in ES2017 to write asynchronous code in a more synchronous-like style, built on top of Promises.
  ```javascript
  async function main() {
    try {
      const data = await fetchData();
      processFetchedData(data);
      doSomethingElse(); // show up after fetchData
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  main();
  ```

### AJAX

AJAX (Asynchronous JavaScript and XML) is a web development technique that allows for seamless, asynchronous communication between a web browser and server, enabling dynamic and responsive updates to web pages without requiring a full page reload. For more information, please refer to [AJAX](/blog/software/javascript/AJAX)

### Execution Order in File

Normally, from top to bottom. With exception as follow:

#### Asynchronous Operations
  
* Concept: If there is an asynchronous section, then the section will be executed later.
* Example
  ```javascript
  console.log("Start")
  setTimeout(() => {
      console.log("Timeout callback")
  }, 0)
  
  console.log("End")
  ```
* Result
  ```bash
  Start
  End
  Timeout callback # even though the timeout is 0, this wording still shows in the last line
  ```

#### Module
  
* Import
  * Concept: The import statement can only be top position
  * Example: there are two modules, A imports B
    ```javascript
    // moduleA.js
    function sayHello() {
      console.log("Hello from module A!");
    }
    
    console.log("Module A start");
    sayHello();
    import { greet } from './moduleB.js'; // Attempt to move import to a lower position
    greet();
    console.log("Module A end");
    ```
  * Result
    ```bash
    Uncaught SyntaxError: import declarations may only appear at top level of a module
    ```
* Hoisting
  * Concept: Traditional variable and function declarations in JavaScript are subject to hoisting. The variable will not throw error even though it is called before declaration and the function will still be callable even though it is defined later. But if you use `let` or `const` to define variable or function then it will throw error with `ReferenceError`.
  * Example
    ```javascript
    // Example of hoisting with variable declaration
    console.log(message); // undefined, it will not throw error
    var message = "Hello, hoisting!";
    console.log(message); // "Hello, hoisting!"
    
    // Example of hoisting with function declaration
    sayHello(); // "Hello, hoisting!"
    function sayHello() {
      console.log("Hello, hoisting!");
    }
    ```
  * Example (use let or const)
    ```javascript
    // Example with const and arrow function
    console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization
    console.log(sayHelloArrow); // ReferenceError: Cannot access 'sayHelloArrow' before initialization
    
    const sayHello = function() {
      console.log("Hello from sayHello!");
    };
    
    const sayHelloArrow = () => {
      console.log("Hello from sayHelloArrow!");
    };
    
    console.log(sayHello); // [Function: sayHello]
    console.log(sayHelloArrow); // [Function: sayHelloArrow]
    
    sayHello(); // Hello from sayHello!
    sayHelloArrow(); // Hello from sayHelloArrow!
    ```

### datatype

TBC

In JavaScript, data types define the type of data that a variable or a value can hold. JavaScript has six primitive data types and one non-primitive data type. For more information, please refer to [datatype]({{site.baseurl}}/javascript/2022/12/25/datatype.html).

### operators

```javascript
// Arithmetic operators:
let a = 5 + 3;     // addition
let b = 10 - 4;    // subtraction
let c = 6 * 2;     // multiplication
let d = 8 / 2;     // division
let e = 15 % 4;    // modulus (returns the remainder after division)

// Comparison operators:
let f = 5 > 3;      // greater than (returns true)
let g = 10 <= 4;    // less than or equal to (returns false)
let h = "hello" === "world";  // strict equality (returns false)
let i = "hello" !== "world";  // strict inequality (returns true)

// Logical operators:
let j = true && false;    // logical AND (returns false)
let k = true || false;    // logical OR (returns true)
let l = !true;            // logical NOT (returns false)
```

going to add more strange logic in javascript

### Control Structure

* Conditional Statements:
  * `if` statement
    ```javascript
    let x = 10;
    if (x > 5) {
      console.log("x is greater than 5");
    }
    ```
  * `switch` statement
    ```javascript
    let day = "Monday";
    switch(day) {
      case "Monday":
        console.log("It's Monday!");
        break;
      case "Tuesday":
        console.log("It's Tuesday!");
        break;
      default:
        console.log("It's not Monday or Tuesday.");
        break;
    }
    ```
  * Loops
    * for loop
      ```javascript
      for (let i = 0; i < 5; i++) {
        console.log(i);
      }
      ```
    * while loop
      ```javascript
      let i = 0;
      while (i < 5) {
        console.log(i);
        i++;
      }
      ```
* Control Statements
  * break
    ```javascript
    for (let i = 0; i < 10; i++) {
      if (i === 5) {
        break;
      }
      console.log(i);
    }
    ```
  * continue (skip over an iteration of a loop)
    ```javascript
    for (let i = 0; i < 10; i++) {
      if (i === 5) {
        continue;
      }
      console.log(i);
    }
    ```

### built-in methods

JavaScript has many built-in methods that provide powerful functionality to manipulate strings, arrays, and other data types. These methods are part of the JavaScript language and can be called directly on the objects they operate on. For more information, please refer to [methods]({{site.baseurl}}/javascript/2022/12/25/methods.html)

### error handling

You can return error with

```javascript
throw "Error occurred";
```

### JSON

### Import and Export

[Import and Export]({{site.baseurl}}/javascript/2023/04/06/import-export.html)

### service

A service can refer to a type of object or module that provides a specific functionality or feature to an application. For example,

```javascript
function MyService() {
  constructor() {
    // initialize properties or perform setup tasks
  },
  this.perform = function() {
    // implementation
  };
}
```

### Document Object Model (DOM)

* Url
  * Get current url: `window.location.href`
* redirect
* open new tab
  ```javascript
  window.open(url, '_blank').focus();
  ```

### Typescript

TypeScript is a statically typed superset of JavaScript that helps catch errors early in development by adding a type system to JavaScript, allowing developers to define variable types and function signatures, which helps detect type-related errors during compilation rather than at runtime.

* Example
  ```ts
  function addNumbers(a: number, b: number): number {
      return a + b;
  }
  
  let result = addNumbers(5, "2"); // TypeScript error: Argument of type '"2"' is not assignable to parameter of type 'number'.
  ```

#### interface

Interface is a way to define the structure or shape of an object. It specifies a contract that an object should adhere to, defining the properties and methods that the object must have. There are four common way to use interface.

* Defining Object Shape: You can use interfaces to define the structure of objects, specifying the names and types of their properties.
  ```ts
  interface Person {
    name: string;
    age: number;
  }
  
  const person: Person = { name: "John", age: 30 };
  ```
* Type Checking: Interfaces are used to enforce type checking. If an object doesn't match the interface's structure, TypeScript will throw a type error.
  ```ts
  const person: Person = { name: "John" }; // Error: Property 'age' is missing.
  ```
* Class Implementation: You can use interfaces to define contracts that classes must follow.
  ```ts
  interface Shape {
    area(): number;
  }
  
  class Circle implements Shape {
    constructor(private radius: number) {}
    area() {
      return Math.PI * this.radius * this.radius;
    }
  }
  ```
* Function Signatures: Interfaces can describe the shape of functions, specifying the types of their parameters and return values.
  ```ts
  interface MathOperation {
    (a: number, b: number): number;
  }
  
  const add: MathOperation = (a, b) => a + b;
  ```

### Transpiler

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

### Event loop

* JavaScript's event loop only has one thread => One AJAX triggered by another will run in queue => Consolidate timelines that end by creating one new timeline

[video](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=876s)

### other topics

* Objects and prototypes
* Arrays and array methods
* String manipulation
* Regular expressions
* Date and time
* Error handling and debugging
* DOM (Document Object Model) manipulation
* Events and event handling
* AJAX (Asynchronous JavaScript and XML)
* APIs (Application Programming Interfaces)
* ES6 (ECMAScript 2015) features, such as arrow functions, template literals, and classes
* Functional programming concepts in JavaScript, such as higher-order functions, closures, and currying
* Node.js and server-side JavaScript
* Popular JavaScript libraries and frameworks, such as React, Angular, and Vue.js
* Best practices and code organization

## Example

### scroll to the top

with tailwind

```HTML
<button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5" id="btn-back-to-top">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
</button>
```

and JS

```javascript
// Get the button
let myButton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
myButton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
```

### clone

There are two difference type of clone, shallow clone and deep clone. Shallow clone only copies the top-level structure of the original. That is, it does not copy the nested objects. As a result, changes made to nested objects in the clone will affect the original.

* shallow clone
  ```javascript
  const originalObject = { key1: 'value1', key2: 'value2' }
  const shallowClone = { ...originalObject } // first way
  const shallowClone = Object.assign({}, originalObject) // second way
  ```
* deep clone
  * stringify way (may encounter circular reference issue)
    ```javascript
    const originalObject = { key1: 'value1', nestedObject: { key: 'nestedValue' } }
    const deepClone = JSON.parse(JSON.stringify(originalObject))
    ```
  * directly create an object with same structure
    ```javascript
    function deepClone(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
    
      const clone = Array.isArray(obj) ? [] : {};
    
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = deepClone(obj[key]); // recursive way
        }
      }
    
      return clone;
    }
    ```
  * external libraries
    ```javascript
    const _ = require('lodash')
    const originalObject = { key: 'value', nested: { key: 'nestedValue' } }
    const deepClone = _.cloneDeep(originalObject)
    ```

### File

* store
  ```javascript
  const fs = require('fs')
  
  // Sample JSON data
  const myData = {
    "name": "John",
    "age": 30,
    "city": "New York"
  }
  
  // Convert JSON data to a string
  const jsonString = JSON.stringify(myData)
  
  // Write the JSON data to a file
  fs.writeFile('myData.json', jsonString, function (err) {
    if (err) throw err
    console.log('Saved!')
  })
  ```
* read
  ```javascript
  const fs = require('fs');

  // Specify the file path
  const filePath = 'example.txt';
  
  // Asynchronously read the contents of the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Handle error if any
      console.error('Error reading file:', err);
      return;
    }
    
    // File contents are available in the `data` variable
    console.log('File contents:', data);
  });
  ```

## Reference

[Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

[ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)

[What are module exports in JavaScript?](https://www.educative.io/answers/what-are-module-exports-in-javascript )

[Tailwind Scroll back to top button component](https://tailwind-elements.com/docs/standard/components/scroll-back-to-top-button/)

[How can I split a javascript application into multiple files?](https://stackoverflow.com/questions/8752627/how-can-i-split-a-javascript-application-into-multiple-files)

[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)

[What is Babel?](https://babeljs.io/docs/)
