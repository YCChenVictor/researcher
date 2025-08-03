# Title

## Purpose

The purpose of the composite design pattern is to compose objects into tree structures, allowing clients to treat individual objects and compositions uniformly.

## Concept

### Treat them uniformly

With this pattern, we can compose objects into part-whole hierarchies where object is composed of other objects, creating a hierarchy of components that can be treated uniformly. For instance, in a company organizational chart, individual employees form the "parts," and departments or teams they belong to form the "wholes" – the hierarchy allows for consistent handling of both individual employees and entire departments.

```javascript
class Component {
  constructor(name) {
    this.name = name;
  }

  operation() {
    console.log(`Performing operation on ${this.name}`);
  }
}

class Composite extends Component {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  operation() {
    console.log(`Performing operation on ${this.name}`);
    this.children.forEach(child => child.operation());
  }
}

// Usage
const leaf1 = new Component("Leaf 1");
const leaf2 = new Component("Leaf 2");

const composite = new Composite("Composite");
composite.add(leaf1);
composite.add(leaf2);

const root = new Composite("Root");
root.add(composite);
root.operation();

// Performing operation on Root
// Performing operation on Composite
// Performing operation on Leaf 1
// Performing operation on Leaf 2
```

As you can see, the root operation will call the operation of root and then call the operation of composite and then call the operation of leaf 1 and leaf 2.

## Real world example

React
