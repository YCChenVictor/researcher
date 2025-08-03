# Title

## Purpose

Dynamic programming offers an efficient solution to large-scale optimization problems by breaking them into smaller sub-problems and avoiding repetitive computations, making it applicable across various disciplines including computer science, mathematics, engineering, economics, and operations research.

Dynamic programming typically involves storing and reusing previously computed results to avoid redundant calculations, which can make the solution more efficient for larger values.

## Concept

All dynamic programmings involve smartly finding relationship between bigger dataset and smaller dataset and try to formulate it. As demonstration, I am going to solve problem, longest increasing subsequence, with dynamic programming.

### Recursive vs. Iterative Solutions

All recursive algorithms can be implemented iteratively. If the recursive solution takes too much memory, we can consider solving it iteratively.

For example, we can calculate `factorial` with recursive and iterative method as follow:

```javascript
function factorialRecursive(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorialRecursive(n - 1);
  }
}

function factorialIterative(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

### fibonacci

* Concept
  ```bash
  f(n) = f(n - 1) + f(n - 2)
  ```
* Recursive
  ```javascript
  function fibonacci(n) {
    const memo = {}; // the memo is the key for dynamic programming
    function fibonacciHelper(n) {
      if (n <= 1) {
        return n;
      } else if (n in memo) {
        return memo[n];
      } else {
        memo[n] = fibonacciHelper(n - 1) + fibonacciHelper(n - 2);
        return memo[n];
      }
    }
    return fibonacciHelper(n);
  }

  console.log(fibonacci(10)); // Output: 55
  ```
* Time complexity: O(n) because with memo, I only need to calculate each Fibonacci number once.

## Example

### Triple Step

* Problem: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time, implement a method to count how many possible ways the child can run up the stairs.
* Concept (important dynamic programming concept): When the child hops on 5, we can guess this child hop 1, hop 2, or hop 3
  * hop 1 => must hop to 4 before => the ways(4)
  * hop 2 => must hop to 3 before => the ways(3)
  * hop 3 => must hop to 2 before => the ways(2)
  * As a result, we can conclude that ways(n) = ways(n-1) + ways(n-2) + ways(n-3)
* Solution: (recursive one, no memory)
  ```javascript
  function childHop(n) {
    if (n == 1) {
      // [1]
      return 1
    } else if (n == 2) {
      // [1, 1], [2]
      return 2
    } else if (n == 3) {
      // [1, 1, 1], [2, 1], [1, 2], [3]
      return 4
    } else {
      return childHop(n - 3) + childHop(n-2) + childHop(n-1)
    }
  }

  // childHop(5) = 13
  ```
* Solution: (dynamic programming one)
  ```javascript
  function childHop(n) {
    dp = Array(n + 1).fill(0)

    // dp[0] = 0 (0 step)

    dp[0] = 0
    dp[1] = 1 // [1]
    dp[2] = 2 // [1, 1], [2]
    dp[3] = 4 // [1, 1, 1], [2, 1], [1, 2], [3]
    for(let i = 4; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
    }
    return dp[n]
  }
  ```
* Test
  ```javascript
  childHop = require('./triple_step.js')

  describe('Triple Step', () => {
    test('when the stair has 5 steps', () => {
      expect(childHop(5)).toEqual(13)
    })
  })
  ```

### Robot in a Grid

Question: Imagine a robot sitting on the upper left corner of grid with r rows and c columns. The robot can only move in two directions, right and down, but certain cells are "off limits" such that the robot cannot step on them. Design an algorithm to find a path for the robot from the top left to the bottom right.

* Example
  * Input
    ```bash
    r = 3 (number of rows)
    c = 4 (number of columns)
    Off-limit cells: [[1, 1], [2, 2], [2, 3]]
    ```
  * Output: array of (x, y)
* Code
  ```javascript
  const offLimitCells = [
    { row: 1, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
  ];

  function path(x, y, offLimitCells, currentResult = []) {
    currentResult.push([x, y])

    const inOffLimitCells = (target) => {
      if(offLimitCells.find((cell) => cell.row === target.row && cell.col === target.y)) {
        return true
      } else {
        return false
      }
    }

    if(x === 1 && y === 1) {
      return currentResult
    }

    let lastPoint
    if(x === 1 && !inOffLimitCells({ row: 1, col: y - 1 })) {
      lastPoint = { row: 1, col: y - 1 }
    } else if(y === 1 && !inOffLimitCells({ row: x - 1, col: 1 })) {
      lastPoint = { row: x - 1, col: 1 }
    } else if(!inOffLimitCells({ row: x - 1, col: y })) {
      lastPoint = { row: x - 1, col: y }
    } else if(!inOffLimitCells({ row: x, col: y - 1 })) {
      lastPoint = { row: x, col: y - 1 }
    } else {
      return 'no routes'
    }

    return path(lastPoint.row, lastPoint.col, offLimitCells, currentResult)
  }

  const result = path(3, 4, offLimitCells)
  ```

### Longest Common Subsequence (LCS)

Please use the concept of dynamic programming to solve it.

#### Examples

* s1 = "ABCD", s2 = "ACDA". The LCS is "ACD" with a length of 3.
* s1 = "AGGTAB", s2 = "GXTXAYB". The LCS is "GTAB" with a length of 4.
* s1 = "abcdef", s2 = "xyz". The LCS is an empty string "" with a length of 0.

#### Concept
  
* Build a 2D table, row is s1 and column is s2 and if value matches, mark the cell value as 1, otherwise 0.
  |   | A | B | C | D |
  |:-:|:-:|:-:|:-:|:-:|
  | A | 1 | 0 | 0 | 0 |
  | C | 0 | 0 | 1 | 0 |
  | D | 0 | 0 | 0 | 1 |
  | A | 1 | 0 | 0 | 0 |
* Take a look at the table above
  * row "AC" with col "A" => 1 and row "ACD" with col "A" => 1, which means it is impossible to increase LCS by increasing the letters of only s1 or s2 and also, DP[C][A] = 1; DP[D][A] = 1, ...etc.
  * row "ACDA" with col "A" => 1 although there are two matches. It is impossible to increase LCS by only increase letters on one dimension because you must increase slots.
  * DP[i][j] = DP[i-1][j-1] + 1 if row[i] = col[j]
  * DP[i][j] = DP[i-1][j] or DP[i][j-1] if row[i] != col[j]

#### Code

Let's try to write the code

* Try iterative
  ```javascript
  function longComSub(s1, s2) {
    result = []
    for (i = 0; i < s1.length; i++) { // iteration
      result.push([]) // s1 will be row
      for (j = 0; j < s2.length; i++) {
        if (i === 0 && j === 0) {
          result[i][j] = (s1[i] === s2[j]) ? 1 : 0
        } else if (i === 0) {
          result[i][j] = result[i][j - 1]
        } else if (j === 0) {
          result[i][j] = result[i - 1][j]
        } else if (s1[i] === s2[j]) {
          result[i][j] = result[i - 1][j - 1]
        } else {
          result[i][j] = Math.max(result[i - 1][j], result [i][j - 1]) // dynamic programming here
        }
      }
    }
  }
  ```
* Time complexity: O(m x n)

### MagicIndex

* Question: A magic index in an array A[0...n-1] is defined to be an index such thatA[i] = i. Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.
* Discussion
  * Please return the index itself and return -1 if there is no magic index.
  * If there are multiple magic index, please return the smallest one
  * Example one
    ```javascript
    // input
    [0, 2, 3, 4]

    // output
    0
    ```
* Estimate Time complexity: Because at most to walk through all element, it is O(n).
* Code (First try)
  ```javascript
  function magicIndex(array) {
    for(i = 0; i < array.length; i++) {
      if(array[i] === i) {
        return i
      }
    }
  }
  ```
* GPT told me that there is more efficient way to do it; for example, binary search. I also found that the elements are distinct and sorted. I think if the middle one is larger than the index of itself, then all the elements in the right will not be considered; also, if the middle one is smaller than the index of itself, then all the elements in the left will not be considered.
  ```javascript
  function magicIndex(array, start = 0, end = array.length - 1) { // make the array consistent, so that we can return the index of full array
    if (start > end) {
        return -1; // No magic index found
    }

    const middleIndex = Math.floor((start + end) / 2)
    const middleValue = array[middleIndex]

    if(middleValue === middleIndex) {
      return middleIndex
    } else if(middleValue > middleIndex) {
      return magicIndex(array, start, middleIndex - 1)
    } else if(middleValue < middleIndex) {
      return magicIndex(array, middleIndex + 1, end)
    } else {
      return -1
    }
  }
  ```
* Dynamic way: TBC

### Power Set

* Question: Write a method to return all subsets of a set.
* Example
  ```javascript
  // input
  {1, 2}
  // output
  {1}, {2}, {1, 2}, {}
  ```
* Time complexity: I think I can remove the element one by one in every big set, so time complexity wil be: 1 * n + 2 * (n-1) + 3 * (n-2) + ... n * 0. But GPT say it is O(2^n).
* Code
  ```javascript
  function powerSet(inputSet) {
    const subsets = new Set([new Set()]);
  
    for(const item of inputSet) {
      // Ok, the key problem is the set points to the same set. I need to clone first and then assign it
      // What I learned, set has the same pointer, I need to clone it
      newSubsets = new Set(subsets)
      for(const subset of subsets) {
        const newSubset = new Set(subset)
        newSubset.add(item)
        newSubsets.add(newSubset)
      }
  
      for(const set of newSubsets) {
        subsets.add(set)
      }
    }
    console.log(subsets)
  
    return subsets
  }
  
  module.exports = powerSet
  ```

### Recursive Multiply

* Question: Write a recursive function to multiply two positive integers without using the * operator. You can use addition, subtraction, and bit shifting, but you should minimize the number of those operations.
* Time complexity will be min(a, b) because I need to add either b, a times or a, b times.
* Example
  ```javascript
  function recursiveMultiply(a, b) {
    if(a === 0 || b === 0) {
      return 0
    } else {
      return(recursiveMultiply((a-1), (b-1)) + a + b - 1)
    }
  }
  ```
* GPT said there more efficient way to use bit shifting. But both its answer and mine are both min(a, b).

### 0/1 Knapsack Problem

* Problem: Allocating scarce resources efficiently to maximize overall benefit or profit is a common problem across various domains. The problem is often represented as a table where rows denote projects, and columns represent available budgets. By employing dynamic programming to optimize resource allocation, businesses and organizations can make more informed decisions, leading to better outcomes.
* Example: Consider a company with a limited budget aiming to allocate resources (e.g., money, manpower, equipment) across projects to maximize profits.
* Solution: Dynamic programming can efficiently solve resource allocation problems by breaking them into smaller sub-problems and optimizing each subproblem independently. This is achieved by computing values in a table for all possible combinations of projects and budgets, selecting the combination that yields the highest profit within budget constraints.
* Code: Suppose we have a list of n tasks, each with an associated profit and time required. The goal is to choose a subset of tasks within a limited time to maximize total profit. Dynamic programming is applied by constructing a table where rows represent tasks, and columns represent available time. The table is filled in a bottom-up manner, computing the maximum profit for each subset of tasks and time.

We want to find the most profitable tasks in a give time as follow

```javascript
const time = 5; // it can be changed

const tasks = [
  { name: 'Task A', profit: 2, time: 1 },
  { name: 'Task B', profit: 3, time: 2 },
  { name: 'Task C', profit: 4, time: 3 },
  { name: 'Task D', profit: 5, time: 4 },
];
```

The algorithm will construct table:

```javascript
[
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 2, 2, 2, 2, 2 ],
  [ 0, 2, 3, 5, 5, 5 ],
  [ 0, 2, 3, 5, 6, 7 ],
  [ 0, 2, 3, 5, 6, 7 ],
]
```

where row is accumulated profit of projects on given time (columns)

And use dynamic programming:

* It will start from table[4][5], which has value of 7, the maximum profit the time limit can obtain
* Then extracts the solution by backtracking from the last cell of the table
* Avoiding the repetition of sub-problems, recomputing the maximum profit that can be obtained for the same accumulated projects and time limit, which occurs multiple times if a recursive or a brute-force approach were used
* Time complexity = O(n * time)

```javascript
function allocateResources(tasks, time) {
  const n = tasks.length;
  const table = Array.from({ length: n + 1 }, () => Array(time + 1).fill(0)); // dynamic programming

  // Construct table: Rows represent accumulated profits of projects, columns represent time limits
  for (let i = 1; i <= n; i++) {
    const { profit, time: taskTime } = tasks[i - 1];
    for (let j = 1; j <= time; j++) {
      if (taskTime > j) {
        table[i][j] = table[i - 1][j];
      } else {
        table[i][j] = Math.max(table[i - 1][j], profit + table[i - 1][j - taskTime]);
      }
    }
  }

  const solution = [];
  let i = n, j = time;
  while (i > 0 && j > 0) {
    if (table[i][j] === table[i - 1][j]) {
      i--;
    } else {
      const { profit, time: taskTime } = tasks[i - 1];
      solution.unshift(tasks[i - 1]);
      i--;
      j -= taskTime;
    }
  }

  return { maxProfit: table[n][time], solution };
}

const time = 5; // scare resources

const tasks = [
  { name: 'Task A', profit: 2, time: 1 },
  { name: 'Task B', profit: 3, time: 2 },
  { name: 'Task C', profit: 4, time: 3 },
  { name: 'Task D', profit: 5, time: 4 },
];

const { maxProfit, solution } = allocateResources(tasks, time);

console.log(`Max profit: ${maxProfit}`);
console.log(`Solution: ${solution.map(task => task.name).join(', ')}`);
```

### largest sum from a continuous sub-array

For example, given an integer array, [1, -2, 3, 4, -1, 2, 1, -5, 4], find the largest sum from a continuous sub-array.

* Try to find relationship between subset and set
  * It's all about pretending. I pretend I already have the solution of an subset, denoted as F(array[0..i-1]). Then the element of array[i] comes in. What's next? The problem immediately becomes Max(F(array[0..i-1]), array[i], F(array[0..i-1]) + array[i]). Let's only consider array[i] is positive. Then the problem becomes Max(array[i], F(array[0..i-1]) + array[i]).
* Define the base case
  * F(array[0]) = array[0]
* Implement the algorithm
  ```javascript
  function maxSubArraySum(arr) {
    let maxSum = arr[0]
    
    for (let i = 1; i < arr.length; i++) {
      nextResult = Math.max(arr[i], dp[i - 1] + arr[i])
      maxSum = Math.max(maxSum, nextResult);
    }
    
    return maxSum;
  }
  
  // Example usage:
  const array = [1, -2, 3, 4, -1, 2, 1, -5, 4];
  const result = maxSubArraySum(array);
  ```
* Analyze the time and space complexity
  * Since it will only loop through all element once, the time complexity is O(n)

## Reference

[0/1 Knapsack Problem Dynamic Programming](https://www.youtube.com/watch?v=8LusJS5-AGo)

[Knapsack Problem](https://web.ntnu.edu.tw/~algo/KnapsackProblem.html)

[5 Simple Steps for Solving Dynamic Programming Problems](https://www.youtube.com/watch?v=aPQY__2H3tE)
