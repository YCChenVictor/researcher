# Title

## Purpose

The proxy pattern is utilized to **manage object access**. If some issues like security, resources and caching occurs, it do not let us use that objects, without altering the core object's structure. This promotes efficient resource utilization and improved system performance.

## Concept

The core concept is to create a surrogate or placeholder object that acts as a representative for another object, controlling access to it and allowing additional functionality to be added without altering the original object's interface.

## Example

For example, if we want to have different authorization of database on different roles, we can use the proxy pattern to achieve it. In the following example, the ProxyDatabase class controls access to the real RealDatabase. Only users listed in the authorizedUsers array are allowed to read or write data using the proxy. If a user is not authorized, appropriate messages are displayed, preventing unauthorized access to the database.

```javascript
class RealDatabase {
  constructor() {
    this.data = {};
  }

  readData(key) {
    return this.data[key];
  }

  writeData(key, value) {
    this.data[key] = value;
  }
}

class ProxyDatabase {
  constructor() {
    this.realDatabase = new RealDatabase();
    this.authorizedUsers = ["admin", "manager"];
  }

  readData(key, user) {
    if (this.authorizedUsers.includes(user)) {
      return this.realDatabase.readData(key);
    } else {
      console.log(`User ${user} is not authorized to read data.`);
      return null;
    }
  }

  writeData(key, value, user) {
    if (this.authorizedUsers.includes(user)) {
      this.realDatabase.writeData(key, value);
      console.log(`User ${user} wrote data: ${key} => ${value}`);
    } else {
      console.log(`User ${user} is not authorized to write data.`);
    }
  }
}

// Usage
const databaseProxy = new ProxyDatabase();

databaseProxy.writeData("name", "John", "admin"); // Successful write
databaseProxy.writeData("age", 25, "user"); // Unauthorized write

console.log(databaseProxy.readData("name", "manager")); // John
console.log(databaseProxy.readData("age", "user")); // User user is not authorized to read data.
```
