# Title

## Purpose

To solve problems more efficiently, we aim to optimize both time and space complexity to the point where further improvements are not possible.

## Concept

We can decompose all the programming logics into four actions: create, read, update, delete. The **time complexity** of CRUD an element in specific data structure is as follow: (The order is based on popularity)

We can decompose all the programming logics into four actions: create, read, update, delete. The **time complexity** of CRUD an element in specific data structure is as follow: (The order is based on popularity)

|  | Create | Read | Update | Delete |
|:-:|:-:|:-:|:-:|:-:|
| Arrays | O(1) - O(n) | O(1) | O(1) | O(1) - O(n) |
| Linked Lists | O(1) | O(n) | O(n) | O(1) |
| Hash Tables | O(1) | O(1) | O(1) | O(1) |
| Trees | O(log n) | O(log n) | O(log n) | O(log n) |
| Graphs | O(1) | O(v+e) | O(1) | O(v+e) |
| Stacks | O(1) | O(n) | O(n) | O(1) |
| Queues | O(1) | O(n) | O(n) | O(1) |
| Heaps | O(log n) | O(1) | O(log n) | O(log n) |
| Tries | O(k) | O(k) | O(k) | O(k) |

In this table, n is the number of elements in the data structure, v is the number of vertices, e is the number of edges, and k is the length of the word for tries. Note that these are average case complexities, and the actual time complexity can vary based on the specific implementation and usage of the data structure.

## Example

* [array](/dsa/array)
* [linked list](/dsa/linked-list)
* [hash table](/dsa/hash-table)
* [tree](/dsa/tree)
* [graph](/dsa/graph)
* [stack](/dsa/stack)
* [queue](/dsa/queue)
* [heap](/dsa/heap)
* [tries](/dsa/tries)
* [dynamic programming](/dsa/dynamic-programming)
* [sorting](/dsa/sorting)

## reference

* [cracking the coding interview](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850)
* [The top data structures you should know for your next coding interview](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
