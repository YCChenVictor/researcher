# Title

## Purpose

Building Robust and Maintainable Software with the SOLID Principles.

## Concept

Let's say we have a class `User`, which can CRUD users

```javascript
class UserService {
  constructor() {
    // Initialize user data or database connection
  }

  createUser(userData) {
    // Logic to create a new user
  }

  updateUser(userId, newData) {
    // Logic to update user information
  }

  deleteUser(userId) {
    // Logic to delete a user
  }

  getUser(userId) {
    // Logic to retrieve user information
  }

  // Other user-related methods...
}
```

### Single Responsibility Principle (SRP)

A class should have only one reason to change, which means it should have only one responsibility. To achieve it, let's define four different class and use them in `UserService`. Then when we need to change a method, we actually change the class of the method, not `UserService`, ensuring only one reason to change.

```javascript
class UserRepository {
  constructor() {
    // Initialize user data or database connection
  }

  createUser(userData) {
    // Logic to create a new user in the database
  }

  updateUser(userId, newData) {
    // Logic to update user information in the database
  }

  deleteUser(userId) {
    // Logic to delete a user from the database
  }

  getUser(userId) {
    // Logic to retrieve user information from the database
  }
}

class UserCreator {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  createUser(userData) {
    // Logic to create a new user
    this.userRepo.createUser(userData);
  }
}

class UserUpdater {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  updateUser(userId, newData) {
    // Logic to update user information
    this.userRepo.updateUser(userId, newData);
  }
}

class UserDeleter {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  deleteUser(userId) {
    // Logic to delete a user
    this.userRepo.deleteUser(userId);
  }
}

class UserRetriever {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  getUser(userId) {
    // Logic to retrieve user information
    return this.userRepo.getUser(userId);
  }
}
```

and use them with

```javascript
const userRepository = new UserRepository();
const userCreator = new UserCreator(userRepository);

const newUser = { /* user data */ };
userCreator.createUser(newUser);
```

We pass userRepository into UserCreator.

### Open-Closed Principle (OCP)

The Open-Closed Principle promotes the idea that software entities (such as classes, modules, functions, etc.) should be open for extension but closed for modification. Based on above example, let's say we need special callback when create a user, then we can extend it without modifying the old logic by

```javascript
class SpecialUserCreator extends UserCreator {
  createUser(userData) {
    console.log('create a new user callback')
    this.userRepo.createUser(userData);
  }
}
```

### Liskov Substitution Principle (LSP)

Child classes behave the same way as parent class in other function calling them. Based on above example,

```javascript
function createUserNotification(createTool, userData) {
  return createTool.createUser(userData)
}

const specialUserCreate = new SpecialUserCreator()
const userCreate = new UserCreator()

createUserNotification(specialUserCreate, userData)
createUserNotification(userCreate, userData)
```

If we do not use inheritance, then `Dog` may not have the `makeSound` method, causing `animalMakesSound` raises error.

### Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they do not use; for example, we want to create a user, then we should only need to create this user with the required userData, not any other interfaces or methods. Actually, the example above has already achieve ISP.

### Dependency Inversion Principle (DIP)

The Dependency Inversion Principle emphasizes that high-level modules should not depend on low-level modules, but both should depend on abstractions. In the above example, we actually already achieve DIP because actually create method in `userCreator`(higher-level) is separated from `userRepository` (lower-level). 

```javascript
const userRepository = new UserRepository();
const userCreator = new UserCreator(userRepository);

const newUser = { /* user data */ };
userCreator.createUser(newUser);
```

`UserRepository` is lower level because we pass it into `UserCreator`.

## Reference

GPT
