---
layout: post
title:
description: ''
date: '2023-06-11'
categories:
note:
mathjax:
publish:
mermaidJS:
p5JS:
chartJS:
threeJS:
---

## Introduction

TBC

## Why?

Learning bit manipulation is valuable as it enables programmers to perform efficient bitwise operations, optimize code for performance, and tackle algorithmic problems involving binary data structures more effectively.

## How?

Performing operations on individual bits within a binary representation of data.

* Bitwise AND (&)
  * This operation compares corresponding bits from two numbers and returns a new number where each bit is set if and only if the corresponding bits in both numbers are also set.
  * table
    ```bash
    0 & 0 = 0
    0 & 1 = 0
    1 & 0 = 0
    1 & 1 = 1
    ```
* Bitwise OR (|)
  * This operation compares corresponding bits from two numbers and returns a new number where each bit is set if either of the corresponding bits in the input numbers is set.
  * table
    ```bash
    0 | 0 = 0
    0 | 1 = 1
    1 | 0 = 1
    1 | 1 = 1
    ```
* Bitwise XOR (^):
  * XOR means exclusive OR
  * This operation compares corresponding bits from two numbers and returns a new number where each bit is set if the corresponding bits in the input numbers are **different**.
  * table
    ```bash  
    0 ^ 0 = 0
    0 ^ 1 = 1 # 0 and 1 are different
    1 ^ 0 = 1 # 1 and 0 are different
    1 ^ 1 = 0
    ```
* Bitwise NOT (~):
  * This operation inverts all the bits of a number. It flips each 0 to 1 and each 1 to 0.
  * example
    ```javascript
    let x = 42 // binary: 00101010
    let notX = ~x; // binary: 11010101
    console.log(notX);  // Output: -43 (in decimal)
    ```
* Left shift (<<)
  * This operation shifts the bits of a number to the left by a specified number of positions. It is equivalent to multiplying the number by 2 raised to the power of the shift amount. For example, x << n shifts the bits of x n positions to the left.
  * example
    ```javascript
    let x = 42;  // binary: 00101010
    let shifted = x << 2;  // binary: 10101000
    console.log(shifted);  // Output: 168 (in decimal)
    ```
* Right shift (>>):
  * This operation shifts the bits of a number to the right by a specified number of positions. It is equivalent to dividing the number by 2 raised to the power of the shift amount. For example, x >> n shifts the bits of x n positions to the right.
  * example
    ```javascript
    let x = 42; // binary: 00101010
    let shifted = x >> 2; // binary: 10001010
    console.log(shifted); // 10
    ```
* Unsigned right shift
  * Symbolized by '>>>', shifts the bits of the left operand to the right by a specified number of positions, filling the vacant bits with zeros.
  * Example
    ```javascript
    let num = 10 // binary: 1010
    let result = num >>> 2; // 0010 (remove 2 bits in right)
    console.log(result);  // Output: 2
    ```

### Insertion

* Problem: You are given two 32-bit numbers, N and M, and two bit positions, i and j. Write a method to insert M into N such that M starts at bit j and ends at bit i. You can assume that the bits j through i have enough space to fit all of M. That is, if M = 10011, you can assume that there are at least 5 bits between j and i. You would not, for example, have j = 3 and i = 2, because M could not fully fit between bit 3 and bit 2.
* Information:
  * Example:
    * Input:  N = 10000000000 M = 10011, i = 2, j = 6
    * Output: N = 10001001100
  * Edge: TBC
  * Least time complexity: TBC
* Code example: I will just get the sub numbers from N (0~1 and 7~) and connect them with M
  ```javascript
  function Insertion (N, M, i, j) {
    N_string = N.toString();
    M_string = M.toString();
    result = ''
    for (let s; s < j; s++) {
      result += N_string[s]
    }
    result += M_string
    for (let s; s < i; s++) {
      result += N_string[s]
    }
    return result
  }
  ```
* Spec:
  ```javascript
  describe('Insertion', () => {
    test('#', () => {
      expect(Insertion(10000000000, 10011, 2, 6)).toEqual(10001001100)
    })
  })
  ```

### Binary to String

TBC

### Flip Bit to Win

TBC

### Next Number

TBC

### Debugger

TBC

### Conversion

TBC

### PairwiseSwap

TBC

### Draw Line

TBC

## What?

Give a real world application

## Reference
