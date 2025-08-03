# Title

## Purpose

OOP provides a flexible and powerful way to organize and structure software applications.

## Concept

Use objects to represent and manipulate data. Objects are instances of classes that encapsulate data and methods (functions) that operate on that data.

### Class

We use class to create objects and the class will define the attributes and methods these objects have. For example, a `User` class in any SaaS product would be as follow:

```javascript
class User {
  constructor(name) {
    // attributes
    this.name = name;
  }
  
  // methods
  sayHello() {
    console.log("Hello, my name is " + this.name);
  }
}
```

### Coupling and Cohesion

Coupling evaluates the interconnection level among software modules; decreasing it improves system maintainability, much like ensuring the independence of a position in a company, allowing for effortless replacement or suspension without complex dependencies.

#### math

A math evaluation can help us rank the severity.

$$Coupling(C) = 1 - 1/(d_o + d_i + 2 * (c_o + c_i) + g_d + 2 * g_c + w + r)$$

where

1. $$d_o$$ = number of output data parameters
2. $$d_i$$ = number of input data parameters
3. $$c_o$$ = number of output control parameters
4. $$c_i$$ = number of input control parameters
5. $$g_d$$ = number of global variables used as data
6. $$g_c$$ = number of global variables used as control
7. $$w$$ = number of modules called (fan-out)
8. $$r$$ = number of modules calling the module under consideration (fan-in)

* data vs control
  * Data parameters are values that represent input data that is used by the function or method to perform some computation or operation. For example, if a function calculates the area of a rectangle, the length and width of the rectangle would be passed as data parameters.
  * Control parameters are values that represent instructions or options that modify the behavior of the function or method. They do not represent input data but rather control the flow of the function or method. For example, a function that sorts an array of numbers might have a control parameter that determines whether the sort should be ascending or descending.

#### Decrease Coupling

* Use Interfaces: Reduces the dependencies between classes by defining a set of methods that a class must implement
* Encapsulate data: Hides the internal details of a class from other classes, preventing other classes from depending on the implementation details of a class
* Dependency Injection: Injects dependencies into a class instead of creating them inside the class. By injecting dependencies, you can reduce the coupling between classes, making them easier to test and update
* Avoid Global State: Global state refers to data that is accessible by multiple classes in a system. Global state can create strong dependencies between classes, making it harder to change one class without affecting others.
* Use Design Patterns: Design patterns are proven solutions to common programming problems. By using design patterns, you can reduce coupling and improve the maintainability of your code.

### Interfaces

If we design system with abstraction, encapsulation, minimizing number of variables and modules, it is an interface.

* Implements abstraction and encapsulation thoroughly, making we only see the appearance of this function and use it easily; for example, we know the light can be on by switching the button but we do not know the logics behind it.
* Reduce the number of global variables used as data or control, as well as the number of input or output parameters, by providing a common interface that can be used by multiple clients.
* Reduce the number of modules called (fan-out) by promoting modular design and encouraging the use of common interfaces between modules. For example, built APIs and call the end points rather import the same modules many times.

### Abstraction

Simplify complex systems by representing only the essential features, and interfaces, which define the contract between objects and the outside world.

Abstraction shows only **essential** attributes; for example, in this world, there are lots of animals such as human, pig, ...etc and there are some identical characteristics, then we can first define a class, `Animal` and then subdivide it with inheritance rather than writing both classes having the same characteristics.

```javascript
class Animal {
  constructor () {

  }

  eat () {

  }
}

class Human extends Animal {
  speak () {

  }
}

class Pig extends Animal {

}
```

rather than

```ruby
class Human {
  constructor() {
  }

  eat() {
  }

  speak() {
  }
}

class Pig {
  constructor() {
  }

  eat() {
  }
}
```

### Encapsulation

Encapsulation involves concealing an object's inner workings while presenting clear interfaces, enhancing data integrity, modularity, and code reusability. For example, the private methods are example of encapsulation in ruby; you cannot use the methods outside the class, showing only the meaningful methods for outsiders.

In javascript, we use '#'

* Encapsulate function
  ```javascript
  class Example {
    #privateFunction() {
      console.log("This is a private function.");
    }
  
    publicFunction() {
      console.log("Calling public function.");
      this.#privateFunction();
    }
  }

  const instance = new Example();  
  instance.publicFunction(); // Output: Calling public function.
                             //         This is a private function.
  instance.#privateFunction(); // This will result in an error
  ```
* Encapsulate attribute
  ```javascript
  class Person {
    #name;
  
    constructor(name) {
      this.#name = name;
    }
  
    getName() {
      return this.#name;
    }
  }
  
  const person1 = new Person("Alice");
  console.log(person1.getName());  // Output: "Alice"
  console.log(person1.#name);  // This will result in an error
  ```

### Inheritance

One class (the child or subclass) can inherit the properties and methods of another class (the parent or superclass). This allows for code reuse and promotes modularity and extensibility.

For example, I want to create Animals: Dog, Cat, Bird.

```javascript
class Animal {
  move() {
    console.log(`${this.constructor.name} is moving`);
  }
}

class Dog extends Animal {}
class Cat extends Animal {}
class Bird extends Animal {}

const dog = new Dog();
const cat = new Cat();
const bird = new Bird();

dog.move();   // Output: Dog is moving
cat.move();   // Output: Cat is moving
bird.move();  // Output: Bird is moving
```

### Polymorphism

Polymorphism refers to the ability of objects of different classes to be treated as if they are of the same class. This allows for more flexible and dynamic programming, as objects can be used interchangeably without the need for complex type checking and casting.

For example, I want to create Animals: Dog, Cat, Bird I can write a polymorphic class as follow:

```javascript
class Animal {
  static DOG = 0;
  static CAT = 1;
  static BIRD = 2;

  constructor(type) {
    this.type = type;
  }

  speak() {
    switch (this.type) {
      case Animal.DOG:
        console.log('bark');
        break;
      case Animal.CAT:
        console.log('meow');
        break;
      case Animal.BIRD:
        console.log('tweet');
        break;
      default:
        console.log('Unknown animal');
    }
  }
}

const animals = [
  new Animal(Animal.DOG),
  new Animal(Animal.CAT),
  new Animal(Animal.BIRD)
];

animals.forEach(animal => {
  animal.speak();
});
```

### polymorphism vs inheritance

It depends on the business logic to determine which one to be used. Think about your database. If we use inheritance, then there will be a new model produced which you can create a table associate with it and you will not need runtime to calculate the logics, of which you cost more space but save more time and vice versa.

For example, the same `Dog` class. If you are running a zoo, you will not need a table for `Dog` and you just need a polymorphism table, `Animal`, to list all the animals with type in that table. But if you are running, a store professionally takes good care about dogs, then you need a `Dog` model inherited from `Animal`.

## Reference

[The Basics of OOP Ruby](https://medium.com/launch-school/the-basics-of-oop-ruby-26eaa97d2e98)

[Ruby Tutorial: Abstract Classes](https://www.youtube.com/watch?v=28vDvuhHA9s)

[Coupling (computer programming)](https://en.wikipedia.org/wiki/Coupling_(computer_programming)#:~:text=In%20software%20engineering%2C%20coupling%20is,of%20the%20relationships%20between%20modules.)

[What is the definition of "interface" in object oriented programming](https://stackoverflow.com/questions/2866987/what-is-the-definition-of-interface-in-object-oriented-programming)

[4.7: Introduction to Polymorphism - The Nature of Code](https://www.youtube.com/watch?v=qqYOYIVrso0)

[Design Patterns in Plain English | Mosh Hamedani](https://www.youtube.com/watch?v=NU_1StN5Tkk&t=935s)
