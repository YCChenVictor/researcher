# Title

## Purpose

Learning about queues is important in computer science and programming as it helps in managing data and organizing tasks efficiently using the First-In-First-Out (FIFO) principle.

## Concept

### Visualization

![queue](assets/img/queue)

[Source](https://www.geeksforgeeks.org/queue-data-structure/)

### Code

* Implementation
  ```javascript
  class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
      return this.items.shift();
    }
  
    peek() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  }
  ```
* Spec
  ```javascript
  const Queue = require('../examples/queue.js');

  describe('Queue', () => {
    let testQueue;
    beforeEach(() => {
      testQueue = new Queue();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){
        testQueue.enqueue(values[i]);
      }
    });
  
    test('#init', () => {
      expect(testQueue.print()).toEqual([1, 74, 888, 62, 33])
    })
  
    test('#enqueue', () => {
      testQueue.enqueue(0);
      expect(testQueue.print()).toEqual([1, 74, 888, 62, 33, 0]);
    });
  
    test('#dequeue', () => { // first in is 1
      testQueue.dequeue();
      expect(testQueue.print()).toEqual([74, 888, 62, 33]);
    })
  
    test('#peek', () => {
      expect(testQueue.peek()).toEqual(1);
    });
  
    test('#isEmpty', () => {
      expect(testQueue.isEmpty()).toEqual(false);
    })
  
    test('#size', () => {
      expect(testQueue.size()).toEqual(5);
    })
  });
  ```
* Time complexity
  * Create an item: **O(1)**, The enqueue method will concatenate item on the last without shifting elements, so the complexity will not increase when the number of elements increases.
  * Read an item: **O(1)**, The read method can only read the front element of the queue, so the complexity will not increase when the number of elements increases.
  * Update an item: **O(n)**, It is not normal to have update operation in queue. We achieve by dequeuing the elements and then enqueuing back. As a result, the time complexity i s O(n) on worst case.
  * Delete an item: **O(1)** because when removing the last element, there is no need to shift or modify any other elements, making it independent of the queue's size.

### Queue via Stacks

* Problem: implement a MyQueue class which implements a queue using two stacks.
* Information: We just need to accomplish the FIFO effect with two LIFO.
* coding example:
  ```javascript
  const Stack = require('../../stack/examples/stack.js')
  
  class QueueViaStacks { // FIFO
    constructor() {
      this.stackOne = new Stack();
      this.stackTwo = new Stack();
    }
  
    enqueue(element) {
      this.stackOne.push(element);
    }
  
    dequeue() {
      for (let i = 0; i < length; i++) {
        this.stackTwo.push(this.stackOne.pop())
      }
      return this.stackTwo.pop()
    }
  }
  
  module.exports = QueueViaStacks
  ```
* jest
  ```javascript
  const QueueViaStacks = require('../examples/queue_via_stacks.js');
  
  describe('QueueViaStacks', () => {
    let testQueueViaStacks;
    beforeEach(() => {
      testQueueViaStacks = new QueueViaStacks();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){
        testQueueViaStacks.enqueue(values[i]);
      }
    });
  
    test('#FIFO', () => { // TBC
      expect(testQueueViaStacks.dequeue()).toEqual(1)
    })
  });
  ```

### Animal Shelter

* Problem:
  * Shelter has dogs and cats
  * People can only adopt the oldest animal based on arrival time
  * People can choose type (dog or cat)
  * You can use linkedlist
  * Methods: Enqueue, DequeueAny, DequeueDog, and DequeueCat
* Example:
  * ['d1', 'd2', 'c1', 'c2', 'd3', 'c3'] ==DequeueAny=> ['d2', 'c1', 'c2', 'd3', 'c3']
  * ['d1', 'd2', 'c1', 'c2', 'd3', 'c3'] ==DequeueDog=> ['d2', 'c1', 'c2','d3', 'c3']
  * ['d1', 'd2', 'c1', 'c2', 'd3', 'c3'] ==DequeueCat=> ['d1', 'd2', 'c2', 'd3', 'c3']
* Code example:
  ```javascript
  class Node {
    constructor(value, type, next = null) {
      this.value = value;
      this.type = type;
      this.next = next;
    }
  }

  class AnimalShelter {
    constructor() {
      this.head = null;
    }
  
    enqueue(value, type) {
      if(this.head === null) {
        this.head = new Node(value, type)
      } else {
        const lastNode = this.traverseToLast()
        lastNode.next = new Node(value, type)
      }
    }
  
    dequeueAny() {
      this.head = this.head.next
    }
  
    dequeueDog() {
      let currentNode = this.head
      let preNode
  
      if(currentNode.type === 'dog') {
        this.head = this.head.next
        return currentNode
      }
  
      while(currentNode.type !== 'dog') {
        preNode = currentNode
        currentNode = currentNode.next
      }
  
      preNode.next = currentNode.next
  
      return currentNode
    }
  
    dequeueCat() {
      let currentNode = this.head
      let preNode
        
      if(currentNode.type === 'cat') {
        this.head = this.head.next
        return currentNode
      }
  
      while(currentNode.type !== 'cat') {
        preNode = currentNode
        currentNode = currentNode.next
      }
  
      preNode.next = currentNode.next
  
      return currentNode
    }
  
    dequeueAny() {
      this.head = this.head.next
      return this.head
    }
  
    printList() {
      const result = []
      let currentNode = this.head
  
      while(currentNode) {
        result.push(currentNode.value)
        currentNode = currentNode.next
      }
  
      return result
    }
  
    traverseToLast() {
      let currentNode = this.head;
  
      for (let i = 0; i < Infinity; i++) {
        if (currentNode.next !== null) {
          currentNode = currentNode.next;
        } else {
          return currentNode
        }
      }
      return currentNode
    }
  }

  module.exports = AnimalShelter
  ```
* Test:
  ```javascript
  const AnimalShelter = require('../examples/animal_shelter.js')

  describe('AnimalShelter', () => {
    beforeEach(() => {
      testAnimalShelter = new AnimalShelter();
      const values = [
        {id: 'd1', type: 'dog'},
        {id: 'd2', type: 'dog'},
        {id: 'c1', type: 'cat'},
        {id: 'c2', type: 'cat'},
        {id: 'd3', type: 'dog'},
        {id: 'c3', type: 'cat'},
      ];
      for(let i = 0; i < values.length; i++){
        testAnimalShelter.enqueue(values[i]['id'], values[i]['type']);
      }
    });
  
    test('#enqueue', () => {
      expect(testAnimalShelter.printList()).toEqual(['d1', 'd2', 'c1', 'c2', 'd3', 'c3'])
    });
  
    test('#dequeueAny', () => {
      testAnimalShelter.dequeueAny()
      expect(testAnimalShelter.printList()).toEqual(['d2', 'c1', 'c2', 'd3', 'c3'])
    })
    
    test('#dequeueCat', () => {
      testAnimalShelter.dequeueCat()
      expect(testAnimalShelter.printList()).toEqual(['d1', 'd2', 'c2', 'd3', 'c3'])
    })
  
    test('#dequeueDog', () => {
      testAnimalShelter.dequeueDog()
      expect(testAnimalShelter.printList()).toEqual(['d2', 'c1', 'c2', 'd3', 'c3'])
    })
  });
  ```

### Sliding Window Maximum

* Problem: Given an array of integers and a window size k, the problem is to find the maximum element in each window of size k as it slides from left to right through the array.
* Example
  * Input: [1, 3, -1, -3, 5, 3, 6, 7]; window size = 3
  * Output: [3, 3, 5, 5, 6, 7] because 3 out of [1, 3, -1], 3 out of [3, -1, -3], ...
* First try (brute force)
  ```javascript
  function SlideWindowMaximum(array, window_size) {
    queue = [array[0], array[1], array[2]] // use slice (2023/07/05)
    for(i = 0; i < array.length; i++) {
      
    }
  }
  ```

## Real world example

TBC

## Reference
