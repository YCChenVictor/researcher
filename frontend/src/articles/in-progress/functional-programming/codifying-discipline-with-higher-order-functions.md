# Title

## Introduction

In last chapter, we know how to solve **Implicit argument in function name** with refactoring, **Express implicit argument** and **Replace body with callback**.

In this chapter, we are going to do two jobs in this chapter

* codifying our copy-on-write discipline
* improve the logging system

## Why?

* Higher-order functions -> codify patterns -> defined once, use them many times
* make functions by returning them from higher-order functions as variable
* Higher-order functions can remove a lot of duplication, but sometimes they cost readability

## How?

### Refactoring copy-on-write

The copy-on-write array method in chapter 6 as follow:

```javascript
function arraySet(array, idx, value) {
  var copy = array.slice();
  copy[idx] = value;
  return copy;
}
```

With **replace body with callback**

1. Identify before, body, and after
2. Extract function
3. Extract callback
4. reuse the codified function

#### Identify before, body, and after

```javascript
function arraySet(array, idx, value) {
  var copy = array.slice(); // before
  copy[idx] = value; // body
  return copy; // after
}
```

#### extract function

```javascript
function arraySet(array, idx, value) {
  return withArrayCopy(array);
}

function withArrayCopy(array) {
  var copy = array.slice();
  copy[idx] = value; // -> no idx and value
  return copy;
}
```

#### extract callback

```javascript
function arraySet(array, idx, value) {
  return withArrayCopy(array, function(copy) {
    copy[idx] = value;
  });
}

function withArrayCopy(array, modify) { // the modify is the callback
  var copy = array.slice();
  modify(array);
  return copy;
}
```

* we have reusable codified copy-on-write function even though the code becomes longer (from only arraySet to arraySet + withArrayCopy)

#### reuse the codified function

* use it in other code

```javascript
const sortedArray = withArrayCopy(array, function(copy) {
  someSortMethod(copy);
})
```

* decrease the number of copies

from

```javascript
const a1 = drop_first(array);
const a2 = push(a1, 10);
const a3 = push(a2, 11);
const a4 = arraySet(a3, 0, 42);
```

to

```javascript
const a4 = withArrayCopy(array, function(copy) {
  copy.shift();
  copy.push(10);
  copy.push(11);
  copy[0] = 42;
})
```

### improve logging system

From

<img src="{{site.baseurl}}/assets/img/error_handling_without.png" alt="">

to

<img src="{{site.baseurl}}/assets/img/error_handling_with_wrapper.png" alt="">

Given we have a project with lots of functions and there are several functions did not deal with error handling, we want all functions to have error handling; that is, from

```javascript
saveUserData(user);
fetchProduct(productId);
```

to

```javascript
try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}
// and
try {
  fetchProduct(productId);
} catch (error) {
  logToSnapErrors(error);
}
```

* It takes too much effor to re-write all codebase with these try & catch structure
* clearer name and wrap it with function

from

```javascript
try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}

try {
  fetchProduct(productId);
} catch (error) {
  logToSnapErrors(error);
}
```

to

```javascript
function saveUserDataWithLogging(user) { // wrap
  try {
    saveUserDataNoLogging(user); // clearer
  } catch (error) {
    logToSnapErrors(error);
  }
}

function fetchProductWithLogging(productId) { // wrap
  try {
    fetchProductNoLogging(productId); // clearer
  } catch (error) {
    logToSnapErrors(error);
  }
}
```

and now we can use techniques of `Replace body with callback`

#### Identify before, body, and after

```javascript
function saveUserDataWithLogging(user) { // before
  try { // before
    saveUserDataNoLogging(user); // body
  } catch (error) { // after
    logToSnapErrors(error); // after
  }
}
```

#### Extract function

```javascript
function saveUserDataWithLogging(user) {
  wrapLogging()
}

function wrapLogging() {
  try {
    saveUserDataNoLogging(user); // -> no user
  } catch (error) {
    logToSnapErrors(error);
  }
}
```

#### Extract callback

```javascript
function saveUserDataWithLogging(user) {
  wrapLogging(saveUserDataNoLogging(user))
}

function wrapLogging(modify) {
  return function(arg) {
    try {
      modify(arg);
    } catch (error) {
      logToSnapErrors(error);
    }
  }
}
```

#### reuse the codified function

```javascript
const fetchProductWithLogging = wrapLogging(fetchProductNoLogging);
```

<img src="{{site.baseurl}}/assets/img/wrap_logging.png" alt="">

## Reference

[grokking simplicity](https://grokkingsimplicity.com/)
