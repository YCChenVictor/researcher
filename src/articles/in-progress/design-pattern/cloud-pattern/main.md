# Title

## Purpose

The cloud patterns solve common problems during cloud development such as data management, design and implementation, and messaging.

## Concept

If you are using any cloud computing resources, then you are developing cloud application.

### data management

Data is hosted in different locations, so we need a pattern to synchronize them across different locations.

#### CQRS

A pattern that separates reading and writing into different models, allowing you to optimize each side independently.

* Example
  ```javascript
  // Query Model
  class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ProductQuery {
    constructor() {
      this.products = [ // there will be a mechanism to sync with write model
        new Product(1, 'Product 1', 100),
        new Product(2, 'Product 2', 200),
        new Product(3, 'Product 3', 300),
      ];
    }
  
    getById(id) {
      return this.products.find(product => product.id === id);
    }
  }
  
  // Command Model
  class ProductCommand {
    constructor() {
      this.products = [ // there will be a mechanism to sync with read model
        new Product(1, 'Product 1', 100),
        new Product(2, 'Product 2', 200),
        new Product(3, 'Product 3', 300),
      ];
    }
  
    updatePrice(id, newPrice) {
      let product = this.products.find(product => product.id === id);
      if (product) {
        product.price = newPrice;
      }
    }
  }
  
  // Usage
  let productQuery = new ProductQuery(); // Read
  console.log(productQuery.getById(1)); // Get product by id
  
  let productCommand = new ProductCommand(); // Write
  productCommand.updatePrice(1, 150); // Update product price
  ```

In this example, ProductQuery and ProductCommand are separate models for reading and writing data respectively. The ProductQuery model is used to fetch product information, and the ProductCommand model is used to update product information.

In a CQRS pattern, the synchronization between the read model (Query) and the write model (Command) is typically handled by an event-driven architecture.

### design and implementation

Increase the quality of deployment, maintainability, development, reusability.

### messaging

There are different nodes in this system, so we need a good messaging mechanism for them to communicate with each other. Usually, we use asynchronous messaging to decouple producer and consumer. However, it brings other issues such as ordering messages, poison message management, idempotency.

### Reliability

#### Circuit Breaker

This pattern is crucial for maintaining system reliability and preventing cascading failures in a distributed system.

In Node.js, you can use the opossum library to implement the Circuit Breaker pattern. Here's a basic example:

```js
const CircuitBreaker = require('opossum');
const axios = require('axios');

// Define the function that should be protected with a circuit breaker
const httpGet = async function() {
  const response = await axios.get('http://example.com');
  return response.data;
}

// Create a new circuit breaker
const breaker = new CircuitBreaker(httpGet, {
  errorThresholdPercentage: 50, // When 50% of requests fail
  timeout: 3000, // If a request takes longer than 3 seconds
  resetTimeout: 30000 // After 30 seconds try a single request
});

// Use the circuit breaker
breaker.fallback(() => 'Sorry, out of service right now');
breaker.on('fallback', (result) => console.log(result));

breaker.fire()
  .then(console.log)
  .catch(console.error);
```

In this example, if the httpGet function fails more than 50% of the time or takes longer than 3 seconds, the circuit breaker will open and all further calls to the function will fail immediately for 30 seconds. After 30 seconds, the circuit breaker will allow one call to go through to check if the function is now working correctly. If the function fails during this trial, the circuit breaker will remain open for another 30 seconds. If the function succeeds, the circuit breaker will close and allow all calls to go through.

## Example

## Reference

[Challenges in cloud development](https://learn.microsoft.com/en-us/azure/architecture/patterns/)

## Other

Study with the following list

CQRS (Command Query Responsibility Segregation): This pattern is key for systems where high throughput and scalability are required, and where the read and write workloads are different.

Event Sourcing: This pattern is important for systems where the event log is crucial, and it's necessary to have a complete history of all changes.

Cache-Aside: This pattern is important for improving performance by reducing database load.

Retry: This pattern is important for improving the reliability of communication between microservices in a distributed system.

Ambassador: This pattern is useful for offloading networking-related tasks and can help in testing and development environments.

Backends for Frontends: This pattern is important for separating concerns between different frontend applications and their corresponding backend services.

Bulkhead: This pattern is crucial for system reliability as it isolates elements of an application into pools so that if one fails, the others will continue to function.

Saga: This pattern is important for managing data consistency across microservices in distributed transaction scenarios.

Throttling: This pattern is important for controlling the consumption of resources used by an instance of an application, an individual tenant, or an entire service.
