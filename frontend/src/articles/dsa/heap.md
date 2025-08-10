# Title

## Purpose

Heaps are necessary because they provide an efficient way to manage **priority-based** operations, such as retrieving the minimum or maximum element, which is valuable in various applications like scheduling, graph algorithms, and priority queues.

## Concept

Although heap is a complete binary tree, we usually use array to construct heap because of efficient memory usage, sequential access, cache efficiency, simplicity of indexing, and improved space efficiency.

### Min Heap

* Definition: A min heap is a complete binary tree where the value of each node is smaller than or equal to the values of its child nodes, with the minimum value located at the root node.
* Visualization
  ```mermaid
  graph TD
    B((10)) --> C((15))
    B((10)) --> D((20))
    C((15)) --> E((18))
    C((15)) --> F((17))
    D((20)) --> G((25))
    D((20)) --> H((30))
  ```
* Code example
  ```javascript
  class MinHeap {
    constructor(values) {
      this.values = values
      this.heapify()
    }
  
    // create
    insert(value) {
      this.values.push(value)
      this.heapify()
    }
  
    // read
    findMin() {
      return this.values[0]
    }
  
    // update
    update(value, index) {
      this.values[index] = value
      this.heapify()
      return this.values
    }
  
    // destroy
    delete() {
      this.values.shift()
      this.heapify()
    }
  
    heapify() { // bottom up approach
      for(let i = this.values.length - 1; i >= 0; i--) {
        const leftChildIndex = i * 2 + 1
        const rightChildIndex = i * 2 + 2
      
        let smallestIndex = i
        if(this.values[i] > this.values[leftChildIndex]) {
          smallestIndex = leftChildIndex
        }
        if(this.values[smallestIndex] > this.values[rightChildIndex]) {
          smallestIndex = rightChildIndex
        }
        if(smallestIndex !== i) {
          const tmp = this.values[i]
          this.values[i] = this.values[smallestIndex]
          this.values[smallestIndex] = tmp
          this.heapify(leftChildIndex)
          this.heapify(rightChildIndex)
        }
      }
    }
  }
  
  module.exports = MinHeap
  ```
* Spec
  ```javascript
  MinHeap = require('./min_heap.js')

  describe('MinHeap', () => {
    let heap = new MinHeap([5, 12, 8, 3, 9, 7])
  
    // init
    test('#new', () => {
      expect(heap.values).toEqual([3, 5, 7, 12, 9, 8])
    })
  
    // create
    test('#insert', () => {
      heap.insert(4)
      expect(heap.values).toEqual([3, 5, 4, 12, 9, 8, 7])
    })
  
    // read
    test('findMin', () => {
      expect(heap.findMin()).toEqual(3)
    })
  
    // update
    test('#update', () => {
      heap.update(6, 3)
      expect(heap.values).toEqual([3, 5, 7, 6, 9, 8])
    })
  
    // destroy
    test.only('#delete', () => {
      heap.delete()
      expect(heap.values).toEqual([5, 7, 12, 9, 8])
    })
  })
  ```

### Max Heap

* Definition: A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its child nodes, with the maximum value located at the root node.
* Visualization
  ```mermaid
  graph TD
    B((20)) --> C((18))
    B((20)) --> D((15))
    C((18)) --> E((10))
    C((18)) --> F((12))
    D((15)) --> G((8))
    D((15)) --> H((7))
    E((10)) --> I((5))
    E((10)) --> J((6))
  ```
* Code example
  ```javascript
  class MaxHeap {
    constructor(values) {
      this.heap = values;
    }
    
    // create
    insert(value) {
      this.heap.unshift(value)
      this.heapify()
    }
  
    // read
    findMax() {
      return this.heap[0]
    }
  
    values() {
      return this.heap
    }
  
    // update
    update(value, index) {
      this.heap[index] = value
      this.heapify()
    }
  
    // destroy
    delete() {
      // In max heap, we usually remove the maximum value
      this.heap.shift()
      this.heapify()
    }
  
    heapify(i = 0) {
      const leftChildIndex = i * 2 + 1
      const rightChildIndex = i * 2 + 2
  
      if (i > this.heap.length) return
  
      let largest = i
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largest]) {
        largest = leftChildIndex
      }
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largest]) {
        largest = rightChildIndex
      }
  
      if (largest !== i) {
        // Swap the current node with the largest child
        const temp = this.heap[i];
        this.heap[i] = this.heap[largest];
        this.heap[largest] = temp;
      }
  
      // Recursively heapify the affected child's subtree
      this.heapify(leftChildIndex);
      this.heapify(rightChildIndex);
    }
  }
  
  module.exports = MaxHeap
  ```
* Spec
  ```javascript
  const MaxHeap = require('./max_heap.js')

  describe('Max Heap', () => {
    let heap
    beforeEach(async () => {
      heap = new MaxHeap([20, 9, 15, 5, 7, 10])
    });
    
    test('insert', () => {
      heap.insert(3)
      expect(heap.values()).toEqual([20, 15, 10, 3, 5, 7, 9])
    })
  
    test('update', () => { // check next time. It's wrong
      heap.update(3, 2)
      // [20, 9, 3, 5, 7, 10]
      expect(heap.values()).toEqual([20, 9, 10, 5, 7, 3])
    })
  
    test('delete', () => {
      heap.delete()
      expect(heap.values()).toEqual([15, 10, 5, 7, 9])
    })
  
    test('findMax', () => {
      expect(heap.findMax()).toEqual(20)
    })
  
    test('heapify', () => {
      let randomHeap = new MaxHeap([10, 20, 5, 15, 9, 7])
      randomHeap.heapify()
      expect(randomHeap.values()).toEqual([20, 15, 7, 10, 9, 5])
    })
  })
  ```

## Reference

[Heaps in 3 minutes — Intro](https://www.youtube.com/watch?v=0wPlzMU-k00)
