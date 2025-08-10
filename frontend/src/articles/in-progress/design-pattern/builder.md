# Title

## Purpose

Ｔo simplify the construction of complex objects by separating the construction process from the actual object representation.

## Concept

You can think of builder pattern as data flow.

* Inputs: Data needed to build the object.
* Steps: Actions taken to build the object, one by one.
* Output: The fully constructed object.

And there will be four components:

* Client:
  * Initiates the construction process and receives the fully constructed object.
  * It interacts with the builder or director to obtain the product.
  * Maps to Inputs because it provides the initial data needed to start the construction process.
* Builder:
  * Defines the steps to construct the product.
  * It's responsible for handling the construction process.
  * Maps to Steps because it defines the individual steps needed to build the object.
* Director (if used):
  * Coordinates the construction process by directing the builder.
  * It encapsulates the construction steps and their order.
  * Maps to Steps or, more accurately, to the orchestration of Steps because it directs how the Steps are executed.
* Product:
  * Represents the fully constructed object.
  * It's the end result of the construction process.
  * Maps to the Output because it's the final outcome of the Builder pattern.

## Example

```javascript
// Product: Car
class Car {
    constructor() {
        this.make = '';
        this.model = '';
        this.color = 'Black'; // Default color
        this.engine = 'V4'; // Default engine
    }

    // Method to display car details
    display() {
        console.log(`Car Details: ${this.color} ${this.make} ${this.model} with ${this.engine} engine`);
    }
}

// Builder interface
class CarBuilder {
    constructor() {
        this.car = new Car();
    }

    // Method to set car make
    setMake(make) {
        this.car.make = make;
        return this;
    }

    // Method to set car model
    setModel(model) {
        this.car.model = model;
        return this;
    }

    // Method to set car color
    setColor(color) {
        this.car.color = color;
        return this;
    }

    // Method to set car engine type
    setEngine(engine) {
        this.car.engine = engine;
        return this;
    }

    // Method to get the constructed car
    getResult() {
        return this.car;
    }
}

// Client code
function constructCar() {
    // Create a car builder
    const carBuilder = new CarBuilder();

    // Construct a car with specific features
    const car = carBuilder
        .setMake('Toyota')
        .setModel('Camry')
        .setColor('Red')
        .setEngine('V6')
        .getResult();

    // Display the constructed car details
    car.display();
}

// Construct and display the car
constructCar();
```
