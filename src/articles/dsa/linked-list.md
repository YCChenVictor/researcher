# Title

## Purpose

Learning linked lists is valuable because they provide a flexible and efficient data structure for dynamic memory allocation and manipulation, enabling dynamic resizing and efficient insertion, deletion, and traversal operations compared to fixed-size arrays.

## Concept

### Singly Linked List

* Graph
  ```mermaid
  graph LR
    id1((A)) --> id2((B))
    id2((B)) --> id3((C))
    id3((C)) --> id4((...))
  ```
* Code
  ```javascript
  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }

    // Create
    prepend(value) {
      const newNode = new Node(value);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
    }
  
    append(value) {
      const newNode = new Node(value);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        let tail = this.traverseTo(this.size() - 1);
        tail.next = newNode;
      }
    }
  
    insert(index, value) {
      if (index === 0) {
        this.prepend(value);
      } else if (index >= this.size()) {
        this.append(value);
      } else {
        const newNode = new Node(value);
        const leader = this.traverseTo(index - 1);
        const nextNode = leader.next;
  
        leader.next = newNode;
        newNode.next = nextNode;
      }
    }
  
    // Read
    traverseTo(index) {
      let currentNode = this.head;
  
      for (let i = 0; i < index; i++) {
        if (currentNode.next !== null) {
          currentNode = currentNode.next;
        } else {
          break; // Exit loop if end of the list is reached
        }
      }
      return currentNode;
    }
  
    size() {
      let count = 0;
      let currentNode = this.head;
  
      while (currentNode !== null) {
        count++;
        currentNode = currentNode.next;
      }
  
      return count;
    }
  
    printList() {
      const list = [];
      let currentNode = this.head;
  
      while (currentNode !== null) {
        list.push(currentNode.value);
        currentNode = currentNode.next;
      }
  
      return list;
    }
  
    // Update
    update(index, value) {
      if (index < 0 || index >= this.size()) {
        throw new Error('Index out of bounds');
      }
  
      const target = this.traverseTo(index);
      target.value = value;
    }
  
    // Delete
    remove(index) {
      if (index < 0 || index >= this.size()) {
        throw new Error('Index out of bounds');
      }
  
      if (index === 0) {
        this.head = this.head.next;
      } else {
        const leader = this.traverseTo(index - 1);
        const unwantedNode = leader.next;
  
        leader.next = unwantedNode.next;
      }
    }
  }

  module.exports = LinkedList;
  ```
* Time complexity
  * Create an element on head (prepend): O(1) - Creating a new node and updating the head pointer can be done in constant time without any traversal.
  * Insert an element: O(n) - Traversing to the target position to insert the element takes time proportional to the number of nodes linked before that position.
  * Read an element: O(n) - Traversing to the target position to read the element takes time proportional to the number of nodes linked before that position.
  * Update an element: O(n) - Traversing to the target position to update the element takes time proportional to the number of nodes linked before that position.
  * Delete an element: O(n) - Traversing to the target position to delete the element takes time proportional to the number of nodes linked before that position.
* spec
  ```javascript
  const SinglyLinkedList = require('../examples/singly_linked_list.js');

  describe('SinglyLinkedList', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new SinglyLinkedList();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){
        testLinkedList.prepend(values[i]);
      }
    });
  
    test('#prepend', () => {
      testLinkedList.prepend(0);
      expect(testLinkedList.printList()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
    });
  
    test('#append', () => {
      testLinkedList.append(0);
      expect(testLinkedList.printList()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
    });
  
    test('#insert', () => {
      testLinkedList.insert(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 62, 1000, 888, 74, 1 ]);
    });
  
    test('#traverse', () => {
      expect(testLinkedList.traverseTo(2).value).toEqual(888);
    })
  
    test('#printList', () => {
      expect(testLinkedList.printList()).toEqual([33, 62, 888, 74, 1]);
    })
    
    test('#update', () => {
      testLinkedList.update(3, 4)
      expect(testLinkedList.printList()).toEqual([33, 62, 888, 4, 1]);
    })
    
    test('#remove', () => {
      testLinkedList.remove(3)
      expect(testLinkedList.printList()).toEqual([33, 62, 888, 1]);
    })
  });
  ```

### Runner Technique

* Concept: two pointers iterates through a linked list at the same time.
* Detecting Cycles
  ```javascript
  function hasCycle(head) {
    let slow = head;
    let fast = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
  
      if (slow === fast) {
        return true;
      }
    }
  
    return false;
  }
  ```
* Finding the Middle Node
  ```javascript
  function findMiddle(head) {
    let slow = head;
    let fast = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
  
    return slow;
  }
  ```

### Remove Dups

* Problem: Write code to remove duplicates from an unsorted linked list
* Information:
  * Example: from [1, 4, 6, 3, 2, 7, 4, 8, 3] to [1, 4, 6, 3, 2, 7, 8]
  * You can remove any duplicate nodes you want as long as the result are all unique values
* Edge cases: Only one node in this linked list
* Brute force: compare each node with the rest linked nodes
* Best time complexity: Because we need to traverse all the nodes to read their values at least once, the time complexity will be at least O(n).
* Code example
  ```javascript
  function removeDup(linkedList) {
    set = new Set();
    let currentNode = linkedList.head
    let previousNode = null
  
    while (currentNode !== null) {
      if (!set.has(currentNode.value)) {
        set.add(currentNode.value)
      } else {
        previousNode.next = currentNode.next
      }
      previousNode = currentNode
      currentNode = currentNode.next
    }
  
    return linkedList.printList()
  }
  ```
* test
  ```javascript
  const { removeDup } = require('../examples/remove_dup.js');
  const LinkedList = require('../examples/singly_linked_list.js');
  
  describe('RemoveDup', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = removeDup(testLinkedList)
      expect(result).toEqual([1, 4, 6, 3, 2, 7, 8]);
    });
  });
  ```

### Return Kth to Last

* Problem: Implement an algorithm to find the kth to last element of a singly linked list.
* Information:
  * Example: If a linked list is 1 <- 4 <- 6 <- 3 <- 2 <- 7 <- 8, then returnKthToLast(linkedList, 3) will be 6 <- 3 <- 2 <- 7 <- 8
  * It should return a node because the node of a linked list will show all the following node values. 
* Code example:
  ```javascript
  function returnKthToLast (linkedList, k) {
    let counter = 1; // The first element is 1th
    let node = linkedList.head;
    while (node) {
      if (counter === k) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }
  
  module.exports = {
    returnKthToLast: returnKthToLast
  };
  ```
* Test:
  ```javascript
  const { removeDup } = require('../examples/remove_dup.js');
  const LinkedList = require('../examples/singly_linked_list.js');
  
  describe('RemoveDup', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = removeDup(testLinkedList)
      expect(result).toEqual([1, 4, 6, 3, 2, 7, 8]);
    });
  });
  ```

### Sum List

* Problem: Two numbers are presented as linked list; for example, 671 as 6 -> 7 -> 1. Please write an algorithm for the sum of these two numbers; input: (6 -> 7 -> 1), (3 -> 5) and output: (7 -> 0 -> 6). p.s 671 + 35 = 706
* Time Complexity: I think the least time complexity is O(A + B), where A is the number of nodes of first linked list and B is the number of nodes of second linked list.
* Code
  ```javascript
  const LinkedList = require('./singly_linked_list.js')

  function sumList(A, B) {
    const numberOfA = getNumber(A)
    const numberOfB = getNumber(B)
  
    let restNumber = numberOfA + numberOfB
    const result = new LinkedList()
    while (restNumber !== 0) {
      result.prepend(restNumber % 10)
      restNumber = Math.floor(restNumber / 10)
    }
  
    return result
  
    function getNumber(node) {
      let currentNode = node.head
      let number = 0
      const values = []
  
      while (currentNode != null) {
        values.unshift(currentNode.value)
        currentNode = currentNode.next
      }
  
      for(let i = 0; i < values.length; i++) {
        number += values[i] * 10 ** i
      }
      
      return number
    }
  }
  
  module.exports = {
    sumList: sumList
  }
  ```
* Test:
  ```javascript
  const { sumList } = require('../examples/sum_list.js')
  const LinkedList = require('../examples/singly_linked_list.js')
  
  describe('sum list', () => {
    const linkedListA = new LinkedList()
    const linkedListB = new LinkedList()
    beforeEach(() => {
      const numberOfA = [6, 1, 7] // 6 is head
      const numberOfB = [5, 9, 2] // 2 is head
      for(let i = 0 ;i < numberOfA.length; i++) {
        linkedListA.append(numberOfA[i])
      }
      for(let i = 0 ;i < numberOfB.length; i++) {
        linkedListB.append(numberOfB[i])
      }
    })
    test('return desired linked list', () => {
      expect(sumList(linkedListA, linkedListB).printList()).toEqual([1, 2, 0, 9])
    })
  })
  ```

### Delete Middle Node

* Problem: Implement an algorithm to delete a node in the middle.
* Example:
  * a -> b -> c -> d -> e -> f => a -> b -> d -> e -> f
  * a -> b -> c -> d -> e => a -> b -> d -> e
* Edge Case:
  * If the linked list has only one node, then nothing will be removed from the list.
* Time complexity: We must need to traverse at least once to know the length, so the time complexity is at least O(n).
* Code example:
  ```javascript
  function deleteMiddleNode(linkedList) {
    let fast = linkedList.head;
    let slow = linkedList.head;

    if (fast.next === null) {
      return
    }

    while (fast) {
      fast = fast.next.next
      preNode = slow
      slow = slow.next
      if (fast.next === null) {
        preNode.next = slow.next
        return
      }
    }
    return linkedList;
  }
  ```
* Test:
  ```javascript
  let linkedList = new LinkedList();
  const values = [1, 2, 3, 5, 4, 449, 12];
  for(let i = 0; i < values.length; i++){
    linkedList.insertAtBegin(values[i]); // return 12 <- 449 <- 4 <- 3 <- 2 <- 1
  }
  
  let node = deleteMiddleNode(linkedList);
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
  ```

### Partition

* Problem: Given a number, all nodes with value less than this number will be moved to left and all nodes with value larger than this number will be moved to right.
* Example
  * Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1
  * Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
* Edge Case:
  * If there is only one node, then return linkedlist
* Time complexity: We need to traverse all nodes at least once to compare the values, so the time complexity is at least O(n).
* Code example:
  ```javascript
  function Partition(linkedlist, value) {
    let node = linkedlist.head
    let leftPartition = new LinkedList()
    let rightPartition = new LinkedList()

    while(node) {
      if node.value < value {
        leftPartition.prepand(node)
      } else {
        rightPartition.prepand(node)
      }
    }

    leftPartition.printList()
    rightPartition.printList()
  }
  ```
* Test:
  ```javascript
  const { Partition } = require('../examples/partition.js');
  const LinkedList = require('../examples/singly_linked_list.js');

  describe('Partition', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = Partition(testLinkedList, 5)
      // 1, 4, 3, 2, 4, 3
      // 6, 7, 8
      expect(result.printList()).toEqual([1, 4, 3, 2, 4, 3, 6, 7, 8]);
    });
  });
  ```

## Example

### ChatGPT Answer

Real-world problem that uses an linked list data structure and algorithm

* I want to parse the steps from a ChatGPT answer and store them as different Nodes in a linked list

```javascript
class Step {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addStep(data) {
    const newStep = new Step(data);

    if (!this.head) {
      this.head = newStep;
    } else {
      let currentStep = this.head;

      while (currentStep.next) {
        currentStep = currentStep.next;
      }

      currentStep.next = newStep;
    }
  }

  removeStep(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let currentStep = this.head;

    while (currentStep.next) {
      if (currentStep.next.data === data) {
        currentStep.next = currentStep.next.next;
        return;
      }

      currentStep = currentStep.next;
    }
  }
}
```

and use this structure

```javascript
const linkedList = new LinkedList();

async function handleQuestion(question) {
  const answer = await getChatGPTResponse(question);
  const steps = parseSteps(answer);

  steps.forEach(step => linkedList.addStep(step));
}

function parseSteps(answer) {
  const steps = answer.split('\n');
  return steps.map(step => step.trim()).filter(step => step !== '');
}
```

### Palindrome

* Question: Implement a function to check if a linked list is a palindrome.
* Example
  * 1 -> 2 -> 1 => true
  * 1 -> 2 -> 2 -> 1 => true
  * Seems not singly linked list? => true
* Time complexity
  * I think I still need to loop through all elements, so the it is at least O(n)
* Code
  ```javascript
  function palindrome (linkedList) {
    let currentNode = linkedList.head
    let fasterNode = linkedList.head
    const allValues = []
    const halfValues = []
    while (fasterNode !== null) {
      halfValues.push(currentNode.value)
      currentNode = currentNode.next
  
      allValues.push(fasterNode.value)
      fasterNode = fasterNode.next
      if (fasterNode !== null) {
        allValues.push(fasterNode.value)
        fasterNode = fasterNode.next
      }
    }
  
    for (i = halfValues.length - 1; i >= 0; i--) {
      if (halfValues[i] === allValues[allValues.length - 1 - i]) {
        continue
      } else {
        return false
      }
    }
    return true
  }
  
  module.exports = palindrome
  ```
* Test
  ```javascript
  const LinkedList = require('../main.js')
  const palindrome = require('../examples/palindrome.js')
  
  describe('Palindrome', () => {
    describe('1 -> 2 -> 1', () => {
      const linkedList = new LinkedList
  
      beforeEach(() => {
        linkedList.prepend(1)
        linkedList.prepend(2)
        linkedList.prepend(1)
      })
  
      test('#', () => {
        expect(palindrome(linkedList)).toEqual(true)
      })
    })
  
    describe('1 -> 2 -> 2 -> 1', () => {
      const linkedList = new LinkedList
  
      beforeEach(() => {
        linkedList.prepend(1)
        linkedList.prepend(2)
        linkedList.prepend(2)
        linkedList.prepend(1)
      })
  
      test('#', () => {
        expect(palindrome(linkedList)).toEqual(true)
      })
    })
  
    describe('1 -> 2 -> 3 -> 1', () => {
      const linkedList = new LinkedList
  
      beforeEach(() => {
        linkedList.prepend(1)
        linkedList.prepend(2)
        linkedList.prepend(3)
        linkedList.prepend(1)
      })
  
      test('#', () => {
        expect(palindrome(linkedList)).toEqual(false)
      })
    })
  })
  ```

### Intersection

* Question: Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the j_th node of the second linked list, then they are intersecting.
* Example
  * If there is only one node in a linked list and this node is in another linked list, then they are intersected.
  * If there are multiple shared nodes in two linked list, they are still intersected.
  * Actually given the attribute of node, once intersected, the nodes next from the intersection are all the same.
    ```mermaid
    graph LR
      a1(a1) --> a2(a2)
      a2(a2) --> c1(c1)
      c1(c1) --> c2(c2)
      c2(c2) --> c3(c3)

      b1(b1) --> b2(b2)
      b2(b2) --> b3(b3)
      b3(b3) --> c1(c1)
    ```
* Code
  ```javascript
  function findIntersection(headA, headB) {
    if (!headA || !headB) {
      return null; // One of the lists is empty, no intersection
    }
  
    let pointerA = headA;
    let pointerB = headB;
  
    while (pointerA !== pointerB) {
      // Move pointers to the next node, and if either reaches the end, switch to the other list
      pointerA = pointerA ? pointerA.next : headB;
      pointerB = pointerB ? pointerB.next : headA;
      // With switching list, we can make sure both pointer will run the same length of nodes and reach to the intersection.
    }
  
    return pointerA; // Return the intersection point or null if no intersection
  }
  ```
* Test
  ```javascript
  const { Node, LinkedList } = require('../main.js')
  const intersection = require('../examples/intersection.js')
  
  describe('intersection', () => {
    const nodes = ['a1', 'a2', 'c1', 'c2', 'c3', 'b1', 'b2', 'b3'].map((value) => {
      return new Node(value)
    })
  
    describe('has intersection', () => {
      let linkedList1 = new LinkedList()
      let linkedList2 = new LinkedList()
  
      beforeEach(() => {
        linkedList1.prependNode(nodes[0])
        linkedList1.prependNode(nodes[1])
        linkedList1.prependNode(nodes[2])
        linkedList1.prependNode(nodes[3])
        linkedList1.prependNode(nodes[4])
  
        linkedList2.prependNode(nodes[5])
        linkedList2.prependNode(nodes[6])
        linkedList2.prependNode(nodes[7])
        linkedList2.prependNode(nodes[2])
        linkedList2.prependNode(nodes[3])
        linkedList2.prependNode(nodes[4])
      })
      test('#', () => {
        expect(intersection(linkedList1, linkedList2)).toEqual(true)
      })
    })
  
    describe('has no intersection', () => {
      let linkedList1 = new LinkedList()
      let linkedList2 = new LinkedList()
  
      beforeEach(() => {
        linkedList1.prepend(nodes[0])
        linkedList1.prepend(nodes[1])
        linkedList2.prepend(nodes[5])
        linkedList2.prepend(nodes[6])
        linkedList2.prepend(nodes[7])
      })
      test('#', () => {
        expect(intersection(linkedList1, linkedList2)).toEqual(false)
      })
    })
  })
  ```

### Loop Detection

* Question: Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.
* Example:
  * Input: A -> B -> C -> D -> E -> C
  * Output: C
* Time complexity: I think the least complexity will be O(n) because I at least need to traverse all the nodes
* Code
  ```javascript
  function loopDetection(linkedList) {
    hash = {}
    currentNode = linkedList.head

    while(currentNode) {
      if(!hash[currentNode.value]) {
        hash[currentNode.value] = [currentNode]
      } else if(hash[currentNode.value]) {
        if(hash[currentNode.value].include(currentNode)) {
          return currentNode.value
        }
      } else {
        currentNode = currentNode.next
      }
    }
    
    return false
  }
  ```
* Test
  ```javascript
  describe('loop detection', () => {
    let values = ['A', 'B', 'C', 'D', 'E']
    let nodes = values.map((value) => {new Node(value)})
    let linkedList = new LinkedList()
    linkedList.prependNode(nodes[2])
    linkedList.prependNode(nodes[4])
    linkedList.prependNode(nodes[3])
    linkedList.prependNode(nodes[2])
    linkedList.prependNode(nodes[1])
    test('#', () => {
      expect(loopDetection(linkedList)).toEqual('C')
    })
  })
  ```
* GPT tells me to use Floyd's Tortoise and Hare algorithm

#### Floyd Tortoise and Hare

Floyd's Tortoise and Hare algorithm is a cycle detection technique used to find a cycle in a linked list by moving two pointers at different speeds; it's efficient and helps detect cycles in constant space.

```javascript
function floydTortoiseHare(linkedList) {
  let fast = linkedList.head
  let slow = fast.next

  while(slow) {
    if(fast !== slow) {
      fast = fast.next
      slow = slow.next.next
    } else {
      return true
    }
  }

  return false
}
```

With this algorithm, the space complexity is `O(1)` because we only need two slot for storing values of fast and slow nodes.

## Appendix

### Doubly Linked List

* Graph
  <div class="mermaid">
    graph LR
      id1((A)) --> id2((B))
      id2((B)) --> id1((A))
      id2((B)) --> id3((C))
      id3((C)) --> id2((B))
      id3((C)) --> id4((...))
      id4((...)) --> id3((C))
  </div>
* coding example:
  ```javascript
  class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }
    
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
    
    // create
    append(data) { // create a node on the tail
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
    
    prepend(data) { // create a node on the head
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      }
    }
    
    insert(position, data) { // create a node on particular position
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else if (position > this.length) {
        this.append(data)
      } else {
        const nodeOnPosition = this.traverseToIndex(position - 1);
        newNode.next = nodeOnPosition;
        newNode.prev = nodeOnPosition.prev;
        newNode.prev.next = newNode;
      }
    }
    
    // read
    value() { // return the value of node in particular position
    }
  
    values() { // return values from head
      let current_node = this.head;
      const result = [];
      while (current_node !== null) {
        result.push(current_node.data);
        current_node = current_node.next;
      }
      return result
    }
  
    reverseValues() { // return values from tail
      let current_node = this.tail;
      const result = [];
      while (current_node !== null) {
        result.push(current_node.data);
        current_node = current_node.prev;
      }
      return result
    }
  
    // traverse
    traverseToIndex(index) {
      let currentNode = this.head;
  
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
  
      return currentNode;
    }
    
    // update
    update(position, value) { // update the value on particular position
    
    }
      
    // delete
    remove(position) { // remove the node on particular position
      if (this.head === null) {
        return;
      }
      if (this.head === this.tail && this.head.data === data) {
        this.head = null;
        this.tail = null;
        return;
      }
      if (this.head.data === data) {
        this.head = this.head.next;
        this.head.prev = null;
        return;
      }
      let current_node = this.head.next;
      while (current_node !== null && current_node.data !== data) {
        current_node = current_node.next;
      }
      if (current_node === null) {
        return;
      }
      if (current_node === this.tail) {
        this.tail = this.tail.prev;
        this.tail.next = null;
        return;
      }
      current_node.prev.next = current_node.next;
      current_node.next.prev = current_node.prev;
    }
  }
  
  module.exports = DoublyLinkedList
  ```
* why we need doubly?
  * Traversal in both directions
  * (?) Insertion and deletion at any position: In a singly linked list, if you want to insert a node between two nodes, you need to modify the pointers of the previous node to point to the new node, and the new node to point to the next node. With a doubly linked list, you can simply update the pointers of the neighboring nodes to insert a node in between them. Similarly, when deleting a node from a doubly linked list, you can easily update the pointers of the neighboring nodes to remove the node.
* Spec
  ```javascript
  const DoublyLinkedList = require('../examples/doubly_linked_list.js');

  describe('DoublyLinkedList', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new DoublyLinkedList();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){ // 33 <- 62 <- 888 <- 74 <- 1
        testLinkedList.prepend(values[i]);
      }
    });
  
    test('#prepend', () => { // 0 <- 33 <- 62 <- 888 <- 74 <- 1
      testLinkedList.prepend(0);
      expect(testLinkedList.values()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
      expect(testLinkedList.reverseValues()).toEqual([ 1, 74, 888, 62, 33, 0 ]);
    });
  
    test('#append', () => { // 33 <- 62 <- 888 <- 74 <- 1 <- 0
      testLinkedList.append(0);
      expect(testLinkedList.values()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
      expect(testLinkedList.reverseValues()).toEqual([ 0, 1, 74, 888, 62, 33 ]);
    });
  
    test('#insert', () => { // 33 <- 1000 <- 62 <- 888 <- 74 <- 1
      testLinkedList.insert(2, 1000);
      expect(testLinkedList.values()).toEqual([ 33, 1000, 62, 888, 74, 1 ]);
    });
    
    test('#update', () => {
      testLinkedList.update(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
    })
  
    test('#delete', () => {
      testLinkedList.update(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
    })
  });
  ```

## reference

cracking the coding interview

[Practical Linked List in Ruby](https://www.rubyguides.com/2017/08/ruby-linked-list/)
[Linked Lists in JavaScript (ES6 code)](https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3)
[The Jest Object](https://jestjs.io/docs/getting-started)
