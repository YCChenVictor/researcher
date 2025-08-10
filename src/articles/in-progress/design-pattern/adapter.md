# Title

## Purpose

An adapter in software is used to either reuse an existing class with a different interface or to enable a class to work with multiple incompatible classes, while also providing abstraction to decouple client code from underlying class specifics.

## Concept

The Adapter pattern allows two incompatible interfaces to work together by creating a class that acts as an interface between them. The adapter class maps the methods of one interface to another, making it possible for the two interfaces to communicate.

Three components

* Client: The client is the component that is trying to use the adaptee, but cannot do so directly because the adaptee's interface is incompatible with the client's interface
* Adapter: The adapter is a class that acts as a bridge between the client and the adaptee. It maps the methods of the adaptee to the methods of the client.
* Adaptee: The adaptee is the component that the client wants to use, but cannot do so directly because its interface is incompatible with the client's interface.

### example in javascript

Let's say there are two different payment system and we need to store the logs on different services. The key will be even though there are two different payment class, they still call the same method in PaymentAdapter.

```javascript
// First Adaptee - the complex class that needs to be adapted
class LegacyPaymentProcessor {
  constructor() {
    this.total = 0
  }

  addPayment(amount) {
    this.total += amount
    console.log('add payment, log to legacy')
  }

  getTotal() {
    return this.total
    console.log('get total, log to legacy')
  }
}

// Second Adaptee - another complex class that needs to be adapted
class ModernPaymentProcessor {
  constructor() {
    this.total = 0;
  }

  addPayment(amount) {
    this.total += amount;
    console.log('add payment, log to modern')
  }

  getTotal() {
    return this.total;
    console.log('get total, log to modern')
  }
}

// Adapter - the class that adapts the interface of the Adaptees
class PaymentAdapter {
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  processPayment(amount) {
    this.adaptee.addPayment(amount);
  }

  getTotal() {
    return this.adaptee.getTotal();
  }
}

// Client code that uses the PaymentAdapter with two Adaptees
const legacyPaymentProcessor = new LegacyPaymentProcessor();
const modernPaymentProcessor = new ModernPaymentProcessor();
const paymentAdapter1 = new PaymentAdapter(legacyPaymentProcessor);
const paymentAdapter2 = new PaymentAdapter(modernPaymentProcessor);
paymentAdapter1.processPayment(100);
paymentAdapter2.processPayment(100);
```

## Example

* Active record in rails

## Reference

ChatGPT
