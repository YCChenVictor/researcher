# Title

## Introduction

This article describes how to solve problems related to data structure and algorithm.

## Why?

To pass coding interview

## How?

1. Read or listen to the question and ask all the necessary information, use as little hint as possible
2. Brainstorm to think about all the cases, including edge case
3. Come up with a brute force solution and write it **on paper**
4. Optimize the brute force **on paper**
   * Think about bottleneck, Unnecessary work, Duplicated work
   * Just think of the real world example
   * Start from the simplest form and then stack up
   * Fit the problem into a specific data structure and use the related knowledge
   * Try to find more general solution
   * Try to figure out the best time complexity first
5. Walk through the idea again **on paper**
6. Start to write code as clean as possible **on computer**
7. Write tests with general, base, error cases

For example, print all positive integer solutions to the equation $$a^3 + b^3 = c^3 + d^3$$ where a, b, c, and d are integers between 1 and 1000.

### on paper

Something like this

<!-- <img src="{{site.baseurl}}/assets/img/on_paper.png" alt=""> -->

### brute force

```javascript
result = []
for (a in [1..1000]) {
  for (b in [1..1000]) {
    for (c in [1..1000]) {
      for (d in [1..1000]) {
        if (a^3 + b^3 = c^3 + d^3) {
          result.append([a, b, c, d])
        }
      }
    }
  }
}
```

The time complexity is $$O(N^4)$$

### BUD (Bottlenecks, Unnecessary work, Duplicated work)

* unnecessary work: We should always observe any unnecessary work first because it is truly not part of the problem we are going to solve. In the brute force above the loop in `d` is an unnecessary work and should be remove as follow:
  ```javascript
  result = []
  for (a in [1..1000]) {
    for (b in [1..1000]) {
      for (c in [1..1000]) {
        d = (a^3 + b^3 - c^3)^(1/3)
        if (a^3 + b^3 = c^3 + d^3) {
          result.append([a, b, c, d])
        }
      }
    }
  }
  ```
  * Then the time complexity will decrease to $$O(N^3)$$
* Bottlenecks
  * Then we start to solve the problem. When we talk about bottleneck, it means the place having the highest time complexity. To solve it, we usually have two approaches: cost some space or sort it.
  * The easiest way to use space for solving problem is the concept of hash table. We can store the data in the upper loops and use this data in the later loop. For example, we can decrease the time complexity with following approach:
  ```javascript
  result = []
  hash_table = {}
  for (a in [1..1000]) {
    for (b in [1..1000]) {
      hash_table[a^3 + b^3] << [a, b]
    }
  }
  
  for (c in [1..1000]) {
    for (d in [1..1000]) {
      if (c^3 + d^3 exist in hash_table) {
        result.append([hash_table[c^3 + d^3], [c, d]])
      }
    }
  }
  ```
  * Given a, b, c, d will all loop through 1 to 1000, the time complexity = $$O(2N^2) = O(N^2)$$
* Duplicated work
  * Although the complexity is already in $$O(N^2)$$; however, it is actually $$O(2N^2)$$ and the first nested for loops are the same as the second nested for loops, which is duplicated work. We can simplify it further with
  ```javascript
  result = []
  hash_table = {}
  for (a in [1..1000]) {
    for (b in [1..1000]) {
      hash_table[a^3 + b^3] << [a, b]
    }
  }
  
  for element in hash_table {
    if (count(element) > 1) {
      result << select(element, 2) // select two out of this element
    }
  }
  ```
  * Then the time complexity = $$O(N^2 + AB)$$, where A is the number of elements in hash table and B is the number of items in each element, meaning $$A, B < N$$. Then time complexity = $$O(N^2)$$

### just think of the real world example

Again, we use the problems, finding all a, b, c, d, which $$a^3 + b^3 = c^3 + d^3$$. If we need to do it by brain, then what should we do to find the result quickly?

We will write down the result of $$a^3 + b^3$$ from 1 to 1000 and then find the pair of (c, d) to map (a, b) and this is the concept of hash table.

### try to find more general solution

More general

```javascript
function a_b_c_d(k) {
  result = []
  hash_table = {}
  for (a in [1..k]) {
    for (b in [1..k]) {
      hash_table[a^3 + b^3] << [a, b]
    }
  }

  for (c in [1..k]) {
    for (d in [1..k]) {
      if (c^3 + d^3 exist in hash_table) {
        result.append([hash_table[c^3 + d^3], [c, d]])
      }
    }
  }
}
```

* Then we can input any positive integer

### figure out the best time complexity first

We can start from the big picture by calculating the best time complexity first; for example, in the problem of $$a^3 + b^3 = c^3 + d^3$$, we know that we must at least know the result of $$a^3 + b^3$$, so the best time complexity will be $$O(N^2)$$ and once we find out an algorithm with $$O(N^2)$$, we can wrap up.

### Start from Simplest Form and Stack Up

Usually, this approach will lead to a recursive solution.

* example: Design an algorithm to print all permutations of a string. For simplicity, assume all characters are unique.
* brute force:

```javascript
string = 'abcdefg' // all characters are unique
result = []
length = len(string)
targets = []
for (i in length) {
  targets << string[0..(length-i)]
}
for (target in targets) {
  result << shuffle(target)
}

function shuffle (string) => {
  // some brute force algorithm with O(N!)
  // when string = 'abc', results = 'abc', 'acb', 'bac', 'bca', 'cab', 'cba', the times is 3! 
}
```

Then the time complexity = $$N + N * N! = O( N*N! )$$. We can start from `string = 'a'`, then `string 'ab'`, ...etc and we will find out that the desired result of `'ab'` is based on the result of `'a'` and append `'b'` on both side of the result of `'a'` and so on as follow:

```javascript
{
  'a',
  'ab', 'ba',
  'cab', 'abc', 'cba', 'bac',
  'dcab', ...
  ...
}
```

As a result the algorithm would be

```javascript
string = 'abcdefg' // all characters are unique

function getPermutationsBasedOnLastOne (string, lastPermutations) {
  length = len(string)
  lastPermutations = getPermutationsBasedOnLastOne (string[0..(length-1)], lastPermutations)
  for (Permutation in lastPermutations) {
    result << string[-1] + Permutation
    result << Permutation + string[-1]
  }
  return result
}
```

### Test

* for a^3 + b^3 = c^3 + d^3, k = 2 => expect results: [1, 1, 1, 1], [1, 2, 2, 1], [1, 2, 1, 2], [2, 2, 2, 2]
* We can start write precise code here, with TDD

```javascript
describe('a^3+b^3=c^3+d^3', () => {
  describe('k=2', () => {
    expect(a_b_c_d(2)).toEqual([1, 1, 1, 1], [1, 2, 2, 1], [1, 2, 1, 2], [2, 2, 2, 2]);
  })
})
```

## Reference

cracking the coding interview
