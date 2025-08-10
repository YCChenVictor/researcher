# Title

## Purpose

We only care about the aspects we care; for example, given a delivery system, user cares **when** the package arrives and the **cost**.

Even thought the process of delivering involves shippings, air transport, ...etc and it is truly complicate, we do not care. We should prepare the system to have clean interfaces (facades) for them to acquire the information they want.

## Concept

This pattern

* makes my code prettier just like facade increase the taste of my house even thought my house is messy
* belongs to structural patterns, so it structures a specific kind of objects
* deal with **complex** set of objects, which these objects did not follow any particular structure; they should be **messy**

## Example

For example, there are multiple services:

* service for transportation: `OceanShippingService`, `AirTransportationService`, `LandTransportationService`
* service to evaluate whether this item is deliverable: `Package`
* service to return possible routes: `Route`

Actually we only care the possible choices of time and cost, so

```ruby
## The facade class and the inputs: start, destination, item
WhatWeCare.new('Taichung', 'Taipei', 'Chihuahua').result

## example outputs: (when it arrives, cost)
[
  ['60 mins', 1000],
  ['30 mins', 2000],
]
```

`WhatWeCare` is a facade as follow: (pseudocode)

```javascript
class WhatWeCare {
  constructor(origin, destination, item) {
    this.origin = origin;
    this.destination = destination;
    this.item = item;
  }

  result() {
    return new Route(this.origin, this.destination).results.map((route) => {
      if (route.is_deliverable()) {
        return [
          this.when_it_arrives(route),
          this.cost(route)
        ];
      }
    });
  }

  when_it_arrives(route) {
    const result = [];
    route.forEach((sub_route) => {
      switch (sub_route.type) {
        case 'Air':
          result.push(new AirTransportationService(sub_route).time);
          break;
        case 'Land':
          result.push(new LandTransportationService(sub_route).time);
          break;
        case 'Ocean':
          result.push(new OceanTransportationService(sub_route).time);
          break;
      }
    });
    return result.reduce((sum, time) => sum + time, 0);
  }

  cost(route) {
    const result = [];
    route.forEach((sub_route) => {
      switch (sub_route.type) {
        case 'Air':
          result.push(new AirTransportationService(sub_route).cost);
          break;
        case 'Land':
          result.push(new LandTransportationService(sub_route).cost);
          break;
        case 'Ocean':
          result.push(new OceanTransportationService(sub_route).cost);
          break;
      }
    });
    return result.reduce((sum, cost) => sum + cost, 0);
  }

  routes() {
    return new Route(this.origin, this.destination);
  }
}
```

given the service as follow:

```javascript
class Route {
  constructor(origin, destination) {
    // Initialize route with origin and destination
    // ...
  }

  results() {
    return this.possible_routes().filter((route) => {
      if (this.is_deliverable(route)) {
        return route;
      }
    });
  }

  possible_routes() {
    // Define possible routes
    return [
      ['Taichung to Taoyuan (Air)', 'Taoyuan to Taipei (Ocean)'],
      ['Taichung to Hsinchu (Air)', 'Hsinchu to Banqiao (Ocean)', 'Banqiao to Taipei (Ocean)'],
      // ...
    ];
  }

  is_deliverable(route) {
    return new Package(route).result();
  }
}

class Package {
  constructor(route) {
    // Initialize package with route
    // ...
  }

  result() {
    // Determine if the item is deliverable in this sub-route
    // Return true or false
  }
}

class OceanShippingService {
  constructor(route) {
    // Initialize service with route
    // ...
  }

  time() {
    // Return estimated delivery time
  }

  cost() {
    // Return estimated delivery cost
  }
}

class AirTransportationService {
  constructor() {
    // Initialize service
    // ...
  }

  time() {
    // Return estimated delivery time
  }

  cost() {
    // Return estimated delivery cost
  }
}

class LandTransportationService {
  constructor() {
    // Initialize service
    // ...
  }

  time() {
    // Return estimated delivery time
  }

  cost() {
    // Return estimated delivery cost
  }
}
```

## Reference

[Facade](https://refactoring.guru/design-patterns/facade)

[Facade Pattern – Design Patterns (ep 9)](https://www.youtube.com/watch?v=K4FkHVO5iac)
