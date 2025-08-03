# Title

## Introduction

This article describes

* Concept of timeline diagrams
  * Represent sequences of actions over time
  * Timeline diagrams help us understand how software runs
* How to draw timeline diagrams from code
* How to use them to diagnose and predict bugs

## Why?

By concept of timelines, we can identify bug and improve code design to create more efficient programs.

## How?

### Customers Report Bug

Problem: Shopping cart showing the wrong total
  * Reproduce: Click `add 6` **twice** fast
  * Desired result: `14` (6 * 2 + 2, 2 shoes + shipping)
  * Variant results: `14, 16`

<img src='{{site.baseurl}}/assets/img/cart_bug_click_twice_fast.png' class='w-3/4' alt=''>

### Draw Timeline Diagrams from Code

In this section, code => diagram => simplify diagram => 13 actions to 3 actions

#### Code

```javascript
function add_item_to_cart(name, price, quantity) {
  cart = add_item(cart, name, price, quantity);
  calc_cart_total();
 }
  
function calc_cart_total() {
  total = 0;
  cost_ajax(cart, function(cost) { // AJAX request
    total += cost; // when request complete, add on cost
    shipping_ajax(cart, function(shipping) { // AJAX request
      total += shipping; // when request complete, add on shipping
      update_total_dom(total);
    });
  });
} 
```

#### timeline diagram, one request, browser

##### basic diagram

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_timeline_diagram.png' class='w-1/2' alt=''>

* Actions
  * `+=`:
  ```javascript
  var temp = total; // read
  temp = temp + 1;
  total = temp; // write
  ```
  * `console.log(total)`:
  ```javascript
  var temp = total; // read
  console.log(temp);
  ```
* Timelines (Three in the graph):
  * Same timeline: Actions occur in order
  * Separate timeline (Async): Actions happen at the same time or out of order
* dot line:
  * AJAX and Event loop
  <img src='{{site.baseurl}}/assets/img/ajax_and_event_loop.png' class='w-3/4' alt=''>
  * Refer to sections "JavaScript’s asynchronous queue", "AJAX and the event queue", and also this [video](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=876s)

##### consolidate actions: (simplification step 1)

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_timeline_diagram_consolidate_actions.png' class='w-3/4' alt=''>

* JavaScript only has one thread => Consolidate all actions on a single timeline; that is, a box
* Refer to sections "Two tricky details about the order of actions" and "Drawing the add-to-cart timeline: Step 1", "JavaScript’s single-thread"
* Interleave
  * Javascript synchronous actions don’t interleave
  <img src='{{site.baseurl}}/assets/img/synchronous_actions.png' class='w-1/3' alt=''>
  * Javascript asynchronous actions can interleave
  <img src='{{site.baseurl}}/assets/img/asynchronous_actions.png' class='w-1/3' alt=''>
  * Refer to sections "Different languages, different threading models in grokking simplicity", "Timeline diagrams capture the two kinds of sequential code"

##### consolidate timelines: (simplification step 2)

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_timeline_diagram_consolidate_timelines.png' class='w-1/4' alt=''>

* JavaScript's event loop only has one thread => One AJAX triggered by another will run in queue => Consolidate timelines that end by creating one new timeline

### Read timeline diagrams to find bugs

#### timeline diagram, two request, browser

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_two_timeline_diagram.png' alt=''>
* Problem: The shipping add twice

#### General rules

* Ordering
  * Evaluation: $$o = \frac{(ta)!}{(a!)^t}$$
  * Fewer timelines, $$t$$
  * Shorter timelines, $$a$$
* Share Resources
  * Fewer sharing resources: reduce the ordering we need to consider
  * Coordinate when resources are shared
* Manipulate time as a first-class concept: in following chapters
* Refer to sections "The two fundamentals of timeline diagrams", "Asynchronous calls require new timelines", "Drawing the add-to-cart timeline: Step 2", "Principles of working with timelines"

#### Problem: Share Resources

```javascript
function add_item_to_cart(name, price, quantity) {
  cart = add_item(cart, name, price, quantity); // global variable
  calc_cart_total();
}
function calc_cart_total() {
  total = 0; // global variable
  cost_ajax(cart, function(cost) {
    total += cost;
    shipping_ajax(cart, function(shipping) {
      total += shipping;
      update_total_dom(total);
    })
  })
}
```

<img src='{{site.baseurl}}/assets/img/two_timeline_share_resources.png' class='w-3/4' alt=''>

### Improve code design by reducing resources shared between timelines.

Based on last section, we can try to fix the bug by

#### Reduce share resources

* Through local variable
  ```javascript
  function calc_cart_total() {
    var total = 0; // use local variable instead
    cost_ajax(cart, function(cost) {
      total += cost; // Then the total must be zero here. Another timeline could not write to it
      shipping_ajax(cart, function(shipping) {
        total += shipping;
        update_total_dom(total);
      })
    })
  }
  ```
* Through argument
  ```javascript
  function add_item_to_cart(name, price, quantity) {
    cart = add_item(cart, name, price, quantity);
    calc_cart_total(cart); // add the cart as argument
  }
  function calc_cart_total(cart) {
    var total = 0;
    cost_ajax(cart, function(cost) { // cart read not global variable anymore
      total += cost;
      shipping_ajax(cart, function(shipping) { // cart read not global variable anymore
        total += shipping;
        update_total_dom(total);
      })
    })
  }
  ```
* result
  <img src='{{site.baseurl}}/assets/img/reduce_share_resource_result.png' class='w-3/4' alt=''>
  * Variable cart is still global but the second timeline is constrained to run after the first step (hence the dotted line), so these first steps that use the cart will always run in order. They can’t interfere with each other.
  * We’re still sharing the DOM as a resource and going to learn how to share resources in the next chapter.

#### Coordinate when resources are shared

In following chapters, we will do it. Now we just use a final callback instead of a return value

```javascript
function add_item_to_cart(name, price, quant) {
  cart = add_item(cart, name, price, quant);
  calc_cart_total(cart, update_total_dom);
}

function calc_cart_total(cart, callback) {
  var total = 0;
  cost_ajax(cart, function(cost) {
    total += cost;
    shipping_ajax(cart, function(shipping) {
      total += shipping;
      callback(total); // replace with a callback argument
    })
  })
}
```

## Reference

[grokking simplicity](https://grokkingsimplicity.com/)
