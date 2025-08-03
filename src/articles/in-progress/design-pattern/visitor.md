# Title

## Purpose

The purpose of using the visitor pattern is to separate algorithms from the objects on which they operate, allowing new operations to be added without modifying the objects' structure.

## Concept

The Structure:

![visitor structure](assets/img/visitor_structure)
[source](https://refactoring.guru/design-patterns/visitor)

* To call methods in visitor pattern, we need `accept` in `Element` interface
* By modifying the common operations method in visitor pattern, all objects using the common operations behaves consistently.
* pros:
  * Open/Closed Principle: we can introduce new methods to objects without changing the classes of these objects
  * Single Responsibility Principle: we can define related operations in one class
  * visitor object collects common information in one class, easier to compare different behaviors
* cons:
  * When number of objects changes, we need to update all the common operations

## Example

when a customer walk into a restaurant, we want both manager and clerk to

* greet with special slogan and self introductions
* serve meals with same movement and different kind of professions

With visitor pattern, we can change special slogan and movement day by day without break the classes of objects.

```ruby
class Employee {
  accept(visitor) {
    throw new Error(`${this.constructor.name} has not implemented method '${arguments.callee.name}'`);
  }
}

class Manager extends Employee {
  accept(visitor) {
    visitor.manager(this);
  }

  get status() {
    return 'Manager';
  }

  get profession() {
    return 'order meal';
  }
}

class Clerk extends Employee {
  accept(visitor) {
    visitor.clerk(this);
  }

  get status() {
    return 'Clerk';
  }

  get profession() {
    return 'make meal';
  }
}

class Visitor {
  manager(_element) {
    throw new Error(`${this.constructor.name} has not implemented method '${arguments.callee.name}'`);
  }

  clerk(_element) {
    throw new Error(`${this.constructor.name} has not implemented method '${arguments.callee.name}'`);
  }
}

class SayHi extends Visitor {
  manager(element) {
    console.log(`${this.specialSlogan()}, I am ${element.status}`);
  }

  clerk(element) {
    console.log(`${this.specialSlogan()}, I am ${element.status}`);
  }

  specialSlogan() {
    return 'Special Slogan this week!';
  }
}

class ServeMeal extends Visitor {
  manager(element) {
    console.log(`${this.samePose()}, and then ${element.profession}`);
  }

  clerk(element) {
    console.log(`${this.samePose()}, and then ${element.profession}`);
  }

  samePose() {
    return 'dance dance dance';
  }
}

function clientCode(components, visitor) {
  components.forEach(component => {
    component.accept(visitor);
  });
}

const components = [new Manager(), new Clerk()];

const sayHi = new SayHi();
clientCode(components, sayHi);

const serveMeal = new ServeMeal();
clientCode(components, serveMeal);
```

Also, we separate these classes via inherit from `Employee` and `Visitor`, which achieves SOLID.

## Reference

[[ Day 25 ] 每個人關心的點都不同 - 訪問者模式 (Visitor Pattern)](https://ithelp.ithome.com.tw/articles/10208766)

[The Visitor Pattern Explained and Implemented in Java Behavioral Design Patterns Geekific](https://www.youtube.com/watch?v=UQP5XqMqtqQ)

[Visitor](https://refactoring.guru/design-patterns/visitors)
