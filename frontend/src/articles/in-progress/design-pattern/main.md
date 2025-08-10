# Title

## Purpose

Design patterns provide standardized solutions to common software design problems, enhancing code reusability and extensibility in object-oriented systems.

## Concept

The Gang of Four (GoF) design patterns provide standardized solutions to common software design problems, enhancing code reusability and extensibility in object-oriented systems. These patterns are categorized into Creational, Structural, and Behavioral patterns, each addressing different aspects of software design such as object creation, composition, and communication between objects.

### Creational

* Different ways to create objects
* Example
  * [Factory method](/blog/software/design-pattern/factory-method): Factory method provides a way to delegate the creation of objects to subclasses. It's useful when you want to create objects without specifying the exact class of object that will be created.
  * [Builder](/blog/software/design-pattern/builder): Builder separates the construction of a complex object from its representation, so that the same construction process can create different representations. It's useful when you want to create complex objects with many optional parameters.
  * [Prototype](/blog/software/design-pattern/prototype): Prototype involves creating new objects by cloning existing objects. It's useful when creating objects is expensive, and you want to reuse existing objects.
  * [Singleton](/blog/software/design-pattern/singleton): Singleton ensures that only one instance of a class can be created, and provides a global point of access to that instance. It's useful when you want to limit the number of instances of a class, or when you need to coordinate actions across the system.
  * [Abstract Factory](/blog/software/design-pattern/abstract-factory): This pattern provides an interface for creating families of related objects, without specifying the concrete classes of those objects. It's useful when you want to create objects that share a common interface, but have different implementations.

### Structural

* Structural design patterns deal with object composition and provide ways to organize objects to form larger structures
* Example
  * [Composite](/blog/software/design-pattern/composite): This pattern allows you to create hierarchical structures of objects by composing objects into tree structures. It's useful when you want to represent part-whole hierarchies.
  * [Decorator](/blog/software/design-pattern/decorator): This pattern allows you to add behavior to objects dynamically by wrapping them in an object of a decorator class. It's useful when you want to add functionality to an object without changing its interface.
  * [Adapter](/blog/software/design-pattern/adapter): This pattern allows you to adapt an object to another interface, without changing the underlying object. It's useful when you want to reuse existing code with a different interface.
  * [Proxy](/blog/software/design-pattern/proxy): This pattern provides a surrogate or placeholder for another object to control access to it. It's useful when you want to add security, logging, or caching to an object.
  * Bridge: This pattern separates an object's interface from its implementation, so that the two can vary independently. It's useful when you want to decouple an abstraction from its implementation, allowing both to evolve independently.
  * [Facade](/blog/software/design-pattern/facade): This pattern provides a simplified interface to a complex subsystem of objects. It's useful when you want to provide a simple interface to a complex system.
  * Flyweight: This pattern allows you to share objects to reduce memory usage, by sharing common parts of state between objects. It's useful when you want to create many objects with similar state.

### Behavioral

* Behavioral design patterns deal with communication between objects and how objects interact with each other
* Example
  * [Observer](/blog/software/design-pattern/observer): This pattern allows you to define a one-to-many dependency between objects, so that when one object changes state, all its dependents are notified and updated automatically. It's useful when you want to keep multiple objects in sync with each other.
  * Template Method: This pattern defines the skeleton of an algorithm in a base class, allowing subclasses to provide concrete implementations of certain steps. It's useful when you want to define the basic structure of an algorithm, while allowing certain steps to be customized.
  * [Strategy](/blog/software/design-pattern/strategy): This pattern allows you to define a family of interchangeable algorithms, encapsulate each one, and make them interchangeable at runtime. It's useful when you want to choose an algorithm dynamically, based on runtime conditions.
  * Interpreter: This pattern provides a way to define the grammar of a language, and to interpret sentences in that language.
  * [Visitor](/blog/software/design-pattern/visitor): Allows you to add new behaviors or operations to a set of objects without modifying their structure. It achieves this by defining separate visitor objects that can traverse and operate on the elements of a complex object structure.
  * [Command](/blog/software/design-pattern/command): Encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing of requests, and logging of the commands, thus decoupling the sender and receiver of the command.
  * Iterator:
  * Mediator:
  * Memento:
  * State:
  * Chain of Responsibility:


## Reference

[Software design pattern](https://en.wikipedia.org/wiki/Software_design_pattern)

[Design Patterns in Plain English Mosh Hamedani](https://www.youtube.com/watch?v=NU_1StN5Tkk)
