# Title

## Purpose

The purpose is to let a class to create only one instance in the run time and provide a global point of access to that instance.

## Concept

You should create a class having a method instance to check whether there is an instance created and all the global pointers point to that instance.

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this; // then the instance will point at this class itself
      this.value = 0;
    }
    return Singleton.instance;
  }
}

// Usage
const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1)
console.log(singleton2)
console.log(singleton1 === singleton2); // Output will be true, as both instances refer to the same object.
```

## Real world example

For example, we only want a single logger to log the message, ensuring no concurrency caused by multiple logger.

```javascript
class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logs = [];
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push({ message, timestamp: new Date() });
    console.log(message);
  }

  displayLogs() {
    this.logs.forEach(log => {
      console.log(`[${log.timestamp}] ${log.message}`);
    });
  }
}

// Usage
const logger1 = new Logger();
logger1.log("Log message 1");

const logger2 = new Logger();
logger2.log("Log message 2");

logger1.displayLogs();
```

### Multiple Services?

If there are multiple service and you only want to log these logs with only one instance, then we may need to consider concurrent issues. Although javascript's event loop do streamline the asynchronous events with single thread, when it comes to multiple services, there will be multiple threads.

So let's introduce ways to inter-process communication, promisify

```javascript
const redis = require('redis');
const { promisify } = require('util');

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.value = 0; // a random variable for us to present the concept
      this.redisClient = redis.createClient();
      this.redisGetAsync = promisify(this.redisClient.get).bind(this.redisClient);
      this.redisSetAsync = promisify(this.redisClient.set).bind(this.redisClient);
      this.lockKey = 'singleton:lock';
      Singleton.instance = this; // again, this way makes sure that the instance points on this same class
    }
    return Singleton.instance;
  }

  async getValue() {
    await this.acquireLock(); // lock when you do this action
    const valueFromRedis = await this.redisGetAsync('singleton:value'); // the value is retrieve from redis -> atomic operation
    if (valueFromRedis !== null) {
      this.value = parseInt(valueFromRedis);
    }
    await this.releaseLock();
    return this.value; // this will assign the same value
  }

  async incrementValue() {
    await this.acquireLock();
    this.value++;
    await this.redisSetAsync('singleton:value', this.value); // the value is updated to redis -> atomic operation
    await this.releaseLock();
    return this.value;
  }

  async acquireLock() {
    while (true) {
      const lockAcquired = await this.redisSetAsync(this.lockKey, 'LOCK', 'NX', 'EX', 10);
      if (lockAcquired === 'OK') {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async releaseLock() {
    await this.redisClient.del(this.lockKey);
  }
}

// Usage
const singleton = new Singleton();

// Access the Singleton instance from multiple processes
singleton.getValue().then(value => {
  console.log('Initial value:', value);
  return singleton.incrementValue();
}).then(newValue => {
  console.log('New value:', newValue);
});
```

In a scenario where two different services utilize the same Singleton instance and both invoke the getValue method concurrently, there's a possibility of a race condition if access to the shared state (this.value) is not synchronized.

Here's how the scenario unfolds:

Both services simultaneously call the getValue method of the Singleton instance.
If the first service observes this.value = 0 (due to either being the initial state or due to a previous operation), it proceeds to increment the value by 1 using the incrementValue method.
Meanwhile, if the second service also observes this.value = 0 (before the first service's increment operation completes), it also attempts to increment the value by 1.
As a result, both services independently increment the value, leading to a race condition where the final state may be inconsistent.
To mitigate this issue and ensure data consistency when multiple services access the Singleton instance concurrently, it's crucial to implement synchronization mechanisms such as locks or atomic operations. These mechanisms ensure that access to the shared state is properly coordinated, preventing race conditions and ensuring a consistent state across services.

In the provided example utilizing Redis, Redis acts as a shared state store, and atomic operations are employed to ensure that the getValue and incrementValue operations are executed atomically. This guarantees data consistency and prevents race conditions even when multiple services access the Singleton instance simultaneously.

## Reference

GPT
