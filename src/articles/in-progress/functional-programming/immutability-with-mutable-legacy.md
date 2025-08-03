# Title

## Introduction

Maintaining immutability when interacting with code designed with mutable data.

## Why?

Stay immutable with legacy code and other library designed with mutable data

## How?

For example, we have a legacy code, `black_friday_promotion`, which modifies `shopping_cart` for black friday

### legacy code pollute immutable design

The main process of `add_item_to_cart`

```javascript
function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
  black_friday_promotion(shopping_cart); // legacy -> having mutable issues
}
```

and then the shopping_cart will be polluted

### rules

* Copy as data leaves your code
  * Make a deep copy of the immutable data
  * Pass the copy to the untrusted code
* Copy as data enters your code
  * Immediately make a deep copy of the mutable data passed to your code
  * Use the copy in your code

=> these two steps confine the mutable data in legacy code

### interact with it: defensive copying

Solution: doppelgänger (real, copy)

```javascript
function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item); // should be immutable
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);

  const cart_copy = deepCopy(shopping_cart); // deep copy (rule 1)
  black_friday_promotion(cart_copy); // pass it to the untrusted code (rule 1) and the cart_copy may be mutable
  shopping_cart = deepCopy(cart_copy) // deep copy (rule 2) and use it in our code
}
```

The `black_friday_promotion` consumes `cart_copy`, modify `cart_copy`, and refer to `cart_copy` without any issue related to `shopping_cart`. But we can still get modified `shopping_cart` after `black_friday_promotion`

#### deepCopy

1. Every nested object and array is copied
2. cannot share those unchanged data

example:

```javascript
const user = {
  name: 'John Cena',
  age: 45,
  job: 'WWE Actor'
}
const deepClone = {...user} // use in frontend framework
const shallowClone = user

deepClone['name'] = 'new John Cena'
console.log(user) // deep clone has nothing to do with the real one
shallowClone['name'] = 'new John Cena'
console.log(user)
```

## What?

* Defensive copying in web application programming interfaces (API):

<div class="mermaid">
graph LR
  id1(request) --JSON-deep-copy-from-request--> id2(API)
  id2(API) --JSON-deep-copy-from-API--> id3(response)
</div>

* Defensive copying in Erlang and Elixir

The functions designed in both languages follow functional programming. They will deepCopy the data sent in and received from.

## Reference

[grokking simplicity](https://grokkingsimplicity.com/)
