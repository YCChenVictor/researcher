---
layout: post
title:
description: ''
date: '2022-08-30'
categories: web-security
note: 我看要直接先進 how，因為要知道它大概是怎麼算的
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

This article describes the concepts behind hashing algorithms:

* MD5 (Message-Digest Algorithm 5): TBC
* SHA (Secure Hash Algorithms): a family of cryptographic hash functions
  * SHA-1
  * SHA-2
  * SHA-3
* scrypt
* bcrypt

## Why?

focus on why we need it

## How?

Three fundamental safety characteristics

* pre-image resistance:
* second pre-image resistance:
* collision resistance: collision occurs when two different data generate the same encoding result, meaning we can create a fake one with desired data in it and also keep the encoding result the same.

### MD5

### SHA-1

If we change one bit, the whole encoding result from SHA-1 change. But SHA-1 can still face risk of collision.

Suppose we want to encode 'abc' with SHA-1

steps:


* 

## What?

give an example

## Reference

[Secure Hash Algorithms](https://brilliant.org/wiki/secure-hashing-algorithms/#:~:text=Secure%20Hash%20Algorithms%2C%20also%20known,modular%20additions%2C%20and%20compression%20functions.)

[SHA: Secure Hashing Algorithm - Computerphile](https://www.youtube.com/watch?v=DMtFhACPnTY)
