# Title

## Introduction

Let's first distinguish actions, calculations, and data with example: grocery shopping

from

<img src="{{site.baseurl}}/assets/img/grocery_shopping_actions.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

to

<img src="{{site.baseurl}}/assets/img/grocery_shopping_ACD.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

* Why `decide shopping list` is calculation rather than action
  * because there is no side effect produced by it
  * side effect: change the attributes of original components
  * `decide shopping list` did not change the location of this person, the inventories in fridge, ...ect

## Why?

With ACD process, we can make sure we can truly solve a problem with perfect functional programming and then utilize the advantages of it such as parallel computing.

## How?

In the functional programming world, we solve a problem with concept of **input** and **output** while **minimizing the side effect** outside each function. To achieve it, following steps (ACD):

1. (action) decompose a problem with flow of actions to define the desired input and desired output of each action
2. (data) find the data needed in each action to define immutable datasets
3. (calculation) with immutable dataset and desired input, define required calculations

Take the example in [introduction](#introduction) section as example,

* we decompose the process into `check fridge`, `drive to store`, ...etc
* the input and output of `check fridge`
  * input: `true` (whatever reason such as cooking, hungry, ...etc)
  * output: `inventory in fridge`
* the input and output of `drive to store`
  * input: `inventory to buy`
  * output: `locations`

between actions, `check fridge` and `drive to store`, the desired input of `drive to store` is `inventory to buy`. However, the output of `check fridge` is `inventory in fridge`. As a result, there must be a calculation, `compare inventory we need and inventory in fridge`, here and we can get `inventory to buy`.

## What?

### new code

Example: CouponDog, a company sending coupons via email, wants to have a new feature to send better coupon to customers recommending more other customers. Let's walk through this problem without any concept of programming and we will

1. get list of customers (action)
2. get list of coupons (action)
3. distinguish customers with > 10 recommendations (calculation)
4. distinguish coupons with better (calculation)
5. compose emails (calculation)
6. send emails (action)

Accordingly, we have

<img src="/assets/img/CouponDog_ACD.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

Inside the **Plan list of emails**, we need to do step 3 and 4 as follow:

<img src="/assets/img/distinguish_coupons.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

<img src="/assets/img/distinguish_subscribers.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

Based on above information, our composition should be as follow:

```javascript
function sendIssue() { // action
  const coupons = fetchCouponsFromDB(); // action
  const subscribers = fetchSubscribersFromDB(); //action
  const emails = emailsForSubscribers(subscribers, coupons); // calculation
  console.log(emails)
//   for(let e = 0; e < emails.length; e++) { // action
//     const email = emails[e];
//     emailSystem.send(email);
//   }
}

function fetchCouponsFromDB() {
  // here return fake coupons
  return [ // data
    {
      code: 'MAYDISCOUNT',
      rank: 'good',
    },
    {
      code: '10PERCENT',
      rank: 'bad',
    },
    {
      code: 'PROMOTION45',
      rank: 'best',
    },
  ]
}

function fetchSubscribersFromDB() {
  // here return fake coupons
  return [ // data
    {
      email: 'john@coldmail.com',
      rec_count: 2,
    },
    {
      email: 'sam@pmail.co',
      rec_count: 16,
    },
  ]
}

function emailsForSubscribers(subscribers, coupons) { // calculation
  const goodCoupons = selectCouponsByRank(coupons, 'good'); // calculation
  const bestCoupons = selectCouponsByRank(coupons, 'best'); // calculation
  const emails = subscribers.map(subscriber => emailsForSubscriber(subscriber, goodCoupons, bestCoupons)) // calculation
  return emails;
}

function emailsForSubscriber(subscriber, goodCoupons, bestCoupons) { // calculation
  const rank = subCouponRank(subscriber);
  if (rank === 'best') {
    return message(subscriber.email, bestCoupons)
  } else if (rank === 'good') {
    return message(subscriber.email, goodCoupons)
  } else {
    'no email'
  }
}

function message(email, coupons) { // data
  return {
    from: "newsletter@coupondog.co",
    to: email,
    subject: "Your weekly coupons inside",
    body: "Here are the coupons: " + coupons.map(coupon => coupon['code']).join(", ")
  }
}

function subCouponRank(subscriber) { // calculation
  if(subscriber.rec_count >= 10) {
    return 'best';
  } else {
    return 'good';
  }
}

function selectCouponsByRank(coupons, rank) { // calculation
  const couponsRanked = coupons.filter(coupon => coupon.rank === rank);
  return couponsRanked
}
```

### existing code

Suppose we have

```javascript
function main(affiliates) {
  affiliatePayout(affiliates);
}

function affiliatePayout(affiliates) {
  for(var a = 0; a < affiliates.length; a++) {
    figurePayout(affiliates[a]);
  }
}

function figurePayout(affiliate) {
  var owed = affiliate.sales * affiliate.commission;
  if(owed > 100) {
    sendPayout(affiliate.bank_code, owed);
  }
}
```

As you can see, this main program will pay salaries to affiliates and it seems only one action in main. This is a terrible design because actually we can break process into steps:

1. get affiliates list
2. calculate the owed fees
3. send payout to them

as

```javascript
function main() {
  const affiliates = getAffiliates() // action
  const owedFees = affiliates.map(affiliate => affiliate.sales * affiliate.commission) // calculation
  for(let i = 0; i < affiliates.length; i++) { // action
    sendPayout(affiliate.bank_code, owedFees[i]);
  }
}

function sendPayout() {
  ...
}

function getAffiliates() {
  ...
}
```

which is actually not just one action

## Reference

grokking simplicity
