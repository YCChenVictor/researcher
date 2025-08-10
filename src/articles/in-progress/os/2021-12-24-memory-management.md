---
layout: post
title: memory management
description: ''
date: '2021-12-24'
categories: OS
note: 
mermaid: true
publish: true
---

## Introduction

Memeory management allocates memory efficiently to processes. process comes -> allocates portions of memory -> free that portion once process finished

I know there are many confusions here. let's focus on memory first. For some reason (refer to [this](https://www.youtube.com/watch?v=qdkxXygc3rE)), we divide memory to equal blocks and we also divide the process into multiple pages; each page can fit into one block and we records where the page stored through mechanisms (refer to [this](https://www.youtube.com/watch?v=qdkxXygc3rE)); once CPU tries to deal with this process, the records tell where the whole pages are and form the process and start to process it and the data flow is as follow:

<div class="mermaid">
graph LR
  subgraph Process
    id1(Page 0)
    id2(Page 1)
    id3(Page 2)
    id4(Page 3)
    ...
  end
  
  subgraph Memory
    id5(block 0)
    id6(block 1)
    id7(block 2)
    id8(block 3)
    id9(block 4)
    id10(block 5)
    id11(block 6)
    id12(block 7)
    ...
  end

  id1 --> id13(allocation)
  id2 --> id13(allocation)
  id3 --> id13(allocation)
  id4 --> id13(allocation)

  id13(allocation) --> id5(Page 0)
  id13(allocation) --> id12(Page 1)
  id13(allocation) --> id8(Page 2)
  id13(allocation) --> id10(Page 3)
</div>

## Why?

why memory management important?

## How?

### Memory

watch the following video [Pointers and dynamic memory - stack vs heap](https://www.youtube.com/watch?v=_8-ht2AKyH4)

In computer science, memory can be broadly classified into two main categories: stack memory and heap memory.
* Stack Memory
  * Stack memory is a region of memory that is automatically managed by the compiler or the runtime environment.
It is used to store local variables, function parameters, and function call information.
Memory allocation and deallocation on the stack are done in a Last-In-First-Out (LIFO) manner, resembling a stack of items.
Stack memory is limited in size and typically has a fixed size set at the beginning of a program.
The allocation and deallocation of stack memory are fast and deterministic.
Stack memory is automatically freed when a function call or block of code completes.
* Heap Memory
* Heap memory is a region of memory used for dynamic memory allocation.
It is manually managed by the programmer, who is responsible for allocating and deallocating memory explicitly.
Heap memory is generally used for storing dynamically created objects, such as objects created using the new keyword in languages like C++ or Java.
Memory allocation and deallocation on the heap can be done in any order and at any time during the program's execution.
Heap memory is larger in size compared to the stack and can grow or shrink dynamically.
The allocation and deallocation of heap memory are relatively slower and less deterministic compared to the stack.
To summarize, stack memory is used for managing local variables and function calls, and its allocation and deallocation are automatic and fast. On the other hand, heap memory is used for dynamic memory allocation, and its management requires explicit allocation and deallocation by the programmer. Heap memory is larger, can grow or shrink dynamically, but its allocation and deallocation are slower and less deterministic compared to the stack.

Six famous methods: Fixed Partitioning, Dynamic Partitioning, Simple Paging, Simple Segmentation, Virtual-Memory Paging and VirtualMemory Segmentation

### Fixed Partitioning

### Dynamic Partitioning

### Simple Paging

### Simple Segmentation

### Virtual-Memory Paging

### VirtualMemory Segmentation

## What?



## Reference

[Pointers and dynamic memory - stack vs heap](https://www.youtube.com/watch?v=_8-ht2AKyH4)

[Stack vs Heap Memory](https://www.youtube.com/watch?v=gRwfHzeS-GM)

[memory management](https://whatis.techtarget.com/definition/memory-management)

[Memory management](https://en.wikipedia.org/wiki/Memory_management)

[MemoryManagement techniques and Processes Scheduling](https://www.ijser.org/researchpaper/Memory-Management-techniques-and-Processes-Scheduling.pdf)

[Demystifying memory management in modern programming languages](https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd)

[Visualizing memory management in V8 Engine (JavaScript, NodeJS, Deno, WebAssembly)](https://deepu.tech/memory-management-in-v8/)

[Operating System - Memory Management](https://www.tutorialspoint.com/operating_system/os_memory_management.htm)
